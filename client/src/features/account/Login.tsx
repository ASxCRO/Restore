import { Container, TextField, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            navigate(location.state?.from || 'catalog');
        } catch (e) {
            console.log(e);
        }
        
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(submitForm)}>
                <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors?.username?.message as string}
                />
                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ marginTop: '1rem' }}
                    loading={isSubmitting}
                    disabled={!isValid }
                >
                    Sign In
                </LoadingButton>
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
