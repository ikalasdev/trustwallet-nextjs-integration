import useTrustWallet from "../hooks/useTrustWallet";
import styles from "../styles/Styles.module.css";
import WalletHeader from "../components/WalletHeader";
import Chain from "../components/Chain";
import Actions from "../components/Actions";
import Button from "../components/Button";

export default function TrustWallet() {
  const {
    connected,
    addresses,
    chainId,
    connectWallet,
    disconnectWallet,
    updateChain,
    sendEthTransaction,
  } = useTrustWallet();

  return (
    <div className={styles.wrapper}>
      <WalletHeader
        connected={connected}
        addresses={addresses}
        disconnectWallet={disconnectWallet}
      />
      <Chain chainId={chainId} updateChain={updateChain} />
      <Actions connected={connected} sendEthTransaction={sendEthTransaction} />

      {connected ? (
        <Button label="Disconnect" onClick={disconnectWallet} />
      ) : (
        <Button label="Connect" onClick={connectWallet} />
      )}
    </div>
  );
}
