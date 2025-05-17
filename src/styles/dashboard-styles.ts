import styled from "styled-components";

export const FichaContainer = styled.div`
  max-width: 100%;
  background:   border: 2px solid ${({ theme }) => theme.colors.background};
  padding: 30px; /* menos que 40 */
  border-radius: 12px;
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.border};
  font-family: Arial, sans-serif;
`;

export const TituloFicha = styled.h1`
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    padding-bottom: 10px;
`;

export const LinhaGraficos = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
`;

export const GraficoBox = styled.div`
    flex: 1;
    min-width: 300px; /* menor que 400px para diminuir */
`;

export const FieldsetEstilo = styled.fieldset`
    border: 2px dashed ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    padding: 15px; /* menos que 20 */
    background-color: ${({ theme }) => theme.colors.background};
`;

export const TituloGrafico = styled.h3`
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 10px;
    font-size: 1.1rem; /* menor que 1.2rem */
`;
