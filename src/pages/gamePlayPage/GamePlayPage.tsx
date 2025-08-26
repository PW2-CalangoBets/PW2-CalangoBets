import './GamePlayPage.scss';
import MainHeader from "../../components/header/MainHeader";
import GameLoader from '../../components/gameLoader/gameLoader';

const GamePlayPage = () => {
  return(
    <div className='game-play-page-container'>
      <MainHeader/>
        <GameLoader gameName='caca-niquel'/>
    </div>
  );
}

export default GamePlayPage;