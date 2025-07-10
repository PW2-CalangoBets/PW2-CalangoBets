import { useNavigate } from 'react-router-dom';
import "./DepositPage.scss";
import { useState } from 'react';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import HeaderLink from '../../components/headerLinks/HeaderLinks';
import HeaderButton from '../../components/headerButton/HeaderButton';
import DepositModal from '../../components/depositModal/DepositModal';
import CommonButton from '../../components/commonButton/CommonButton';

const DepositPage = () => {
    const navigate = useNavigate();
    const [actualMoneyAmount, setActualMoneyAmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

    const handleClick = (endereco: string) => {
        navigate(`/${endereco}`);
    };

    const handleOpenModal = (operation: 'deposit' | 'withdraw') => {
        setActiveTab(operation);
        setIsModalOpen(true);
    }

    const handleThicketsAmount = () => {
        setActualMoneyAmount(100);
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

            <div className='infos'>
                <div className='infos-container'>
                    <h2 className="transactions-title">Área de Transações</h2>
                    <p className="transactions-description">
                        Bem-vindo à sua área de transações. Aqui você pode realizar saques e
                        depósitos de forma segura, rápida e claro, ganhando muito xd.
                    </p>
                    <p className="transactions-terms">
                        Ao prosseguir, você concorda com nossos <a href="/termos-de-uso" target="_blank">Termos de Uso</a> e <a href="/politica-de-privacidade" target="_blank">Política de Privacidade</a>.
                    </p>
                    <div className='select-operation-div'>
                        <div className="transactions-actions">
                            <CommonButton label='Depositar' onClick={() => handleOpenModal('deposit')} />
                            <CommonButton label='Sacar' onClick={() => handleOpenModal('withdraw')} />
                        </div>

                    </div>
                </div>

            </div>

            {isModalOpen && (
                <DepositModal
                    operation={activeTab}
                    onClick={() => {
                        handleThicketsAmount();
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
