import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import AngularIcon from '@site/static/img/logo-angular.svg';
import LitIcon from '@site/static/img/logo-lit.svg';
import ReactIcon from '@site/static/img/logo-react.svg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--secondary button--lg', styles.buttonWithIcon)}
            to="https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo">
            Angular
            <AngularIcon className={styles.icon} />
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.buttonWithIcon)}
            to="https://stackblitz.com/~/github.com/uxland/harmonix-lit-plugin-demo">
            Lit
            <LitIcon className={styles.icon} />
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.buttonWithIcon)}
            to="https://stackblitz.com/~/github.com/uxland/harmonix-react-plugin-demo">
            React
            <ReactIcon className={styles.icon} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
