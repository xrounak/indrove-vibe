// src/components/TestimonialCarousel.jsx
import styles from "./TestimonialCarousel.module.css"

const testimonials = Array.from({ length: 30 }, (_, i) => ({
  quote: `“This is testimonial #${i + 1}. Indorve helped me massively!”`,
}))

export default function TestimonialCarousel() {
  const duplicated = testimonials.concat(testimonials)

  return (
    <div className={`w-full overflow-hidden py-6 ${styles.wrapper}`}>
      <div className={styles.row}>
        <div className={`${styles.track} ${styles.left}`}>
          {duplicated.map((t, i) => (
            <div key={`top-${i}`} className={styles.card}>
              {t.quote}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.track} ${styles.right}`}>
          {duplicated.map((t, i) => (
            <div key={`middle-${i}`} className={styles.card}>
              {t.quote}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.track} ${styles.left}`}>
          {duplicated.map((t, i) => (
            <div key={`bottom-${i}`} className={styles.card}>
              {t.quote}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
