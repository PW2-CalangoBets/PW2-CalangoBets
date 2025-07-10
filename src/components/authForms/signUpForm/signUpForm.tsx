import React from "react";
import '../authForm.scss';

type SignUpFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    success: string;
    error: string;
    image: string;
}

const SignUpForm = ({ handleSubmit, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, success, image }: SignUpFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="authentication-form">
            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <main>
                <div className="title-and-logo"> 
                    <h1>Sign Up</h1>

                    <img className="signup-form-img" src={image} alt="Little Aipom" />
                </div>

                <label htmlFor="email">&nbsp;&nbsp;E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">&nbsp;&nbsp;Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">&nbsp;&nbsp;Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Criar Conta</button>

                <a href="#/login">Já possui uma conta? Log In</a>
            </main>
        </form>
    )
}

export default SignUpForm;