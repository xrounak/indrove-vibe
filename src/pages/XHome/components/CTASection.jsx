import React from "react";
import styles from "./CTASection.module.css";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.heading}>Ready to get started?</h2>
      <div className={styles.ctaGroup}>
        <button className={styles.ctaBtnPrimary} onClick={()=> navigate("/feed/tasks")}>TASKS</button>
        <button className={styles.ctaBtnSecondary} onClick={()=> navigate("/feed/freelancers")}>SERVICES</button>
      </div>
    </section>
  );
} 