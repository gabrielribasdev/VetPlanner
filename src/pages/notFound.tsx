import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    
    h1 {
        font-size: 2rem;
        color: #FF6347;
    }

    p {
        font-size: 1.2rem;
        color: #555; 
        margin: 10px 0;
    }

    a {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #FF6347; 
        color: #fff; 
        text-decoration: none;
        border-radius: 5px;
        transition: 0.3s;

        &:hover {
            background-color:rgb(250, 79, 49); 
        }
    }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
        <h1>404 - Página não encontrada</h1>
        <p>Oops! A página que você procura não existe.</p>
        <Link to="/">Voltar para Home</Link>
    </NotFoundContainer>
  );
};

export default NotFound;
