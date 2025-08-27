import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/header/headerContainer/HeaderContainer';
import HeaderLink from '../../components/header/headerLinks/HeaderLinks';
import HeaderButton from '../../components/header/headerButton/HeaderButton';
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { AppDispatch } from '../../store/store';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const MainHeader = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleClick = (endereco: string) => {
        navigate(`/${endereco}`);
    };

    const handleLogout = () => {
        dispatch(logout());          
        localStorage.removeItem("token"); 
        navigate("/login");              
    };

    return (
        <StandardHeader>
            <HeaderLink linkName="Jogos" onClick={() => handleClick('jogos')} />
            <HeaderLink linkName="Equipe Calango" onClick={() => handleClick('equipe')} />
            {!isAuthenticated && (
                <HeaderButton label="Login" isSpecial={false} onClick={() => handleClick('login')}></HeaderButton>
            )}
            {!isAuthenticated && (
                <HeaderButton label="Cadastre-se" isSpecial={true} onClick={() => handleClick('signup')}></HeaderButton>
            )}
            {isAuthenticated && (
                <HeaderButton label="Deposite" isSpecial={true} onClick={() => handleClick('deposit')}></HeaderButton>
            )}
            {isAuthenticated && (
                <HeaderButton label="Logout" isSpecial={false} onClick={() => handleLogout()}></HeaderButton>
            )}
            {isAuthenticated && (
                <div className="pfp-container" onClick={() => handleClick('conta')}>
                    <img
                        src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                        alt="Foto de perfil"
                        className="profile-picture"
                    />
                </div>
            )}
        </StandardHeader>
    );
}

export default MainHeader;