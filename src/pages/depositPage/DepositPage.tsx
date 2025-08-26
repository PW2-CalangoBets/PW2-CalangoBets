import "./DepositPage.scss";
import MainHeader from '../../components/header/MainHeader';
import DepositModal from '../../components/depositModal/DepositModal';
import CommonButton from '../../components/common/commonButton/CommonButton';
import ItemList from '../../components/itemList/ItemList';
import { useEffect, useState } from 'react';
import { createTransactionApi, getTransactionsApi } from '../../api/transactionApi';

type transactionType = {
    operation: string,
    date: string,
    value: number,
    accountCdb: number
}

const DepositPage = () => {
    const [actualMoneyAmount, setActualMoneyAmount] = useState(0);
    const [operationQuantity, setOperationQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [transactions, setTransactions] = useState<transactionType[]>([]);

    // Buscar histórico real do backend ao carregar a página
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactionsApi();
                setTransactions(data);
                // Atualiza o saldo com o último valor do histórico, se houver
                if (data.length > 0) {
                    setActualMoneyAmount(data[data.length - 1].accountCdb);
                } else {
                    setActualMoneyAmount(0);
                }
            } catch {
                setTransactions([]);
                setActualMoneyAmount(0);
            }
        };
        fetchTransactions();
    }, []);

    const handleOpenModal = (operation: 'deposit' | 'withdraw') => {
        setActiveTab(operation);
        setIsModalOpen(true);
    };

    const handleThicketsAmount = async () => {
        if (operationQuantity > 0) {
            // Sempre use o saldo do último registro do histórico
            let lastAccountCdb = 0;
            if (transactions.length > 0) {
                lastAccountCdb = transactions[transactions.length - 1].accountCdb;
            }

            let newAmount = lastAccountCdb;
            let operation = '';
            if (activeTab === "deposit") {
                newAmount += operationQuantity;
                operation = "DEPOSIT";
            } else {
                if (lastAccountCdb - operationQuantity < 0) {
                    alert("Quantidade insuficiente para operação");
                    return;
                } else {
                    newAmount -= operationQuantity;
                    operation = "WITHDRAW";
                }
            }
            try {
                await createTransactionApi({
                    operation: operation as "DEPOSIT" | "WITHDRAW",
                    value: operationQuantity,
                    accountCdb: newAmount,
                    date: new Date().toISOString(),
                });
                // Após registrar, busque o histórico atualizado do backend
                const data = await getTransactionsApi();
                setTransactions(data);
                if (data.length > 0) {
                    setActualMoneyAmount(data[data.length - 1].accountCdb);
                } else {
                    setActualMoneyAmount(0);
                }
            } catch (error: any) {
                alert("Erro ao registrar transação no servidor: " + (error?.response?.data?.message || error.message));
            }
        } else {
            alert("Insira um número válido");
        }
    };

    return (
        <div className="DepositPage-container">
            <MainHeader/>

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
                        value={`R$ ${Number(element.value).toLocaleString('pt-BR')}`}
                        accountTotal={`R$ ${Number(element.accountCdb).toLocaleString('pt-BR')}`}
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
                    onChangeValue={(value: number) => { setOperationQuantity(value) }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default DepositPage;