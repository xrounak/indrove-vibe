import React from "react";
import styles from "./HowItWorks.module.css";

const steps = [
  { icon: "📝", title: "Post", desc: "Describe your task and requirements." },
  { icon: "💡", title: "Apply", desc: "Students apply and you choose the best fit." },
  { icon: "✅", title: "Done", desc: "Task completed securely and efficiently." },
];

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <h2 className={styles.heading}>How It Works</h2>
      <div className={styles.stepsGrid}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.step}>
            <span className={styles.icon}>{step.icon}</span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.desc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 