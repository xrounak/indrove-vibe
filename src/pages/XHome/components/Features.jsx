import React from "react";
import styles from "./Features.module.css";

const features = [
  { icon: "✅", title: "Smart Matching" },
  { icon: "🔒", title: "Secure Payments" },
  { icon: "📥", title: "File Sharing" },
  { icon: "🎓", title: "Student-first Design" },
];

export default function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.heading}>Features</h2>
      <div className={styles.grid}>
        {features.map((f, idx) => (
          <div key={idx} className={styles.card}>
            <span className={styles.icon}>{f.icon}</span>
            <div className={styles.title}>{f.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 