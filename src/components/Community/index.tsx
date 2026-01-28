import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export const Community: React.FC = () => {
  return (
    <section className={styles.community}>
      <div className={styles.title}>
        <Translate id="community.title" description="Community section title">
          Uneix-te ja a la nostre comunitat
        </Translate>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <Translate id="community.subtitle" description="Community section subtitle">
            Uneix-te a la nostra comunitat i ajuda'ns a fer créixer Harmonix!
          </Translate>
        </div>
        <div className={styles.discordSection}>
          <img src="/img/discord-logo.png" alt="Discord" className={styles.icons} />
          <div className={styles.discordText}>
            <Translate id="community.discord.description" description="Discord community description">
              Vols formar part del creixement d'Harmonix? Uneix-te al nostre servidor de Discord i col·labora amb altres desenvolupadors per fer créixer aquest framework junts. Comparteix idees, resol dubtes i contribueix al futur d'Harmonix en un espai obert i dinàmic. T'esperem!
            </Translate>
          </div>
          <a className={styles.discordButton} href="https://discord.gg/EaB97Ahy" target="_blank"
            rel="noopener noreferrer">
            <Translate id="community.discord.button" description="Discord join button text">
              UNEIX-TE JA
            </Translate>
          </a>
        </div>
      </div>
      <div className={styles.line}></div>
    </section>
  );
};
