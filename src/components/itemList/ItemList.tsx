import "./ItemList.scss"

type TransactionsListProps = {
  operation: string,
  date: string, 
  value: number,
  accountTotal: number
};

const ItemList = ({ operation, date, value, accountTotal}: TransactionsListProps) => {
  return (
    <div className="transaction-item">
        <span className="transaction-label">{operation}</span>
        <span className="transaction-label">{date}</span>
        <span className="transaction-label">R$ {value}</span>
        <span className="transaction-value">R$ {accountTotal}</span>
    </div>
  );
};

export default ItemList;
