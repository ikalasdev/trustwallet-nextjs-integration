import styles from "../styles/Styles.module.css";
import Image from "next/image";

export default function Chain({ chain }) {
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
}
