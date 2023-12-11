import { useState } from "react";
import styles from "./RowScans.module.css";
import { Link } from "react-router-dom";
import VerificationIcon from "../../../assets/images/verification.png";

// import { useTranslation } from 'react-i18next';
const RowScans = ({
  number,
  image,
  nametoken,
  score,
  scam,
  sponsored,
  contract,
  displayValue,
  isVerifyed,
  price,
  network,
  activeNetwork,
  handleNetwork,
}) => {
  // const calculateTimeAgo = () => {
  //   let date1, date2, total_seconds, total_minutes, total_hours, days_difference, month_difference;
  //   if (displayValue === "Time Ago") {
  //     date1 = new Date();
  //     date2 = new Date(scan);
  //     total_seconds = Math.abs(date2 - date1) / 1000;
  //     total_minutes = Math.floor(total_seconds / 60);
  //     total_hours = Math.floor(total_minutes / 60);
  //     days_difference = Math.floor(total_hours / 24);
  //     month_difference = Math.floor(days_difference / 30);
  //   }
  //   if (month_difference > 0) {
  //     return `${
  //       month_difference > 1 ? `${Math.floor(month_difference)} months` : `${Math.floor(month_difference)} month`
  //     } `;
  //   } else if (days_difference > 0) {
  //     return `${days_difference > 1 ? `${days_difference} days` : `${days_difference} day`} `;
  //   } else if (total_hours > 0) {
  //     return `${total_hours} h`;
  //   } else if (total_minutes > 0) {
  //     return `${total_minutes} m`;
  //   } else if (total_seconds > 0) {
  //     return `${Math.floor(total_seconds)} s`;
  //   }
  // };

  const handleClickOnNetwork = (event, selectedNetwork) => {
    event.stopPropagation();
    event.preventDefault();
    handleNetwork(selectedNetwork);
  };

  const lang = localStorage.getItem("i18nextLng");
  return (
    <Link className={`text-decoration-none row ${styles.container_row}`} to={`/token/${network.shortName}/${contract}`}>
      <div className={`col-8 ${styles.header}`}>
        <h3 className={lang === "ar" ? styles.header_no_right : styles.header_no_left}>{number}</h3>
        <div className={styles.container_image}>
          {/* {sponsored && <div className={styles.container_sponsored}>
                        <h6 className={styles.sponsored}>sponsored</h6>
                    </div>} */}
          {image ? (
            <img src={image} alt="star" className={lang === "ar" ? styles.icon_token_right : styles.icon_token_left} />
          ) : (
            //    create a new image with the first letter of the name token
            <div className={lang === "ar" ? styles.icon_token_letter_right : styles.icon_token_letter_left}>
              <h6 className={styles.icon_token_text}>{nametoken.charAt(0)}</h6>
            </div>
          )}

          <h3 className={styles.header_token}>
            {nametoken.length > 36 ? nametoken.substring(0, 36) + "..." : nametoken}
          </h3>

          {isVerifyed && (
            <img src={VerificationIcon} className={styles.icon_token_left} alt="Verified" title="Verified" />
          )}
        </div>
      </div>

      <div className="col-2">
        <div
          className={`${styles.token_network_wrapper} ${
            activeNetwork === network?.id && styles.active_token_network_wrapper
          }`}
          onClick={event => handleClickOnNetwork(event, network)}
        >
          <img className={styles.token_network_logo} src={network?.icon} alt={network?.name} title={network?.name} />
        </div>
      </div>

      {/* {scam===0 && <span className="isScam " style={{height:'18px', lineHeight:'18px', paddingTop:'0px'}}>Scam</span>} */}
      {/* {score? <span className="isScam">Scam</span>:<span className="isNotScam">Scam</span>} */}
      <div className={`col-2 ${styles.tokenValue}`}>
        <h3 className={styles.tokenScans}>
          {displayValue}
          {/* {displayValue === "Time Ago" && calculateTimeAgo()} */}
        </h3>
        {/*This code has been commented due for refactors*/}
        {/* <div className="col-5 px-0 text-end">
            <span
              className={`${styles.header_scans} ${score < 59 && styles.header_scans_red} ${
                score >= 59 && score < 85 && styles.header_scans_yellow
              } ${score >= 85 && styles.header_scans_green}`}
            >
              {title === "Price" ? `$${score}` : score}
            </span>
          </div> */}
      </div>
    </Link>
  );
};

export default RowScans;
