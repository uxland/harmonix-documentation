import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export const Footer: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}></div>
      <div className={styles.footer}>
        <p><a
            href="https://discord.gg/EaB97Ahy"
            target="_blank"
            className={styles.link}
          >
            <Translate id="footer.discord" description="Footer Discord link text">
              DISCORD
            </Translate>
          </a></p>
        <p className={styles.colorful}>
          <Translate id="footer.madeBy" description="Footer made by text">
            MADE BY
          </Translate>{' '}
          <a
            href="https://www.uxland.es"
            target="_blank"
            className={styles.link}
          >
            UXLAND
          </a>
        </p>
      </div>
    </div>
  );
};
