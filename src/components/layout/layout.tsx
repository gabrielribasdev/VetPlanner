import React, { useState } from "react";
import Header from "./header";
import SideMenu from "./sidebar";
import { LayoutContainer, Content } from "../../styles/layout.style";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    return (
        <LayoutContainer>
            <Header toggleSidebar={toggleSidebar} />
            <SideMenu isOpen={isSidebarOpen} openSidebar={openSidebar} />
            <Content isOpen={isSidebarOpen}>{children}</Content>
        </LayoutContainer>
    );
};

export default Layout;
