import styles from "../styles/Styles.module.css";
import Button from "./Button.jsx";

export default function Actions({ connected, sendEthTransaction }) {
  if (!connected) return null;

  return (
    <div className={styles.networkInfo}>
      <h2>Send</h2>
      <div>
        <Button
          label="eth_sendTransaction"
          onClick={sendEthTransaction}
          variant="outlined"
        />
      </div>
    </div>
  );
}
