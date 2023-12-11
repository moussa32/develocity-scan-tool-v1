import { useSelector } from "react-redux";
import ListGroup from "../ListGroupReuse/ListGroup";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export function Trading() {
  const contractSellCapi = useSelector(state => state.contractTax.data);
  const contractStatusCapi = useSelector(state => state.contractTax.status);

  const { t } = useTranslation(["token"]);

  const contractTaxData = contractSellCapi.result;

  const data = useMemo(
    () => [
      {
        name: t("token:buy"),
        value: contractTaxData ? contractTaxData.buyGasFeeUSD : null,
      },
      {
        name: t("token:sell"),
        value: contractTaxData ? contractTaxData.sellGasFeeUSD : null,
      },
      {
        name: t("token:gas"),
        value: contractTaxData ? contractTaxData.tranferGasFeeUSD : null,
      },
    ],
    [contractTaxData]
  );

  if (contractStatusCapi === "failed") return "";

  return (
    <>
      {(contractStatusCapi === "success" || contractStatusCapi === "loading") && (
        <>
          <div className="col-12 col-md-6" style={{ flex: "0 1 100%" }}>
            <h2 style={{ fontFamily: "SF Pro Display Medium", fontSize: "26px", color: "#888888", marginBottom: 0 }}>
              {t("token:trading")}
            </h2>
            <ListGroup listdata={data} title={t("token:gas_fee")} info={t("token:infoDescription.gasFeeInfo")} />
          </div>
        </>
      )}
    </>
  );
}
