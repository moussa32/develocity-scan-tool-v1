import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
// import LiquidtyTable from '../LiquidtyTable/LiquidtyTable'
import LockedTokens from "../LockedTokens/LockedTokens";
// import { useTranslation } from 'react-i18next';

const LockedSection = () => {
  const LockedTokensData = useSelector(state => state.tokenOwner.tokenOwner);

  // const { t } = useTranslation(["token"])
  return (
    <Tabs
      defaultActiveKey={LockedTokensData?.ownerInfo?.lockedToken.length > 0 ? "LockedTokens" : "LockedLiquidity"}
      id="uncontrolled-tab-example"
    >
      {LockedTokensData?.ownerInfo?.lockedToken.length > 0 && (
        <Tab eventKey="LockedTokens" title="Liquidty Tokens">
          <LockedTokens LockedTokensData={LockedTokensData} />
        </Tab>
      )}
      {/* <Tab eventKey="LockedLiquidity" title="Locked Liquidity">
                <LiquidtyTable />
            </Tab> */}
    </Tabs>
  );
};

export default LockedSection;
