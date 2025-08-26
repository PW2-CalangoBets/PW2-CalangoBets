import './gameHubPage.scss';
import MainHeader from "../../components/header/MainHeader";
import LastPlayed from '../../components/lastPlayed/LastPlayed';
import GamesCarretel from '../../components/gamesCarretel/GamesCarretel';

const userLastGames = [
  {
    name: "Caça Níquel",
    image: "./src/assets/games/caca-niquel.jpg",
    link: "/#/jogos/caca-niquel"
  }
];

const availableGames = [
  {
    name: "Caça Níquel",
    image: "./src/assets/games/caca-niquel.jpg",
    link: "/#/jogos/caca-niquel",
    subtitle: "Calango Bet"
  },
  {
    name: "Em breve",
    image: "./src/assets/games/em-breve.webp",
    subtitle: "Calango Bet"    
  },
  {
    name: "Em breve",
    image: "./src/assets/games/em-breve.webp",
    subtitle: "Calango Bet"
  },
  {
    name: "Em breve",
    image: "./src/assets/games/em-breve.webp",
    subtitle: "Calango Bet"
  },
  {
    name: "Em breve",
    image: "./src/assets/games/em-breve.webp",
    subtitle: "Calango Bet"
  },
  {
    name: "Em breve",
    image: "./src/assets/games/em-breve.webp",
    subtitle: "Calango Bet"
  },
  {
    name: "Em breve",
    image: "./src/assets/games/em-breve.webp",
    subtitle: "Calango Bet"
  }
];

const GameHubPage = () => {
  return(
    <div className='game-hub-page-container'>
      <MainHeader/>
      <div className="games-content-wrapper" style={{ display: 'flex' }}>
        <LastPlayed games={userLastGames} count={8} width='400px' height='60px'/>
        <div className="games-carretel-column" style={{ display: 'flex', flexDirection: 'column' }}>
          <GamesCarretel height="240px" title="Em alta" games={availableGames}></GamesCarretel>
          <GamesCarretel height="240px" title="Escolha dos devs" games={availableGames}></GamesCarretel>
        </div>        
      </div>      
    </div>
  );
}

export default GameHubPage;