import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { useLoop } from './useLoop';
import styles from './packages.module.css';

/**
 * The Harmonix packages along a plugin's life: create, develop, publish and run, all on top of
 * the core. The highlight walks through the stages; each card links to its package page.
 */
const STAGES = [
  {
    title: () => translate({ id: 'diagram.packages.create', message: 'Crear' }),
    caption: () => translate({ id: 'diagram.packages.create.caption', message: 'npm create genera el projecte, amb el framework que triïs.' }),
    pkg: { name: 'create-harmonix-plugin', page: 'create-harmonix-plugin', command: 'npm create @uxland/harmonix-plugin' },
  },
  {
    title: () => translate({ id: 'diagram.packages.develop', message: 'Desenvolupar' }),
    caption: () => translate({ id: 'diagram.packages.develop.caption', message: 'npm run dev arrenca el plugin dins del shell de demostració.' }),
    pkg: { name: 'harmonix-demo-shell', page: 'demo-shell', command: 'npm run dev' },
  },
  {
    title: () => translate({ id: 'diagram.packages.publish', message: 'Publicar' }),
    caption: () => translate({ id: 'diagram.packages.publish.caption', message: 'harmonix publish puja el bundle al Plugin Store.' }),
    pkg: { name: 'harmonix-cli', page: 'cli', command: 'harmonix publish' },
  },
  {
    title: () => translate({ id: 'diagram.packages.run', message: 'Executar' }),
    caption: () => translate({ id: 'diagram.packages.run.caption', message: "Les vistes de React es converteixen en Web Components dins de l'aplicació." }),
    pkg: { name: 'harmonix-adapters', page: 'adapters', command: 'wrapReactViewFactory()' },
  },
];

export const PackagesMap = () => {
  const { ref, step } = useLoop<HTMLDivElement>([2200, 2200, 2200, 2200, 2800]);
  const all = step === STAGES.length;
  const lit = (i: number) => all || step === i;

  return (
    <figure className={styles.diagram} ref={ref}>
      <ol className={styles.stages}>
        {STAGES.map((stage, i) => (
          <li key={stage.pkg.name} className={clsx(styles.stage, lit(i) && styles.stageLit)}>
            <span className={styles.stageTitle}>{stage.title()}</span>
            <Link to={`/docs/packages/${stage.pkg.page}`} className={styles.card}>
              <span className={styles.scope}>@uxland/</span>
              <strong>{stage.pkg.name}</strong>
              <code>{stage.pkg.command}</code>
            </Link>
          </li>
        ))}
      </ol>

      <Link to="/docs/packages/harmonix" className={clsx(styles.core, all && styles.coreLit)}>
        <span className={styles.scope}>@uxland/</span>
        <strong>harmonix</strong>
        <span className={styles.coreText}>
          <Translate id="diagram.packages.core">
            El nucli: el contracte dels plugins, bootstrapPlugins i les regions. Tota aplicació s'hi basa.
          </Translate>
        </span>
      </Link>

      <figcaption className={styles.caption} aria-live="off">
        {all ? (
          <Translate id="diagram.packages.all">Cada paquet té el seu moment, i tots s'assenten sobre el nucli.</Translate>
        ) : (
          STAGES[step]?.caption()
        )}
      </figcaption>
    </figure>
  );
};
