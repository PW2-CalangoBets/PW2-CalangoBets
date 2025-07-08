import './standardHeader.scss';
import siteLogo from '/logo.png';

type StandardHeaderProps = {
    children: React.ReactNode;
};

export default function StandardHeader({ children }: StandardHeaderProps) {
    return (
        <header className="app-bar">
            <div className="app-bar-background"></div>
            <img className="app-bar-site-icon" src={siteLogo} />
            <h1>Calango Bet</h1>
            <nav className="app-bar-buttons">
                {children}
            </nav>
        </header>
    );
}