/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Thang Bui Quang",
  tagline: "> I'm a simple guy who loves coding. My job is transforming data into insights, one byte at a time. ▍",
  url: 'https://thangbuiq.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/docusaurus.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'thangbuiq', // Usually your GitHub org/user name.
  projectName: 'meta-docusaurus-blog', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        // The default color mode you want
        defaultMode: 'light',
  
        // should we use the user preferred color scheme media query?
        // people generally expect "defaultMode" to 
        respectPrefersColorScheme: false,
  
        // disable the light/dark color mode switch
        disableSwitch: false,
      },
      navbar: {
        title: 'Portfolio',
        logo: {
          alt: 'My Meta Project Logo',
          src: 'img/docusaurus.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'My Data Engineer Blog',
          },
          // { to: 'blog', label: 'Personal Blog', position: 'left' },
          // Please keep GitHub link to the right for consistency.
          {
            href: 'https://drive.google.com/file/d/1amFr_IOPt9HXE23b_m9JApsElaCKKEgt/view?usp=sharing',
            label: 'Resume (CV)',
            position: 'right',
          },
          {
            href: 'https://github.com/thangbuiq/meta-docusaurus-docs',
            label: 'Source',
            position: 'right',
          },
          /*
          // https://www.linkedin.com/in/thangbuiq/
          {
            href: 'https://www.linkedin.com/in/thangbuiq/',
            label: 'LinkedIn',
            position: 'right',
          },
          // CV: https://drive.google.com/file/d/1amFr_IOPt9HXE23b_m9JApsElaCKKEgt/view?usp=sharing
          */
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Get Started',
            items: [
              {
                label: 'Documents',
                to: 'docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/thangbuiq',
              },
            ],
          },
          {
            title: 'Legal',
            // Please do not remove the privacy and terms, it's a legal requirement.
            items: [
              {
                label: 'Privacy',
                href: 'https://opensource.fb.com/legal/privacy/',
              },
              {
                label: 'Terms',
                href: 'https://opensource.fb.com/legal/terms/',
              },
              {
                label: 'Data Policy',
                href: 'https://opensource.fb.com/legal/data-policy/',
              },
              {
                label: 'Cookie Policy',
                href: 'https://opensource.fb.com/legal/cookie-policy/',
              },
            ],
          },
        ],
        // Please do not remove the credits, help to publicize Docusaurus :)
        copyright: `Copyright © ${new Date().getFullYear()} @thangbuiq, Inc. Built with Meta - Docusaurus.`,
      },
      /*
      announcementBar: {
        id: 'support_us',
        content:
          'Chúc các bạn có những phút giây đọc blog vui vẻ nhé!',
        backgroundColor: '#b195ff',
        textColor: '#091E42',
        isCloseable: true,
      }, */
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
