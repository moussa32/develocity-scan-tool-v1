import { useTranslation } from "react-i18next";
import TokenTable from "../TokenTable";

const LiquidtyTable = ({ transaction }) => {
  const { t } = useTranslation(["token"]);
  const transactionData = [];

  const columns = [
    {
      accessor: "id",
      Header: "Rank",
      width: 15,
      minWidth: 50,
      maxWidth: 90,
    },
    {
      accessor: "hash",
      Header: t("token:hash"),
      minWidth: 50,
      maxWidth: 100,
    },
    {
      accessor: "fromAddress",
      Header: t("token:fromaddress"),
      minWidth: 50,
      maxWidth: 90,
    },
    {
      accessor: "toAddress",
      Header: t("token:toaddress"),
      minWidth: 50,
      maxWidth: 90,
    },

    {
      accessor: "amount",
      Header: t("token:amount"),
      minWidth: 50,
      maxWidth: 90,
    },
    {
      accessor: "tokenSymbol",
      Header: t("token:tokenSymbol"),
      minWidth: 50,
      maxWidth: 90,
    },
  ];

  if (transaction && transaction.transactions) {
    for (let i = 0; i < transaction.transactions.length; i++) {
      let id = i + 1;
      let fromAddress =
        transaction.transactions[i].from.substr(0, 4) + "..." + transaction.transactions[i].from.substr(-4);
      let toAddress = transaction.transactions[i].to.substr(0, 4) + "..." + transaction.transactions[i].to.substr(-4);
      let amount = Number(transaction.transactions[i].value).toFixed(5);
      let tokenSymbol = transaction.transactions[i].tokenSymbol;
      let hash = transaction.transactions[i].hash;
      // let hash = transaction.transactions[i].hash.substr(0, 4) + '...' + transaction.transactions[i].hash.substr(-4)
      transactionData.push({ id, fromAddress, toAddress, amount, tokenSymbol, hash });
    }
  }

  return (
    <>
      <TokenTable columns={columns} data={transactionData} />
    </>
  );
};

export default LiquidtyTable;
