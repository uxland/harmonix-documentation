import React from 'react';
import styles from './styles.module.css';

export const Community: React.FC = () => {
  return (
    <section className={styles.community}>
      <div className={styles.title}>Uneix-te ja a la nostre comunitat</div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Uneix-te a la nostra comunitat i ajuda'ns a fer créixer Harmonix!
        </div>
        <div className={styles.discordSection}>
          <img src="/img/discord-logo.png" alt="Discord" className={styles.icons} />
          <div className={styles.discordText}>Vols formar part del creixement d'Harmonix? Uneix-te al nostre 
            servidor de Discord i col·labora amb altres desenvolupadors per fer créixer aquest framework junts. 
            Comparteix idees, resol dubtes i contribueix al futur d'Harmonix en un espai obert i dinàmic. T'esperem!</div>
          <a className={styles.discordButton} href="https://discord.gg/EaB97Ahy" target="_blank" 
            rel="noopener noreferrer">UNEIX-TE JA
          </a>
        </div>
      </div>
      <div className={styles.line}></div>
    </section>
  );
};
