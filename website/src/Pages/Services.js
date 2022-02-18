import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router';
import { User } from '../Account/User';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { OAuthReddit } from '../OAuth/OAuthReddit';
import RedditIcon from '@mui/icons-material/Reddit';
import { Sleep } from '../Sleep';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export function Services()
{
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [showGoogle, setShowGoogle] = React.useState(User.google);
  const [showReddit, setShowReddit] = React.useState(User.reddit);

  if (User.logged !== true) {
    window.location = "/login";
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getServices = async () => {
    const requestServices = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': User.token
      }
    };
    const responseServices = await fetch('/api/v1/get-user-loged-api', requestServices);
    if (responseServices.status === 200) {
      const respdata = await responseServices.json();
      User.reddit = respdata.reddit;
      User.google = respdata.google;
      setShowGoogle(User.google);
      setShowReddit(User.reddit);
      Sleep(5000).then(() => {
        getServices();
      });
    }
  };
  const OAuthGoogle = async (response) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': User.token
      },
      body: JSON.stringify({
        type: "GOOGLE",
        token: response
      })
    };
    await fetch('/api/v1/update-api-token', requestOptions);
  };
  getServices();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <div>
          <ListItem button onClick={
              () => {
                navigate('/');
              }
            }>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem button onClick={
              () => {
                navigate('/services');
              }
            }>
              <ListItemIcon>
                <MiscellaneousServicesIcon />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button onClick={
              () => {
                navigate('/account');
              }
            }>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Services List */}
            <Grid item xs={12}>
              <Paper sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
                { ! showGoogle ?
                  <Stack direction="row" alignItems="center" spacing={4}>
                    <GoogleIcon />
                    <h3>Google</h3>
                      <div style={{backgroundColor: "#FF9494", color: "white", padding: 4, "border-radius": 5}}>Status: Disconnected</div>
                      <GoogleLogin
                        clientId="789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com"
                        buttonText="Connect my Account"
                        onSuccess={OAuthGoogle}
                        onFailure={() => {console.log("fail")}}
                        cookiePolicy={'single_host_origin'}
                      />
                  </ Stack>: <Stack direction="row" alignItems="center" spacing={4}>
                    <GoogleIcon />
                    <h3>Google</h3>
                    <div style={{backgroundColor: "#9BE89B", color: "white", padding: 4, "border-radius": 5}}>Status: Connected</div>
                    <Button variant="contained" color="error" startIcon={<RemoveCircleIcon />} onClick={() => {
                      console.log("OK");
                    }}>
                      Disconnect
                    </Button>
                  </ Stack>
                }
              </ Paper>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                { ! showReddit ?
                  <Stack direction="row" alignItems="center" spacing={4}>
                    <RedditIcon />
                    <h3>Reddit</h3>
                      <div style={{backgroundColor: "#FF9494", color: "white", padding: 4, "border-radius": 5}}>Status: Disconnected</div>
                      <Button variant="contained" style={{backgroundColor: "#ff4500"}} startIcon={<RedditIcon />} onClick={() => {
                        OAuthReddit();
                      }}>
                        Connect my Account
                      </Button>
                  </ Stack>: <Stack direction="row" alignItems="center" spacing={4}>
                    <RedditIcon />
                    <h3>Reddit</h3>
                    <div style={{backgroundColor: "#9BE89B", color: "white", padding: 4, "border-radius": 5}}>Status: Connected</div>
                    <Button variant="contained" color="error" startIcon={<RemoveCircleIcon />} onClick={() => {
                      console.log("OK");
                    }}>
                      Disconnect
                    </Button>
                  </ Stack>
                }
              </ Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}