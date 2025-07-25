import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Close Button */}
      <button onClick={() => navigate("/")} className={styles.closeBtn}>
        ✕ Close
      </button>

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
    </div>
  );
}
