import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroWrapper}>
          <h1 className={styles.title}>Harmonix</h1>
          <div className={styles.description}>
            <div className={styles.header}>The Ultimate<br></br>Multi-Team Micro Frontend Framework</div>
            <div className={styles.buttons}>
              <Link
                className={styles.getStartedButton}
                to="/docs/concepts/introduccio">
                GET STARTED
              </Link>
              <button className={styles.playgroundButton}>PLAYGROUND</button>
            </div>
          </div>
        </div>
        <div className={styles.arrow}></div>
        <div className={styles.codeContainer}>
          <div className={styles.textCode}>
            <span className={styles.codeTitle}>Building Faster, <br></br>Smarter, Together.</span>
            <span className={styles.codeText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</span>
          </div>
          <div>
            <img src="img/harmonixCode.svg" alt="Hero" className={styles.heroImage} />
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    </section>
  );
};
