import styles from "./LeftBarToken.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoCopy } from "react-icons/io5";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal/Modal";
import { useTranslation } from "react-i18next";
import { IconContainer } from "./IconsContainer/IconContainer";
import VerificationIcon from "../../../assets/images/verification.png";
import LeftBarLoader from "./LeftBarLoader";
import icon from "../../../assets/images/popup.png";
import SubmitToken from "./Modal/SubmitToken";
import { convertFromScientificNotation } from "../../../util/scientificNotation";
import SpacialNumber from "../../common/SpacialNumber";
import BSCLogo from "../../../assets/images/BSC.png";
import { getNetworkDetails } from "../../../util/tokenSupportedNetworks";

function formatNumber(val) {
  return Number(val).toLocaleString("en-US");
}

function formatBigNumbers(number) {
  const suffixes = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
  ];
  const suffixIndex = Math.floor(Math.log10(Number(number.replace(/,/g, ""))) / 3);
  const suffix = suffixes[suffixIndex];

  const scaledNumber = Number(number.replace(/,/g, "")) / Math.pow(1000, suffixIndex);
  const roundedNumber = Math.round(scaledNumber * 100) / 100; // Round to 2 decimal places

  return roundedNumber + " " + suffix;
}

export function LeftBarToken() {
  const { contractAddress } = useParams();
  const tokenData = useSelector(state => state.contractInfoDetails.data);
  const tokenStatus = useSelector(state => state.contractInfoDetails.status);
  const score = useSelector(state => state.Score.data);
  const bscdata = useSelector(state => state.contractAnalysis.data);
  const bscstatus = useSelector(state => state.contractAnalysis.status);
  const [copiedAddress, setCopyAddress] = useState("Copy Address");
  const [showModal, setShowModal] = useState(false);

  const scoreData = score.result;
  const newbscdata = bscdata.result;

  const { t } = useTranslation(["token"]);
  const tokenInfoData = tokenData.result;
  const lang = localStorage.getItem("i18nextLng");

  function copyToClipboard(e) {
    setCopyAddress("Copied Address !");
    navigator.clipboard.writeText(contractAddress);

    let resetCopyAddressText = setTimeout(() => {
      setCopyAddress("Copy Address");
      clearTimeout(resetCopyAddressText);
    }, 2000);
  }

  const handleTokenCurrentPrice = value => {
    const stringNumber = value.toString();
    if (stringNumber.includes("e")) {
      const { zeroCounts, numbersAfterZero, parsedNumber } = convertFromScientificNotation(stringNumber);
      return <SpacialNumber numbersAfterZero={numbersAfterZero} zeroCounts={zeroCounts} parsedNumber={parsedNumber} />;
    } else {
      if (Number(value) > 0) {
        return Number(value).toFixed(4).toString();
      } else {
        return stringNumber;
      }
    }
  };

  if (tokenStatus === "loading" || !tokenStatus) return <LeftBarLoader lang={lang} />;
  if (tokenStatus === "failed") return <div>{t("get_token_info_error")}</div>;

  return (
    <section className={styles.tokenInfoHeader}>
      <SubmitToken showModal={showModal} handleClose={() => setShowModal(false)} />
      {tokenInfoData.contractInfo.logo ? (
        <img className={styles.tokenImg} src={tokenInfoData.contractInfo.logo} alt={tokenInfoData.contractInfo} />
      ) : (
        <div className="d-inline-block">
          <div className={`${styles.icon_token_letter1}`}>
            <h6 className={`${styles.icon_token_text1} `}>
              {tokenInfoData ? tokenInfoData.contractInfo.name.charAt(0) : null}
            </h6>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className={styles.name}>{tokenInfoData ? tokenInfoData.contractInfo.name : null}</h1>
          <span className={`ms-2 px-2 me-2 py-1 ${styles.symbol}`}>
            {tokenInfoData ? tokenInfoData.contractInfo.symbol : null}
          </span>
          {scoreData?.contractScan === 0 && <span className={`py-1 px-2 me-2 ${styles.isScam}`}>Scam</span>}

          <span className="ms-2">
            {tokenInfoData && tokenInfoData.isNotListed && <img src={VerificationIcon} width={18} alt="verified" />}
          </span>

          <IconContainer tokenInfoData={tokenInfoData} />
        </div>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            <span className={styles.contractaddress}>{t("token:contract_address")}:</span>
            <div>
              &nbsp;
              <span
                value={contractAddress}
                className={`text-primary ${styles.contractaddress} ${styles.copiedaddress}`}
              >
                {contractAddress}
              </span>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{copiedAddress}</Tooltip>}>
                <span onClick={copyToClipboard} className="d-inline-block">
                  <IoCopy disabled style={{ color: "#888", marginLeft: "4px" }} />
                </span>
              </OverlayTrigger>
            </div>
          </div>

          <div className={styles.contractInfo}>
            <span className={styles.contractInfoItem}>
              {tokenInfoData && tokenInfoData.contractInfo.logo ? (
                <img
                  className={`rounded-circle`}
                  width={16}
                  src={tokenInfoData.contractInfo.logo}
                  alt={tokenInfoData.contractInfo}
                />
              ) : (
                <div className="d-inline-block">
                  <div className={styles.icon_token_letter2}>
                    <h6 className={styles.icon_token_text2}>
                      {tokenInfoData.contractInfo ? tokenInfoData.contractInfo.name.charAt(0) : null}
                    </h6>
                  </div>
                </div>
              )}

              <span className="ps-1">{tokenInfoData ? tokenInfoData?.contractInfo?.symbol : null}</span>
            </span>
            {tokenInfoData.interest && (
              <span className={styles.contractInfoItem}>
                {t("token:total_scans")} {tokenInfoData.interest}
              </span>
            )}
            {tokenInfoData.contractInfo && tokenInfoData.contractInfo.age && (
              <span className={styles.contractInfoItem}>
                {t("token:launched")} {tokenInfoData.contractInfo.age.split("T")[0]}
              </span>
            )}
            {tokenInfoData.createdAt && (
              <span className={styles.contractInfoItem}>
                {t("token:added")} {tokenInfoData.createdAt.split("T")[0]}
              </span>
            )}
            {bscstatus === "success" && newbscdata?.sourceCode && (
              <span className={styles.contractInfoItem}>
                {newbscdata?.sourceCode === "VERIFED"
                  ? t("token:tokenType.verified")
                  : t("token:tokenType.notVerified")}
              </span>
            )}
            {tokenInfoData?.contractInfo?.description && (
              <>
                <span
                  className={styles.contractInfoItem}
                  style={{
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#ViewMore"
                >
                  {t("token:view_more")} <img src={icon} height="10" width="10" alt="view more" />
                </span>
                <Modal
                  logo={tokenInfoData?.contractInfo?.logo}
                  name={tokenInfoData?.contractInfo?.name}
                  description={tokenInfoData?.contractInfo?.description}
                  symbol={tokenInfoData?.contractInfo?.symbol}
                  isnotlisted={tokenInfoData?.isNotListed}
                />
              </>
            )}
            {tokenInfoData.networks &&
              tokenInfoData.networks.length > 0 &&
              tokenInfoData.networks.map(network => (
                <div className={styles.network}>
                  <img
                    className={styles.networkLogo}
                    src={getNetworkDetails(network).icon}
                    alt={getNetworkDetails(network).name}
                    title={getNetworkDetails(network).name}
                  />
                  <span className={styles.networkName}>{getNetworkDetails(network).shortName}</span>
                </div>
              ))}
          </div>
        </div>
        <div className={`d-flex justify-content-between flex-wrap mt-4 mb-4 ${styles.percent}`}>
          <div className="">
            <h5 className="text-muted ">{t("token:current_price")}</h5>
            <p className="mb-2 d-flex align-items-center">
              <span>$</span>
              {tokenInfoData && handleTokenCurrentPrice(tokenInfoData.contractInfo.tokenPriceUSD)}
            </p>
          </div>
          <div className="">
            <h5 className="text-muted ">{t("token:market_cap")}</h5>
            <p className="fs-5 mb-2">
              {lang === "ar" ? (
                <>{tokenInfoData ? formatNumber(tokenInfoData.contractInfo.market_cap) : null}$</>
              ) : (
                <>${tokenInfoData ? formatNumber(tokenInfoData.contractInfo.market_cap) : null}</>
              )}
            </p>
          </div>
          <div className="">
            <h5 className="text-muted ">{t("token:total_supply")}</h5>
            <p className="fs-5 mb-2">
              {lang === "ar" ? (
                <>
                  {tokenInfoData ? formatBigNumbers(tokenInfoData.contractInfo.total_supply) : null}
                  <span className="pe-1"></span>
                  {tokenInfoData ? tokenInfoData.contractInfo.symbol : null}
                </>
              ) : (
                <>
                  {tokenInfoData ? formatBigNumbers(tokenInfoData.contractInfo.total_supply) : null}{" "}
                  {tokenInfoData ? tokenInfoData.contractInfo.symbol : null}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
