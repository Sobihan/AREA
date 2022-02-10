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
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { User } from '../Account/User';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import Fab from '@mui/material/Fab';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

function JobsList()
{
  const [jobsList, setJobsList] = React.useState(null);
  var test_json = { "test": {
      "items": [
        {"uuid": "Uuid 1", "action": "Action 1", "reaction": "Reaction 1"},
        {"uuid": "Uuid 2", "action": "Action 2", "reaction": "Reaction 2"},
        {"uuid": "Uuid 3", "action": "Action 3", "reaction": "Reaction 3"}
      ]
    }
  };
  const handleList = async () => {
    const response = await JSON.parse(JSON.stringify(test_json));
    setJobsList(response);
  };
  if (jobsList) {
    return (
      <Grid item xs={12}>
        {jobsList.test.items.map(line => (
          <Paper sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" alignItems="center" spacing={4}>
              <h3>IF</h3>
              <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{line.action}</div>
              <h3>THEN</h3>
              <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{line.reaction}</div>
              <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => {
                console.log(line.uuid);
            }}>
                Delete
              </Button>
            </ Stack>
        </ Paper>
        ))}
      </Grid>
    );
  }
  else {
    handleList();
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
}

function CreateJob()
{
  const [actionsList, setActionsList] = React.useState(null);
  const [reactionsList, setReactionsList] = React.useState(null);
  const [action, setAction] = React.useState('');
  const [reaction, setReaction] = React.useState('');
  const [actionArg, setActionArg] = React.useState('');
  const [reactionArg, setReactionArg] = React.useState('');

  const steps = ['Select an action', 'Select a reaction', 'Review'];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      console.log("coucou");
      return;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  var actions_test_json = { "test": {
    "items": [
      {"uuid": "Uuid 1", "action": "Action 1", "actionArg": "ActionArg 1"},
      {"uuid": "Uuid 2", "action": "Action 2", "actionArg": ""},
      {"uuid": "Uuid 3", "action": "Action 3", "actionArg": "ActionArg 3"}
    ]
  }};
  var reactions_test_json = { "test": {
    "items": [
      {"uuid": "Uuid 1", "reaction": "Reaction 1", "reactionArg": "ReactionArg 1"},
      {"uuid": "Uuid 2", "reaction": "Reaction 2", "reactionArg": ""},
      {"uuid": "Uuid 3", "reaction": "Reaction 3", "reactionArg": "ReactionArg 3"}
    ]
  }};
  const handleAction = (event) => {
    setAction(event.target.value);
  };
  const handleReaction = (event) => {
    setReaction(event.target.value);
  };
  const handleActionArg = (event) => {
    setActionArg(event.target.value);
  };
  const handleReactionArg = (event) => {
    setReactionArg(event.target.value);
  };
  const handleList = async () => {
    const actions_response = await JSON.parse(JSON.stringify(actions_test_json));
    setActionsList(actions_response);
    const reactions_response = await JSON.parse(JSON.stringify(reactions_test_json));
    setReactionsList(reactions_response);
  };

  if (actionsList && reactionsList) {
    return (
      <Grid>
        <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 ? (
        <React.Fragment>
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={2} sx={{ mt: 3 }}>
            <h3>IF</h3>
            <FormControl sx={{ width: 150 }} required>
              <InputLabel id="actionSelectLabel">Action</InputLabel>
              <Select
                labelId="actionSelectLabel"
                id="actionSelect"
                value={action}
                label="Action"
                onChange={handleAction}
              >
                {actionsList.test.items.map(line => (
                  <MenuItem
                    key={line.action}
                    value={line}
                  >
                    {line.action}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <h3>ARG</h3>
            {action !== '' && action.actionArg !== '' ? (
              <TextField
                required
                margin="normal"
                id="argument"
                label={action.actionArg}
                name="argument"
                onChange={handleActionArg}
              />
            ): <TextField
                disabled
                margin="normal"
                id="argument"
                label="Disabled"
                name="argument"
                onChange={handleActionArg}
              />
          }
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} disabled={action === '' || (action.actionArg !== '' && actionArg === '')}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ): null}


      {activeStep === 1 ? (
        <React.Fragment>
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={2} sx={{ mt: 3 }}>
            <h3>THEN</h3>
            <FormControl sx={{ width: 150 }} required>
              <InputLabel id="reactionSelectLabel">Reaction</InputLabel>
              <Select
                labelId="reactionSelectLabel"
                id="reactionSelect"
                value={reaction}
                label="Reaction"
                onChange={handleReaction}
              >
                {reactionsList.test.items.map(line => (
                  <MenuItem
                    key={line.reaction}
                    value={line}
                  >
                    {line.reaction}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <h3>ARG</h3>
            {reaction !== '' && reaction.reactionArg !== '' ? (
              <TextField
                required
                margin="normal"
                id="argument"
                label={reaction.reactionArg}
                name="argument"
                onChange={handleReactionArg}
              />
            ): (<TextField
              disabled
              margin="normal"
              id="argument"
              label="Disabled"
              name="argument"
              onChange={handleReactionArg}
            />
          )}
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} disabled={reaction === ''}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ): null}


      {activeStep === 2 ? (
        <React.Fragment>
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 3 }}>
              <h3>IF</h3>
              <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{action.action}</div>
              {actionArg !== '' ? (
                <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{actionArg}</div>
              ): null}
              <h3>THEN</h3>
              <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{reaction.reaction}</div>
              {reactionArg !== '' ? (
                <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{reactionArg}</div>
              ): null}
              </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ): null}
      </Grid>
    );
  }
  else {
    handleList();
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function Dashboard()
{
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  //if (User.logged !== true) {
  //  window.location = "/login";
  //}
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleButton  = () => {
    console.log("coucou");
  };
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
            {/* Jobs List */}
            <JobsList />
          </Grid>
          <Fab color="primary" sx={{ position: 'absolute', bottom: 16, right: 16 }} variant="extended" onClick={() => {setOpenDialog(true)}}>
            <AddCircleIcon sx={{ mr: 1 }} />
            New Job
          </Fab>
        </Container>
        <div>
        <BootstrapDialog
          onClose={closeDialog}
          aria-labelledby="create-jobs-title"
          open={openDialog}
        >
          <BootstrapDialogTitle id="create-jobs-title" onClose={closeDialog}>
            Create Job
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <CreateJob />
          </DialogContent>
        </BootstrapDialog>
      </div>
      </Box>
    </Box>
  );
}