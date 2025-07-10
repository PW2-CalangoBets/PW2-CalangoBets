import React from "react";
import '../authForm.scss';

type LogInFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    image: string;
};

const LogInForm: React.FC<LogInFormProps> = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    error,
    image
}) => {
    return (
        <form onSubmit={handleSubmit} className="authentication-form">
            <main>
                <div className="title-and-logo"> 
                    <h1>Login</h1>
                    <img className="signup-form-img" src={image} alt="Little Aipom" />
                </div>
                {error && <p className="error-msg">{error}</p>}

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Entrar</button>
            </main>
        </form>
    );
};

export default LogInForm;
