import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** Used when npm cannot be reached at build time. */
const FALLBACK_VERSION = '1.1.6';

/** The version of the framework (`@uxland/harmonix`) published on npm, read at build time. */
const harmonixVersion = async (): Promise<string> => {
  try {
    const response = await fetch('https://registry.npmjs.org/@uxland%2fharmonix/latest', {
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) return (await response.json()).version;
  } catch {
    // Offline build: keep the fallback.
  }
  return FALLBACK_VERSION;
};

export default async function createConfig(): Promise<Config> {
  const version = await harmonixVersion();
  const config: Config = {
    title: 'Harmonix',
    tagline: 'Efficient by design',
    favicon: 'img/harmonixLogo.ico',

    // Set the production url of your site here
    url: 'https://harmonixframework.dev/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'es', 'ca'],
      localeConfigs: {
        en: {
          label: 'English',
          direction: 'ltr',
          htmlLang: 'en-US',
        },
        es: {
          label: 'Español',
          direction: 'ltr',
          htmlLang: 'es-ES',
        },
        ca: {
          label: 'Català',
          direction: 'ltr',
          htmlLang: 'ca-ES',
        },
      },
    },

    presets: [
      [
        'classic',
        {
          gtag: {
            trackingID: 'G-GQ5MGFWTVX',
            anonymizeIP: true,
          },
          docs: {
            sidebarPath: './sidebars.ts',
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            // editUrl:
            //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          },
          blog: {
            showReadingTime: true,
            feedOptions: {
              type: ['rss', 'atom'],
              xslt: true,
            },
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
            // Useful options to enforce blogging best practices
            onInlineTags: 'warn',
            onInlineAuthors: 'warn',
            onUntruncatedBlogPosts: 'warn',
          },
          theme: {
            customCss: './src/css/custom.css',
          },
        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      // Replace with your project's social card
      image: 'img/harmonixLogo.svg',
      navbar: {
        title: 'Harmonix',
        logo: {
          alt: 'Harmonix Logo',
          src: 'img/harmonixLogoNew.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'conceptsSidebar',
            position: 'left',
            label: 'Conceptes',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API',
          },
          {
            type: 'docSidebar',
            sidebarId: 'createPluginSidebar',
            position: 'left',
            label: 'Getting started',
          },
          {
            type: 'docSidebar',
            sidebarId: 'packagesSidebar',
            position: 'left',
            label: 'Packages',
          },
          {
            to: '/sandbox',
            position: 'left',
            label: 'Sandbox',
          },
          {
            type: 'docSidebar',
            sidebarId: 'bestPracticesSidebar',
            position: 'left',
            label: 'Best practices',
          },
          {
            type: 'docSidebar',
            sidebarId: 'faqSidebar',
            position: 'left',
            label: 'FAQ',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'html',
            position: 'right',
            value: `<a class="navbar__item navbar__link" href="https://www.npmjs.com/package/@uxland/harmonix" target="_blank" rel="noopener noreferrer" title="@uxland/harmonix on npm">v${version}</a>`,
          },
          // {
          //   href: 'https://github.com/uxland/harmonix-documentation',
          //   label: 'GitHub',
          //   position: 'right', 0,375rem
          // },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   // links: [
      //   //   {
      //   //     title: 'Docs',
      //   //     items: [
      //   //       {
      //   //         label: 'Tutorial',
      //   //         to: '/docs/category/característiques',
      //   //       },
      //   //     ],
      //   //   },
      //   //   {
      //   //     title: 'Community',
      //   //     items: [
      //   //       {
      //   //         label: 'Uxland',
      //   //         href: 'https://www.uxland.es/',
      //   //       },
      //   //     ],
      //   //   },
      //   //   {
      //   //     title: 'More',
      //   //     items: [
      //   //       {
      //   //         label: 'GitHub',
      //   //         href: 'https://github.com/uxland/harmonix-documentation',
      //   //       },
      //   //       {
      //   //         label: 'Blog',
      //   //         to: '/blog',
      //   //       },
      //   //     ],
      //   //   },
      //   // ],
      //   copyright: `Built by <a href="https://www.uxland.es/" target="_blank" rel="noopener noreferrer" style="color: #FF60C1;">Uxland</a>.`,
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      },
    } satisfies Preset.ThemeConfig,
  };

  return config;
}
