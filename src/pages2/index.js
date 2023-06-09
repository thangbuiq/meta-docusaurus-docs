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
      description="Xin chào các bạn đã đến với trang Blog của tui nha. Ở đây, tui sẽ chia sẻ những kiến thức mà tui đã biết cũng như lộ trình trên con đường Machine Learning Enginner mà tui đang đi. Chúc các bạn xem trang vui vẻ nhé!">
      <HomepageHeader />
      <main>
        <HomeNavBoxes />
      </main>
    </Layout>
  );
}
