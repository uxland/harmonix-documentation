import React from 'react';
import styles from './styles.module.css';

export const Community: React.FC = () => {
  return (
    <section className={styles.community}>
      <div className={styles.title}>Uneix-te ja a la nostre comunitat</div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Al nostre Discord trobaràs tota la informació per a formar part de la nostra família
        </div>
        <div className={styles.discordSection}>
          <img src="/img/discord-logo.svg" alt="Discord" className={styles.icons} />
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <button className={styles.discordButton}>UNEIX-TE JA</button>
        </div>
      </div>
      <div className={styles.line}></div>
    </section>
  );
};