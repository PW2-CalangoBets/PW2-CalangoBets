import { useNavigate } from 'react-router-dom';
import "./DepositPage.scss";
import { useState } from 'react';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import HeaderLink from '../../components/headerLinks/HeaderLinks';
import HeaderButton from '../../components/headerButton/HeaderButton';

const DepositPage = () => {
    const navigate = useNavigate();
    const [actualMoneyAmmount, setActualMoneyAmmount] = useState(0);
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

            <div className='actual-Money-container'>
                <div className='actual-Money-div'>
                    <p>{actualMoneyAmmount} 🪙</p>
                </div>
            </div>

            <div>
                <div>
                    <div>
                        <h1>Escolha sua operação</h1>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
