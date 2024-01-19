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
  url: 'https://devcenterzeyos.netlify.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      de: {
        label: 'Deutsch',
      }
    },
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
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        searchBarShortcut: false,
        searchBarShortcutHint: false
      }),
    ],
  ],
  

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.svg',
      announcementBar: {
        id: 'action',
        content:
          'Action Bar: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, natus.',
        backgroundColor: 'red',
        textColor: 'white',
        isCloseable: true,
      },
      navbar: {
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
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
                img: 'img/logo.svg',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
              {
                label: "Product 2",
                href: '/',
                img: 'img/logo.svg',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
              {
                label: "Product 3",
                href: '/',
                img: 'img/logo.svg',
                description: 'lorem inpsum dolor sit amet, consectetuer adipiscing elit'
              },
              {
                label: "Product 4",
                href: '/',
                img: 'img/logo.svg',
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
                to: 'solutions/startup',
                icon: 'fa-duotone fa-rocket-launch',
                category: 'BY STAGE',
              },
              {
                label: 'SMB',
                to: 'solutions/smb',
                icon: 'fa-duotone fa-building',
                category: 'BY STAGE',
              },
              {
                label: 'Enterprise',
                to: 'solutions/enterprise',
                icon: 'fa-duotone fa-city',
                category: 'BY STAGE',
              },
              //By Industry
              {
                label: 'Medical',
                to: 'solutions/medical',
                icon: 'fa-duotone fa-suitcase-medical',
                category: 'BY INDUSTRY',
              },
              {
                label: 'E-Commerce',
                to: 'solutions/ecommerce',
                icon: 'fa-duotone fa-shop',
                category: 'BY INDUSTRY',
              },
              {
                label: 'MSP-Providers',
                to: 'solutions/msp',
                icon: 'img/enterprise-icon.svg',
                category: 'BY INDUSTRY',
              },
              {
                label: 'SaaS',
                to: 'solutions/saas',
                icon: 'fa-duotone fa-arrow-turn-up',
                category: 'BY INDUSTRY',
              },
              // BY USE CASE
              {
                label: 'Shop-Backend',
                to: 'solutions/shop',
                icon: 'fa-duotone fa-bags-shopping',
                category: 'BY USE CASE',
              },
              {
                label: 'Self-Service Portals',
                to: 'solutions/ssp',
                icon: 'fa-duotone fa-person-to-portal',
                category: 'BY USE CASE',
              },
              {
                label: 'Billing and Subscriptions',
                to: 'solutions/billing',
                icon: 'fa-duotone fa-file-invoice-dollar',
                category: 'BY USE CASE',
              },
              {
                label: 'Warehouse',
                to: 'solutions/warehouse',
                icon: 'fa-duotone fa-warehouse-full',
                category: 'BY USE CASE',
              },
              {
                label: 'Point-of-sales',
                to: 'solutions/pos',
                icon: 'fa-duotone fa-cash-register',
                category: 'BY USE CASE',
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Developers',
            menuType: 'category-grid',
            needhelp: {
              title: 'NEED HELP WITH YOUR PROJECT?',
              description: 'Tell us about your project and our team will reach out with a proposal or recommend a suitable partner!',
              icon: 'fa-regular fa-chevron-right',
              to: 'needhelp'
            },
            items: [
              //REST API
              {
                label: 'Getting Started',
                to: 'solutions/start-up',
                icon: 'fa-duotone fa-book-open',
                category: 'REST API',
              },
              {
                label: 'Authentication',
                to: 'solutions/smb',
                icon: 'fa-duotone fa-lock-a',
                category: 'REST API',
              },
              {
                label: 'API reference',
                to: 'solutions/smb',
                icon: 'fa-duotone fa-webhook',
                category: 'REST API',
              },
              // DEVELOPMENT REFERENCE
              {
                label: 'DevCenter documentation',
                to: 'solutions/start-up',
                icon: 'fa-duotone fa-book-open',
                category: 'DEVELOPMENT REFERENCE',
              },
              {
                label: 'iXML documentation',
                to: 'docs/ixml/',
                icon: 'fa-duotone fa-code',
                category: 'DEVELOPMENT REFERENCE',
              },
              {
                label: 'Zymbda documentation',
                to: 'solutions/smb',
                icon: 'fa-duotone fa-brackets-curly',
                category: 'DEVELOPMENT REFERENCE',
              },
              {
                label: 'Database reference',
                to: 'solutions/smb',
                icon: 'fa-duotone fa-database',
                category: 'DEVELOPMENT REFERENCE',
              },
              {
                label: 'Boiler plates',
                to: 'solutions/smb',
                icon: 'fa-duotone fa-object-subtract',
                category: 'DEVELOPMENT REFERENCE',
              },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Resourses',
            menuType: 'category-grid',
            additionaltags:[
              {
                title: 'WANT TO BECOME A PARTNER?',
                description: 'You are a consultant, agency, disributor or technology company? Reach out to our team and discover how we can grow your business together.',
                to: 'partner'
              },
              {
                title: 'WE ARE HIRING!',
                description:'You are looking for a new challenge? Discover our open job positions and joinour team to reshape the way people work in the future.',
                to: 'hiring'
              }
            ],
            items: [
              //REST API
              {
                label: 'User documentation',
                to: 'solutions/start-up',
                icon: 'fa-duotone fa-rocket-launch',
                category: '',
              },
              {
                label: 'Blog articles',
                to: 'solutions/smb',
                icon: 'img/smb-icon.svg',
                category: '',
              },
              {
                label: 'Media',
                to: 'solutions/smb',
                icon: 'img/enterprise-icon.svg',
                category: '',
              }
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
            to: '/getstarted',            
            label: 'Get started',
            position: 'right', 
            className: 'get-started', 
          },
          {
            type: 'localeDropdown',
            position: 'right'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Legal Notices',
            items: [
              {
                label: 'Privacy Policy',
                to: 'privacy',
              },
              {
                label: 'Terms of Service',
                to: 'termsofservice',
              },
              {
                label: 'Standard Business Terms',
                to: 'stb',
              },
              {
                label: 'Imprint',
                to: 'impressum',
              },
            ],
          },
          {
            title: 'About Us',
            items: [
              {
                label: 'Career opportunities',
                to: 'career',
              },
              {
                label: 'Become a partner',
                to: 'becomepartner',
              }
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Contact support',
                to: 'contactsupport',
              },
              {
                label: 'Customer portal',
                to: 'customerportal',
              },
              {
                label: 'Start a new project',
                to: 'newproject',
              }
            ],
          },
          {
            title: 'Documentation',
            items: [
              {
                label: 'User guide',
                to: 'contactsupport',
              },
              {
                label: 'REST API',
                to: 'api',
              },
              {
                label: 'Devcenter',
                to: 'devcenter',
              },
              {
                label: 'iXML documentation',
                to: 'docs/ixml',
              }
            ],
          },
          {
            title: 'Solutions',
            items: [
              {
                label: 'Medical',
                to: 'medical',
              },
              {
                label: 'E-Commerce',
                to: 'ecommerce',
              },
              {
                label: 'SaaS',
                to: 'saas',
              },
              {
                label: 'MSP providers',
                to: 'msp',
              }
            ],
          },
          
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © 2012-2024 ZeyOS GmbH & Co. KG\nAll rights reserved. All trademarks held by their respective owners.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
    scripts: [
      {
        src: 'https://kit.fontawesome.com/e434cf4aa3.js',
        crossorigin: 'anonymous',
        async: true,
      },
    ],
};

export default config;
