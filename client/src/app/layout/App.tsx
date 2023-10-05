import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            agent.Basket.get()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [useDispatch])


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
