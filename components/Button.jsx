import styles from "../styles/Styles.module.css";

export default function Button({ label, onClick, variant = "contained" }) {
  if (variant === "outlined")
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${styles.button} ${styles.outlinedButton}`}
      >
        {label}
      </button>
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${styles.containedButton}`}
    >
      {label}
    </button>
  );
}
