import { memo } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import styles from "./ResultDropdown.module.css";
// import BSCLogo from "../../../assets/images/BSC.png";

const ResultDropdown = ({ contractAddress, logo, name, symbol, contractScan, isScam, network }) => {
  console.log(network);
  const handleClickOnResult = event => {
    event.preventDefault();
    window.location.href = `/token/${network.shortName}/${contractAddress}`;
  };
  const lang = localStorage.getItem("i18nextLng");

  return (
    <div className={styles.resultRecord} onClick={handleClickOnResult}>
      <div className={styles.resultRecordWrapper}>
        {logo ? (
          <img src={logo} alt="logo" className={styles.logo} />
        ) : (
          //create a new image with the first letter of the name token
          <div className={styles.icon_token_letter}>
            <h6 className={styles.icon_token_text}>{name.charAt(0)}</h6>
          </div>
        )}

        <div className={styles.details}>
          <div className={styles.headerTitle}>
            <h2 className={styles.resultTokenName}>{name}&nbsp;&nbsp;</h2>
            <span className={styles.resultTokenTicker}>{symbol}&nbsp;&nbsp;</span>
            {isScam && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#9F4AE8"
                viewBox="0 0 16 16"
                className={`${styles.tokenRecord_verifyIcon} ${styles.tokenRecord_verifyIcon_rtl}`}
              >
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
              </svg>
            )}
          </div>
          <div className={styles.resultTokenDetails}>
            <div className={styles.address}>{contractAddress.slice(0, 8) + "..." + contractAddress.slice(31, 41)}</div>

            {contractScan <= 59 && (
              <div className={`${styles.scanCard} ${styles.scanRed}`}>Score:{Math.round(contractScan)}</div>
            )}

            {contractScan > 59 && contractScan <= 84 && (
              <div className={`${styles.scanCard} ${styles.scanYellow}`}>Score:{Math.round(contractScan)}</div>
            )}

            {contractScan > 84 && (
              <div className={`${styles.scanCard} ${styles.scanGreen}`}>Score:{Math.round(contractScan)}</div>
            )}

            <div className={styles.network}>
              <img className={styles.networkLogo} src={network?.icon} alt={network?.name} title={network?.name} />
              <span className={styles.networkName}>{network?.shortName}</span>
            </div>
          </div>
        </div>
      </div>

      <button className={`${lang === "ar" ? styles.arrowBtn_rtl : styles.arrowBtn_ltr}`}>
        {lang === "ar" ? <BsArrowLeft /> : <BsArrowRight />}
      </button>
    </div>
  );
};

export default memo(ResultDropdown);
