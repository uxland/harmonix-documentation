import React from 'react';
import styles from './styles.module.css';

export const Features: React.FC = () => {
  return (
    <div className={styles.features}>
      <div className={styles.title}>
        <img src="img/vector.svg" alt="vector" className={styles.vectorTitle} />
        <div className={styles.titleText}>Característiques i beneficis</div>
        <img src="img/vector.svg" alt="vector" className={styles.vectorTitle} />
      </div>
      <div className={styles.benefit}>
        <div>
          <img src="img/icon1.png" alt="benefit1" className={styles.benefitImage} />
        </div>
        <div>
          <div>BENEFICI 1 <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} /></div>
          <div>Equips autònoms i independents</div>
          <div>Equips independents poden desenvolupar i desplegar els seus frontals <br></br>de manera autònoma amb qualsevol tecnologia. 
            Elimina les barreres en el teu <br></br>desenvolupament i fes créixer la teva aplicació sense límits, obrint la porta a projectes amb múltiples proveïdors.</div>
        </div>
      </div>
      <div className={styles.benefit}>
        <div>
          <div>BENEFICI 2 <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} /></div>
          <div>Experiència d'usuari unificada</div>
          <div>Mitjançant la reutilització de components i la distribució de temes, Harmonix <br></br>permet als equips crear una experiència d'usuari unificada i fluida,<br></br> 
            assegurant una integració sense fissures a través de totes les parts de l'aplicació.</div>
        </div>
        <div>
          <img src="img/icon2.png" alt="benefit2" className={styles.benefitImage} />
        </div>
      </div>
      <div className={styles.benefit}>
        <div>
          <img src="img/icon3.png" alt="benefit3" className={styles.benefitImage} />
        </div>
        <div>
          <div>BENEFICI 3 <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} /></div>
          <div>Rendiment, escalabilitat i extensibilitat</div>
          <div>Harmonix utilitza una arquitectura modular de plugins que facilita l'escalabilitat horitzontal i l'extensió amb funcionalitats pròpies i de tercers. </div>
        </div>
      </div>
      <div className={styles.benefit}>
        <div>
          <div>BENEFICI 4 <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} /></div>
          <div>Agnòstic a la tecnologia</div>
          <div>Les tecnologies canvien ràpidament i mai sabem si la tecnologia triada avui quedarà obsoleta demà. Harmonix és agnòstic a la tecnologia, <br></br>
          permetent adaptar-te a noves tendències amb rapidesa i evitant el "lock-in" tecnològic.</div>
        </div>
        <div>
          <img src="img/icon4.png" alt="benefit4" className={styles.benefitImage} />
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};
