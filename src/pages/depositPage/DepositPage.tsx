import { useNavigate } from 'react-router-dom';
import "./DepositPage.scss";
import MainHeader from '../../components/header/MainHeader';
import DepositModal from '../../components/depositModal/DepositModal';
import CommonButton from '../../components/common/commonButton/CommonButton';
import ItemList from '../../components/itemList/ItemList';
import { useEffect, useState } from 'react';

type transactionType = {
    operation: string,
    date: string,
    value: number,
    accountTotal: number
}

const DepositPage = () => {
    const navigate = useNavigate();
    const [actualMoneyAmount, setActualMoneyAmount] = useState(0);
    const [operationQuantity, setOperationQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [transactions, setTransactions] = useState<transactionType[]>([]);

    useEffect(() => {
        setTransactions([{
            operation: "Depósito",
            date: "12/12/2024",
            value: 100,
            accountTotal: 200
        }]);
    }, []);

    const handleClick = (endereco: string) => {
        navigate(`/${endereco}`);
    };

    const handleOpenModal = (operation: 'deposit' | 'withdraw') => {
        setActiveTab(operation);
        setIsModalOpen(true);
    }

    const handleThicketsAmount = () => {
        if (operationQuantity > 0) {
            if (activeTab == "deposit") {
                setActualMoneyAmount(actualMoneyAmount + operationQuantity);
                handleCreateNewHistoric();
            } else {
                if (actualMoneyAmount - operationQuantity < 0) {
                    alert("Quantidade insuficiente para operação")
                }
                else {
                    setActualMoneyAmount(actualMoneyAmount - operationQuantity);
                    handleCreateNewHistoric();
                }
            }
        } else {
            alert("Insira um número válido");
        }

    }

    const handleCreateNewHistoric = () => {
        transactions.push({
            operation: handleActiveTabNameToString(),
            date: new Date(Date.now()).toLocaleDateString().slice(0, 10),
            value: operationQuantity,
            accountTotal: actualMoneyAmount
        });
    }

    const handleActiveTabNameToString = () => {
        switch (activeTab) {
            case ("deposit"):
                return "Depósito";
            case ("withdraw"):
                return "Saque";
        }
    }

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
                            date={element.date}
                            value={element.value}
                            accountTotal={element.accountTotal}
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
