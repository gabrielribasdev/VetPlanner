import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 9999;
`;

export const TabsHeader = styled.div`
  display: flex;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
              0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 12px;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.background : "#0f2d5c")};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : "#ffffff")};
  border: none;
  font-weight: bold;
  border-bottom: 3px solid ${({ isActive, theme }) => (isActive ? theme.colors.primary : "transparent")};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  font-family: "Arial", sans-serif;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TabsBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const TabContent = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
`;
