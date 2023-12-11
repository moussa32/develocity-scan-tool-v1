import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TokenTable from "../TokenTable";
import "./WalletsTable.css";

const TransactionTable = ({ transaction }) => {
  const [updatedTransaction, setUpdatedTransaction] = useState([]);
  const { t } = useTranslation(["token"]);

  useEffect(() => {
    if (transaction && transaction.tokenTransaction) {
      let tempTransactionData = [];
      for (let i = 0; i < transaction.tokenTransaction.length; i++) {
        let uniqeKey = i;
        let fromAddress =
          transaction.tokenTransaction[i].from.substr(0, 4) + "..." + transaction.tokenTransaction[i].from.substr(-4);
        let toAddress =
          transaction.tokenTransaction[i].to.substr(0, 4) + "..." + transaction.tokenTransaction[i].to.substr(-4);
        let amount = Number(transaction.tokenTransaction[i].value).toLocaleString("en-US");
        let tokenSymbol = transaction.tokenTransaction[i].tokenSymbol;
        let id =
          transaction.tokenTransaction[i].hash.substr(0, 4) + "..." + transaction.tokenTransaction[i].hash.substr(-4);
        let hash = transaction.tokenTransaction[i].hash;
        tempTransactionData.push({ uniqeKey, fromAddress, toAddress, amount, tokenSymbol, id, hash });
      }
      setUpdatedTransaction(tempTransactionData);
    }
  }, [transaction]);

  const columns = [
    {
      accessor: "id",
      Header: t("token:hash"),
      minWidth: 110,
    },
    {
      accessor: "fromAddress",
      Header: t("token:fromaddress"),
      minWidth: 100,
    },
    {
      accessor: "toAddress",
      Header: t("token:toaddress"),
      minWidth: 100,
    },
    {
      accessor: "amount",
      Header: t("token:amount"),
      minWidth: 50,
      maxWidth: 70,
    },
    {
      accessor: "tokenSymbol",
      Header: t("token:tokenSymbol"),
      minWidth: 42,
      maxWidth: 60,
    },
  ];

  const onSelect = row => {
    window.open(`https://bscscan.com/tx/${row.hash}`, "_blank");
  };

  return (
    <div>
      {updatedTransaction && updatedTransaction.length > 0 && (
        <TokenTable columns={columns} data={updatedTransaction} onRowClick={onSelect} />
      )}
    </div>
  );
};
export default TransactionTable;
