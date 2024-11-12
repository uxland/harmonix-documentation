import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Integració modular de plugins',
    Svg: require('@site/static/img/optimization.svg').default,
    description: (
      <>
        Permet integrar fàcilment plugins a través d’un sistema de regions, mantenint cada plugin independent però visualment cohesiu.
      </>
    ),
  },
  {
    title: 'Rendiment òptim amb càrrega diferida',
    Svg: require('@site/static/img/performance.svg').default,
    description: (
      <>
        Carrega els plugins segons la regió, optimitzant la velocitat i millorant l’experiència de l’usuari.
      </>
    ),
  },
  {
    title: 'Escalabilitat i manteniment simplificat',
    Svg: require('@site/static/img/versatility.svg').default,
    description: (
      <>
        Facilita l’escalabilitat i les actualitzacions de cada plugin sense impactar la resta, millorant la capacitat de manteniment.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
