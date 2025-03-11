import React, { useState } from "react";
import "./Login.css";

interface LoginResponse {
    success: boolean;
    message: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setError("");

        try {
            const response = await fetch("rota", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data: LoginResponse = await response.json();

            if (data.success) {
                alert("Login bem-sucedido!");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Erro ao realizar login. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                {error && <div className="error-message">{error}</div>}{" "}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
