import { useEffect, useState } from "react";

const mediaQueryList = () => window.matchMedia("(prefers-color-scheme: dark");

const prefersDarkMode = () => mediaQueryList().matches;

export const useDarkMode = (): boolean => {
  const [darkMode, setDarkMode] = useState(prefersDarkMode());

  useEffect(() => {
    const listener = () => setDarkMode(prefersDarkMode());

    mediaQueryList().addListener(listener);

    return () => mediaQueryList().removeListener(listener);
  }, []);

  return darkMode;
};
