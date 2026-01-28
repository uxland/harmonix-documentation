import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

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
                to="https://stackblitz.com/~/github.com/uxland/harmonix-react-plugin-demo">
                <Translate id="hero.playground" description="Playground button in hero">
                  PLAYGROUND
                </Translate>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.arrow}></div>
        <div className={styles.codeContainer}>
          <div className={styles.textCode}>
            <span className={styles.codeTitle}>
              <Translate id="hero.subtitle.line1" description="Hero section subtitle line 1">
                Building Faster,
              </Translate>
              <br/>
              <Translate id="hero.subtitle.line2" description="Hero section subtitle line 2">
                Smarter, Together.
              </Translate>
            </span>
            <span className={styles.codeText}>
              <Translate id="hero.description" description="Hero section description">
                Harmonix és un framework JavaScript de microfrontends creat per facilitar i optimitzar el desenvolupament d'SPAs avançades. Facilita la feina d'equips independents, permetent-los treballar de manera eficient, escalable i autònoma en aplicacions complexes.
              </Translate>
            </span>
          </div>
          <div className={styles.codeImage}>
            <img src="img/harmonixCode.png" alt="Hero" className={styles.heroImage} />
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    </section>
  );
};
