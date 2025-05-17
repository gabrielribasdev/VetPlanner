import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginContainer, LoginBox, LoginTitle, LoginForm, InputGroup, LoginButton, ErrorMessage, Spinner, StyledInput } from "../styles/Login-style";

interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [credencialInvalida, setCredencialInvalida] =
        useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setError("");
        setIsLoading(true);
        setCredencialInvalida(false);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password: senha }),
            });

            const data: LoginResponse = await response.json();

            if (data.token) {
                login(data.token);
                navigate("/dashboard");
            } else {
                setError(data.message);
                setCredencialInvalida(true);
            }
        } catch (err) {
            setError("Erro ao realizar login. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFocus = () => {
        setCredencialInvalida(false);
    };

    return (
        <LoginContainer>
            <LoginBox>
                <LoginTitle>Login</LoginTitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <LoginForm onSubmit={handleSubmit}>
                    <InputGroup $error={credencialInvalida}>
                        <label>Email</label>
                        <StyledInput
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={handleFocus}
                            $error={credencialInvalida}
                        />
                    </InputGroup>
                    <InputGroup $error={credencialInvalida}>
                        <label>Senha</label>
                        <StyledInput
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            onFocus={handleFocus}
                            $error={credencialInvalida}
                        />
                    </InputGroup>
                    <LoginButton type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner /> : "Entrar"}
                    </LoginButton>
                </LoginForm>
            </LoginBox>
        </LoginContainer>
    );
};

export default Login;
