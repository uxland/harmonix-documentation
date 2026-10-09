import { useMemo } from 'react';
import { translate } from '@docusaurus/Translate';

/**
 * The example plugins of the home page. They are not real: they show what a Harmonix application
 * is made of, plugins written by different teams, with different frameworks, composed by one shell.
 */
export type Framework = 'react' | 'lit' | 'angular';
export type Region = 'header' | 'menu' | 'main';

export interface ExamplePlugin {
  id: string;
  name: string;
  team: string;
  framework: Framework;
  /** The regions where the plugin registers views. A `main` view always comes with a menu item. */
  regions: Region[];
}

export const FRAMEWORKS: Record<Framework, { label: string; logo: string; color: string }> = {
  react: { label: 'React', logo: '/img/logo-react.svg', color: '#61dafb' },
  lit: { label: 'Lit', logo: '/img/logo-lit.svg', color: '#8093ff' },
  angular: { label: 'Angular', logo: '/img/logo-angular.svg', color: '#ff5c7a' },
};

export const usePlugins = (): Record<string, ExamplePlugin> => useMemo(() => ({
  orders: {
    id: 'orders',
    name: translate({ id: 'composition.plugin.orders', message: 'Comandes' }),
    team: translate({ id: 'composition.team.sales', message: 'Equip de vendes' }),
    framework: 'react',
    regions: ['menu', 'main'],
  },
  insights: {
    id: 'insights',
    name: translate({ id: 'composition.plugin.insights', message: 'Indicadors' }),
    team: translate({ id: 'composition.team.data', message: 'Equip de dades' }),
    framework: 'angular',
    regions: ['menu', 'main'],
  },
  alerts: {
    id: 'alerts',
    name: translate({ id: 'composition.plugin.alerts', message: 'Avisos' }),
    team: translate({ id: 'composition.team.platform', message: 'Equip de plataforma' }),
    framework: 'lit',
    regions: ['header'],
  },
  profile: {
    id: 'profile',
    name: translate({ id: 'composition.plugin.profile', message: 'Perfil' }),
    team: translate({ id: 'composition.team.platform', message: 'Equip de plataforma' }),
    framework: 'lit',
    regions: ['header'],
  },
  help: {
    id: 'help',
    name: translate({ id: 'composition.plugin.help', message: 'Ajuda' }),
    team: translate({ id: 'composition.team.support', message: 'Equip de suport' }),
    framework: 'react',
    regions: ['menu', 'main'],
  },
}), []);
