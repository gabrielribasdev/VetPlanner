import React from "react";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import { HeaderContainer, MenuButton } from "../../styles/layout.style";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <HeaderContainer>
            <MenuButton onClick={toggleSidebar}>☰</MenuButton>
            <ThemeSwitcher />
        </HeaderContainer>
    );
};

export default Header;
