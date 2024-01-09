// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ZeyOS Developer Center',
  tagline: '',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
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
    locales: ['en', 'de'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'ZeyOS Developer Center',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Products',
            menuType: 'grid',
            items: [
              {
                label: "Product 1",
                href: '/',
                img: 'img/logo.png',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
              {
                label: "Product 2",
                href: '/',
                img: 'img/logo.png',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
              {
                label: "Product 3",
                href: '/',
                img: 'img/logo.png',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
              {
                label: "Product 4",
                href: '/',
                img: 'img/logo.png',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Solutions',
            menuType: 'category-grid',
            items: [
              //ByStage
              {
                label: 'Start-Up',
                to: 'solutions/start-up',
                icon: 'img/start-up-icon.svg',
                category: 'BY STAGE',
              },
              {
                label: 'SMB',
                to: 'solutions/smb',
                icon: 'img/smb-icon.svg',
                category: 'BY STAGE',
              },
              {
                label: 'Enterprise',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: 'BY STAGE',
              },
              //By Industry
              {
                label: 'Medical',
                to: 'solutions/start-up',
                icon: 'img/start-up-icon.svg',
                category: 'BY INDUSTRY',
              },
              {
                label: 'E-Commerce',
                to: 'solutions/smb',
                icon: 'img/smb-icon.svg',
                category: 'BY INDUSTRY',
              },
              {
                label: 'MSP-Providers',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: 'BY INDUSTRY',
              },
              {
                label: 'SaaS',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: 'BY INDUSTRY',
              },
              // BY USE CASE
              {
                label: 'Shop-Backend',
                to: 'solutions/start-up',
                icon: 'img/start-up-icon.svg',
                category: 'BY USE CASE',
              },
              {
                label: 'Self-Service Portals',
                to: 'solutions/smb',
                icon: 'img/smb-icon.svg',
                category: 'BY USE CASE',
              },
              {
                label: 'Billing and Subscriptions',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: 'BY USE CASE',
              },
              {
                label: 'Warehouse',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: 'BY USE CASE',
              },
              {
                label: 'Point-of-sales',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: 'BY USE CASE',
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Developers',
            items: [
              {
                label: "Product 1",
                href: '/'
              },
              {
                label: "Product 2",
                href: '/',
              },
              {
                label: "Product 3",
                href: '/'
              },
              {
                label: "Product 4",
                href: '/'
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Resourses',
            items: [
              {
                label: "Product 1",
                href: '/'
              },
              {
                label: "Product 2",
                href: '/'
              },
              {
                label: "Product 3",
                href: '/'
              },
              {
                label: "Product 4",
                href: '/'
              },
            ]
          },
          
          // {to: '/blog', label: 'Schema', position: 'left'},
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   src: 'img/logo.svg',
          //   label: 'Join US',
          //   position: 'right',
          // },
          {
            type: 'localeDropdown',
            position: 'right'
          },
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Tutorial',
        //         to: '/docs/intro',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        // ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
