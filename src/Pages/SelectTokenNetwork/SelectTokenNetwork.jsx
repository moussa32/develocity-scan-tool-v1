import { NavBar } from "../../components/Home/Header/NavBar";
import CopyRight from "../../components/Home/CopyRight/CopyRight";
import styles from "./SelectTokenNetwork.module.css";
import { Link, useLoaderData, useParams } from "react-router-dom";
import BSCLogo from "../../assets/images/BSC.png";
import ETHLogo from "../../assets/images/eth.png";
import MATICLogo from "../../assets/images/polygon.png";
import { Fragment } from "react";

const SelectTokenNetwork = () => {
  const { contractAddress } = useParams();
  let {
    data: { networks },
  } = useLoaderData();

  const renderNetworkButton = networkName => {
    switch (networkName) {
      case "Binance":
        return (
          <Link className={styles.selectNetworkButton} to={`/token/BSC/${contractAddress}`}>
            <img className={styles.selectNetworkIcon} src={BSCLogo} alt="Binance Smart Chain Network" />
            BSC Network
          </Link>
        );
      case "Ethereum":
        return (
          <Link className={styles.selectNetworkButton} to={`/token/ETH/${contractAddress}`}>
            <img className={styles.selectNetworkIcon} src={ETHLogo} alt="Etherum Network" />
            Etherum Network
          </Link>
        );

      case "Polygon":
        return (
          <Link className={styles.selectNetworkButton} to={`/token/MATIC/${contractAddress}`}>
            <img className={styles.selectNetworkIcon} src={MATICLogo} alt="MATIC Network" />
            Polygon Network
          </Link>
        );
    }
  };

  return (
    <>
      <NavBar />
      <section className={`${styles.pageContainer} container`}>
        <div className={`${styles.selectNetworkContainer}`}>
          {networks?.map(network => (
            <Fragment key={network}>{renderNetworkButton(network)}</Fragment>
          ))}
        </div>
      </section>
      <div style={{ marginTop: "-90px" }}>
        <CopyRight />
      </div>
    </>
  );
};

export default SelectTokenNetwork;
