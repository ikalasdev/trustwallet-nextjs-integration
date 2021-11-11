import useTrustWallet from "../hooks/useTrustWallet";
import styles from "../styles/Styles.module.css";
import Image from "next/image";

const WalletHeader = ({ connected, addresses, disconnectWallet }) => {
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
};

const Chain = ({ chain }) => {
  if (!chain) return null;

  return (
    <div className={styles.networkInfo}>
      <h2>Chain</h2>
      <div>
        {chain.icon ? (
          <Image src={chain.icon} height={50} width={50} />
        ) : (
          <Image src="/icons/eth.svg" height={50} width={50} />
        )}
        <p className={styles.networkName}>{chain.name}</p>
      </div>
    </div>
  );
};

const Actions = ({ connected, sendEthTransaction }) => {
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
};

const Button = ({ label, onClick, variant = "contained" }) => {
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
};

export default function TrustWallet() {
  const {
    connected,
    addresses,
    chain,
    connectWallet,
    disconnectWallet,
    sendEthTransaction,
  } = useTrustWallet();

  // static
  // const { connectWallet, disconnectWallet, sendEthTransaction } =
  //   useTrustWallet();
  // const connected = true;
  // const addresses = ["0X12312435FKLJLQWIUKLJZKJFAFKLFDSJAA"];
  // const chain = SUPPORTED_CHAINS[0];

  // const connected = false;
  // const addresses = null;
  // const chain = null;

  return (
    <div className={styles.wrapper}>
      <WalletHeader
        connected={connected}
        addresses={addresses}
        disconnectWallet={disconnectWallet}
      />
      <Chain chain={chain} />
      <Actions connected={connected} sendEthTransaction={sendEthTransaction} />

      {connected ? (
        <Button label="Disconnect" onClick={disconnectWallet} />
      ) : (
        <Button label="Connect" onClick={connectWallet} />
      )}
    </div>
  );
}
