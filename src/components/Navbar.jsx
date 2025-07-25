// Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/indrove.svg";
import { useAuth } from "../context/AuthContext";
import { getUserData } from "../services/authService";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const { user } = useAuth();
  // const {email,name,avatarURL} = userData;

  const [userData, setUserData] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect( () => {
    if (user) {
      getUserData(user.uid).then(data => {
        setUserData(data);
        setAvatarURL(data.avatarURL);
      });
    }
  }, [user]);


  return (
    <nav className={styles.navbar}>
      {/* Left - Hamburger */}
      <div className={styles.left}>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Center - Logo */}
      <div className={styles.center} onClick={() => navigate("/")} role="button" tabIndex={0}>
        <div className={styles.logoGroup}>
        <img src={logo} alt="Indrove" className={styles.logo} />
        </div>
      </div>

      {/* Right - Auth/Profile */}
      <div
        className={styles.right}
        onClick={() => navigate(user ? "/profile" : "/auth")}
        role="button"
        tabIndex={0}
      >
        {user ? (
          <>
                      <span className={styles.userName}>
              {userData?.name || user.displayName || "User"}
            </span>
            {avatarURL && (
              <img src={avatarURL} alt="Profile" className={styles.profilePic} />
            )}

          </>
        ) : (
          <>
          
            <span className={styles.userName}>Login</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Guest"
              className={styles.profilePic}
            />
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        <NavLink to="/" onClick={closeMenu} className={styles.mobileLink}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu} className={styles.mobileLink}>About</NavLink>
        <NavLink to="/feed/tasks" onClick={closeMenu} className={styles.mobileLink}>Post Task</NavLink>
        <NavLink to="/feed/freelancers" onClick={closeMenu} className={styles.mobileLink}>Earn</NavLink>
      </div>
    </nav>
  );
}
