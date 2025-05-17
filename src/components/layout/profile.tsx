import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown, DropdownItem, IconButton, ProfileWrapper } from "../../styles/profile-styles";

const ProfileMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login"; 
    };

    return (
        <ProfileWrapper ref={ref}>
            <IconButton onClick={() => setOpen(!open)}>
                <FaUserCircle />
            </IconButton>
            {open && (
                <Dropdown>
                    <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                </Dropdown>
            )}
        </ProfileWrapper>
    );
};

export default ProfileMenu;
