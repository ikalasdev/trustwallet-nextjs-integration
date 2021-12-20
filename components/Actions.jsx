import styles from "../styles/Styles.module.css";
import Button from "./Button.jsx";

export default function Actions({ connected, sendEthTransaction }) {
  if (!connected) return null;

  return (
    <div className={styles.networkInfo}>
      <h2>Actions</h2>
      <div>
        <div className="w-100">
          <Button
            label="eth_sendTransaction"
            onClick={sendEthTransaction}
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
}
