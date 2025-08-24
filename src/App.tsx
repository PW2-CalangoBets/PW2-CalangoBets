import './App.scss';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/landingPage/LandingPage';
import SignUpPage from './pages/authPages/signUpPage/SignUpPage';
import LoginPage from './pages/authPages/logInPage/LogInPage';
import DepositPage from './pages/depositPage/DepositPage';
import GameHubPage from './pages/gameHubPage/gameHubPage';
import TeamPage from './pages/teamPage/TeamPage';
import AccountPage from './pages/accountPage/AccountPage';
import ShowCase from './pages/showcasePage/ShowCase';
import { useEffect } from 'react';
import type { AppDispatch } from './store/store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store/authSlice';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/equipe' element={<TeamPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/jogos" element={<GameHubPage />} />
        <Route path="/conta" element={<AccountPage />} />
        <Route path="/showcase" element={<ShowCase />} />
      </Routes>
    </Router>
  );
}

export default App;
