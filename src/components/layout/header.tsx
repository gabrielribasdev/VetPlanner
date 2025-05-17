import React from "react";
import { HeaderContainer, MenuButton } from "../../styles/layout.style";
import ProfileMenu from "./profile";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <HeaderContainer>
            <MenuButton onClick={toggleSidebar}>☰</MenuButton>
            <ProfileMenu />
        </HeaderContainer>
    );
};

export default Header;
