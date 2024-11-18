import React from 'react';
import styles from './styles.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Harmonix</h1>
        <nav>
          <a href="#features">Features</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#community">Community</a>
        </nav>
      </div>
    </header>
  );
};
