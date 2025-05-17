import styled from "styled-components";

export const ProfileWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 30px; 
`;

export const Dropdown = styled.div`
    position: absolute;
    right: 0;
    background-color: white;
    color: black;
    min-width: 120px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    z-index: 100;
`;

export const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
        color: white;
    }
`;
