import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export const GetStarted: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Democratitza i distribueix el desenvolupament de la teva aplicació
        </div>
        <div className={styles.getStartedSection}>
          <div className={styles.getStartedText}>Elimina les barreres del teu desenvolupament i fes créixer la teva aplicació sense límits. 
            Amb Harmonix, pots distribuir el treball de manera eficient entre equips independents, escalant i adaptant-te a noves necessitats de manera ràpida. 
            Comença ara i allibera tot el potencial dels teus equips i aplicació.</div>
          <Link
            className={styles.getStartedButton}
            to="/docs/concepts/introduccio">
            GET STARTED
          </Link>
        </div>
      </div>
    </section>
  );
};
