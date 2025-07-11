import { useNavigate } from 'react-router';
import './headerContainer.scss';
import siteLogo from '/logo.png';

type StandardHeaderProps = {
    children: React.ReactNode;
};

export default function StandardHeader({ children }: StandardHeaderProps) {
    const navigate = useNavigate();

    const handleLogoClick = async () => {
        navigate("/");
    };

    return (
        <header className="app-bar">
            <div className="app-bar-background"></div>
            <div onClick={handleLogoClick} className='app-bar-home-button'>
                <img className="app-bar-site-icon" src={siteLogo} />
                <h1>Calango Bet</h1>
            </div>
            <nav className="app-bar-buttons">
                {children}
            </nav>
        </header>
    );
}