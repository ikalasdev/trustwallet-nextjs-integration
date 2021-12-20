import styles from "../styles/Styles.module.css";
import Image from "next/image";
import { SUPPORTED_CHAINS } from "../constants";
import Button from "./Button";
import { useState, useEffect } from "react";

export default function Chain({ chainId, updateChain }) {
  const [selectedChainId, setSelectedChainId] = useState();

  useEffect(() => {
    setSelectedChainId(chainId);
  }, [chainId]);

  if (!chainId) return null;

  const chainInfo = SUPPORTED_CHAINS.find(
    ({ chain_id }) => chain_id === chainId
  );

  return (
    <div className={styles.networkInfo}>
      <div>
        {chainInfo.icon ? (
          <Image
            src={chainInfo.icon}
            height={50}
            width={50}
            alt={`${chainInfo.name} icon`}
          />
        ) : (
          <Image
            src="/icons/blockchain.png"
            height={50}
            width={50}
            alt="blockchain icon"
          />
        )}
        <p className={styles.networkName}>{chainInfo.name}</p>
      </div>
      <div className="w-100 my-4">
        <select
          onChange={(e) => {
            setSelectedChainId(Number(e.target.value));
          }}
          value={selectedChainId || undefined}
        >
          {SUPPORTED_CHAINS.map((el) => (
            <option value={el.chain_id} key={el.name}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        label="Update chain"
        onClick={() => updateChain(selectedChainId)}
        className="w-100"
      />
    </div>
  );
}
