import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";

function App() {
    const location = useLocation();
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

    if (loading) return 

    return (
        <>
            <ThemeProvider theme={theme}>
                <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
                <CssBaseline />
                <Header checked={darkMode} setDarkMode={setDarkMode} />
                {loading ? <LoadingComponent message='Initialising app.' /> :
                    location.pathname === '/' ? <HomePage /> : 
                        <Container sx={{mt:4} }>
                            <Outlet />
                        </Container>
                    }
               
            </ThemeProvider>
        </>
    )
}

export default App
