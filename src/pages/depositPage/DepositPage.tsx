import { useNavigate } from 'react-router-dom';
import "./DepositPage.scss";
import { useState } from 'react';
import StandardHeader from '../../components/header/headerContainer/HeaderContainer';
import HeaderLink from '../../components/header/headerLinks/HeaderLinks';
import HeaderButton from '../../components/header/headerButton/HeaderButton';
import DepositModal from '../../components/depositModal/DepositModal';

const DepositPage = () => {
    const navigate = useNavigate();
    const [actualMoneyAmmount, setActualMoneyAmmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');

    const handleClick = (endereco: string) => {
        navigate(`/${endereco}`);
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

            {isModalOpen && (
                <DepositModal
                    operation={activeTab === 'deposit' ? 'deposit' : 'sake'}
                    onClick={() => {
                        setIsModalOpen(false); 
                    }}
                    onChagePix={() => { }}
                    onChangeValue={() => { }}
                />
            )}
        </div>
    );
};

export default DepositPage;
