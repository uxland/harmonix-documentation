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
    title: 'Optimització',
    Svg: require('@site/static/img/optimization.svg').default,
    description: (
      <>
        Visió completa i optimització de l'entorn de treball.
      </>
    ),
  },
  {
    title: 'Rendiment',
    Svg: require('@site/static/img/performance.svg').default,
    description: (
      <>
        Alt rendiment que potencia l'eficiència i facilita una experiència de treball fluida.
      </>
    ),
  },
  {
    title: 'Versatilitat',
    Svg: require('@site/static/img/versatility.svg').default,
    description: (
      <>
        Plataforma versàtil que ofereix una solució adaptable als professionals.
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
