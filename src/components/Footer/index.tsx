import React from 'react';
import styles from './styles.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Made with ♥ by Harmonix Team | © {new Date().getFullYear()}</p>
    </footer>
  );
};
