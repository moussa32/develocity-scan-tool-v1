import BSCNetworkIcon from "../assets/images/BSC.png";
import ETHNetworkIcon from "../assets/images/eth.png";
import POLNetworkIcon from "../assets/images/polygon.png";

const supportedNetworks = {
  binance: {
    id: 1,
    name: "binance",
    shortName: "BSC",
    icon: BSCNetworkIcon,
  },
  ethereum: {
    id: 2,
    name: "ethereum",
    shortName: "ETH",
    icon: ETHNetworkIcon,
  },
  polygon: {
    id: 3,
    name: "polygon",
    shortName: "MATIC",
    icon: POLNetworkIcon,
  },
};

export const getNetworkDetails = networkName => supportedNetworks[networkName.toLowerCase()];
