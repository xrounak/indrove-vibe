import React, { useState, useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";

const testimonials = [
  { name: "Alice", role: "Client", quote: "Indorve made it so easy to find help for my project!", rating: 5 },
  { name: "Bob", role: "Student", quote: "I earned money and learned a lot. Highly recommend!", rating: 5 },
  { name: "Charlie", role: "Client", quote: "Fast, reliable, and student-friendly!", rating: 5 },
  { name: "Diana", role: "Student", quote: "Great way to earn and grow my skills.", rating: 5 },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.heading}>What People Say</h2>
      <div className={styles.carousel}>
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={
              `${styles.card} ${idx === index ? styles.active : styles.inactive}`
            }
            style={{ display: idx === index ? 'flex' : 'none' }}
          >
            <span className={styles.icon}>⭐️</span>
            <p className={styles.quote}>“{t.quote}”</p>
            <div className={styles.name}>{t.name}</div>
            <div className={styles.role}>{t.role}</div>
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={idx === index ? styles.dotActive : styles.dot}
            onClick={() => setIndex(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 