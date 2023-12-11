import styles from "./ContractAnalysis.module.css";
import { useSelector } from "react-redux";
import { Placeholder } from "../../common/Placeholder/Placeholder";
import { useTranslation } from "react-i18next";
import ErrorPart from "../../common/ErrorPart";

export function ContractAnalysisCard() {
  const bscdata = useSelector(state => state.contractAnalysis.data);
  const bscStatus = useSelector(state => state.contractAnalysis.status);
  const { t } = useTranslation(["token"]);
  const lang = localStorage.getItem("i18nextLng");

  const newbscdata = bscdata.result;
  let data = [
    {
      name: t("token:mint"),
      value: newbscdata ? newbscdata.mint : null,
      // value:true
    },
    {
      name: t("token:burn"),
      value: newbscdata ? newbscdata.burn : null,
      // value:true
    },
    {
      name: t("token:reflection"),
      value: newbscdata ? newbscdata.reflection : null,
      // value:true
    },
    {
      name: t("token:self_distribution"),
      value: newbscdata ? newbscdata.selfdistruction : null,
      // value:false
    },
    {
      name: t("token:transfer_ownership"),
      value: newbscdata ? newbscdata.transferOwnership : null,
      // value:true
    },
    {
      name: t("token:anti_whale"),
      value: newbscdata ? newbscdata.antiWhale : null,
      // value:true
    },
    {
      name: t("token:antibot"),
      value: newbscdata ? newbscdata.antiBot : null,
      // value:false
    },
  ];

  return (
    <>
      {bscStatus === "success" && (
        <div style={{ width: "100%" }}>
          <h2 className={styles.contractAnalysis_title}>{t("contract_analysis")}</h2>
          <div
            className={`align-self-center ${styles.listGroup} ${
              lang === "ar" ? styles.listGroup_rtl : styles.listGroup_ltr
            }`}
          >
            {data.map((item, index) => {
              return (
                <div key={`${item.name}${index}`} className={`${styles.listItem}`}>
                  <p className={`${styles.indicatorName} align-items-center d-flex h-100`}>{item.name}:</p>
                  {item.value === true ? (
                    <span className={`${styles.indicatorStatus} ${styles.detected}`}>{t("token:detected")}</span>
                  ) : (
                    <span className={`${styles.indicatorStatus} ${styles.notdetected}`}>{t("token:not_detected")}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {bscStatus === "loading" && (
        <div style={{ width: "100%" }}>
          <h2 className={styles.contractAnalysis_title}>{t("contract_analysis")}</h2>
          <div
            className={`align-self-center ${styles.listGroup} ${
              lang === "ar" ? styles.listGroup_rtl : styles.listGroup_ltr
            }`}
          >
            {data.map((item, index) => {
              return (
                <div className={styles.listItem} key={index} style={{ height: 35 }}>
                  <div className={`d-flex w-100 justify-content-between text-start ${styles.listitem}`}>
                    <div className="align-items-center d-flex">
                      <Placeholder styling={{ width: "100px", height: "8px", minHeight: 8 }} />
                    </div>
                    <div className="align-items-center d-flex">
                      <Placeholder styling={{ width: "50px", height: "8px", minHeight: 8 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {bscStatus === "failed" && <ErrorPart message="Failed to get data from server" />}
    </>
  );
}
