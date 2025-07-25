
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import WhoIsItFor from "./components/WhoIsItFor";
// import Testimonials from "../components/Testimonials";
import Features from "./components/Features";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import styles from "./Home.module.css";
import TestimonialCarousel from "./components/TestimonialCarousel";

export default function Home() {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <Hero />
        <HowItWorks />
        <WhoIsItFor />
        {/* <Testimonials /> */}
        <TestimonialCarousel/>
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 