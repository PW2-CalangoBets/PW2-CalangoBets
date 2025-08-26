import "./DepositPage.scss";
import MainHeader from '../../components/header/MainHeader';
import DepositModal from '../../components/depositModal/DepositModal';
import CommonButton from '../../components/common/commonButton/CommonButton';
import ItemList from '../../components/itemList/ItemList';
import { useEffect, useState } from 'react';
import { createTransactionApi, getTransactionsApi } from '../../api/transactionApi';
import { getUserInfoApi } from "../../api/userApi";
type TransactionType = {
    operation: string,
    date: string,
    value: number,
    accountCdb: number
}

type UserInfo = {
  name: string;
  email: string;
  cdb: number;
  totalDeposit: number;
  wins: number;
  looses: number;
}

const DepositPage = () => {
    const [actualMoneyAmount, setActualMoneyAmount] = useState(0);
    const [operationQuantity, setOperationQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [user, setUser] = useState<UserInfo | null>(null);

    const fetchUser = async () => {
        try {
            const data = await getUserInfoApi();
            setUser(data);
            setActualMoneyAmount(data.cdb);
            console.log(user?.name);
        } catch (err) {
            console.error("Erro ao buscar dados do usuário", err);
        }
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactionsApi();
                setTransactions(data);
            } catch {
                setTransactions([]);
                setActualMoneyAmount(0);
            }
        };
        fetchUser();
        fetchTransactions();
    }, []);

    const handleOpenModal = (operation: 'deposit' | 'withdraw') => {
        setActiveTab(operation);
        setIsModalOpen(true);
    };

    const handleThicketsAmount = async () => {
        if (operationQuantity > 0) {
            const operation: "DEPOSIT" | "WITHDRAW" = activeTab === "deposit" ? "DEPOSIT" : "WITHDRAW";

            try {
                await createTransactionApi({
                    operation,
                    value: operationQuantity
                });

                const data = await getTransactionsApi();
                setTransactions(data);
                fetchUser();
            } catch (error) {
                alert("Erro ao registrar transação no servidor: " + error);
            }
        } else {
            alert("Insira um número válido");
        }
    };

    return (
        <div className="DepositPage-container">
            <MainHeader />

            <div className='actual-Money-container'>
                <div className='actual-Money-div'>
                    <p>{actualMoneyAmount} 🪙</p>
                </div>
            </div>

            <div className="transactions-container-super">
                <h2 className="transactions-title">Recarga de Tickets</h2>

                <div className="transactions-header">
                    <span className="balance-text">Tickets: R$ {actualMoneyAmount}</span>
                    <div className="transactions-actions">
                        <CommonButton label='Sacar' onClick={() => handleOpenModal('withdraw')} />
                        <CommonButton label='Depositar' onClick={() => handleOpenModal('deposit')} />
                    </div>
                </div>

                <div className="transactions-list">
                    <div className='table-label'>
                        <p>Operação</p>
                        <p>Data</p>
                        <p>Valor</p>
                        <p>Saldo da conta</p>
                    </div>
                    {transactions.length > 0 && transactions.map((element, index) => (
                        <ItemList
                            key={index}
                            operation={element.operation}
                            date={new Date(element.date).toLocaleString('pt-BR')}
                            value={Number(element.value)}
                            accountTotal={Number(element.accountCdb)}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <DepositModal
                    operation={activeTab}
                    onClick={() => {
                        handleThicketsAmount();
                        setIsModalOpen(false);
                    }}
                    onChangeValue={(value: number) => setOperationQuantity(value)}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default DepositPage;
