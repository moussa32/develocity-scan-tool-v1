import React from "react";
import styles from "./BreadCrumbBar.module.css";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbBar = () => {
  const tokenData = useSelector(state => state.contractInfoDetails.data);
  const { t } = useTranslation(["token"]);
  const lang = localStorage.getItem("i18nextLng");

  const { pathname } = useLocation();
  const tokenInfoData = tokenData.result;

  return (
    <div className="container">
      <div className={styles.breadCrumbBar}>
        <ul className={`${styles.breadCrumbList} ${lang === "ar" ? styles.breadCrumb_rtl : styles.breadCrumb_ltr}`}>
          <Link className={styles.breadCrumbItem} to="/">
            {t("token:home")}
          </Link>
          <Link className={styles.breadCrumbItem} to="/">
            {t("token:scanner")}
          </Link>
          <li className={`${styles.breadCrumbItem} ${pathname.includes("token") ? styles.activeRoute : null}`}>
            {tokenInfoData ? tokenInfoData.contractInfo.name : null}
          </li>
        </ul>
        <div className={styles.btns}>
          {/*<button>download report</button>*/}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    text: "Check This Token",
                    title: "Develocity token report",
                    url: window.location.href,
                  })
                  .catch(console.error);
              } else {
                alert("Your Browser not Support this Service");
              }
            }}
          >
            {t("token:Share")}
            <AiOutlineUpload className={lang === "ar" ? styles.shareIcon_rtl : styles.shareIcon_ltr} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbBar;
