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
        <span className="transaction-label">Operação: {operation}</span>
        <span className="transaction-label">Data: {date}</span>
        <span className="transaction-label">Valor: R$ {value}</span>
        <span className="transaction-value">Conta: R$ {accountTotal}</span>
    </div>
  );
};

export default ItemList;
