import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import { useLoop } from './useLoop';
import styles from './workflow.module.css';

/**
 * The development workflow: the application team builds the shell while plugin teams develop
 * their plugins on their own, publish them to the Plugin Store, and the running application
 * composes everything.
 */
type Stage = 0 | 1 | 2 | 3;

const PLUGINS = [
  { name: 'orders', color: '#61dafb', logo: '/img/logo-react.svg', region: 'main', stages: [1, 1, 2, 2, 3] },
  { name: 'alerts', color: '#8093ff', logo: '/img/logo-lit.svg', region: 'header', stages: [1, 1, 1, 2, 3] },
  { name: 'insights', color: '#ff5c7a', logo: '/img/logo-angular.svg', region: 'menu', stages: [1, 1, 1, 2, 3] },
];
/** Where the shell is at each step: being built, then ready in the application. */
const SHELL = [0, 3, 3, 3, 3];
const VERSIONS: Record<string, string> = { orders: '1.5.0', alerts: '0.9.3', insights: '2.1.0' };

const STAGES = [
  {
    title: () => translate({ id: 'diagram.workflow.shell', message: 'Construir el shell' }),
    who: () => translate({ id: 'diagram.workflow.shell.who', message: "Equip de l'aplicació" }),
    code: ['@uxland/harmonix'],
  },
  {
    title: () => translate({ id: 'diagram.workflow.develop', message: 'Desenvolupar els plugins' }),
    who: () => translate({ id: 'diagram.workflow.develop.who', message: 'Equips de plugins' }),
    code: ['npm create @uxland/harmonix-plugin', 'npm run dev'],
  },
  {
    title: () => translate({ id: 'diagram.workflow.publish', message: 'Publicar' }),
    who: () => 'Plugin Store',
    code: ['npm run build', 'harmonix publish'],
  },
  {
    title: () => translate({ id: 'diagram.workflow.run', message: 'Executar' }),
    who: () => translate({ id: 'diagram.workflow.run.who', message: 'Al navegador' }),
    code: ['bootstrapPlugins()'],
  },
];

const Chip = ({ plugin, version }: { plugin: (typeof PLUGINS)[number]; version?: string }) => (
  <span className={styles.chip} style={{ '--c': plugin.color } as React.CSSProperties}>
    <img src={plugin.logo} alt="" width={14} height={14} />
    {plugin.name}
    {version && <span className={styles.version}>v{version}</span>}
  </span>
);

export const Workflow = () => {
  const { ref, step } = useLoop<HTMLDivElement>([1800, 1500, 1300, 1300, 3200]);
  const at = (stage: Stage) => PLUGINS.filter((plugin) => plugin.stages[step] === stage);
  const running = at(3);
  const shellReady = SHELL[step] === 3;
  const fill = (region: string) => running.find((plugin) => plugin.region === region)?.color;

  return (
    <figure
      className={styles.diagram}
      ref={ref}
      aria-label={translate({
        id: 'diagram.workflow.aria',
        message: "L'equip de l'aplicació construeix el shell; els equips de plugins els desenvolupen, els publiquen al Plugin Store i l'aplicació els carrega en executar-se.",
      })}
    >
      <ol className={styles.stages}>
        {STAGES.map((stage, i) => {
          const active = (i === 0 && SHELL[step] === 0) || at(i as Stage).length > 0 || (i === 3 && shellReady);
          return (
            <li key={i} className={clsx(styles.stage, active && styles.stageActive)}>
              <span className={styles.who}>{stage.who()}</span>
              <strong className={styles.title}>{stage.title()}</strong>
              <span className={styles.code}>
                {stage.code.map((line) => (
                  <code key={line}>{line}</code>
                ))}
              </span>

              <div className={styles.body}>
                {i === 0 && SHELL[step] === 0 && (
                  <div className={clsx(styles.window, styles.building)} key="building">
                    <i className={styles.wHeader} />
                    <i className={styles.wMenu} />
                    <i className={styles.wMain} />
                  </div>
                )}
                {i === 0 && SHELL[step] !== 0 && (
                  <span className={styles.done}>
                    <Translate id="diagram.workflow.shell.done">Shell a punt</Translate>
                  </span>
                )}
                {i === 1 && at(1).map((plugin) => <Chip key={`${plugin.name}-1`} plugin={plugin} />)}
                {i === 2 && at(2).map((plugin) => <Chip key={`${plugin.name}-2`} plugin={plugin} version={VERSIONS[plugin.name]} />)}
                {i === 3 && shellReady && (
                  <div className={clsx(styles.window, styles.app)} key="app">
                    <i className={styles.wHeader} style={{ '--c': fill('header') } as React.CSSProperties} data-filled={!!fill('header')} />
                    <i className={styles.wMenu} style={{ '--c': fill('menu') } as React.CSSProperties} data-filled={!!fill('menu')} />
                    <i className={styles.wMain} style={{ '--c': fill('main') } as React.CSSProperties} data-filled={!!fill('main')} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
};
