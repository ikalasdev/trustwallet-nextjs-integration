import styles from "../styles/Styles.module.css";

export default function WalletHeader({
  connected,
  addresses,
  disconnectWallet,
}) {
  if (!(connected && addresses)) return null;

  return (
    <div className={styles.walletHeader}>
      <p className="text-success mb-2">Connected</p>
      <div className={styles.addressInfo}>
        <p className={`${styles.addressOverflow} bold mb-2`}>{addresses[0]}</p>
        <p className={styles.disconnectLabel} onClick={disconnectWallet}>
          Disconnect
        </p>
      </div>
    </div>
  );
}
