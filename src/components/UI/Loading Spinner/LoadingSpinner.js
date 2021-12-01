import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import styles from "./LoadingSpinner.module.css";
import ModalLoading from "./ModalLoading";

const LoadingSpinner = () => {
  const container = useRef();
  console.log("Loaded")
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../animations/86998-loading-logo-lottie-animation.json"),
    });
  }, []);
  return (
    <ModalLoading>
      <div className={styles.spinner} ref={container}></div>
    </ModalLoading>
  );
};
export default LoadingSpinner;
