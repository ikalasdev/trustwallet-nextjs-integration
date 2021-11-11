import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { useState, useEffect, useRef, useCallback } from "react";
import { SUPPORTED_CHAINS } from "../constants";

export default function useTrustWallet() {
  const walletRef = useRef();
  const walletConnector = walletRef.current;

  const [connected, setConnected] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [chain, setChain] = useState(null);

  const initWallet = () => {
    if (!walletConnector) {
      walletConnector = new NodeWalletConnect(
        {
          bridge: "https://bridge.walletconnect.org", // Required
        },
        {
          clientMeta: {
            description: "WalletConnect NodeJS Client",
            url: "https://nodejs.org/en/",
            icons: ["https://nodejs.org/static/images/logo.svg"],
            name: "WalletConnect",
          },
        }
      );

      // Subscribe to connection events
      walletConnector.on("connect", onConnect);
      walletConnector.on("session_update", onSessionUpdate);
      walletConnector.on("disconnect", onDisconnect);
    }
  };

  const onConnect = (error, payload) => {
    console.log("connect");
    if (error) {
      throw error;
    }

    WalletConnectQRCodeModal.close(
      true // isNode = true
    );

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];

    setConnected(true);
    setAddresses(accounts);
    const networkDetails = SUPPORTED_CHAINS.find(
      (el) => el.chain_id === chainId
    );
    setChain(networkDetails);
  };

  const onSessionUpdate = (error, payload) => {
    console.log("session_update");
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
  };

  const onDisconnect = (error, payload) => {
    console.log("on disconnect");
    if (error) {
      throw error;
    }

    // Delete walletConnector
    setAddresses(null);
    setConnected(false);
    setChain(null);
  };

  useEffect(() => {
    initWallet();

    console.log("walletConnector", walletConnector);
    if (walletConnector.connected === true) {
      setConnected(true);
      setAddresses(walletConnector.accounts);
      const networkDetails = SUPPORTED_CHAINS.find(
        (chain) => chain.chain_id === walletConnector.chainId
      );
      setChain(networkDetails);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    if (walletConnector) {
      walletConnector.killSession().then(() => {
        console.log("Session killled");
      });
    }
  }, [walletConnector]);

  const connectWallet = useCallback(() => {
    initWallet();

    // Check if connection is already established
    if (!walletConnector.connected) {
      // create new session
      walletConnector.createSession().then(() => {
        // get uri for QR Code modal
        const uri = walletConnector.uri;
        // display QR Code modal
        WalletConnectQRCodeModal.open(
          uri,
          () => {
            console.log("QR Code Modal closed");
          },
          true // isNode = true
        );
      });
    }
  }, [walletConnector]);

  // Draft transaction
  const tx = {
    from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
    to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
    data: "0x", // Required
    gasPrice: "0x02540be400", // Optional
    gas: "0x9c40", // Optional
    value: "0x00", // Optional
    nonce: "0x0114", // Optional
  };

  const sendEthTransaction = (receiver = tx) => {
    console.log("sendEthTransaction");

    // Send transaction
    // walletConnector
    //   .sendTransaction(receiver)
    //   .then((result) => {
    //     // Returns transaction id (hash)
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     // Error returned when rejected
    //     console.error(error);
    //   });
  };

  return {
    connected,
    addresses,
    chain,
    connectWallet,
    disconnectWallet,
    sendEthTransaction,
  };
}
