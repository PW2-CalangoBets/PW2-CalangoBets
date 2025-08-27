import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formIcon from "../../../assets/roulette.png";
import { useDispatch } from "react-redux";
import { loginApi } from "../../../api/authApi";
import { loginSuccess } from "../../../store/authSlice";
import "../authPages.scss";
import LogInForm from "../../../components/authForms/logInForm/LogInForm"
import type { AppDispatch } from "../../../store/store";

export default function LogInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const { token } = await loginApi({ email, password });
            dispatch(loginSuccess(token));
            localStorage.setItem("token", token);
            navigate("/"); 
        } catch (err) {
            console.error(err);
            setError("Usuário ou senha inválidos");
        }
    };

    return (
        <div className="logIn-container">
            <LogInForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                error={error}
                image={formIcon}
            />
        </div>
    );
}
