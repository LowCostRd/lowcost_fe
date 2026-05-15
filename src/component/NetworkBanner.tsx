import { useEffect, useRef, useState } from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

const NetworkBanner = () => {
  const { status } = useNetworkStatus();

  const [showOnline, setShowOnline] = useState(false);
  const prevStatusRef = useRef(status);


  useEffect(() => {
    const prevStatus = prevStatusRef.current;

    if (status === "online" && prevStatus !== "online") {
      setTimeout(() => {
        setShowOnline(true);
      }, 0);
    }

    prevStatusRef.current = status;
  }, [status]);

  // Auto hide after 3 seconds
  useEffect(() => {
    if (!showOnline) return;

    const timer = setTimeout(() => {
      setShowOnline(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showOnline]);

  if (status === "offline") {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 px-6 py-3 rounded-lg shadow-lg text-[13px] font-medium text-white bg-[#CA2044]">
        📡 You're offline. Please check your internet connection.
      </div>
    );
  }

  if (status === "poor") {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 px-6 py-3 rounded-lg shadow-lg text-[13px] font-medium text-white bg-[#F59E0B]">
        ⚠️ Poor network connection. Things may be slow.
      </div>
    );
  }

  if (showOnline) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 px-6 py-3 rounded-lg shadow-lg text-[13px] font-medium text-white bg-[#16A34A]">
        ✅ Back online!
      </div>
    );
  }

  return null;
};

export default NetworkBanner;