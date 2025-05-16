export const lightTheme = {
    colors: {
        background: "#f9f9f9", 

        // Verde semelhante ao da bandeira do Brasil, mas mais suave
        primary: "#3BAE5D", 
    
        // Letras principais (corpo de texto)
        text: "#121212",      
    
        // Letras em fundos escuros, botões, etc
        textLight: "#ffffff", 
        primaryHover: '#2ddb85',
    
        // Texto secundário (descrições, subtítulos)
        textSecondary: "#4f4f4f",
    
        // Cor de destaque secundária (opcional)
        secondary: "rgba(56, 255, 159, 0.05)", 
    
        // Exemplo de cor para bordas ou divisores
        border: "#dddddd",
    },
};  

export const darkTheme = {
    colors: {
        background: "#f9f9f9", 
        primaryHover: '#2ddb85',

        // Verde semelhante ao da bandeira do Brasil, mas mais suave
        primary: "#3BAE5D", 
    
        // Letras principais (corpo de texto)
        text: "#121212",      
    
        // Letras em fundos escuros, botões, etc
        textLight: "#ffffff", 
    
        // Texto secundário (descrições, subtítulos)
        textSecondary: "#4f4f4f",
    
        // Cor de destaque secundária (opcional)
        secondary: "#E0F2E9", 
    
        // Exemplo de cor para bordas ou divisores
        border: "#dddddd",
    },
};

export type ThemeType = typeof lightTheme;
