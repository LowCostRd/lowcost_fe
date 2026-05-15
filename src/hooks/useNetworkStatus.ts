import { useEffect, useState } from "react";

type NetworkStatus = "online" | "offline" | "poor";

interface NetworkState {
  status: NetworkStatus;
  isOnline: boolean;
  isOffline: boolean;
  isPoor: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}


interface NetworkInformation extends EventTarget {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
  rtt?: number;
  addEventListener(type: "change", listener: EventListener): void;
  removeEventListener(type: "change", listener: EventListener): void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

const getConnection = (): NetworkInformation | undefined => {
  const nav = navigator as NavigatorWithConnection;
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
};

export const useNetworkStatus = (): NetworkState => {
  const getNetworkInfo = (): NetworkState => {
    const online = navigator.onLine;
    const connection = getConnection();

    if (!online) {
      return {
        status: "offline",
        isOnline: false,
        isOffline: true,
        isPoor: false,
      };
    }

    if (connection) {
      const { effectiveType, downlink, rtt } = connection;

      const isPoor =
        effectiveType === "slow-2g" ||
        effectiveType === "2g" ||
        (rtt !== undefined && rtt > 500) ||
        (downlink !== undefined && downlink < 0.5);

      return {
        status: isPoor ? "poor" : "online",
        isOnline: !isPoor,
        isOffline: false,
        isPoor,
        effectiveType,
        downlink,
        rtt,
      };
    }

    return {
      status: "online",
      isOnline: true,
      isOffline: false,
      isPoor: false,
    };
  };

  const [networkState, setNetworkState] = useState<NetworkState>(getNetworkInfo);

  useEffect(() => {
    const update = () => setNetworkState(getNetworkInfo());

    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    const connection = getConnection();
    if (connection) {
      connection.addEventListener("change", update);
    }

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      if (connection) {
        connection.removeEventListener("change", update);
      }
    };
  }, []);

  return networkState;
};