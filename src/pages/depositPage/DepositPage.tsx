import { useNavigate } from 'react-router-dom';
import "./DepositPage.scss";
import { useState } from 'react';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import HeaderLink from '../../components/headerLinks/HeaderLinks';
import HeaderButton from '../../components/headerButton/HeaderButton';

const DepositPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');

    const handleClick = (endereco: string) => {
        navigate(`/${endereco}`);
    };

    const handleSubmit = () => {
        if (!amount || isNaN(Number(amount))) {
            alert("Por favor, insira um valor válido.");
            return;
        }
        alert(`${activeTab === 'deposit' ? 'Depósito' : 'Saque'} de R$ ${amount} realizado com sucesso!`);
        setAmount('');
    };

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

            <div className="deposit-withdraw-container">
                <div className="tab-buttons">
                    <button 
                        className={activeTab === 'deposit' ? 'active' : ''} 
                        onClick={() => setActiveTab('deposit')}
                    >
                        Depósito
                    </button>
                    <button 
                        className={activeTab === 'withdraw' ? 'active' : ''} 
                        onClick={() => setActiveTab('withdraw')}
                    >
                        Saque
                    </button>
                </div>

                <div className="form-section">
                    <h2>{activeTab === 'deposit' ? 'Realizar Depósito' : 'Realizar Saque'}</h2>
                    <input 
                        type="number" 
                        placeholder="Valor em R$"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button onClick={handleSubmit}>
                        Confirmar {activeTab === 'deposit' ? 'Depósito' : 'Saque'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
