import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/header/headerContainer/HeaderContainer';
import HeaderLink from '../../components/header/headerLinks/HeaderLinks';
import HeaderButton from '../../components/header/headerButton/HeaderButton';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const MainHeader = () => {
      const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleClick = (endereco : string) => {
        navigate(`/${endereco}`);
    };

    const [pfp, setPfp] = useState<string | null>(null);

    useEffect(() => {
        console.log(isAuthenticated);
    }, [])
    

    return (
        <StandardHeader>
            <HeaderLink linkName="Jogos" onClick={() => handleClick('jogos')}/>
            <HeaderLink linkName="Equipe Calango" onClick={() => handleClick('equipe')}/>
            {!isAuthenticated && (
                <HeaderButton label="Login" isSpecial={false} onClick={() => handleClick('login')}></HeaderButton>
            )}
            {!isAuthenticated&& (
                <HeaderButton label="Cadastre-se" isSpecial={true} onClick={() => handleClick('signup')}></HeaderButton>
            )}
            {isAuthenticated && (
                <HeaderButton label="Deposite" isSpecial={true} onClick={() => handleClick('deposit')}></HeaderButton>
            )}
            {isAuthenticated && (
                <div className="pfp-container" onClick={() => handleClick('conta')}>
					<img
						src={pfp ||"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
						alt="Foto de perfil"
						className="profile-picture"
					/>
				</div>
            )}
        </StandardHeader>
    );
}

export default MainHeader;