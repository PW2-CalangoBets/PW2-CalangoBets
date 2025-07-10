import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../database/firebase";
import formIcon from "../../../assets/roulette.png";
import "../authPages.scss";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../../components/authForms/signUpForm/signUpForm";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.email) {
                sessionStorage.setItem("email", user.email.toLowerCase());
            }

            setSuccess("Conta criada com sucesso!");
            navigate("/account");
        } catch (err) {
            console.error(err);
            setError("Erro ao criar conta.");
        }
    };

    return (
        <div className="signup-container">
            <SignUpForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                success={success}
                error={error}
                image={formIcon}
            />
        </div>
    );
}
