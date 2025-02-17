import styled from "styled-components";

export const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
    width: ${({ isOpen }) =>
        isOpen ? "220px" : "60px"}; 
    height: 100vh;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    padding: 10px;
    position: fixed;
    top: 60px;
    left: 0;
    transition: width 0.3s ease-in-out;
    box-shadow: 1px 0 10px rgba(0, 0, 0, 0.2);

    nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    nav ul li {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        border-radius: 8px;
        transition: background 0.3s ease-in-out;
    }

    nav ul li:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    nav ul li ul li a {
        margin-left: 20px;
    }

    nav ul li a {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        transition: color 0.3s ease-in-out;
        padding: 10px;
    }

    nav ul li a span {
        display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
    }

    nav ul li a svg {
        font-size: 22px;
        min-width: 22px;
    }
`;

export const Content = styled.main<{ isOpen: boolean }>`
    flex: 1;
    padding: 20px;
    margin-top: 60px;
    margin-left: ${({ isOpen }) =>
        isOpen ? "220px" : "60px"}; 
    transition: margin-left 0.3s ease-in-out;
`;

export const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    color: ${({ theme }) => theme.colors.text};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

export const MenuButton = styled.button`
    background: none;
    border: none;
    font-size: 26px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;
