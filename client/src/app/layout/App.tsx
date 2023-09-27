import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const palleteType = darkMode ? 'dark' : 'light';

    const theme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default: palleteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    return (
        <>
            <ThemeProvider theme={theme }>
                <CssBaseline />
                <Header checked={darkMode} setDarkMode={setDarkMode} />
                <Container>
                    <Outlet />
                </Container>
            </ThemeProvider>
        </>
    )
}

export default App
