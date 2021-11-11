import styles from "../styles/Styles.module.css";

export default function WalletHeader({
  connected,
  addresses,
  disconnectWallet,
}) {
  if (!(connected && addresses)) return null;

  return (
    <div className={styles.walletHeader}>
      <p className={`${styles.mb4} ${styles.success}`}>Connected</p>
      <div className={styles.addressInfo}>
        <p className={`${styles.mb4} ${styles.addressOverflow} ${styles.bold}`}>
          {addresses[0]}
        </p>
        <p className={styles.disconnectLabel} onClick={disconnectWallet}>
          Disconnect
        </p>
      </div>
    </div>
  );
}
