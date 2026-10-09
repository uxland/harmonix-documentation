import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import { MiniShell } from './MiniShell';
import { type ExamplePlugin, FRAMEWORKS, type Region, usePlugins } from './plugins';
import styles from './styles.module.css';

/**
 * The hero animation: three teams ship plugins built with different frameworks, the shell
 * receives them in its regions, they talk through the broker and the main view changes without
 * reloading. A 12-second loop that only plays while it is visible, and a still final state for
 * people who prefer reduced motion.
 */
const LANES: { plugin: string; region: Region }[] = [
  { plugin: 'orders', region: 'main' },
  { plugin: 'alerts', region: 'header' },
  { plugin: 'insights', region: 'menu' },
];

const STEPS = [
  <Translate id="composition.step.regions" key="regions">
    El shell defineix les regions
  </Translate>,
  <Translate id="composition.step.ship" key="ship">
    Cada equip publica el seu plugin
  </Translate>,
  <Translate id="composition.step.compose" key="compose">
    Harmonix els compon
  </Translate>,
  <Translate id="composition.step.broker" key="broker">
    Es parlen pel broker
  </Translate>,
  <Translate id="composition.step.switch" key="switch">
    Canvien de vista sense recarregar
  </Translate>,
];

interface Point {
  x: number;
  y: number;
}

interface State {
  step: number;
  installed: string[];
  activeMain?: string;
  orders: number;
  landing?: Region;
  pressing: boolean;
  pointing?: string;
  flight?: { plugin: string; from: Point; to: Point; moving: boolean };
  message?: { from: Point; to: Point; moving: boolean };
  cursor?: { at: Point; clicking: boolean };
}

const EMPTY: State = { step: 0, installed: [], orders: 0, pressing: false };
const FINAL: State = { step: STEPS.length - 1, installed: ['orders', 'alerts', 'insights'], activeMain: 'orders', orders: 2, pressing: false };
const LOOP_MS = 12500;

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

const useVisible = (ref: React.RefObject<HTMLElement>) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
};

export const HeroStage = () => {
  const plugins = usePlugins();
  const stage = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const visible = useVisible(stage);
  const [state, setState] = useState<State>(EMPTY);
  const update = (change: Partial<State>) => setState((current) => ({ ...current, ...change }));

  /** The centre of an element, relative to the stage. */
  const centre = useCallback((selector: string): Point => {
    const root = stage.current;
    const element = root?.querySelector(selector);
    if (!root || !element) return { x: 0, y: 0 };
    const box = root.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    return { x: rect.left - box.left + rect.width / 2, y: rect.top - box.top + rect.height / 2 };
  }, []);

  useEffect(() => {
    if (reduced) {
      setState(FINAL);
      return;
    }
    if (!visible) return;

    const timers: number[] = [];
    const at = (ms: number, action: () => void) => timers.push(window.setTimeout(action, ms));
    const next = () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

    const fly = (start: number, plugin: string, region: Region) => {
      at(start, async () => {
        update({ flight: { plugin, from: centre(`[data-lane="${plugin}"]`), to: centre(`[data-region="${region}"]`), moving: false } });
        await next();
        setState((current) => (current.flight ? { ...current, flight: { ...current.flight, moving: true } } : current));
      });
      at(start + 800, () =>
        setState((current) => ({
          ...current,
          flight: undefined,
          landing: region,
          installed: [...current.installed, plugin],
          activeMain: current.activeMain ?? (plugins[plugin].regions.includes('main') ? plugin : undefined),
        })),
      );
    };

    const send = (start: number) => {
      at(start, async () => {
        update({ pressing: true, message: { from: centre('[data-broker-source]'), to: centre('[data-region="header"]'), moving: false } });
        await next();
        setState((current) => (current.message ? { ...current, message: { ...current.message, moving: true } } : current));
      });
      at(start + 700, () => setState((current) => ({ ...current, pressing: false, message: undefined, orders: current.orders + 1 })));
    };

    const run = () => {
      setState(EMPTY);
      at(1300, () => update({ step: 1 }));
      at(2000, () => update({ step: 2 }));
      fly(2000, 'orders', 'main');
      fly(3300, 'alerts', 'header');
      fly(4600, 'insights', 'menu');
      at(5900, () => update({ step: 3, landing: undefined }));
      send(6200);
      send(7500);
      at(8800, () => update({ step: 4, cursor: { at: centre('[data-region="main"]'), clicking: false } }));
      at(9200, () => update({ pointing: 'insights', cursor: { at: centre('[data-menu="insights"]'), clicking: false } }));
      at(10200, () => update({ cursor: { at: centre('[data-menu="insights"]'), clicking: true } }));
      at(10400, () => update({ activeMain: 'insights', pointing: undefined }));
      at(11000, () => update({ cursor: undefined }));
      at(LOOP_MS, run);
    };
    run();
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [visible, reduced, centre, plugins]);

  const installed = state.installed.map((id) => plugins[id]).filter(Boolean) as ExamplePlugin[];

  return (
    <figure className={styles.stage} ref={stage} aria-label={translate({ id: 'composition.aria', message: "Harmonix compon en una sola aplicació els plugins de tres equips" })}>
      <div className={styles.lanes}>
        {LANES.map(({ plugin: id }) => {
          const plugin = plugins[id];
          const framework = FRAMEWORKS[plugin.framework];
          const shipped = state.installed.includes(id) || state.flight?.plugin === id;
          return (
            <div key={id} className={clsx(styles.lane, state.step === 1 && styles.laneActive)} style={{ '--fw': framework.color } as React.CSSProperties}>
              <span className={styles.laneTeam}>{plugin.team}</span>
              <span className={clsx(styles.chip, shipped && styles.chipShipped)} data-lane={id}>
                <img src={framework.logo} alt="" width={16} height={16} />
                {plugin.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.window}>
        <MiniShell
          plugins={installed}
          activeMain={state.activeMain}
          orders={state.orders}
          landing={state.landing}
          pressing={state.pressing}
          pointing={state.pointing}
        />
      </div>

      {state.flight && (
        <span
          className={clsx(styles.chip, styles.flying)}
          style={
            {
              '--fw': FRAMEWORKS[plugins[state.flight.plugin].framework].color,
              left: state.flight.from.x,
              top: state.flight.from.y,
              transform: state.flight.moving
                ? `translate(calc(-50% + ${state.flight.to.x - state.flight.from.x}px), calc(-50% + ${state.flight.to.y - state.flight.from.y}px)) scale(0.85)`
                : 'translate(-50%, -50%)',
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          <img src={FRAMEWORKS[plugins[state.flight.plugin].framework].logo} alt="" width={16} height={16} />
          {plugins[state.flight.plugin].name}
        </span>
      )}

      {state.message && (
        <span
          className={styles.message}
          style={{
            left: state.message.from.x,
            top: state.message.from.y,
            transform: state.message.moving
              ? `translate(calc(-50% + ${state.message.to.x - state.message.from.x}px), calc(-50% + ${state.message.to.y - state.message.from.y}px))`
              : 'translate(-50%, -50%)',
          }}
          aria-hidden="true"
        >
          order:created
        </span>
      )}

      {state.cursor && (
        <span
          className={clsx(styles.cursor, state.cursor.clicking && styles.cursorClick)}
          style={{ left: state.cursor.at.x, top: state.cursor.at.y }}
          aria-hidden="true"
        />
      )}

      <figcaption className={styles.steps}>
        <ol>
          {STEPS.map((label, i) => (
            <li key={i} className={clsx(i === state.step && styles.stepActive, i < state.step && styles.stepDone)}>
              {label}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
};
