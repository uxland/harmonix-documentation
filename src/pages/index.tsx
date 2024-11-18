import React from 'react';
import Layout from '@theme/Layout';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { Features } from '../components/Features';
import { TechStack } from '../components/TechStack';
import { Footer } from '../components/Footer';


export default function Home(): JSX.Element {
  return (
    <Layout
      title="Harmonix Framework"
      description="Harmonix és un framework basat en un sistema de plugins modular">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <TechStack />
      </main>
      <Footer />
    </Layout>
  );
}
