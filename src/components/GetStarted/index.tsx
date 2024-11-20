import React from 'react';
import styles from './styles.module.css';

export const GetStarted: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Democratitza i distribueix el desenvolupament de la teva aplicació
        </div>
        <div className={styles.getStartedSection}>
          <div className={styles.getStartedText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <button className={styles.getStartedButton}>GET STARTED</button>
        </div>
      </div>
    </section>
  );
};
