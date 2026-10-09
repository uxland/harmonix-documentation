import React, { useState } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import { useLoop } from './useLoop';
import styles from './styles.module.css';

/**
 * The parts of a Harmonix application: a shell with regions, and plugins from the Plugin Store
 * that inject views into them. Each plugin lights up in turn and draws its views; one plugin can
 * fill several regions. Hovering the legend highlights each kind of part.
 */
type Part = 'shell' | 'region' | 'view' | 'plugin';

const HEADER = [
  { x: 330, y: 34, w: 60, h: 26 },
  { x: 398, y: 34, w: 60, h: 26 },
];
const MENU = [115, 165, 215, 265].map((cy) => ({ cx: 57, cy }));
const MAIN = [96, 186].flatMap((y) => [114, 232, 350].map((x) => ({ x, y, w: 106, h: 78 })));

interface Plugin {
  name: string;
  version: string;
  color: string;
  tile: { x: number; y: number };
  header: number[];
  menu: number[];
  main: number[];
}

const PLUGINS: Plugin[] = [
  { name: 'orders', version: '1.4.0', color: '#61dafb', tile: { x: 538, y: 86 }, header: [0], menu: [0], main: [0] },
  { name: 'insights', version: '2.0.1', color: '#ff5c7a', tile: { x: 662, y: 86 }, header: [], menu: [1], main: [1, 4] },
  { name: 'alerts', version: '0.9.2', color: '#8093ff', tile: { x: 538, y: 166 }, header: [1], menu: [], main: [2] },
];
const IDLE = [
  { name: 'help', version: '1.0.3', tile: { x: 662, y: 166 } },
  { name: 'profile', version: '2.1.0', tile: { x: 538, y: 246 } },
  { name: 'agenda', version: '0.3.0', tile: { x: 662, y: 246 } },
];
const TILE = { w: 110, h: 64 };

const curve = (from: { x: number; y: number }, to: { x: number; y: number }) =>
  `M${from.x} ${from.y} C${from.x - 120} ${from.y} ${to.x + 90} ${to.y} ${to.x} ${to.y}`;

