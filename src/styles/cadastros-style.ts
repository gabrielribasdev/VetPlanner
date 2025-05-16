import styled from "styled-components";

export const FichaContainer = styled.div`
  max-width: 900px;
  margin: 60px auto 100px auto; /* topo 60px, direita auto, base 100px, esquerda auto */
  background: ${({ theme }) => theme.colors.background};
  padding: 40px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;


export const TituloFicha = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 10px;
`;

export const FormEstilo = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const GridCampos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const InputEstilo = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const SelectEstilo = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const FieldsetEstilo = styled.fieldset`
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 20px;
`;

export const LegendEstilo = styled.legend`
  padding: 0 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
`;

export const BotaoSubmit = styled.button<{ isValid: boolean; loading: boolean }>`
  padding: 14px;
  font-size: 1rem;
  background-color: ${({ isValid, loading, theme }) =>
    isValid && !loading ? theme.colors.primary : "#ccc"};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: ${({ isValid, loading }) =>
    isValid && !loading ? "pointer" : "not-allowed"};
  transition: background 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


export const StyledSelect = styled.select`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
`;

export const StyledFieldset = styled.fieldset`
    border: 2px dashed ${({ theme }) => theme.colors.primary};;
    margin-top: 20px;
    border-radius: 8px;
    padding: 20px;
`;

export const StyledLegend = styled.legend`
    padding: 0 12px;
    font-weight: bold;
    color:${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const StyledInput = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
`;


