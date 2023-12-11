import ListGroup from "../ListGroupReuse/ListGroup";
import { useTranslation } from "react-i18next";

export function Slippage({ tradingSlippage, status }) {
  const { t } = useTranslation(["token"]);

  const data = [
    {
      name: t("token:buy"),
      value: tradingSlippage.result ? Number(tradingSlippage.result.buyTax).toFixed() : null,
    },
    {
      name: t("token:sell"),
      value: tradingSlippage.result ? Number(tradingSlippage.result.sellTax).toFixed() : null,
    },
  ];

  return (
    <>
      {(status === "success" || status === "loading") && (
        <div className="col">
          <ListGroup listdata={data} title={t("token:slippage")} info={t("token:infoDescription.slippageInfo")} />
        </div>
      )}

      {status === "failed" && ""}
    </>
  );
}
