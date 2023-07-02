/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React, { Fragment } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Socials } from '../components';

const features = [
  {
    title: 'Trang này có gì hay?',
    imageUrl: 'img/penguin.png',
    description: (
      <>
        Tại đây, mình sẽ chia sẻ về con đường mà mình đã và đang đi, đồng thời cũng là trang document để mình tổng hợp và lưu lại những kiến thức mà mình tự học được từ nhiều nguồn đáng tin cậy.
      </>
    ),
  },
  {
    title: 'Không chỉ là kiến thức chuyên ngành',
    imageUrl: 'img/cutepg.png',
    description: (
      <>
        Bên cạnh những kiến thức chuyên ngành khô khan, mình còn viết blog, viết những mẩu chuyện nhỏ, hay và tích cực vì mình có nhiều thứ để chia sẻ lắm.
      </>
    ),
  },
  {
    title: 'Tổng hợp các trick Linux',
    imageUrl: 'img/Tux.png',
    description: (
      <>
        Mình sẽ chia sẻ những mẹo hay mình đã góp nhặt được từ lúc mình bắt đầu sử dụng Linux cho đến giờ. Bên cạnh những mẹo này, các bạn cũng có thể tham khảo một document về Linux hoàn chỉnh ở đây: <a href="https://ubunchuu-truong-us.github.io/"> https://ubunchuu-truong-us.github.io </a>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Blog`}
      description="Xin chào các bạn đã đến với trang Blog của tui nha. Ở đây, tui sẽ chia sẻ những kiến thức mà tui đã biết cũng như lộ trình trên con đường Machine Learning Enginner mà tui đang đi. Chúc các bạn xem trang vui vẻ nhé!">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <div className={styles.avatarContainer}>
            <Avatar
              alt="My face"
              src={useBaseUrl('/img/image.png')}
              sx={{ width: 200, height: 200, margin: 2 }}
            />
          </div>
          <Socials />
          <p className={styles.tagline}>I'm a <b>Machine Learning Engineer</b> specializing in healthcare.</p>
          <p className={styles.tagline}>My goal is to drive innovation and improve patient outcomes for a brighter <b>future</b>.</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--lg',
                styles.getStarted,
                styles.customButton
              )}
              to={useBaseUrl('docs/intro')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ title, imageUrl, description }) => (
                  <Feature
                    key={title}
                    title={title}
                    imageUrl={imageUrl}
                    description={description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
