import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/firebase";
import { useNavigate } from "react-router-dom";
import formIcon from "../../../assets/roulette.png";
import "../authPages.scss";
import LogInForm from "../../../components/authForms/logInForm/LogInForm";

export default function LogInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Usuário logado:", user);
            sessionStorage.setItem("email", email);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Email ou senha inválidos.");
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
