import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/header/headerContainer/HeaderContainer';
import HeaderLink from '../../components/header/headerLinks/HeaderLinks';
import HeaderButton from '../../components/header/headerButton/HeaderButton';
import { auth } from '../../database/firebase';

const MainHeader = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleClick = (endereco : string) => {
        navigate(`/${endereco}`);
    };

    return (
        <StandardHeader>
            <HeaderLink linkName="Jogos" onClick={() => handleClick('jogos')}/>
            <HeaderLink linkName="Sobre" onClick={() => handleClick('sobre')}/>
            <HeaderLink linkName="Equipe Calango" onClick={() => handleClick('equipe')}/>
            <HeaderButton label="Login" isSpecial={false} onClick={() => handleClick('login')}></HeaderButton>
            <HeaderButton label="Cadastre-se" isSpecial={true} onClick={() => handleClick('signup')}></HeaderButton>
            {user && (
                <HeaderButton label="Deposite" isSpecial={true} onClick={() => handleClick('deposit')}></HeaderButton>
            )}
        </StandardHeader>
    );
}

export default MainHeader;