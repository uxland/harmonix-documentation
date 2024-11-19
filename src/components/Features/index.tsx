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
          <div>Tots per 1 framework i 1 framework per tots</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        </div>
      </div>
      <div className={styles.benefit}>
        <div>
          <div>BENEFICI 2 <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} /></div>
          <div>Tots per 1 framework i 1 framework per tots</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
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
          <div>Tots per 1 framework i 1 framework per tots</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        </div>
      </div>
      <div className={styles.benefit}>
        <div>
          <div>BENEFICI 4 <img src="img/vector.svg" alt="vector" className={styles.vectorBenefit} /></div>
          <div>Tots per 1 framework i 1 framework per tots</div>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        </div>
        <div>
          <img src="img/icon4.png" alt="benefit4" className={styles.benefitImage} />
        </div>
      </div>
    </div>
  );
};
