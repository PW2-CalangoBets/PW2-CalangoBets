import './landingPage.scss';
import { useNavigate } from 'react-router-dom';
import spinningWheel from '../../assets/spinningWheel.png';
import womanInMegaphone from '../../assets/womanInMegaphone.png';
import siteLogo from '/logo.png';
import MainHeader from '../../components/header/MainHeader';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = (endereco : string) => {
        navigate(`/${endereco}`);
    };

    return (
        <div className="landingPageCard-container">
            <MainHeader></MainHeader>
            <div className="landingPageCard-container displayFlexCenter">
                <div className='title-and-button-container occupy-height-100 occupy-50'>
                    <div className='propaganda-title-container'>
                        <h1 className='title'>Sua sorte começa aqui!</h1>
                        <button className='knowMore-button' onClick={() => handleClick('sobre')}>Saiba mais</button>
                    </div>
                </div>
                <div className='spinning-wheel-container displayFlexCenter occupy-height-100 occupy-50'>
                    <img src={spinningWheel} className='spinning-wheel-image'></img>
                </div>
            </div>
            <div className="landingPageCard-container displayFlexCenterOrderByColumn">
                <h1 className='what-this-is fadeInUp'>
                    A <b className='purple'>CalangoBet</b> é uma startup que busca conscientizar as pessoas.
                </h1>
                <h2 className='what-this-is-description'>
                    Nosso site de apostas foi criado unicamente para conscientizar sobre os riscos e impactos dos sites de apostas reais. Aqui, ninguém perde dinheiro de verdade — o objetivo é mostrar como esse tipo de jogo funciona e alertar sobre os perigos que ele pode trazer.
                </h2>
            </div>
            <div className="landingPageCard-container displayFlexCenter">
                <div className='our-mission-container occupy-height-100 occupy-width-50'>
                    <div className='our-mission-title-container'>
                        <h1 className='title fadeInUp'>Conscientizar o Brasil</h1>
                        <h2 className='subtitle'>Aqui, a aposta é só de brincadeira, mas a reflexão é pra valer: entender de perto como funcionam as apostas e por que é importante ter cuidado com elas.</h2>
                    </div>
                </div>
                <div className='explaining-image-container displayFlexCenter occupy-height-100 occupy-width-50'>
                    <img src={womanInMegaphone} className='explaining-image'></img>
                </div>
            </div>
            <div className="landingPageCard-container displayFlexCenter">
                <div className='contact-us-logo-container occupy-width-50'>
                    <header className="logo-container">
                        <img className="app-bar-site-icon" src={siteLogo} />
                        <h1>Calango Bet</h1>
                    </header>
                </div>
                <div className='contact-us-info-container occupy-width-50'>
                    <h1 className='title'>Fale conosco</h1>
                    <h2 className='subtitle'>
(83) 99304-1820<br></br>
Rua Francisca Fernandes Claudino, 420<br></br>
calangob@gmail.com.br<br></br>
Cajazeiras-PB   
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;