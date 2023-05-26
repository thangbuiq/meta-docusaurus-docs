import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import HomeNavBoxes from '../components/homepage/homeNavBoxes';

function HomepageHeader() {
  return (

    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Welcome to thangbuiq's docs</h1>
      </div>
    </header>
  );
}

export default function Home() {
  // return <Redirect to="/docs/intro" />;
  return (
    <Layout
      title={`Blog`}
      description="My Data Engineer Journey Blog">
      <HomepageHeader />
      <main>
        <HomeNavBoxes />
      </main>
    </Layout>
  );
}
