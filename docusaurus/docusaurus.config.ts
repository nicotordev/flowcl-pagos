import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '@nicotordev/flowcl-pagos',
  tagline: 'Flowcl Pagos',
  favicon: 'https://www.flow.cl/favicon.ico',

  // Set the production url of your site here
  url: 'https://nicotordev.github.io',
  baseUrl: '/flowcl-pagos/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '@nicotordev', // Usually your GitHub org/user name.
  projectName: '@nicotordev/flowcl-pagos', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/nicotordev/flowcl-pagos/edit/main/docusaurus/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
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
    image: 'https://www.flow.cl/images/header/logo-flow.svg',
    navbar: {
      title: '@nicotordev/flowcl-pagos',
      logo: {
        alt: '@nicotordev/flowcl-pagos Logo',
        src: 'https://www.flow.cl/favicon.ico',
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Flow.cl',
              to: 'https://www.flow.cl/docs/api.html#section/Introduccion',
            },
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} @nicotordev`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
