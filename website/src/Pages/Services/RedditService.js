import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { OAuthReddit } from '../../OAuth/OAuthReddit';
import RedditIcon from '@mui/icons-material/Reddit';

export function RedditService()
{
  const [cookies] = useCookies(['user']);

  return (
    <Paper sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
      { cookies.reddit === "false" ?
        <Stack direction="row" alignItems="center" spacing={4}>
          <RedditIcon />
          <h3>Reddit</h3>
            <div style={{backgroundColor: "#FF9494", color: "white", padding: 4, "border-radius": 5}}>Status: Disconnected</div>
            <Button variant="contained" style={{backgroundColor: "#ff4500"}} startIcon={<RedditIcon />} onClick={() => {
              OAuthReddit(cookies.token);
            }}>
              CONNECT MY ACCOUNT
            </Button>
        </ Stack>: <Stack direction="row" alignItems="center" spacing={4}>
          <RedditIcon />
          <h3>Reddit</h3>
          <div style={{backgroundColor: "#9BE89B", color: "white", padding: 4, "border-radius": 5}}>Status: Connected</div>
        </ Stack>
      }
    </ Paper>
  );
}