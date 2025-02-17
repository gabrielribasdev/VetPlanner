import React, { useState } from "react";
import Header from "./header";
import SideMenu from "./sidebar";
import { LayoutContainer, Content } from "../../styles/layout.style";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <LayoutContainer>
            <Header toggleSidebar={toggleSidebar} />
            <SideMenu isOpen={isSidebarOpen} />
            <Content isOpen={isSidebarOpen}>{children}</Content>
        </LayoutContainer>
    );
};

export default Layout;
