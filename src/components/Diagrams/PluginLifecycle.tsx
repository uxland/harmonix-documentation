import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import { useLoop } from './useLoop';
import styles from './lifecycle.module.css';

/**
 * The online lifecycle of three plugins started at the same time. They go through the phases in
 * parallel; one fails in `initialize` and is isolated while the others carry on. The console shows
 * the same messages that `bootstrapPlugins` writes.
 */
const PHASES = [
  { id: 'loading', label: () => translate({ id: 'diagram.lifecycle.loading', message: 'Càrrega' }), code: 'importer()' },
  { id: 'evaluation', label: () => translate({ id: 'diagram.lifecycle.evaluation', message: 'Avaluació' }), code: 'module' },
  { id: 'initialization', label: () => translate({ id: 'diagram.lifecycle.initialization', message: 'Inicialització' }), code: 'initialize(api)' },
  { id: 'rendering', label: () => translate({ id: 'diagram.lifecycle.rendering', message: 'Renderitzat' }), code: 'factory()' },
  { id: 'disposal', label: () => translate({ id: 'diagram.lifecycle.disposal', message: 'Alliberament' }), code: 'dispose(api)' },
];

const FAILED = -2;

/** The phase of each plugin at each step: -1 not started, FAILED after `initialize` threw. */
const ROWS = [
  { name: 'orders', logo: '/img/logo-react.svg', color: '#61dafb', phases: [-1, 0, 1, 2, 3, 3, 3, 4] },
  { name: 'alerts', logo: '/img/logo-lit.svg', color: '#8093ff', phases: [-1, 0, 0, 1, 2, 3, 3, 4] },
  { name: 'insights', logo: '/img/logo-angular.svg', color: '#ff5c7a', phases: [-1, 0, 1, FAILED, FAILED, FAILED, FAILED, FAILED] },
];

/** The console lines that appear at each step. */
const LOG: { at: number; text: string; error?: boolean; comment?: boolean }[] = [
  { at: 2, text: 'imported plugin:  orders' },
  { at: 2, text: 'imported plugin:  insights' },
  { at: 3, text: 'initialized plugin:  orders' },
  { at: 3, text: 'imported plugin:  alerts' },
  { at: 3, text: 'Failed to load plugin insights: Error: settings not found', error: true },
  { at: 4, text: 'initialized plugin:  alerts' },
  { at: 7, text: '// the shell unloads the plugins: dispose(api)', comment: true },
];

const DURATIONS = [900, 1200, 1300, 1600, 1300, 1600, 1800, 2400];
const STILL = 6;

export const PluginLifecycle = () => {
  const { ref, step } = useLoop<HTMLDivElement>(DURATIONS, STILL);

  return (
    <figure className={styles.diagram} ref={ref}>
      <div className={styles.grid} role="img" aria-label={translate({
        id: 'diagram.lifecycle.aria',
        message: 'Tres plugins passen en paral·lel per la càrrega, l’avaluació, la inicialització, el renderitzat i l’alliberament. Un falla a la inicialització i els altres continuen.',
      })}>
        <span />
        {PHASES.map((phase, i) => (
          <span key={phase.id} className={clsx(styles.phase, ROWS.some((row) => row.phases[step] === i) && styles.phaseActive)}>
            {phase.label()}
            <code>{phase.code}</code>
          </span>
        ))}

        {ROWS.map((row) => {
          const phase = row.phases[step];
          const failed = phase === FAILED;
          const reached = failed ? 2 : phase;
          return (
            <React.Fragment key={row.name}>
              <span className={clsx(styles.plugin, failed && styles.pluginFailed)} style={{ '--c': row.color } as React.CSSProperties}>
                <img src={row.logo} alt="" width={16} height={16} />
                {row.name}
              </span>
              {PHASES.map((p, i) => (
                <span
                  key={p.id}
                  className={clsx(
                    styles.cell,
                    i < reached && styles.cellDone,
                    i === phase && styles.cellCurrent,
                    failed && i === 2 && styles.cellFailed,
                    failed && i > 2 && styles.cellSkipped,
                  )}
                  style={{ '--c': row.color } as React.CSSProperties}
                >
                  {failed && i === 2 && <span className={styles.cross} aria-hidden="true">✕</span>}
                  {i === phase && i === 3 && (
                    <span className={styles.note}>
                      <Translate id="diagram.lifecycle.active">vistes a les regions</Translate>
                    </span>
                  )}
                </span>
              ))}
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.console} aria-live="off">
        {LOG.filter((line) => line.at <= step).map((line) => (
          <div key={line.text} className={clsx(styles.line, line.error && styles.lineError, line.comment && styles.lineComment)}>
            {line.text}
          </div>
        ))}
        {step >= 3 && step < 7 && (
          <div className={clsx(styles.line, styles.lineComment)}>
            <Translate id="diagram.lifecycle.isolated">{'// insights ha fallat i queda aïllat: orders i alerts continuen'}</Translate>
          </div>
        )}
      </div>
    </figure>
  );
};
