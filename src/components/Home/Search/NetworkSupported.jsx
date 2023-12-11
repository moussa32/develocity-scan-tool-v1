import { useTranslation } from "react-i18next";
import styles from "./NetworkSupported.module.css";
// import arbitrumLogo from "../../../assets/images/chains/arbitrum-logo.svg";
// import avalancheLogo from "../../../assets/images/chains/avalanche-logo.svg";
// import bscLogo from "../../../assets/images/chains/binance-logo.png";
// import cronoLogo from "../../../assets/images/chains/crono-logo.svg";
// import ethLogo from "../../../assets/images/chains/eth-logo.svg";
// import optimismLogo from "../../../assets/images/chains/optimism-logo.svg";
// import polygonLogo from "../../../assets/images/chains/polygon-logo.svg";
// import zksyncLogo from "../../../assets/images/chains/zksync-logo.svg";

const NetworkSupported = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div className={styles.supportedNetworks}>
      {/* <h2>{t("supports")}</h2>
      <img src={arbitrumLogo} />
      <img src={avalancheLogo} />
      <img src={bscLogo} />
      <img src={cronoLogo} />
      <img src={ethLogo} />
      <img src={optimismLogo} />
      <img src={polygonLogo} />
      <img src={zksyncLogo} /> */}
    </div>
  );
};

export default NetworkSupported;
