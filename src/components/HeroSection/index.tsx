import React from 'react';
import styles from './styles.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div>
        <h1>The Ultimate Multi-Team Micro Frontend Framework</h1>
        <p>Build faster and smarter with Harmonix.</p>
        <button>Get Started</button>
        <button>Learn More</button>
      </div>
    </section>
  );
};
