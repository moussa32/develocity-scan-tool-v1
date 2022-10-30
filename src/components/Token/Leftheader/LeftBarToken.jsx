import styles from "./LeftBarToken.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTokenInfoResult } from "../../../Services/FetchTokenInfo";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal/Modal";
import ModalForm from "../ModalForm/ModalForm";
import { useTranslation } from 'react-i18next';
import { IconContainer } from "./IconsContainer/IconContainer";
import { Placeholder } from "../../common/Placeholder/Placeholder";
// import axios from "axios";
export function LeftBarToken() {
  // const contractAddress = useSelector(state => state.contractAddress.contractAddress);
  const params = useParams();
  // const [ipaddress, setIpAddress] = useState('');
  const contractAddress = params.contractAddress;
  const tokenData = useSelector((state) => state.Gettokeninfodata.data);
  const tokenstatus = useSelector(state => state.Gettokeninfodata.status);
  const score = useSelector(state => state.Score.data)

  const scoreData = score.result;

  const dispatch = useDispatch();

  

  // useEffect( ()=>{
  //   async function getIp() {
  //    await axios.get("https://api.ipify.org?format=json")
  //    .then((res)=>{
  //      setIpAddress(res.data.ip);
  //      console.log("ipaddress",ipaddress)
  //    } )
  //    .then(()=>{dispatch(fetchTokenInfoResult({contractAddress:contractAddress,ipaddress:ipaddress}));
  //    console.log("nooooooooooo")
  //  } )
  //    // await setIpAddress(data.ip)
  //    // await dispatch(fetchTokenInfoResult({contractAddress:contractAddress,ipaddress:ipaddress}));
  //   } 
  //   getIp()
  //  },[contractAddress, dispatch, ipaddress] )

  useEffect(() => {
    dispatch(fetchTokenInfoResult(contractAddress));
  }, [contractAddress, dispatch]);

  const { t } = useTranslation(["token"])
  const tokeninfodata = tokenData.result;
  const lang=localStorage.getItem("i18nextLng")

  function foramtNumber(val) {
    return Number(val).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const [copiedAddress, setCopyAddress] = useState("Copy Address");
  function copyToClipboard(e) {
    setCopyAddress("Copied Address !");
    navigator.clipboard.writeText(contractAddress);

    setTimeout(() => {
      setCopyAddress("Copy Address");
    }, 2000);
  }


  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {(tokenstatus === 'success') && <>
        {/* <ModalForm show={showModal} close={() => setShowModal(false)} /> */}
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="py-2 ">
              <span className="">
                {tokeninfodata && tokeninfodata.contractInfo.logo ? (
                  <img
                    className={styles.tokenImg}
                    src={tokeninfodata.contractInfo.logo}
                    alt={tokeninfodata.contractInfo}
                  />
                ) : (
                  <div className="d-inline-block ">
                    <div className={`${styles.icon_token_letter1}`}>
                      <h6 className={`${styles.icon_token_text1} `}>
                        {tokeninfodata
                          ? tokeninfodata.contractInfo.name.charAt(0)
                          : null}
                      </h6>
                    </div>
                  </div>
                )}
              </span>
              
              <span className={`${styles.name} `}>
                {tokeninfodata ? tokeninfodata.contractInfo.name : null}
              </span>
              <span className={`ms-2 px-2 me-2 py-1 ${styles.symbol}`}>
                {tokeninfodata ? tokeninfodata.contractInfo.symbol : null}
              </span>
              {
                (scoreData?.contractScan)===0&&<span className= {`py-1 px-2 me-2 ${styles.isScam}`}>Scam</span>
              }
              
              
             
              {/* <span className="ms-2">
                {tokeninfodata && tokeninfodata.isNotListed ? (
                  <>
                    <span className=" me-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="#9F4AE8"
                        className="bi bi-patch-check-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </span>
                  </>
                ) : <span className={`${styles.modalIcon} me-3`} onClick={() => setShowModal(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#DFDFE4"
                    className="bi bi-patch-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                </span>}
              </span> */}
            </div>
            <div className=" py-2 me-0">
              <IconContainer tokeninfodata={tokeninfodata && tokeninfodata} />
            </div>
          </div>

          <div className={`d-flex justify-content-between align-items-center`}>
            <span className={`text-muted pe-2 ${styles.contractaddress}`}>
              {t("token:contract_address")} {" "}
            </span>
            <div>
              <span
                value={contractAddress}
                className={`text-primary pb-1 ms-2 ${styles.contractaddress} ${styles.copiedaddress}`}
                style={{ fontFamily: "SF Pro Display Medium" }}
              >
                {contractAddress
                  ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(
                    -10
                  )}`
                  : ""}
              </span>
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">{copiedAddress}</Tooltip>}
              >
                <span onClick={copyToClipboard} className="d-inline-block">
                  <IoCopy disabled style={{ color: "#888", marginLeft: "4px" }} />
                </span>
              </OverlayTrigger>
            </div>
          </div>

          <div className={styles.contractInfo}>
            <span
              className="me-2 px-2 py-1  mt-2 w-auto d-inline-block"
              style={{ backgroundColor: "rgba(136, 136, 136,0.2)" , height: '29px'}}
            >
              {tokeninfodata && tokeninfodata.contractInfo.logo ? (
                <img
                  className={`rounded-circle`}
                  width={18}
                  src={tokeninfodata.contractInfo.logo}
                  alt={tokeninfodata.contractInfo}
                  style={{marginTop:'-2px'}}
                />
              ) : (
                <div className="d-inline-block">
                  <div className={styles.icon_token_letter2}>
                    <h6 className={styles.icon_token_text2}>
                      {tokeninfodata
                        ? tokeninfodata.contractInfo.name.charAt(0)
                        : null}
                    </h6>
                  </div>
                </div>
              )}

              <span
                style={{ fontFamily: "SF Pro Display Medium" }}
                className="ps-1"
              >
                {tokeninfodata ? tokeninfodata?.contractInfo?.symbol : null}
              </span>
            </span>
            <span
              className="px-2 py-1 me-2 mt-2 d-inline-block"
              style={{ backgroundColor: "rgba(136, 136, 136,0.2)" }}
            >
              {t("token:total_scans")} {tokeninfodata ? tokeninfodata?.interest : null}
            </span>
            <span
              className="px-2 py-1 me-2 mt-2 d-inline-block"
              style={{ backgroundColor: "rgba(136, 136, 136,0.2)" ,fontFamily: "SF Pro Display Medium"}}
            >
              {t("token:launched")}{" "}
              {tokeninfodata
                ? (tokeninfodata?.contractInfo?.age.split("T"))[0]
                : null}
            </span>
            <span
              className="px-2 py-1 mt-2 me-2 d-inline-block"
              style={{ backgroundColor: "rgba(136, 136, 136,0.2)" }}
            >
              {t("token:added")}{" "}
              {tokeninfodata ? (tokeninfodata?.createdAt.split("T"))[0] : null}
            </span>
            <span
              className="px-2 py-1 mt-2 me-2 d-inline-block"
              style={{ backgroundColor: "rgba(136, 136, 136,0.2)" }}
            >
              {tokeninfodata?.isTokenVerification ==='Requested'&&t('token:tokenType.requested')}
              {tokeninfodata?.isTokenVerification ==='PENDING'&&t('token:tokenType.pending')}
              {tokeninfodata?.isTokenVerification ==='REJECTED'&&t('token:tokenType.rejected')}
              {tokeninfodata?.isTokenVerification ==='VERIFIED'&&t('token:tokenType.verified')}
            </span>
           

            { tokeninfodata?.contractInfo?.description &&<> 
               <Modal
               logo={tokeninfodata?.contractInfo?.logo}
               name={tokeninfodata?.contractInfo?.name}
               description={tokeninfodata?.contractInfo?.description}
               symbol={tokeninfodata?.contractInfo?.symbol}
               isnotlisted={tokeninfodata?.isNotListed}
 
             />
             </>
            }
           


          </div>

          <div
            className={`d-flex justify-content-between flex-wrap mt-4 mb-4 ${styles.percent}`}
          >
            <div className="">
              <h5 className="text-muted ">{t("token:current_price")}</h5>
              <p className="mb-2">
                {
                  lang==='ar'?<>{tokeninfodata ? tokeninfodata.contractInfo.tokenPriceUSD : null}$</>:<>${tokeninfodata ? tokeninfodata.contractInfo.tokenPriceUSD : null}</>
                }
                
              </p>
            </div>
            <div className="">
              <h5 className="text-muted ">{t("token:market_cap")}</h5>
              <p className="fs-5 mb-2">
                {
                  lang==='ar'?
                  <>
                  
                {tokeninfodata
                  ? foramtNumber(tokeninfodata.contractInfo.market_cap)
                  : null}$
                  </>:
                  <>
                  $
                {tokeninfodata
                  ? foramtNumber(tokeninfodata.contractInfo.market_cap)
                  : null}
                  </>
                }
                
              </p>
            </div>
            <div className="">
              <h5 className="text-muted ">{t("token:total_supply")}</h5>
              <p className="fs-5 mb-2">
                {
                  lang==='ar'?
                  <>
                  {tokeninfodata
                  ? foramtNumber(tokeninfodata.contractInfo.total_supply)
                  : null}
                  <span className="pe-1"></span>
                  {tokeninfodata ? tokeninfodata.contractInfo.symbol : null} 
                    
                
                  </>:
                  
                  <>
                    {tokeninfodata
                  ? foramtNumber(tokeninfodata.contractInfo.total_supply)
                  : null}{" "}
                {tokeninfodata ? tokeninfodata.contractInfo.symbol : null}
                  </>
                }
              
              </p>
            </div>
          </div>
        </div>
      </>
      }

      {
        (tokenstatus === 'loading') && 
        <>
         <div className="w-100">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="py-2 d-flex align-items-center">
             
              <Placeholder styling={ {width:'50px',height:'50px',borderRadius:'50%',marginRight:'8px'}}/>
              <Placeholder styling={ {width:'50px',height:'20px',marginRight:'8px'}}/>
              <Placeholder styling={ {width:'50px',height:'20px',marginRight:'8px'}}/>
              <Placeholder styling={ {width:'50px',height:'20px',marginRight:'8px'}}/>
             
              
            </div>

            <div className="d-flex py-2 me-0">
            <Placeholder styling={ {width:'24px',height:'24px',marginRight:'8px',borderRadius:'50%'}}/>
            <Placeholder styling={ {width:'24px',height:'24px',marginRight:'8px',borderRadius:'50%'}}/>
            <Placeholder styling={ {width:'24px',height:'24px',marginRight:'8px',borderRadius:'50%'}}/>
            </div>
          </div>

          <div className={`d-flex justify-content-between flex-wrap`}>
          <Placeholder styling={ {width:'120px',height:'20px'}}/>
          <Placeholder styling={ {width:'120px',height:'20px'}}/>
          </div>

          <div className="d-flex flex-wrap ">
            {
              lang==='ar' ?
              <>
               {[1,1,1,1].map((item, index)=>(
               <Placeholder styling={ {width:'100px',height:'20px',marginLeft:'8px'}} key={index}/>
            ) )}
              </>:
              
              <>
               {[1,1,1,1].map((item ,index)=>(
               <Placeholder key={index} styling={ {width:'100px',height:'20px',marginRight:'8px'}}/>
            ) )}
              </>
            }
           
            
          </div>

          <div
            className={`d-flex justify-content-between flex-wrap mt-4 mb-4 ${styles.percent}`}>
            <div>
              <Placeholder styling={ {width:'100px',height:'20px'}}/>
              <Placeholder styling={ {width:'100px',height:'20px'}}/>
            </div>
            <div>
              <Placeholder styling={ {width:'100px',height:'20px'}}/>
              <Placeholder styling={ {width:'100px',height:'20px'}}/>
            </div>
            <div>
              <Placeholder styling={ {width:'100px',height:'20px'}}/>
              <Placeholder styling={ {width:'100px',height:'20px'}}/>
            </div>
          </div>
        </div>
        </>
      }
    </>
  );
}




