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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router';
import { Sleep } from '../Sleep';
import { useCookies } from 'react-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { RedditService } from './Services/RedditService';
import { GoogleService } from './Services/GoogleService';
import Avatar from '@mui/material/Avatar';

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
  const [ServicesList, setServicesList] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [cookies, setCookie] = useCookies(['user']);
  const [user, setUser] = React.useState("");

  if (cookies.logged !== "true") {
    window.location = "/login";
    return (
      <h3>Redirecting...</h3>
    );
  }

  const getFile = (base64File) => {
    const byteString = atob(base64File.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: 'image/jpeg',
    });
    return newBlob;
  };

  const handleUserData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': cookies.token
      }
    };
    const response = await fetch('/api/v1/get-user-data', requestOptions);
    const respdata = await response.json();
    setUser(respdata.user);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getServices = async () => {
    const requestServices = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': cookies.token
      }
    };
    const responseServices = await fetch('/api/v1/get-user-loged-api', requestServices);
    if (responseServices.status === 200) {
      const respdata = await responseServices.json();
      setCookie('reddit', respdata.reddit, { path: '/' });
      setCookie('google', respdata.google, { path: '/' });
      setServicesList(respdata);
      Sleep(5000).then(() => {
        getServices();
      });
    }
  };
  if (ServicesList && user !== "") {
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
              Services
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
                  window.location = "/";
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
                  window.location = "/account";
                }
              }>
                <ListItemIcon>
                  {user.avatar ? <Avatar sx={{ width: 24, height: 24 }} src={URL.createObjectURL(getFile(user.avatar))} />:<Avatar sx={{ width: 24, height: 24 }} />}
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button onClick={
                () => {
                  setCookie('logged', "false", { path: '/' });
                  window.location.reload();
                }
              }>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
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
              <Grid item xs={12}>
                <RedditService />
                <GoogleService />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  }
  else {
    getServices();
    handleUserData();
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
}