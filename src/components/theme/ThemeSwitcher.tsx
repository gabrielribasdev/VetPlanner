import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

const SwitcherButton = styled.button`
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

const ThemeSwitcher = () => {
    const { toggleTheme, themeName } = useTheme();

    return (
        <SwitcherButton onClick={toggleTheme}>
            {themeName === "light" ? <FaMoon /> : <FaSun />}
        </SwitcherButton>
    );
};

export default ThemeSwitcher;
