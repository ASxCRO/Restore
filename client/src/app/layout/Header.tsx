import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    checked: boolean;
    setDarkMode: () => void;
}

export default function Header({ checked, setDarkMode} : Props) {
    return (
        <AppBar position='static' sx={{mb:4} }>
            <Toolbar>
                <Typography variant='h6'>
                    RE-STORE
                </Typography>
                <Switch checked={checked} onChange={() => setDarkMode(!checked) } /> 
            </Toolbar>
        </AppBar>
    )
}