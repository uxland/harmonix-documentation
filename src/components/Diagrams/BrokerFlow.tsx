import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import { useLoop } from './useLoop';
import styles from './broker.module.css';

/**
 * The two kinds of broker messages. An event goes from one publisher to every subscriber (one
 * that throws is isolated); a request goes to its only handler and its answer comes back.
 */
interface Point {
  x: number;
  y: number;
}

const BROKER: Point = { x: 50, y: 50 };
const PUBLISHER: Point = { x: 10, y: 50 };
const SUBSCRIBERS: (Point & { name: string; fails?: boolean })[] = [
  { name: 'alerts', x: 90, y: 18 },
  { name: 'insights', x: 90, y: 50 },
  { name: 'profile', x: 90, y: 82, fails: true },
];
const REQUESTER: Point = { x: 10, y: 50 };
const HANDLER: Point = { x: 90, y: 50 };

// 0 idle · 1 event at the broker · 2 event delivered · 3 request at the broker · 4 at the handler
// · 5 answer back at the broker · 6 answer delivered.
const DURATIONS = [900, 800, 1600, 800, 900, 800, 2000];

const Node = ({ at, children, className }: { at: Point; children: React.ReactNode; className?: string }) => (
  <span className={clsx(styles.node, className)} style={{ left: `${at.x}%`, top: `${at.y}%` }}>
    {children}
  </span>
);

const Message = ({
  at,
  visible,
  children,
  answer,
  reset,
}: { at: Point; visible: boolean; children: React.ReactNode; answer?: boolean; reset?: boolean }) => (
  <span
    className={clsx(styles.message, answer && styles.answer)}
    style={{ left: `${at.x}%`, top: `${at.y}%`, opacity: visible ? 1 : 0, transition: reset ? 'none' : undefined }}
    aria-hidden="true"
  >
    {children}
  </span>
);

export const BrokerFlow = () => {
  const { ref, step } = useLoop<HTMLDivElement>(DURATIONS, 2);

  const eventAt = (target: Point): Point => (step <= 0 ? PUBLISHER : step === 1 ? BROKER : target);
  const requestAt: Point = step <= 3 ? (step === 3 ? BROKER : REQUESTER) : HANDLER;
  const answerAt: Point = step <= 4 ? HANDLER : step === 5 ? BROKER : REQUESTER;

  return (
    <figure
      className={styles.diagram}
      ref={ref}
      aria-label={translate({
        id: 'diagram.broker.aria',
        message: "Un esdeveniment arriba a tots els subscriptors, i si un falla els altres el reben igualment. Una petició arriba al seu únic handler i la resposta torna a qui l'ha enviada.",
      })}
    >
      <div className={styles.panels}>
        <section className={styles.panel}>
          <header>
            <strong>
              <Translate id="diagram.broker.events">Esdeveniments</Translate>
            </strong>
            <code>publish / subscribe</code>
          </header>
          <div className={styles.stage}>
            <svg className={styles.wires} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1={PUBLISHER.x} y1={PUBLISHER.y} x2={BROKER.x} y2={BROKER.y} />
              {SUBSCRIBERS.map((s) => (
                <line key={s.name} x1={BROKER.x} y1={BROKER.y} x2={s.x} y2={s.y} />
              ))}
            </svg>
            <Node at={PUBLISHER}>orders</Node>
            <Node at={BROKER} className={clsx(styles.broker, (step === 1 || step === 3 || step === 5) && styles.brokerBusy)}>
              broker
            </Node>
            {SUBSCRIBERS.map((s) => (
              <Node key={s.name} at={s} className={clsx(step === 2 && (s.fails ? styles.nodeFailed : styles.nodeReceived))}>
                {s.name}
              </Node>
            ))}
            {SUBSCRIBERS.map((s) => (
              <Message key={s.name} at={eventAt(s)} visible={step <= 2 && !(step === 2 && s.fails)} reset={step === 0}>
                orders:created
              </Message>
            ))}
          </div>
          <p className={styles.caption}>
            <Translate id="diagram.broker.events.caption">
              Tots els subscriptors el reben. Si un falla, els altres no se n'assabenten.
            </Translate>
          </p>
        </section>

        <section className={styles.panel}>
          <header>
            <strong>
              <Translate id="diagram.broker.requests">Peticions</Translate>
            </strong>
            <code>send / registerRequest</code>
          </header>
          <div className={styles.stage}>
            <svg className={styles.wires} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1={REQUESTER.x} y1={REQUESTER.y} x2={HANDLER.x} y2={HANDLER.y} />
            </svg>
            <Node at={REQUESTER} className={clsx(step === 6 && styles.nodeReceived)}>
              insights
            </Node>
            <Node at={BROKER} className={clsx(styles.broker, (step === 3 || step === 5) && styles.brokerBusy)}>
              broker
            </Node>
            <Node at={HANDLER} className={clsx(step === 4 && styles.nodeReceived)}>
              orders
            </Node>
            <Message at={requestAt} visible={step >= 3 && step <= 4} reset={step === 0}>
              orders:count
            </Message>
            <Message at={answerAt} visible={step >= 5} answer reset={step === 0}>
              42
            </Message>
          </div>
          <p className={styles.caption}>
            <Translate id="diagram.broker.requests.caption">Un sol handler respon, i la resposta torna a qui ha preguntat.</Translate>
          </p>
        </section>
      </div>
    </figure>
  );
};
