import { useState, useEffect } from "react";
import styles from "./Auth.module.css";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Auth() {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleClose = () => {
    navigate("/"); // or go back: navigate(-1)
  };

  useEffect(() => {
    if (!loading && user) {
      navigate("/"); // If already logged in, redirect
    }
  }, [user, loading, navigate]);

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.authCard} ${flipped ? styles.flipped : ""}`}
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <div className={styles.authCardInner}>
          <div className={`${styles.authFace} ${styles.front}`}>
            <div className={styles.innerContent}>
              <Login onFlip={() => setFlipped(true)} />
            </div>
          </div>
          <div className={`${styles.authFace} ${styles.back}`}>
            <div className={styles.innerContent}>
              <Register onFlip={() => setFlipped(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
