import { useNavigate } from 'react-router-dom';
import "./DepositPage.scss";
import { useState } from 'react';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import HeaderLink from '../../components/headerLinks/HeaderLinks';
import HeaderButton from '../../components/headerButton/HeaderButton';
import DepositModal from '../../components/depositModal/DepositModal';
import CommonButton from '../../components/commonButton/CommonButton';
import ItemList from '../../components/itemList/ItemList';

const DepositPage = () => {
    const navigate = useNavigate();
    const [actualMoneyAmount, setActualMoneyAmount] = useState(0);
    const [operationQuantity, setOperationQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

    const [transactions, setTransactions] = useState([
        {
            operation: "Depósito",
            date: "12/12/2024",
            value: 100,
            accountTotal: 200
        }
    ])
    const handleClick = (endereco: string) => {
        navigate(`/${endereco}`);
    };

    const handleOpenModal = (operation: 'deposit' | 'withdraw') => {
        setActiveTab(operation);
        setIsModalOpen(true);
    }

    const handleThicketsAmount = () => {
        if(activeTab == "deposit") {
           setActualMoneyAmount(actualMoneyAmount + operationQuantity); 
        } else {
            if(actualMoneyAmount - operationQuantity < 0) {
                alert("Quantidade insuficiente para operação")
            } 
            else setActualMoneyAmount(actualMoneyAmount - operationQuantity); 
        }
        
    }

    return (
        <div className="DepositPage-container">
            <StandardHeader>
                <HeaderLink linkName="Jogos" onClick={() => handleClick('jogos')} />
                <HeaderLink linkName="Sobre" onClick={() => handleClick('sobre')} />
                <HeaderLink linkName="Equipe Calango" onClick={() => handleClick('equipe')} />
                <HeaderButton label="Login" isSpecial={false} onClick={() => handleClick('login')} />
                <HeaderButton label="Cadastre-se" isSpecial={true} onClick={() => handleClick('signup')} />
                <HeaderButton label="Deposite" isSpecial={true} onClick={() => handleClick('deposit')} />
            </StandardHeader>

            <div className='actual-Money-container'>
                <div className='actual-Money-div'>
                    <p>{actualMoneyAmount} 🪙</p>
                </div>
            </div>

            <div className="transactions-container-super">
                <h2 className="transactions-title">Área de transações</h2>

                <div className="transactions-header">
                    <span className="balance-text">Saldo: R$ {actualMoneyAmount}</span>
                    <div className="transactions-actions">
                        <CommonButton label='Sacar' onClick={() => handleOpenModal('withdraw')} />
                        <CommonButton label='Depositar' onClick={() => handleOpenModal('deposit')} />
                    </div>
                </div>

                <div className="transactions-list">
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
                    onChangePix={() => { }}
                    onChangeValue={(value: number) => {setOperationQuantity(value)}}
                />
            )}
        </div>
    );
};

export default DepositPage;
