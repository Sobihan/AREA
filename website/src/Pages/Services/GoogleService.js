import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleLogin from 'react-google-login';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useCookies } from 'react-cookie';

export function GoogleService()
{
  const [cookies, setCookie] = useCookies(['user']);

  const OAuthGoogle = async (response) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': cookies.token
      },
      body: JSON.stringify({
        type: "GOOGLE",
        token: response
      })
    };
    await fetch('/api/v1/update-api-token', requestOptions);
    window.location.reload();
  };
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      { cookies.google === "false" ?
        <Stack direction="row" alignItems="center" spacing={4}>
          <GoogleIcon />
          <h3>Google</h3>
            <div style={{backgroundColor: "#FF9494", color: "white", padding: 4, "border-radius": 5}}>Status: Disconnected</div>
            <GoogleLogin
              clientId="789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com"
              accessType="offline"
              responseType="code"
              buttonText="CONNECT MY ACCOUNT"
              onSuccess={OAuthGoogle}
              onFailure={() => {console.log("fail")}}
              cookiePolicy={'single_host_origin'}
            />
        </ Stack>: <Stack direction="row" alignItems="center" spacing={4}>
          <GoogleIcon />
          <h3>Google</h3>
          <div style={{backgroundColor: "#9BE89B", color: "white", padding: 4, "border-radius": 5}}>Status: Connected</div>
          <Button variant="contained" color="error" startIcon={<RemoveCircleIcon />} onClick={() => {
            setCookie('google', "false", { path: '/' });
          }}>
            Disconnect
          </Button>
        </ Stack>
      }
    </ Paper>
  );
}