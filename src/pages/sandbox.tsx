import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { Sandbox } from '../components/Sandbox';
import styles from './sandbox.module.css';

export default function SandboxPage(): JSX.Element {
  return (
    <Layout
      title={translate({ id: 'sandbox.page.title', message: 'Sandbox' })}
      description={translate({
        id: 'sandbox.page.description',
        message: 'Prova un plugin de Harmonix amb React, Lit o Angular al navegador, sense instal·lar res.',
      })}
    >
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>
            <Translate id="sandbox.page.heading">Prova un plugin al navegador</Translate>
          </h1>
          <p>
            <Translate id="sandbox.page.intro">
              El mateix projecte que crea npm create @uxland/harmonix-plugin, sense instal·lar res. Quan el vulguis al teu equip, segueix la guia per crear-lo.
            </Translate>{' '}
            <Link to="/docs/create-plugin/create-a-plugin">
              <Translate id="sandbox.page.guide">Crear un plugin</Translate>
            </Link>
          </p>
        </header>
        <Sandbox />
      </main>
    </Layout>
  );
}
