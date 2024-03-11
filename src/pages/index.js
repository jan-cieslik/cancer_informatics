import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        <p className="hero__subtitle">
          This is a work in progress project. If you have any suggestions open a <a style={{color:"white"}} href="https://github.com/jan-cieslik/cancer_informatics/issues/new">GitHub Issue</a>.
        </p>

      </div>
    </header>
  );
}

function SummerSchool() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Cancer Informatics Summer & Winter School</h1>
        <p className="hero__subtitle">Join us on campus for our Cancer Informatics Summer & Winter Schools</p>
        Each year we hold two in person workshops at the Heinrich-Heine-University of Düsseldorf. <br/>
        <a href="blog/summerschool">Click here to learn more</a>

      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Cancer Informatics`}
      description="">
      <HomepageHeader />
        <SummerSchool />
      <main>
      </main>
    </Layout>
  );
}
