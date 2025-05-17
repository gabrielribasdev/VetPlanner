import styled, { keyframes } from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: ${({ theme }) => theme.colors.secondary};
`;

export const LoginBox = styled.div`
    background: ${({ theme }) => theme.colors.background};
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 340px;
`;

export const LoginTitle = styled.h2`
    margin-bottom: 1.8rem;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: bold;
`;

export const LoginForm = styled.form`
    .input-group {
        margin-bottom: 1.2rem;
        text-align: left;
    }
`;

export const InputGroup = styled.div<{ $error?: boolean }>`
    margin-bottom: 1.2rem;
    text-align: left;

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
    width: 100%;
    padding: 0.9rem;
    border: 1px solid
        ${({ theme, $error }) =>
            $error ? "#b71c1c" : theme.colors.textSecondary};
    border-radius: 8px;
    font-size: 1rem;
    transition: 0.3s;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary}80;
        outline: none;
    }

    &:hover {
        border-color: ${({ $error, theme }) =>
            $error ? "#b71c1c" : theme.colors.textSecondary};
    }
`;

export const LoginButton = styled.button`
    width: 100%;
    padding: 0.9rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1.2rem;
    font-weight: bold;
    transition: 0.3s;

    &:hover {
        background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
    border: 3px solid ${({ theme }) => theme.colors.textLight};
    border-top: 3px solid ${({ theme }) => theme.colors.primaryHover};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: ${spin} 0.8s linear infinite;
    margin: 0 auto;
`;

export const ErrorMessage = styled.div`
    color: #b71c1c;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-align: left;
    padding-left: 2px;
`;
