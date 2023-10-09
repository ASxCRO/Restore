import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        agent.Account.login({username,password})
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ marginTop: '1rem' }}
                >
                    Sign In
                </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
                Don't have an account?{' '}
                <Link  to="/register">
                    Register
                </Link>
            </Typography>
        </Container>
    );
}
