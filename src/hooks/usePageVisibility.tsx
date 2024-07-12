import { useState, useEffect } from "react";

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  const handleVisibilityChange = () => {
    setIsVisible(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
};
