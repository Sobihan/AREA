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
import CircularProgress from '@mui/material/CircularProgress';
import ListItemText from '@mui/material/ListItemText';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

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

export function Account()
{
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState("");
  const [edit, setEdit] = React.useState(true);
  const [cookies, setCookie] = useCookies(['user']);

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

  const handleSave = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': cookies.token
      },
      body: JSON.stringify({
        name: user.name,
        lstName: user.lstName
      })
    };
    await fetch('/api/v1/update-user-data', requestOptions);
  };



  if (cookies.logged !== "true") {
    window.location = "/login";
    return (
      <h3>Redirecting...</h3>
    );
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };
  if (user === "") {
    handleUserData();
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
  else {
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
              Account
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
                  window.location = "/services";
                }
              }>
                <ListItemIcon>
                  <MiscellaneousServicesIcon />
                </ListItemIcon>
                <ListItemText primary="Services" />
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
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" alignItems="center" spacing={4}>
                  <Avatar
                    sx={{ width: 128, height: 128 }}
                  >
                    ?
                  </Avatar>
                  <h3>{user.username}</h3>
                  <TextField
                    disabled={edit}
                    id="outlined-disabled"
                    label="First Name"
                    defaultValue={user.name}
                    onChange={(event) => {user.name = event.target.value}}
                  />
                  <TextField
                    disabled={edit}
                    id="outlined-disabled"
                    label="Last Name"
                    defaultValue={user.lstName}
                    onChange={(event) => {user.lstName = event.target.value}}
                  />
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Email"
                    defaultValue={user.email}
                  />
                  {edit ?
                    <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => {setEdit(false)}}>
                      Edit
                    </Button>:
                    <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={() => {
                      setEdit(true);
                      handleSave();
                    }}>
                      Save
                    </Button>
                  }
                </Stack>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  }
}