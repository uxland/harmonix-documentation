import React from 'react';
import styles from './styles.module.css';

export const TechStack: React.FC = () => {
  return (
    <section className={styles.techStack}>
      <div className={styles.title}>Tecnologies suportades</div>
      <div className={styles.iconsWrapper}>
        <img src="/img/logo-angular.svg" alt="Angular" className={styles.icons} />
        <img src="/img/logo-react.svg" alt="React" className={styles.icons}/>
        <img src="/img/logo-lit.svg" alt="Lit" className={styles.icons}/>
        <img src="/img/jsIcon.svg" alt="Javascript" className={styles.icons}/>
        <img src="/img/tsIcon.svg" alt="Typescript" className={styles.icons}/>
      </div>
      <div className={styles.line}></div>
    </section>
  );
};
