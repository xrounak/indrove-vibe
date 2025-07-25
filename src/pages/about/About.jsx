import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.css";
import Contact from "../../components/contact";

export default function About() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  return (
    <div className={styles.container}>
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className={styles.closeBtn + ' ' + styles.responsiveCloseBtn}
        aria-label="Close About Page"
      >
        <span className={styles.closeIcon}>✕</span>
        <span className={styles.closeText}>Close</span>
      </button>

      {/* Contact Modal */}
      {showContact && (
        <div className={styles.contactModalOverlay} onClick={() => setShowContact(false)}>
          <div className={styles.contactModal} onClick={e => e.stopPropagation()}>
            <button
              className={styles.contactModalClose}
              onClick={() => setShowContact(false)}
              aria-label="Close Contact Modal"
            >
              ✕
            </button>
            <Contact />
          </div>
        </div>
      )}

      {/* Main About Content */}
      <div className={styles.aboutContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>About Indorve</h1>
          <p className={styles.subtitle}>
            Empowering students to earn by helping people get real-world tasks done.
          </p>
        </div>

        {/* Overview */}
        <section className={styles.section}>
          <p>
            <strong>Indorve</strong> is a platform that connects clients who need help with tasks
            (assignments, presentations, research, and more) to talented students looking to earn money
            using their skills.
          </p>
          <p>
            We aim to make it easy for anyone to delegate small to mid-size tasks while giving students
            valuable opportunities to grow and earn.
          </p>
        </section>

        {/* Features */}
        <section className={styles.featureSection}>
          <div className={styles.featureCard}>
            <h3>📌 Post Tasks</h3>
            <p>List your task with details, budget, and deadline.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>🎓 Hire Students</h3>
            <p>Browse applicants and choose the best fit.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>💰 Pay & Rate</h3>
            <p>Pay safely and rate freelancers after task completion.</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.cta}>
          <h2>Join Indorve — where every task finds the right mind 🚀</h2>
          <p>We’re building the future of decentralized work, one task at a time.</p>
        </section>

        {/* Meet the Developer */}
        <section className={styles.meetDev}>
          <div className={styles.meetDevFrame}>
            <span className={styles.meetDevLabel}>MEET THE DEVELOPER</span>
            <h2 className={styles.meetDevTitle}>
              FULLY DEVELOPED, MANAGED, TESTED, AND DEPLOYED<br />
              <span className={styles.meetDevBy}>BY ROUNAK</span>
            </h2>
            <p className={styles.meetDevDesc}>
              Vision, code, and every pixel — crafted with passion and precision.<br />
              <button
                className={styles.contactBtn}
                onClick={() => setShowContact(true)}
                aria-label="Contact Developer"
              >
                Contact
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
