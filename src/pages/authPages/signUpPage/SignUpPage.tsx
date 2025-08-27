import { useState } from "react";
import formIcon from "../../../assets/roulette.png";
import "../authPages.scss";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../../components/authForms/signUpForm/signUpForm";
import { signUpApi } from "../../../api/authApi";
import { AxiosError } from "axios";

export default function SignUpPage() {
    const [name, setName] = useState("");
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
            await signUpApi({ name, email, password })
            navigate("/login");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Erro ao cadastrar usuário.");
            }
        }
    };

    return (
        <div className="signup-container">
            <SignUpForm
                name={name}
                setName={setName}
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
