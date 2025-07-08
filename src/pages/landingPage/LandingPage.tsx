import './landingPage.scss';
import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import HeaderLink from '../../components/headerLinks/HeaderLinks';

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
                
            </StandardHeader>
            <div className="landingPage-container">
            </div>
        </div>
    )
}

export default LandingPage;