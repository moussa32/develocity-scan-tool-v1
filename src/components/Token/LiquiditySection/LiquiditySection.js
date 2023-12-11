import { Tab, Tabs } from "react-bootstrap";
import AddedLiquidity from "../LiquidtyTable/AddLiquidty";
import LiquidtyTable from "../LiquidtyTable/LiquidtyTable";
import RemovedLiquidity from "../LiquidtyTable/RemovedLiquidity";
import { useTranslation } from "react-i18next";

const LiquiditySection = ({ liquidityData, transaction }) => {
  const { t } = useTranslation(["token"]);
  let Active =
    transaction?.tokenTransaction?.length > 0
      ? "LiquidtyTransactions"
      : liquidityData?.addLiquidityTransaction?.length > 0
      ? "AddedLiquidity"
      : "RemovedLiquidity";

  return (
    <>
      <Tabs defaultActiveKey={Active} id="uncontrolled-tab-example">
        {transaction?.transactions?.length > 0 && (
          <Tab eventKey="LiquidtyTransactions" title={t("token:liquidity_transactions")}>
            <LiquidtyTable transaction={transaction} />
          </Tab>
        )}

        {liquidityData?.addLiquidityTransaction?.length > 0 && (
          <Tab eventKey="AddedLiquidity" title={t("token:added_liquidity")}>
            <AddedLiquidity liquidtyData={liquidityData} />
          </Tab>
        )}
        {liquidityData?.removeLiquidityTransaction?.length > 0 && (
          <Tab eventKey="RemovedLiquidity" title={t("token:removed_liquidity")}>
            <RemovedLiquidity liquidtyData={liquidityData} />
          </Tab>
        )}
      </Tabs>
    </>
  );
};

export default LiquiditySection;
