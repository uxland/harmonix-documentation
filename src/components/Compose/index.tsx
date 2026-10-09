import React from 'react';
import Translate from '@docusaurus/Translate';
import { Playground } from '../Composition/Playground';
import styles from './styles.module.css';

/** "Compose your application": the text of the old hero and the interactive playground. */
export const Compose: React.FC = () => (
  <section className={styles.section}>
    <div className={styles.intro}>
      <h2 className={styles.title}>
        <Translate id="hero.subtitle.line1" description="Hero section subtitle line 1">
          Building Faster,
        </Translate>{' '}
        <Translate id="hero.subtitle.line2" description="Hero section subtitle line 2">
          Smarter, Together.
        </Translate>
      </h2>
      <p className={styles.text}>
        <Translate id="compose.description">
          Cada plugin és independent: el fa un equip, amb el framework que vulgui, i es publica pel seu compte. L'aplicació només decideix quins carrega. Prova-ho: activa i desactiva plugins, canvia de vista al menú o crea una comanda.
        </Translate>
      </p>
    </div>
    <Playground />
    <div className={styles.line}></div>
  </section>
);
