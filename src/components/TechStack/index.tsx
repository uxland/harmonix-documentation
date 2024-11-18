import React from 'react';
import styles from './styles.module.css';

export const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className={styles.techStack}>
      <h2>Technologies</h2>
      <div>
        <img src="/path-to/angular-icon.svg" alt="Angular" />
        <img src="/path-to/react-icon.svg" alt="React" />
        <img src="/path-to/lit-icon.svg" alt="Lit" />
      </div>
    </section>
  );
};
