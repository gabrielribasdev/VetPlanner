export const lightTheme = {
    colors: {
        background: "#f9f9f9", 
        primary: "#3BAE5D", 
        text: "#121212",      
        textLight: "#ffffff", 
        primaryHover: '#2ddb85',
        textSecondary: "#4f4f4f",
        secondary: "rgba(56, 255, 159, 0.05)", 
        border: "#dddddd",
    },
};  

export const darkTheme = {
    colors: {
        background: "#f9f9f9", 
        primaryHover: '#2ddb85',
        primary: "#3BAE5D", 
        text: "#121212",      
        textLight: "#ffffff", 
        textSecondary: "#4f4f4f",
        secondary: "#E0F2E9", 
        border: "#dddddd",
    },
};

export type ThemeType = typeof lightTheme;
