import styles from "./Honey.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Placeholder } from "../../common/Placeholder/Placeholder";

export function HoneypotCard() {
  const contractTax = useSelector(state => state.contractTax.data);
  const contractTaxStatus = useSelector(state => state.contractTax.status);
  const { t } = useTranslation(["token"]);

  const newHoney = contractTax.result;

  return (
    <div className={styles.cardContainer}>
      {(contractTaxStatus === "success" || contractTaxStatus === "loading") && (
        <h2 className={styles.cardHeader}>{t("token:honeypot")}</h2>
      )}
      {contractTaxStatus === "success" && (
        <>
          {newHoney && newHoney.honeypotTest === "PASS" ? (
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
                <h3 className={styles.cardTitle}>{t("token:honeypot_test_passed")}</h3>
                <p> {t("token:Trading_simulation_shows_that_trading_is_open_which_means_token_is_not_a_honeypot")}</p>
              </div>
            </div>
          ) : (
            <div className={`${styles.card} ${styles.cardRed}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#EA3943"
                className="bi bi-x-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
              <div className="text-start ps-2 pt-1">
                <h3 className={styles.cardTitle}>{t("token:honeypot_test_detected")}</h3>
                <p className="text-muted">
                  {t("token:Trading_simulation_shows_that_sell_is_closed_which_means_token_is_a_honeypot")}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      {contractTaxStatus === "loading" && (
        <div className={styles.loader}>
          <Placeholder styling={{ width: "100%", height: "104px" }} />
        </div>
      )}
    </div>
  );
}
