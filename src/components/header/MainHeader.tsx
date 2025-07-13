import { useNavigate } from 'react-router-dom';
import StandardHeader from '../../components/header/headerContainer/HeaderContainer';
import HeaderLink from '../../components/header/headerLinks/HeaderLinks';
import HeaderButton from '../../components/header/headerButton/HeaderButton';
import { useState, useEffect } from 'react';
import { auth, db } from "../../database/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const MainHeader = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleClick = (endereco : string) => {
        navigate(`/${endereco}`);
    };

    const [pfp, setPfp] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchPfp = async () => {
            if (!user?.email) return;

            // tenta pegar do localStorage
            const cachedPfp = localStorage.getItem(`pfp-${user.email}`);
            if (cachedPfp) {
                setPfp(cachedPfp);
            }

            // busca do Firestore se não tiver no cache
            const q = query(collection(db, "contas"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((d) => {
                const data = d.data();
                if (data.pfp) {
                    if (data.pfp == cachedPfp) return;
                    setPfp(data.pfp);
                    localStorage.setItem(`pfp-${user.email}`, data.pfp); // salva no cache
                }
            });
        };

        fetchPfp();
    }, [user]);

    return (
        <StandardHeader>
            <HeaderLink linkName="Jogos" onClick={() => handleClick('jogos')}/>
            <HeaderLink linkName="Equipe Calango" onClick={() => handleClick('equipe')}/>
            {!user && (
                <HeaderButton label="Login" isSpecial={false} onClick={() => handleClick('login')}></HeaderButton>
            )}
            {!user && (
                <HeaderButton label="Cadastre-se" isSpecial={true} onClick={() => handleClick('signup')}></HeaderButton>
            )}
            {user && (
                <HeaderButton label="Deposite" isSpecial={true} onClick={() => handleClick('deposit')}></HeaderButton>
            )}
            {user && (
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