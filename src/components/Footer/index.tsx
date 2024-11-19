import React from 'react';
import styles from './styles.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.colorful}>LINKEDIN</p>
      <p>REDDIT</p>
      <p>FACEBOOK</p>
      <p>TWITTER</p>
      <p>PRIVACY & POLICY</p>
      <p>COOKIES POLICY</p>
      <p className={styles.colorful}>
        MADE BY{' '}
        <a 
          href="https://www.uxland.es" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          UXLAND
        </a>
      </p>
    </footer>
  );
};
