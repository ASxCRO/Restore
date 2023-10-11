import { Container, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Register() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((e : string) => {
                if (e.includes('Password')) {
                    setError('password', { message: e })
                } else if (e.includes('Email')) {
                    setError('email', { message: e })
                } else if (e.includes('Username')) {
                    setError('username', { message: e })
                }
            })
        }
    }

    return (
        <Container maxWidth="sm" sx={{ background: 'inherit' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit(data =>
                agent.Account.register(data)
                    .then(() => {
                        toast.success('Successfully registered, you can login now.')
                        navigate('/login');
                    })
                    .catch(handleApiErrors))}>
                <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    autoFocus
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    label="Email"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'Too weak password complexity'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                
                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ marginTop: '1rem' }}
                    loading={isSubmitting}
                    disabled={!isValid}
                >
                    Register
                </LoadingButton>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
               Already have an account?{' '}
                <Link to="/register">
                    Sign In
                </Link>
            </Typography>
        </Container>
    );
}
