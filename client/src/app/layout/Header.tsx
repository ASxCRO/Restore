import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const midLinks = [
    {
        title: 'catalog', path: '/catalog',
    },
    {
        title: 'about', path: '/about',
    },
    {
        title: 'contact', path: '/contact',
    }
]

const rightLinks = [
    {
        title: 'login', path: '/login',
    },
    {
        title: 'register', path: '/register',
    },
]

const navStyle = {
    color: 'inherit',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    checked: boolean;
    setDarkMode: (checked:boolean) => void;
}

export default function Header({ checked, setDarkMode} : Props) {
    return (
        <AppBar position='static' sx={{mb:4} }>
            <Toolbar sx={{display:'flex', justifyContent:'space-between' , alignItems: 'center'} }>
                <Box sx={{ display: 'flex',  alignItems: 'center' } }>
                    <Typography variant='h6' component={NavLink} to='/'
                        sx={navStyle}
                    >
                        RE-STORE
                    </Typography>
                    <Switch checked={checked} onChange={() => setDarkMode(!checked)} /> 
                </Box>
                <List sx={{display:'flex'}}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyle}
                        >
                            {title.toUpperCase() }
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton component={Link} to='/basket'  size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent='4' color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}