import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksGroup}>
        <a href="#about" className={styles.link}>About</a>
        <a href="#contact" className={styles.link}>Contact</a>
        <a href="#privacy" className={styles.link}>Privacy</a>
        <a href="#terms" className={styles.link}>Terms</a>
      </div>
      <div className={styles.socialGroup}>
        <a href="#" aria-label="Twitter" className={styles.link}>🐦</a>
        <a href="#" aria-label="LinkedIn" className={styles.link}>💼</a>
      </div>
      <div className={styles.branding}>© 2025 Indorve</div>
    </footer>
  );
} 