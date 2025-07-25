import { FcGoogle } from "react-icons/fc";
import styles from "./GoogleButton.module.css"; // new CSS module

export const GoogleButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.googleBtn}>
      <FcGoogle className={styles.googleIcon} />
      Continue with Google
    </button>
  );
};
