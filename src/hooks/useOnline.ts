import { useState, useEffect } from "react";

function useInternetStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasInternet, setHasInternet] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        checkInternetAccess();
      } else {
        setHasInternet(false);
      }
    };

    const checkInternetAccess = async () => {
      try {
        await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
        setHasInternet(true);
      } catch (error) {
        setHasInternet(false);
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    if (navigator.onLine) {
      checkInternetAccess();
    }

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return { isOnline, hasInternet };
}

export default useInternetStatus;
