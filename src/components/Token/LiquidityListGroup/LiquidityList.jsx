import { useSelector } from "react-redux";
import ListGroup from "../ListGroupReuse/ListGroup";
import { useTranslation } from "react-i18next";
import styles from "./LiquidityList.module.css";
import { useMemo } from "react";

export function LiquidityList() {
  const liquidityScan = useSelector(state => state.liquidityScan.liquidity);
  const statusLiquidity = useSelector(state => state.liquidityScan.loading);
  const { t } = useTranslation(["token", "common"]);

  // const liquiditydata=liquidityScan?.result
  const data = useMemo(
    () => [
      {
        name: t("token:burned_liquidity"),
        value: liquidityScan ? Number(liquidityScan.burnLiquidityPer).toFixed(2) : null,
      },
      {
        name: t("token:added_liquidity"),
        value: liquidityScan ? Number(liquidityScan.addLiquidityPer).toFixed(2) : null,
      },
      {
        name: t("token:removed_liquidity"),
        value: liquidityScan ? Number(liquidityScan.removeLiquidityPer).toFixed(2) : null,
      },
    ],
    [liquidityScan]
  );

  if (statusLiquidity === false) return "";

  return (
    <>
      {(statusLiquidity === "success" || statusLiquidity === true) && (
        <div className="col-12 col-md-6" style={{ flex: "0 1 100%" }}>
          <h2 style={{ fontFamily: "SF Pro Display Medium", fontSize: "26px", color: "#888888", marginBottom: 0 }}>
            {t("common:liquidity_metrics")}
          </h2>
          <ListGroup listdata={data} title={t("token:liquidity")} info={t("token:infoDescription.liquidityInfo")} />
        </div>
      )}
      {/* <ListGroup listdata={liquidityScan} title="Liquidity" /> */}
    </>
  );
}
