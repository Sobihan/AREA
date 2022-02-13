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
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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

function JobsList()
{
  const [jobsList, setJobsList] = React.useState(null);

  const handleList = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': User.token
      },
      body: JSON.stringify({
        name: "",
        action: "",
        reaction: ""
      })
    };
    const response = await fetch('/api/v1/search-job', requestOptions);
    const respdata = await response.json();
    console.log(respdata);
    setJobsList(respdata);
  };

  const handleDelete = async (jobToken) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': User.token
      },
      body: JSON.stringify({
        jobToken: jobToken
      })
    };
    const response = await fetch('/api/v1/delete-job', requestOptions);
    const respdata = await response.json();
  }

  if (jobsList) {
    return (
      <Grid item xs={12}>
        {jobsList.job.map(line => (
          <Paper sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" alignItems="center" spacing={4}>
              <h3>{line.name.toUpperCase()}</h3>
              <TextField
                disabled
                id="outlined-disabled"
                label="Interval"
                defaultValue={line.interval + " Seconds"}
              />
              <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => {
                handleDelete(line.jobToken);
                Sleep(1000).then(() => {
                  handleList();
                });
              }}>
                Delete
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={4} sx={{ mt: 3 }}>
              <h3>IF</h3>
              <TextField
                disabled
                id="outlined-disabled"
                label="Action"
                defaultValue={line.action}
              />
              {line.actionArg !== '' ? (line.actionArg.map(lineActionArg =>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label={Object.keys(lineActionArg)[0]}
                  defaultValue={Object.values(lineActionArg)[0]}
                />
              )): null}
              <h3>THEN</h3>
              <TextField
                disabled
                id="outlined-disabled"
                label="Action"
                defaultValue={line.reaction}
              />
              {line.reactionArg !== '' ? (line.reactionArg.map(lineReactionArg =>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label={Object.keys(lineReactionArg)[0]}
                  defaultValue={Object.values(lineReactionArg)[0]}
                />
              )): null}
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
  const [areaList, setAreaList] = React.useState("");
  const [areaName, setAreaName] = React.useState("");
  const [areaInterval, setAreaInterval] = React.useState(0);
  const [action, setAction] = React.useState('');
  const [reaction, setReaction] = React.useState('');
  const [actionArg, setActionArg] = React.useState([]);
  const [reactionArg, setReactionArg] = React.useState('');
  const [areaRunNow, setAreaRunNow] = React.useState(true);
  const [runNowLabel, setRunNowLabel] = React.useState("Enabled");
  const [createJob, setCreateJob] = React.useState("l");

  const steps = ['New AREA', 'Select an action', 'Select a reaction', 'Review'];
  const [activeStep, setActiveStep] = React.useState(0);

  const getAreaList = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const api_response = await fetch('/api/v1/re-action-info', requestOptions);
    const respdata = await api_response.json();
    setAreaList(respdata);
  }

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      console.log(User.token);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': User.token
        },
        body: JSON.stringify({
          jobToken: "",
          name: areaName,
          action: action.name,
          actionArg: actionArg,
          reaction: reaction.name,
          reactionArg: reactionArg,
          interval: areaInterval,
          runNow: areaRunNow
        })
      };
      const response = await fetch('/api/v1/update-job', requestOptions);
      if (response.status === 200) {
        setCreateJob("t");
      }
      else {
        setCreateJob("f");
      }
      return;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAreaName = (event) => {
    setAreaName(event.target.value);
  };

  const handleAreaInterval = (event) => {
    if (event.target.value !== "" && !isNaN(+event.target.value)) {
      setAreaInterval(event.target.value);
    }
    else if (event.target.value === "") {
      setAreaInterval(0);
    }
  };

  const handleAction = (event) => {
    setAction(event.target.value);
  };

  const handleReaction = (event) => {
    setReaction(event.target.value);
  };

  const handleActionArg = (event, argName) => {
    for (var i = 0; i < actionArg.length; i += 1) {
      if (Object.keys(actionArg[i])[0] === argName) {
        actionArg[i][argName] = event.target.value;
        return;
      }
    }
    const newArg = {
      [argName]: event.target.value
    };
    setActionArg(actionArg => [...actionArg, newArg]);
  };

  const handleReactionArg = (event, argName) => {
    for (var i = 0; i < reactionArg.length; i += 1) {
      if (Object.keys(reactionArg[i])[0] === argName) {
        reactionArg[i][argName] = event.target.value;
        return;
      }
    }
    const newArg = {
      [argName]: event.target.value
    };
    setReactionArg(reactionArg => [...reactionArg, newArg]);
  };

  const handleRunNow = (event) => {
    if (event.target.checked) {
      setRunNowLabel("Enabled")
    }
    else {
      setRunNowLabel("Disabled")
    }
    setAreaRunNow(event.target.checked);
  }

  if (areaList === "") {
    getAreaList();
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
  else {
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
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 3 }}>
            <h3>NAME</h3>
            <TextField
              required
              margin="normal"
              id="areaName"
              label="Name"
              name="areaName"
              onChange={handleAreaName}
            />
            <h3>INTERVAL</h3>
            <TextField
              required
              margin="normal"
              id="areaInterval"
              label="Seconds"
              name="areaInterval"
              onChange={handleAreaInterval}
            />
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
            <Button onClick={handleNext} disabled={areaName === "" || areaInterval === 0}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ): null}


      {activeStep === 1 ? (
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
                {areaList.jsonArr.map(line => {
                  return line.actions ? (line.actions.map(lineAction =>
                    <MenuItem
                      key={lineAction.name}
                      value={lineAction}
                    >
                      {lineAction.name}
                    </MenuItem>
                )): null})}
              </Select>
            </FormControl>
            {action !== '' && action.args && action.args.length !== 0 ? (
              <h3>ARG</h3>
            ): null}
            {action !== '' && action.args ? (
              action.args.map(lineActionArg =>
                <TextField
                  required
                  margin="normal"
                  id="actionArg"
                  label={Object.keys(lineActionArg)}
                  name="actionArg"
                  onChange={(e) => handleActionArg(e, Object.keys(lineActionArg)[0])}
                />
              )
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
            <Button onClick={handleNext} disabled={action === '' || (action.args && (action.args.length !== actionArg.length))}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ): null}


      {activeStep === 2 ? (
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
                {areaList.jsonArr.map(line => {
                  return line.reactions ? (line.reactions.map(lineReaction =>
                    <MenuItem
                      key={lineReaction.name}
                      value={lineReaction}
                    >
                      {lineReaction.name}
                    </MenuItem>
                )): null})}
              </Select>
            </FormControl>
            {reaction !== '' && reaction.args && reaction.args.length !== 0 ? (
              <h3>ARG</h3>
            ): null}
            {reaction !== '' && reaction.args ? (
              reaction.args.map(lineReactionArg =>
                <TextField
                  required
                  margin="normal"
                  id="reactionArg"
                  label={Object.keys(lineReactionArg)}
                  name="reactionArg"
                  onChange={(e) => handleReactionArg(e, Object.keys(lineReactionArg)[0])}
                />
              )
            ): null
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
            <Button onClick={handleNext} disabled={reaction === '' || (reaction.args && (reaction.args.length !== reactionArg.length))}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      ): null}


      {activeStep === 3 ? (
        <React.Fragment>
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 6 }}>
            <h3>{areaName.toUpperCase()}</h3>
            <TextField
              disabled
              id="outlined-disabled"
              label="Interval"
              defaultValue={areaInterval + " Seconds"}
            />
            <FormControlLabel control={<Switch checked={areaRunNow} onChange={handleRunNow} />} label={runNowLabel} />
          </Stack>
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 3 }}>
            <h3>IF</h3>
            <TextField
              disabled
              id="outlined-disabled"
              label="Action"
              defaultValue={action.name}
            />
            {actionArg !== '' ? (actionArg.map(lineActionArg =>
              <TextField
                disabled
                id="outlined-disabled"
                label={Object.keys(lineActionArg)[0]}
                defaultValue={Object.values(lineActionArg)[0]}
              />
            )): null}
          </Stack>
          <Stack justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 3 }}>
          <h3>THEN</h3>
            <TextField
              disabled
              id="outlined-disabled"
              label="Reaction"
              defaultValue={reaction.name}
            />
            {reactionArg !== '' ? (reactionArg.map(lineReactionArg =>
              <TextField
                disabled
                id="outlined-disabled"
                label={Object.keys(lineReactionArg)[0]}
                defaultValue={Object.values(lineReactionArg)[0]}
              />
            )): null}
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


      {activeStep === 4 ? (
        <React.Fragment>
          {createJob === "l" ? (
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }} >
              <CircularProgress />
            </Grid>
          ): null}
          {createJob === "t" ? (
            <Grid item xs={12} justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }} >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                AREA — <strong>Created successfully !</strong>
              </Alert>
            </ Grid>
          ): null}
          {createJob === "f" ? (
            <Grid item xs={12} justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }} >
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                AREA — <strong>Creation failed !</strong>
              </Alert>
            </Grid>
          ): null}
        </React.Fragment>
      ): null}
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
            New AREA
          </Fab>
        </Container>
        <BootstrapDialog
          fullWidth={true}
          maxWidth={"lg"}
          onClose={closeDialog}
          aria-labelledby="create-jobs-title"
          open={openDialog}
        >
          <BootstrapDialogTitle id="create-jobs-title" onClose={closeDialog}>
            Create AREA
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <CreateJob />
          </DialogContent>
        </BootstrapDialog>
      </Box>
    </Box>
  );
}