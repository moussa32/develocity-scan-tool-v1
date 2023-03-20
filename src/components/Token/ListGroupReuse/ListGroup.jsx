import HeaderText from "../HeaderText/HeaderText";
import { Placeholder } from "../../common/Placeholder/Placeholder";
import styles from "./ListGroup.module.css";
import { useTranslation } from "react-i18next";

export function ListGroup({ listdata, title, info }) {
  const { t } = useTranslation(["token"]);
  const lang = localStorage.getItem("i18nextLng");
  // دي كل الداتا اللي بترجع من api
  // if (listdata) {
  //     console.log("listdata", listdata);
  // listdata.addLiquidityPer
  // listdata.removeLiquidityPer
  // listdata.burnLiquidityPer
  // }
  let stylingdata = {
    width: "100px",
    height: "20px",
  };

  return (
    <>
      <div className={`text-muted  mt-3 ${lang === "ar" ? styles.title_rtl : styles.title_ltr}`}>
        <HeaderText nameHeader={title} title={info} />
      </div>

      <div className={`mx-2 ${lang === "ar" ? styles.groupcard_rtl : styles.groupcard_ltr}`}>
        {listdata ? (
          <>
            {listdata.map((i, index) => (
              <div
                key={index}
                className={`d-flex justify-content-between  px-3 py-2 border-bottom  ${styles.listitemcontainer} `}
              >
                {i.value || i.value == 0 ? (
                  <>
                    {i.name}
                    {title === t("token:slippage") && <span className="">{i.value}%</span>}
                    {title === t("token:gas_fee") && <span>${i.value}</span>}
                    {title === t("token:liquidity") && <span>{i.value}%</span>}
                  </>
                ) : (
                  <>
                    <Placeholder styling={stylingdata} />
                    <Placeholder styling={{ width: "50px", height: "20px" }} />
                  </>
                )}
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
