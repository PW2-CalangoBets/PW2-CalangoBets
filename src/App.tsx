import './App.scss';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/landingPage/LandingPage';
import SignUpPage from './pages/signUpPage/SignUpPage';
import LoginPage from './pages/logInPage/LogInPage';
import DepositPage from './pages/depositPage/DepositPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/deposit" element={<DepositPage />} />
      </Routes>
    </Router>
  );
}

export default App;
