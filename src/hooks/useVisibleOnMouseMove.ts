import { useEffect, useState } from "react";

export const useVisisbleOnMouseMove = (delay: number): boolean => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    const onMouseMove = () => {
      setVisible(true);

      window.clearTimeout(timer);

      timer = window.setTimeout(() => setVisible(false), delay);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [delay]);

  return visible;
};
