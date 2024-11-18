import React from 'react';
import styles from './styles.module.css';

export const Features: React.FC = () => {
  return (
    <section id="features" className={styles.features}>
      <h2>Característiques i beneficis</h2>
      <ul>
        <li>Framework for all</li>
        <li>Speed & scalability</li>
        <li>Technology agnostic</li>
      </ul>
    </section>
  );
};
