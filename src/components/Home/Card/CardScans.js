import React from "react";
import { memo } from "react";
import styles from "./CardScans.module.css";
import CardScansLoader from "./CardScansLoader";
import Header from "./Header";
import RowScans from "./RowScans";
// import logo from "../../../assets/images/tron.png";
import { useState } from "react";
import { useCallback } from "react";
import { getNetworkDetails } from "../../../util/tokenSupportedNetworks";

const CardScans = ({ data, caption, colSelector, colValueHandler }) => {
  const [records, setRecords] = useState(data.map(item => ({ ...item, network: getNetworkDetails(item.network) })));
  const [activeNetwork, setActiveNetwork] = useState(null);

  const handleFilterTokensByNetwork = useCallback(
    selectedNetwork => {
      if (activeNetwork === selectedNetwork?.id) {
        setRecords(data.map(item => ({ ...item, network: getNetworkDetails(item.network) })));
        setActiveNetwork(null);
      } else {
        const recordsByNetwork = records.filter(item => item.network?.id === selectedNetwork?.id);
        setRecords(recordsByNetwork);
        setActiveNetwork(selectedNetwork?.id);
      }
    },
    [records, activeNetwork]
  );

  return (
    <div className={styles.container_card}>
      <div className={styles.card}>
        <Header caption={caption} />

        {records.length > 0 ? (
          records.map((item, index) => {
            return (
              <div key={index}>
                {item?.contractInfo && Object.keys(item.contractInfo).length !== 0 && (
                  <>
                    <RowScans
                      isVerifyed={item.isNotListed}
                      number={index + 1}
                      image={item.contractInfo.logo}
                      nametoken={item.contractInfo.name}
                      score={parseInt(item.contractScan)}
                      scan={caption === "Scans" ? parseInt(item.interest) : (item?.updatedAt).toString()}
                      scam={parseInt(item.contractScan.toFixed(0))}
                      contract={item.contractAddress}
                      sponsored="fales"
                      caption={caption}
                      displayValue={colValueHandler ? colValueHandler(item[colSelector]) : item[colSelector]}
                      price={item.price}
                      network={item?.network}
                      activeNetwork={activeNetwork}
                      handleNetwork={handleFilterTokensByNetwork}
                    />
                  </>
                )}
              </div>
            );
          })
        ) : (
          <CardScansLoader caption={caption} />
        )}
      </div>
    </div>
  );
};

export default memo(CardScans);
