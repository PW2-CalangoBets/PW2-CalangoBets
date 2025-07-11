import './GameHubPage.scss';
import MainHeader from "../../components/header/MainHeader";
import LastPlayed from '../../components/lastPlayed/LastPlayed';

const userLastGames = [
  {
    name: "Fortune Tiger",
    image: "./src/assets/games/fortune-tiger.webp",
    link: "/#/jogos/fortune-tiger"
  }
];

const GameHubPage = () => {
  return(
    <div className='game-hub-page-container'>
      <MainHeader/>
      <LastPlayed games={userLastGames} count={7} width='400px' height='60px'/>
    </div>
  );
}

export default GameHubPage;