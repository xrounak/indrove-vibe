import React from "react";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>Get Things Done, Earn While You Learn</h1>
      <p className={styles.subtext}>
        Indorve connects clients and students for tasks, projects, and
        opportunities.
      </p>
      <div className={styles.ctaGroup}>
        <button
          className={styles.ctaBtnPrimary}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </section>
  );
}
