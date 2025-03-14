import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

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
    locales: ['en'],
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
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'html',
          position: 'right',
          value: '<a  style="padding: 12px;">v1.1.0</a>',
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

export default config;
