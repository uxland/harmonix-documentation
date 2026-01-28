import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export const GetStarted: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <Translate id="getStarted.title" description="Get started section title">
            Democratitza i distribueix el desenvolupament de la teva aplicació
          </Translate>
        </div>
        <div className={styles.getStartedSection}>
          <div className={styles.getStartedText}>
            <Translate id="getStarted.description" description="Get started section description">
              Elimina les barreres del teu desenvolupament i fes créixer la teva aplicació sense límits. Amb Harmonix, pots distribuir el treball de manera eficient entre equips independents, escalant i adaptant-te a noves necessitats de manera ràpida. Comença ara i allibera tot el potencial dels teus equips i aplicació.
            </Translate>
          </div>
          <Link
            className={styles.getStartedButton}
            to="/docs/concepts/introduccio">
            <Translate id="getStarted.button" description="Get started button text">
              GET STARTED
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
};
