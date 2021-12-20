import WalletConnectClient from "@walletconnect/client";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useRef, useCallback, useReducer } from "react";

const bridge = "https://bridge.walletconnect.org";

const baseURL = "https://ethereum-api.xyz";
async function apiGetAccountAssets(address, chainId) {
  const response = await fetch(
    `${baseURL}/account-assets?address=${address}&chainId=${chainId}`
  );
  const { result } = response;
  return result;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CONNECT":
      return {
        ...state,
        connected: true,
        accounts: action.accounts,
        chainId: action.chainId,
      };
    case "RESTORE_SESSION":
      return {
        ...state,
        connected: action.connector.connected,
        accounts: action.connector.accounts,
        chainId: action.connector.chainId,
      };
    case "RESET":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  connected: false,
  accounts: [],
  chainId: null,
};

export default function useTrustWallet() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const walletRef = useRef();
  const connector = walletRef.current;

  useEffect(() => {
    try {
      initConnector();
      if (connector?.connected) {
        dispatch({ type: "RESTORE_SESSION", connector });
      }
    } catch (e) {
      console.log("e", e);
    }

    return () => {
      unsubscribeEvents();
    };
  }, []);

  const initConnector = () => {
    connector = new WalletConnectClient({
      bridge,
      qrcodeModal: WalletConnectQRCodeModal,
    });
    subscribeToEvents();
  };

  const subscribeToEvents = () => {
    if (connector) {
      connector.on("session_update", onSessionUpdate);
      connector.on("connect", onConnect);
      connector.on("disconnect", onDisconnect);
    }
  };

  const unsubscribeEvents = () => {
    if (connector) {
      connector.off("session_update", onSessionUpdate);
      connector.off("connect", onConnect);
      connector.off("disconnect", onDisconnect);
    }
  };

  const onConnect = async (error, payload) => {
    console.log("Event: onConnect");
    if (error) {
      console.log("error", error);
      throw error;
    }

    const { chainId, accounts } = payload.params[0];
    dispatch({ type: "CONNECT", accounts, chainId });
  };

  const onSessionUpdate = async (error, payload) => {
    console.log("Event: onSessionUpdate");

    if (error) {
      console.log("error", error);
      throw error;
    }

    const { chainId, accounts } = payload.params[0];
    dispatch({
      type: "CONNECT",
      accounts,
      chainId,
    });
  };

  const onDisconnect = (error, payload) => {
    console.log("Event: onDisconnect");
    if (error) {
      console.log("error", error);
      throw error;
    }

    dispatch({ type: "RESET" });
  };

  const connectWallet = useCallback(async () => {
    try {
      initConnector();
      await connector.connect();
    } catch (e) {
      console.log("e", e);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    if (connector) await connector.killSession();
  }, []);

  const updateChain = useCallback((newChainId) => {
    if (connector) {
      connector.updateSession({
        chainId: newChainId,
        accounts: [connector.accounts[0]],
      });
    }
  }, []);

  const sendEthTransaction = (receiver = tx) => {
    // Send transaction
    // connector
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
    connected: state.connected,
    addresses: state.accounts,
    chainId: state.chainId,
    connectWallet,
    disconnectWallet,
    updateChain,
    sendEthTransaction,
  };
}
