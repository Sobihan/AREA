import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';
import { Sleep } from '../Sleep';

export function Login()
{
  let navigate = useNavigate();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [cookies, setCookie] = useCookies(['user']);

  if (cookies.logged === "true") {
    window.location = "/";
    return (
      <h3>Redirecting...</h3>
    );
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestLogin = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      })
    };
    const responseLogin = await fetch('/api/v1/authenticate', requestLogin);
    if (responseLogin.status === 200) {
      const respdata = await responseLogin.json();
      setCookie('token', respdata.token, { path: '/' });
      setCookie('logged', "true", { path: '/' });
      setShowError(false);
      setShowSuccess(true);
      Sleep(1000).then(() => {
        navigate('/');
      });
    }
    else {
      setCookie('logged', "false", { path: '/' });
      setShowSuccess(false);
      setShowError(true);
      return;
    }
  };
  const OAuthGoogle = async (response) => {
    const requestLogin = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_mobile: false,
        response
      })
    };
    const responseLogin = await fetch('/api/v1/google-auth', requestLogin);
    if (responseLogin.status === 200) {
      const respdata = await responseLogin.json();
      setCookie('token', respdata.token, { path: '/' });
      setCookie('logged', "true", { path: '/' });
      setShowError(false);
      setShowSuccess(true);
      Sleep(1000).then(() => {
        navigate('/');
      });
    }
    else {
      setCookie('logged', "false", { path: '/' });
      setShowSuccess(false);
      setShowError(true);
      return;
    }
  };
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://cdn.wallpapersafari.com/52/4/Bj8NrO.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            { showSuccess ?
              <Grid item xs={12}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Successfully logged in — <strong>redirecting...</strong>
                </Alert>
              </Grid>: null
            }
            { showError ?
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Login failed — <strong>please retry</strong>
                </Alert>
              </Grid>: null
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <GoogleLogin
                  clientId="789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com"
                  accessType="offline"
                  responseType="code"
                  buttonText="SIGN IN WITH GOOGLE"
                  onSuccess={OAuthGoogle}
                  onFailure={() => {setShowError(true)}}
                  cookiePolicy={'single_host_origin'}
                />
                <Link href="signup" variant="body2" sx={{ ml: 2 }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}