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
          <img src="/img/discord-logo.png" alt="Discord" className={styles.icons} />
          <div className={styles.discordText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <a className={styles.discordButton} href="https://discord.gg/EaB97Ahy" target="_blank" 
            rel="noopener noreferrer">UNEIX-TE JA
          </a>
        </div>
      </div>
      <div className={styles.line}></div>
    </section>
  );
};
