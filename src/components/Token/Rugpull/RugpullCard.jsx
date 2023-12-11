import styles from "./RugpullStyle.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Placeholder } from "../../common/Placeholder/Placeholder";
import ErrorPart from "../../common/ErrorPart";

export function RugpullCard() {
  const bscdata_status = useSelector(state => state.contractAnalysis.status);
  const LPtokenBalance_percentage = useSelector(state => state.tokenOwner.tokenOwner);
  const { t } = useTranslation(["token"]);

  let percentage = Math.round(
    LPtokenBalance_percentage?.ownerInfo?.pairsInfo[0]?.LPtokenBalance_percentage +
      LPtokenBalance_percentage?.ownerInfo?.pairsInfo[1]?.LPtokenBalance_percentage +
      LPtokenBalance_percentage?.ownerInfo?.pairsInfo[2]?.LPtokenBalance_percentage
  );
  if (isNaN(percentage)) {
    percentage = Math.round(LPtokenBalance_percentage?.ownerInfo?.LPtokenBalance_percentage);
  }
  if (bscdata_status === "failed") return <ErrorPart message="Failed to load data from server" />;

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardHeader}>{t("token:rugpull")}</h2>

      {bscdata_status === "loading" && (
        <div className={styles.loader}>
          <Placeholder styling={{ width: "100%", height: "104px" }} />
        </div>
      )}

      {bscdata_status === "success" && !isNaN(percentage) && (
        <>
          {percentage <= 20 ? (
            <div className={`${styles.card} ${styles.cardGreen}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#16c784"
                className="bi bi-check-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
              </svg>
              <div>
                <h3 className={styles.cardTitle}>{t("token:rugpull_test_detected")}</h3>
                <p>
                  <span>{t("token:rugpullTest.takingOwners")}</span>
                  {!isNaN(percentage) ? (
                    <span> {percentage}% </span>
                  ) : (
                    <span style={{ transform: "translateY(-1px)", display: "inline-block" }}>
                      <Placeholder styling={{ width: "20px", height: "10px", display: "inline-block" }} />
                    </span>
                  )}
                  <span> {t("token:rugpullTest.notdetected")}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className={`${styles.card} ${styles.cardYellow}`}>
              <div>
                <span>
                  <span className={styles.rgIcon}>!</span>
                </span>
              </div>
              <div className="text-start ps-2 pt-1">
                <h3 className={styles.cardTitle}>{t("token:rugpull_test_notdetected")}</h3>
                <p>
                  <span>{t("token:rugpullTest.takingOwners")}</span>
                  {!isNaN(percentage) ? (
                    <span> {percentage}% </span>
                  ) : (
                    <span style={{ transform: "translateY(-1px)", display: "inline-block" }}>
                      <Placeholder styling={{ width: "20px", height: "10px", display: "inline-block" }} />
                    </span>
                  )}
                  <span>{t("token:rugpullTest.detected")}</span>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
