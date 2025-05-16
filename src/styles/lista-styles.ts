import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 30px 24px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 36px;
  user-select: none;
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1rem;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.primary};
   color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  font-weight: 600;
  min-width: 180px;
  transition: filter 0.2s ease;

  option {
     color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: normal;
  }

  &:hover,
  &:focus {
    filter: brightness(1.1);
    outline: none;
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

export const Item = styled.div`
  padding: 24px 28px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }

  h3 {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 16px;
    font-size: 1.6rem;
    user-select: none;
  }
`;

export const Info = styled.p`
   color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  margin: 6px 0;
  line-height: 1.4;
  user-select: none;

  strong {
    font-weight: 700;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  user-select: none;
`;

export const PaginationButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export const PageIndicator = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  margin-bottom: 24px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
