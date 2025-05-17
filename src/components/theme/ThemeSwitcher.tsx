import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import { SwitcherButton } from "../../styles/layout.style";


const ThemeSwitcher = () => {
    const { toggleTheme, themeName } = useTheme();

    return (
        <SwitcherButton onClick={toggleTheme}>
            {themeName === "light" ? <FaMoon /> : <FaSun />}
        </SwitcherButton>
    );
};

export default ThemeSwitcher;
