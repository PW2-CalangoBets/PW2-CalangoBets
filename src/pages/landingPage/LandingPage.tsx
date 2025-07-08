import './landingPage.scss';
import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import HeaderLink from '../../components/headerLinks/HeaderLinks';
import HeaderButton from '../../components/headerButton/HeaderButton';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = (endereco : string) => {
        navigate(`/${endereco}`);
    };

    return (
        <div className="landingPage-container">
            <StandardHeader>
                <HeaderLink linkName="Jogos" onClick={() => handleClick('jogos')}/>
                <HeaderLink linkName="Sobre" onClick={() => handleClick('sobre')}/>
                <HeaderLink linkName="Equipe Calango" onClick={() => handleClick('equipe')}/>
                <HeaderButton label="Login" isSpecial={false} onClick={() => handleClick('login')}></HeaderButton>
                <HeaderButton label="Cadastre-se" isSpecial={true} onClick={() => handleClick('signup')}></HeaderButton>
            </StandardHeader>
            <div className="landingPage-container">
            </div>
        </div>
    )
}

export default LandingPage;