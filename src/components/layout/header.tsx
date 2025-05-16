import React from "react";
import { HeaderContainer, MenuButton } from "../../styles/layout.style";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <HeaderContainer>
            <MenuButton onClick={toggleSidebar}>☰</MenuButton>
        </HeaderContainer>
    );
};

export default Header;
