import styled from "styled-components";

export const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
    width: ${({ isOpen }) => (isOpen ? "220px" : "60px")};
    height: 100vh;
    background: ${({ theme }) => theme.colors.primary};
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
        padding: 10px 0;
        border-radius: 8px;
        transition: background 0.3s ease-in-out;
    }

    nav ul li:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    nav ul li a {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.textLight};
        font-size: 16px;
        padding: 10px;
    }

    nav ul li a span {
        display: inline-block;
        max-width: ${({ isOpen }) => (isOpen ? "150px" : "0")};
        opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
        overflow: hidden;
        white-space: nowrap;
        transition: max-width 0.3s ease-in-out, opacity 0.3s ease-in-out;
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
    margin-left: ${({ isOpen }) => (isOpen ? "220px" : "60px")};
    transition: margin-left 0.3s ease-in-out;
`;

export const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
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
    color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

export const SwitcherButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
`;
