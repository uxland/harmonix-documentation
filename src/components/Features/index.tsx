import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export const Features: React.FC = () => {
  return (
    <div className={styles.features}>
      <div className={styles.title}>
        <img src="img/vector.svg" alt="vector" className={styles.vectorTitle} />
        <div className={styles.titleText}>
          <Translate id="features.title" description="Features section title">
            Característiques i beneficis
          </Translate>
        </div>
        <img src="img/vector.svg" alt="vector" className={styles.vectorTitle} />
      </div>
      <div className={styles.benefitAscending}>
        <div>
          <img src="img/icon1.png" alt="benefit1" className={styles.benefitImage} />
        </div>
        <div className={styles.benefitContent}>
          <div className={styles.benefitTitle}>
            <Translate id="features.benefit1.label" description="Benefit 1 label">
              BENEFICI 1
            </Translate>{' '}
            <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} />
          </div>
          <div className={styles.benefitSubTitle}>
            <Translate id="features.benefit1.title" description="Benefit 1 title">
              Equips autònoms i independents
            </Translate>
          </div>
          <div className={styles.benefitDescription}>
            <Translate id="features.benefit1.description" description="Benefit 1 description">
              Equips independents poden desenvolupar i desplegar els seus frontals de manera autònoma amb qualsevol tecnologia. Elimina les barreres en el teu desenvolupament i fes créixer la teva aplicació sense límits, obrint la porta a projectes amb múltiples proveïdors.
            </Translate>
          </div>
        </div>
      </div>
      <div className={styles.benefitDescending}>
        <div className={styles.benefitContent}>
          <div className={styles.benefitTitle}>
            <Translate id="features.benefit2.label" description="Benefit 2 label">
              BENEFICI 2
            </Translate>{' '}
            <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} />
          </div>
          <div className={styles.benefitSubTitle}>
            <Translate id="features.benefit2.title" description="Benefit 2 title">
              Experiència d'usuari unificada
            </Translate>
          </div>
          <div className={styles.benefitDescription}>
            <Translate id="features.benefit2.description" description="Benefit 2 description">
              Mitjançant la reutilització de components i la distribució de temes, Harmonix permet als equips crear una experiència d'usuari unificada i fluida, assegurant una integració sense fissures a través de totes les parts de l'aplicació.
            </Translate>
          </div>
        </div>
        <div>
          <img src="img/icon2.png" alt="benefit2" className={styles.benefitImage} />
        </div>
      </div>
      <div className={styles.benefitAscending}>
        <div>
          <img src="img/icon3.png" alt="benefit3" className={styles.benefitImage} />
        </div>
        <div className={styles.benefitContent}>
          <div className={styles.benefitTitle}>
            <Translate id="features.benefit3.label" description="Benefit 3 label">
              BENEFICI 3
            </Translate>{' '}
            <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} />
          </div>
          <div className={styles.benefitSubTitle}>
            <Translate id="features.benefit3.title" description="Benefit 3 title">
              Rendiment, escalabilitat i extensibilitat
            </Translate>
          </div>
          <div className={styles.benefitDescription}>
            <Translate id="features.benefit3.description" description="Benefit 3 description">
              Harmonix utilitza una arquitectura modular de plugins que facilita l'escalabilitat horitzontal i l'extensió amb funcionalitats pròpies i de tercers.
            </Translate>
          </div>
        </div>
      </div>
      <div className={styles.benefitDescending}>
        <div className={styles.benefitContent}>
          <div className={styles.benefitTitle}>
            <Translate id="features.benefit4.label" description="Benefit 4 label">
              BENEFICI 4
            </Translate>{' '}
            <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} />
          </div>
          <div className={styles.benefitSubTitle}>
            <Translate id="features.benefit4.title" description="Benefit 4 title">
              Agnòstic a la tecnologia
            </Translate>
          </div>
          <div className={styles.benefitDescription}>
            <Translate id="features.benefit4.description" description="Benefit 4 description">
              Les tecnologies canvien ràpidament i mai sabem si la tecnologia triada avui quedarà obsoleta demà. Harmonix és agnòstic a la tecnologia, permetent adaptar-te a noves tendències amb rapidesa i evitant el "lock-in" tecnològic.
            </Translate>
          </div>
        </div>
        <div>
          <img src="img/icon4.png" alt="benefit4" className={styles.benefitImage} />
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};
