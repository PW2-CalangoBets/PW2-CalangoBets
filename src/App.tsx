import './App.scss';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/landingPage/LandingPage';
import SignUpPage from './pages/authPages/signUpPage/SignUpPage';
import LoginPage from './pages/authPages/logInPage/LogInPage';
import DepositPage from './pages/depositPage/DepositPage';
import GameHubPage from './pages/gameHubPage/GameHubPage';
import TeamPage from './pages/teamPage/TeamPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/equipe' element={<TeamPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/jogos" element={<GameHubPage />} />        
      </Routes>
    </Router>
  );
}

export default App;
