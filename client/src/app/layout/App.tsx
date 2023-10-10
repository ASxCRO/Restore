import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser())
            await dispatch(fetchBasketAsync())
        } catch (e) {
            console.log(e);
        }
    }, [dispatch]);

    useEffect(() => {
        initApp().then(()=>setLoading(false))
    }, [initApp])


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

    if (loading) return <LoadingComponent message='Initialising app.'/>

    return (
        <>
            <ThemeProvider theme={theme}>
                <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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