export const ShellAnatomy = () => {
  // 0: empty shell; 1–3: each plugin injects its views; 4: the whole application.
  const { ref, step } = useLoop<HTMLDivElement>([1400, 1800, 1800, 1800, 3200]);
  const [focus, setFocus] = useState<Part | null>(null);
  const shown = (index: number) => step > index;

  const owner = (kind: 'header' | 'menu' | 'main', index: number) =>
    PLUGINS.findIndex((plugin, i) => shown(i) && plugin[kind].includes(index));

  const legend: { part: Part; label: React.ReactNode }[] = [
    { part: 'shell', label: <Translate id="diagram.anatomy.shell">Shell: l'aplicació principal</Translate> },
    { part: 'region', label: <Translate id="diagram.anatomy.region">Regió: un espai on es poden injectar vistes</Translate> },
    { part: 'view', label: <Translate id="diagram.anatomy.view">Vista: un Web Component d'un plugin</Translate> },
    { part: 'plugin', label: <Translate id="diagram.anatomy.plugin">Plugin: es publica al Plugin Store</Translate> },
  ];

  return (
    <figure className={styles.diagram} ref={ref} data-focus={focus ?? undefined}>
      <svg
        viewBox="0 0 800 380"
        className={styles.svg}
        role="img"
        aria-label={translate({
          id: 'diagram.anatomy.aria',
          message: 'Un shell amb tres regions; tres plugins del Plugin Store hi injecten vistes, alguns en més d’una regió.',
        })}
      >
        <g className={styles.partShell}>
          <rect x="10" y="10" width="470" height="360" rx="14" />
        </g>

        <g className={styles.partRegion}>
          <rect x="22" y="22" width="446" height="50" rx="9" />
          <rect x="22" y="82" width="70" height="276" rx="9" />
          <rect x="102" y="82" width="366" height="276" rx="9" />
          <text x="34" y="51">header</text>
          <text x="30" y="350">menu</text>
          <text x="114" y="350">main</text>
        </g>

        <g className={styles.partView}>
          {HEADER.map((slot, i) => {
            const by = owner('header', i);
            return (
              <rect key={i} {...{ x: slot.x, y: slot.y, width: slot.w, height: slot.h }} rx="13" className={clsx(by >= 0 && styles.filled)} style={{ '--c': PLUGINS[by]?.color } as React.CSSProperties} />
            );
          })}
          {MENU.map((dot, i) => {
            const by = owner('menu', i);
            return <circle key={i} cx={dot.cx} cy={dot.cy} r="17" className={clsx(by >= 0 && styles.filled)} style={{ '--c': PLUGINS[by]?.color } as React.CSSProperties} />;
          })}
          {MAIN.map((card, i) => {
            const by = owner('main', i);
            return (
              <rect key={i} {...{ x: card.x, y: card.y, width: card.w, height: card.h }} rx="8" className={clsx(by >= 0 && styles.filled)} style={{ '--c': PLUGINS[by]?.color } as React.CSSProperties} />
            );
          })}
        </g>

        <g className={styles.links}>
          {PLUGINS.map((plugin, i) => {
            const from = { x: plugin.tile.x, y: plugin.tile.y + TILE.h / 2 };
            const targets = [
              ...plugin.header.map((h) => ({ x: HEADER[h].x + HEADER[h].w / 2, y: HEADER[h].y + HEADER[h].h / 2 })),
              ...plugin.menu.map((m) => ({ x: MENU[m].cx, y: MENU[m].cy })),
              ...plugin.main.map((m) => ({ x: MAIN[m].x + MAIN[m].w / 2, y: MAIN[m].y + MAIN[m].h / 2 })),
            ];
            return targets.map((to, t) => (
              <path
                key={`${plugin.name}-${t}`}
                d={curve(from, to)}
                pathLength={1}
                className={clsx(styles.link, step === i + 1 && styles.linkDrawn)}
                style={{ '--c': plugin.color, transitionDelay: step === i + 1 ? `${t * 0.15}s` : '0s' } as React.CSSProperties}
              />
            ));
          })}
        </g>
        <g className={styles.partPlugin}>
          <rect x="520" y="40" width="270" height="300" rx="14" className={styles.store} />
          <text x="655" y="68" textAnchor="middle" className={styles.storeTitle}>
            Plugin Store
          </text>
          {IDLE.map((plugin) => (
            <g key={plugin.name} className={styles.tileIdle}>
              <rect x={plugin.tile.x} y={plugin.tile.y} width={TILE.w} height={TILE.h} rx="10" />
              <text x={plugin.tile.x + 14} y={plugin.tile.y + 28}>{plugin.name}</text>
              <text x={plugin.tile.x + 14} y={plugin.tile.y + 47} className={styles.version}>v{plugin.version}</text>
            </g>
          ))}
          {PLUGINS.map((plugin, i) => (
            <g key={plugin.name} className={clsx(styles.tile, step === i + 1 && styles.tileActive, shown(i) && styles.tileUsed)} style={{ '--c': plugin.color } as React.CSSProperties}>
              <rect x={plugin.tile.x} y={plugin.tile.y} width={TILE.w} height={TILE.h} rx="10" />
              <text x={plugin.tile.x + 14} y={plugin.tile.y + 28}>{plugin.name}</text>
              <text x={plugin.tile.x + 14} y={plugin.tile.y + 47} className={styles.version}>v{plugin.version}</text>
            </g>
          ))}
        </g>

      </svg>

      <figcaption>
        <ul className={styles.legend} onMouseLeave={() => setFocus(null)}>
          {legend.map(({ part, label }) => (
            <li key={part}>
              <button type="button" onMouseEnter={() => setFocus(part)} onFocus={() => setFocus(part)} onBlur={() => setFocus(null)} className={clsx(focus === part && styles.legendActive)}>
                <span className={clsx(styles.swatch, styles[`swatch_${part}`])} aria-hidden="true" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
};
