import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import { HeroStage } from '../Composition/HeroStage';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroWrapper}>
          <h1 className={styles.title}>Harmonix</h1>
          <div className={styles.description}>
            <div className={styles.header}>
              <Translate id="hero.tagline" description="Hero section tagline">
                The Ultimate Multi-Team Micro Frontend Framework
              </Translate>
            </div>
            <div className={styles.buttons}>
              <Link
                className={styles.getStartedButton}
                to="/docs/concepts/introduccio">
                <Translate id="hero.getStarted" description="Get started button in hero">
                  GET STARTED
                </Translate>
              </Link>
              <Link
                className={styles.playgroundButton}
                to="/docs/create-plugin/create-a-plugin">
                <Translate id="hero.createPlugin" description="Create a plugin button in hero">
                  CREATE A PLUGIN
                </Translate>
              </Link>
            </div>
          </div>
        </div>
        <HeroStage />
        <div className={styles.line}></div>
      </div>
    </section>
  );
};
