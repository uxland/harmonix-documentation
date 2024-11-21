import React from 'react';
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
            DISCORD
          </a></p>
        <p className={styles.colorful}>
          MADE BY{' '}
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
