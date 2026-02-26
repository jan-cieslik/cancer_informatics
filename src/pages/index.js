import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import LogoSvg from '@site/static/img/logo2.svg';

function HeroLogo() {
  return (
    <section className={styles.heroLogoSection}>
      <div className={styles.logoContainer}>
        <LogoSvg className={styles.logo} />
      </div>
    </section>
  );
}

function CourseAnnouncement() {
  return (
    <section className={styles.courseAnnouncementSection}>
      <div className="container">
        <div className={styles.announcementBox}>
          <div className={styles.announcementContent}>
            <div className={styles.announcementLabel}>📅 UPCOMING COURSE</div>
            <h2 className={styles.announcementTitle}>Next Course: 23 - 27 March 2026</h2>
            <p className={styles.announcementText}>Join us for an intensive hands-on workshop in cancer informatics</p>
            <Link className={clsx('button button--primary button--lg', styles.announcementButton)} to="/blog/summerschool">
              Register Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningPathCard({ icon, title, description, link }) {
  return (
    <div className={styles.pathCard}>
      <div className={styles.pathIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className={styles.pathLink} to={link}>
        Explore →
      </Link>
    </div>
  );
}

function LearningPaths() {
  return (
    <section className={styles.learningPaths}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Learning Paths</h2>
        <p className={styles.sectionSubtitle}>Master cancer informatics through structured learning</p>
        
        <div className={styles.pathsGrid}>
          <LearningPathCard
            icon="🧬"
            title="Cancer Statistics (R)"
            description="Learn data analysis and visualization using R. Perfect for statistical analysis and creating publication-ready graphics."
            link="docs/learning_R/introduction"
          />
          <LearningPathCard
            icon="🤖"
            title="AI & Machine Learning (Python)"
            description="Explore artificial intelligence and machine learning techniques for cancer research and diagnosis."
            link="docs/ai/introduction"
          />
          <LearningPathCard
            icon="📚"
            title="Cancer Theory"
            description="Understand the fundamentals of cancer informatics, NGS technology, and variant analysis."
            link="docs/theory/introduction"
          />
          <LearningPathCard
            icon="🔬"
            title="Real-World Applications"
            description="Apply your knowledge to breast, cervical, and ovarian cancer analysis projects."
            link="docs/using_R/introduction"
          />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>01</div>
            <h3>Comprehensive Curriculum</h3>
            <p>From foundational theory to advanced machine learning, covering all aspects of cancer informatics.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>02</div>
            <h3>Hands-On Learning</h3>
            <p>Real datasets and practical exercises with R, Python, and specialized bioinformatics tools.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>03</div>
            <h3>Expert Content</h3>
            <p>Created by cancer research and informatics experts at Heinrich-Heine-University Düsseldorf.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureNumber}>04</div>
            <h3>Community Driven</h3>
            <p>Open source and actively developed. Contribute your own materials and improvements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummerSchoolBanner() {
  return (
    <section className={styles.summerSchoolSection}>
      <div className="container">
        <div className={styles.summerSchoolContent}>
          <h2>Cancer Informatics Summer & Winter Schools</h2>
          <p>Join us for in-person intensive workshops at Heinrich-Heine-University Düsseldorf</p>
          <p className={styles.summerSchoolDescription}>
            Participate in hands-on training with leading experts in cancer informatics. Network with peers, dive deep into practical applications, and advance your research skills.
          </p>
          <Link className={clsx('button button--lg', styles.summerSchoolBtn)} to="blog/summerschool">
            Learn More About Our Programs
          </Link>
        </div>
      </div>
    </section>
  );
}

function TopicHighlights() {
  const topics = [
    { title: "Digital Pathology", desc: "QuPath for tissue segmentation and cell counting" },
    { title: "NGS Analysis", desc: "Next-generation sequencing processing and variant analysis" },
    { title: "Deep Learning", desc: "3D MRI and ultrasound segmentation" },
    { title: "Statistical Analysis", desc: "Survival analysis and regression modeling" },
  ];

  return (
    <section className={styles.topicsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Featured Topics</h2>
        <div className={styles.topicsGrid}>
          {topics.map((topic, idx) => (
            <div key={idx} className={styles.topicCard}>
              <h4>{topic.title}</h4>
              <p>{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2>Ready to Start Learning?</h2>
        <p>Begin your cancer informatics journey today</p>
        <div className={styles.ctaButtons}>
          <Link className={clsx('button button--lg', styles.primaryBtn)} to="docs/learning_R/introduction">
            Start with R Programming
          </Link>
          <Link className={clsx('button button--lg', styles.secondaryBtn)} to="docs/ai/introduction">
            Explore AI Applications
          </Link>
        </div>
        <p className={styles.ctaFootnote}>
          Have feedback? <a href="https://github.com/jan-cieslik/cancer_informatics/issues/new">Open a GitHub issue</a>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Learn Modern Cancer Research`}
      description="Comprehensive guide to cancer informatics, including R programming, machine learning, and bioinformatics analysis">
      <HeroLogo />
      <CourseAnnouncement />
      <LearningPaths />
      <Features />
      <TopicHighlights />
      <SummerSchoolBanner />
      <CallToAction />
    </Layout>
  );
}
