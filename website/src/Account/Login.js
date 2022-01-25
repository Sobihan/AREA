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

import { Sleep } from '../Sleep';
import { User } from './User';
import { OAuthGoogle } from '../OAuth/OAuthGoogle';

export function Login()
{
  let navigate = useNavigate();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      })
    };
    const response = await fetch('/api/v1/authenticate', requestOptions);
    if (response.status === 200) {
      setShowError(false);
      setShowSuccess(true);
      const respdata = await response.json();
      Sleep(2000).then(() => {
        User.token = respdata.token;
        User.email = formData.get('email');
        User.logged = true;
        navigate('/');
      });
    }
    else {
      setShowSuccess(false);
      setShowError(true);
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
          backgroundImage: 'url(https://source.unsplash.com/random)',
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
            <GoogleLogin
              clientId="789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={OAuthGoogle}
              onFailure={() => {setShowError(true)}}
              cookiePolicy={'single_host_origin'}
            />
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
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