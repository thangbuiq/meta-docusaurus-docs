import React from 'react';
import clsx from 'clsx';
import styles from './homeNavBoxes.module.css';

const FeatureList = [
  {
    title: 'Getting Started',
    icon: 'img/icons/getting-started.svg',
    items: [
      { url: "docs/intro", text: "Giới thiệu" },
      { url: "docs/getting-started/1-what-i-do", text: "Journey Map" }
    ]
  },
  /*
  {
    title: 'Machine / Deep Learning Data Pipeline',
    icon: 'img/icons/setting-up-feed.svg',
    items: [
      { url: "docs/datapipeline/0-what-is-data-pipeline", text: "What is data pipeline?" },
      { url: "docs/datapipeline/1-data-tools-set", text: "Data Enginnering Tools" },
    ]
  },

{
  title: 'Key features',
  icon: 'img/icons/key-features.svg',
  items: [
    { url: "docs/key-features/default-feeds", text: "kontrimnon" },
    { url: "docs/key-features/upvotes", text: "kontrimnon" },
    { url: "docs/key-features/discussions", text: "kontrimnon" },
    { url: "docs/key-features/bookmarks", text: "kontrimnon" },
    { url: "docs/key-features/search", text: "kontrimnon" },
    { url: "docs/key-features/do-not-disturb", text: "kontrimnon" },
    { url: "docs/key-features/the-companion", text: "kontrimnon" },
    { url: "docs/key-features/community-picks", text: "kontrimnon" },
  ]
},
{
  title: 'Your profile',
  icon: 'img/icons/your-profile.svg',
  items: [
    { url: "docs/your-profile/registration", text: "kontrimnon" },
    { url: "docs/your-profile/activity", text: "kontrimnon" },
    { url: "docs/your-profile/reading-history", text: "kontrimnon" },
    { url: "docs/your-profile/weekly-goal", text: "kontrimnon" },
    { url: "docs/your-profile/devcard", text: "kontrimnon" },
    { url: "docs/your-profile/account-details", text: "kontrimnon" },
    { url: "docs/your-profile/deleting-your-profile", text: "kontrimnon" },
  ]
},
{
  title: 'Customization',
  icon: 'img/icons/customization.svg',
  items: [
    { url: "docs/customize-your-feed/layout", text: "kontrimnon" },
    { url: "docs/customize-your-feed/theme", text: "kontrimnon" },
    { url: "docs/customize-your-feed/density", text: "kontrimnon" },
    { url: "docs/customize-your-feed/preferences", text: "kontrimnon" },
  ]
},
{
  title: 'Useful guides',
  icon: 'img/icons/useful-guides.svg',
  items: [
    { url: "docs/how-does-daily-dev-work/dailydev-101", text: "kontrimnon" },
    { url: "docs/how-does-daily-dev-work/how-to-get-featured", text: "kontrimnon" },
    { url: "docs/how-does-daily-dev-work/reputation", text: "kontrimnon" },
    { url: "docs/how-does-daily-dev-work/community-picks-submission-guidelines", text: "kontrimnon" },
  ]
},
{
  title: 'Integrations',
  icon: 'img/icons/integration.svg',
  items: [
    { url: "docs/integrations/sharing-bookmarks", text: "kontrimnon" },
  ]
},
{
  title: 'For content creators',
  icon: 'img/icons/content-creator.svg',
  items: [
    { url: "docs/for-content-creators/content-guidelines", text: "kontrimnon" },
    { url: "docs/for-content-creators/suggest-new-source", text: "kontrimnon" },
    { url: "docs/for-content-creators/claiming-ownership-on-article", text: "kontrimnon" },
  ]
},
*/
];

function FeatureItem({ url, text }) {
  return (
    <li><a className={styles.listContainerLink} href={url}>{text}</a></li>
  );
}


function Feature({ title, icon, items }) {


  return (
    <article className={clsx('col col--4')}>
      <div className={styles.homecard}>
        <img src={icon} className={styles.homeIcon}></img>
        <h2>{title}</h2>
        <div className={styles.listContainer}>
          <ul>
            {items.map((props, idx) => (
              <FeatureItem key={idx} {...props} />
            ))}
          </ul>
        </div>
      </div>

    </article>
  );
}





export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <ul className={styles.grid3col}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </ul>
    </section>
  );
}
