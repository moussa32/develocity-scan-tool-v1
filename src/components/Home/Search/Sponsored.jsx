import styles from "./Sponsored.module.css";
import { useTranslation } from "react-i18next";

const Sponsored = () => {
  const { t, i18n } = useTranslation(["common"]);

  const direction = i18n.dir();

  return (
    <div className={styles.searchNote2}>
      <span
        className={`${styles.sponsoredTag} ${direction === "rtl" ? styles.sponsoredTag_rtl : styles.sponsoredTag_ltr}`}
      >
        {t("common:sponsored")}
      </span>
      <a className={styles.note2} href="https://develocity.finance">
        <img
          src="../../logo.png"
          className={direction === "rtl" ? styles.sponsoredIcon_rtl : styles.sponsoredIcon_ltr}
        />
        {t("common:invest")}
      </a>
    </div>
  );
};

export default Sponsored;
