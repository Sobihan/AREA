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
import EditIcon from '@mui/icons-material/Edit';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
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
import { useCookies } from 'react-cookie';


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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editJob, setEditJob] = React.useState(null);
  const [cookies] = useCookies(['user']);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleList = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': cookies.token
      },
      body: JSON.stringify({
        name: "",
        action: "",
        reaction: ""
      })
    };
    const response = await fetch('/api/v1/search-job', requestOptions);
    const respdata = await response.json();
    setJobsList(respdata);
    Sleep(5000).then(() => {
      handleList();
    });
  };

  const handleDelete = async (jobToken) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': cookies.token
      },
      body: JSON.stringify({
        jobToken: jobToken
      })
    };
    await fetch('/api/v1/delete-job', requestOptions);
    window.location.reload();
  }

  if (jobsList && jobsList.job.length > 0) {
    return (
      <Grid item xs={12}>
        <BootstrapDialog
          fullWidth={true}
          maxWidth={"lg"}
          onClose={closeDialog}
          aria-labelledby="edit-jobs-title"
          open={openDialog}
        >
          <BootstrapDialogTitle id="edit-jobs-title" onClose={closeDialog}>
            Edit AREA
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <EditJob jobJson={editJob} />
          </DialogContent>
        </BootstrapDialog>
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
              <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => {
                setEditJob(line);
                setOpenDialog(true);
              }}>
                Edit
              </Button>
              <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => {
                handleDelete(line.jobToken);
              }}>
                Delete
              </Button>
              <FormControlLabel control={<Switch checked={!line.is_stoped} onChange={async () => {
                  const requestOptions = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'authToken': cookies.token
                    },
                    body: JSON.stringify({
                      jobToken: line.jobToken,
                      stop: !line.is_stoped
                    })
                  };
                  await fetch('/api/v1/stop-job', requestOptions);
                  window.location.reload();
                }
              }/>} label={line.is_stoped ? "Disabled": "Enabled"} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={4} sx={{ mt: 3 }}>
              <h3>IF</h3>
              <TextField
                disabled
                id="outlined-disabled"
                label="Action"
                defaultValue={line.action}
              />
              {line.actionArg !== '' ? (line.actionArg.map(lineActionArg => {
                return Object.values(lineActionArg)[0] !== "userToken" ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label={Object.values(lineActionArg)[0]}
                    defaultValue={Object.values(lineActionArg)[1]}
                  />): null
              })): null}
              <h3>THEN</h3>
              <TextField
                disabled
                id="outlined-disabled"
                label="Action"
                defaultValue={line.reaction}
              />
              {line.reactionArg !== '' ? (line.reactionArg.map(lineReactionArg => {
                return Object.values(lineReactionArg)[0] !== "userToken" ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label={Object.values(lineReactionArg)[0]}
                    defaultValue={Object.values(lineReactionArg)[1]}
                  />): null
              })): null}
            </ Stack>
        </ Paper>
        ))}
      </Grid>
    );
  }
  else if (jobsList) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <h3>You don't have any active AREA !</h3>
      </Grid>
    )
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
  const [cookies] = useCookies(['user']);

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
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': cookies.token
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
        window.location.reload();
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
        if (actionArg[i][argName] === "") {
          setActionArg(actionArg.filter((e)=>(Object.keys(e)[0] !== argName)));
        }
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
        if (reactionArg[i][argName] === "") {
          setReactionArg(reactionArg.filter((e)=>(Object.keys(e)[0] !== argName)));
        }
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
      setRunNowLabel("Enabled");
    }
    else {
      setRunNowLabel("Disabled");
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
              defaultValue={areaName}
              onChange={handleAreaName}
            />
            <h3>INTERVAL</h3>
            <TextField
              required
              margin="normal"
              id="areaInterval"
              label="Seconds"
              name="areaInterval"
              defaultValue={areaInterval !== 0 ? areaInterval: ""}
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
                defaultValue={action}
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
              action.args.map((lineActionArg, index) =>
                <TextField
                  required
                  margin="normal"
                  id="actionArg"
                  label={Object.keys(lineActionArg)}
                  name="actionArg"
                  defaultValue={
                    actionArg[index] ? Object.values(actionArg[index]): ""
                  }
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
                defaultValue={reaction}
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
              reaction.args.map((lineReactionArg, index) =>
                <TextField
                  required
                  margin="normal"
                  id="reactionArg"
                  label={Object.keys(lineReactionArg)}
                  name="reactionArg"
                  defaultValue={
                    reactionArg[index] ? Object.values(reactionArg[index]): ""
                  }
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
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }}>
              <CircularProgress />
            </Grid>
          ): null}
          {createJob === "t" ? (
            <Grid item xs={12} justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                AREA — <strong>Created successfully !</strong>
              </Alert>
            </ Grid>
          ): null}
          {createJob === "f" ? (
            <Grid item xs={12} justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                AREA — <strong>Creation failed !</strong>
              </Alert>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          ): null}
        </React.Fragment>
      ): null}
      </Grid>
    );
  }
}

function EditJob(jobJson)
{
  const [areaList, setAreaList] = React.useState("");
  const [areaName, setAreaName] = React.useState(jobJson.jobJson.name);
  const [areaInterval, setAreaInterval] = React.useState(jobJson.jobJson.interval);
  const [action, setAction] = React.useState(jobJson.jobJson.action);
  const [reaction, setReaction] = React.useState(jobJson.jobJson.reaction);
  const [actionArg, setActionArg] = React.useState(jobJson.jobJson.actionArg);
  const [reactionArg, setReactionArg] = React.useState(jobJson.jobJson.reactionArg);
  const [areaRunNow, setAreaRunNow] = React.useState(jobJson.jobJson.is_stoped);
  const [runNowLabel, setRunNowLabel] = React.useState(areaRunNow ? "Enabled": "Disabled");
  const [createJob, setCreateJob] = React.useState("l");
  const [cookies] = useCookies(['user']);

  const steps = ['New AREA', 'Select an action', 'Select a reaction', 'Review'];
  const [activeStep, setActiveStep] = React.useState(0);

  const getAreaList = async () => {
    var respdata = "";

    if (areaList === "") {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const api_response = await fetch('/api/v1/re-action-info', requestOptions);
      respdata = await api_response.json();
    }
    for (var i = 0; respdata.jsonArr && i < respdata.jsonArr.length; i++) {
      for (var j = 0; respdata.jsonArr[i].actions && j < respdata.jsonArr[i].actions.length; j++) {
        if (respdata.jsonArr[i].actions[j].name === action) {
          setAction(respdata.jsonArr[i].actions[j]);
        }
      }
    }
    for (var k = 0; respdata.jsonArr && k < respdata.jsonArr.length; k++) {
      for (var l = 0; respdata.jsonArr[k].reactions && l < respdata.jsonArr[k].reactions.length; l++) {
        if (respdata.jsonArr[k].reactions[l].name === reaction) {
          setReaction(respdata.jsonArr[k].reactions[l]);
        }
      }
    }
    setAreaList(respdata);
  }

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      const factionArg = [];
      for (var i = 0; i < actionArg.length; i += 1) {
        if (Object.values(actionArg[i])[0] !== "userToken") {
          factionArg.push({
            [Object.values(actionArg[i])[0]]: Object.values(actionArg[i])[1]
          })
        }
      }
      const freactionArg = [];
      for (var j = 0; j < reactionArg.length; j += 1) {
        if (Object.values(reactionArg[j])[0] !== "userToken") {
          freactionArg.push({
            [Object.values(reactionArg[j])[0]]: Object.values(reactionArg[j])[1]
          })
        }
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': cookies.token
        },
        body: JSON.stringify({
          jobToken: jobJson.jobJson.jobToken,
          name: areaName,
          action: action.name,
          actionArg: factionArg,
          reaction: reaction.name,
          reactionArg: freactionArg,
          interval: areaInterval,
          runNow: areaRunNow
        })
      };
      const response = await fetch('/api/v1/update-job', requestOptions);
      if (response.status === 200) {
        setCreateJob("t");
        window.location.reload();
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

  const handleActionArg = (event, argName) => {
    for (var i = 0; i < actionArg.length; i += 1) {
      if (Object.values(actionArg[i])[0] === argName) {
        actionArg[i].value = event.target.value;
        if (actionArg[i].value === "") {
          setActionArg(actionArg.filter((e)=>(Object.values(e)[0] !== Object.values(actionArg[i])[0])))
        }
        return;
      }
    }
    const newArg = {
      key: argName,
      value: event.target.value
    };
    setActionArg(actionArg => [...actionArg, newArg]);
  };

  const handleReactionArg = (event, argName) => {
    for (var i = 0; i < reactionArg.length; i += 1) {
      if (Object.values(reactionArg[i])[0] === argName) {
        reactionArg[i].value = event.target.value;
        if (reactionArg[i].value === "") {
          setReactionArg(reactionArg.filter((e)=>(Object.values(e)[0] !== Object.values(reactionArg[i])[0])))
        }
        return;
      }
    }
    const newArg = {
      key: argName,
      value: event.target.value
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

  for (var i = 0; i < actionArg.length; i += 1) {
    if (Object.values(actionArg[i])[0] === "userToken") {
      actionArg.splice(i, 1);
    }
  }
  for (var j = 0; j < reactionArg.length; j += 1) {
    if (Object.values(reactionArg[j])[0] === "userToken") {
      reactionArg.splice(j, 1);
    }
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
              defaultValue={areaName}
              onChange={handleAreaName}
            />
            <h3>INTERVAL</h3>
            <TextField
              required
              margin="normal"
              id="areaInterval"
              label="Seconds"
              name="areaInterval"
              defaultValue={areaInterval}
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
                value={action.name}
                label="Action"
                defaultValue={action.name}
              >
                {areaList.jsonArr.map(line => {
                  return line.actions ? (line.actions.map(lineAction =>
                    <MenuItem
                      key={lineAction.name}
                      value={lineAction.name}
                      onClick={() => {
                        if (lineAction.name !== action.name) {
                          setAction(lineAction);
                          setActionArg([]);
                        }
                      }}
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
              action.args.map((lineActionArg, index) =>
                <TextField
                  required
                  margin="normal"
                  id="actionArg"
                  label={Object.keys(lineActionArg)}
                  name="actionArg"
                  defaultValue={
                    actionArg[index] ? Object.values(actionArg[index])[1]: ""
                  }
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
                value={reaction.name}
                label="Reaction"
                defaultValue={reaction.name}
              >
                {areaList.jsonArr.map(line => {
                  return line.reactions ? (line.reactions.map(lineReaction =>
                    <MenuItem
                      key={lineReaction.name}
                      value={lineReaction.name}
                      onClick={() => {
                        if (lineReaction.name !== reaction.name) {
                          setReaction(lineReaction);
                          setReactionArg([]);
                        }
                      }}
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
              reaction.args.map((lineReactionArg, index) =>
                <TextField
                  required
                  margin="normal"
                  id="reactionArg"
                  label={Object.keys(lineReactionArg)}
                  name="reactionArg"
                  defaultValue={
                    reactionArg[index] ? Object.values(reactionArg[index])[1]: ""
                  }
                  onChange={(e) => handleReactionArg(e, Object.keys(lineReactionArg)[0])}
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
            {actionArg !== '' ? (actionArg.map(lineActionArg => {
              return Object.values(lineActionArg)[0] !== "userToken" ? (
                <TextField
                  disabled
                  id="outlined-disabled"
                  label={Object.values(lineActionArg)[0]}
                  defaultValue={Object.values(lineActionArg)[1]}
                />): null
              }
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
            {reactionArg !== '' ? (reactionArg.map(lineReactionArg => {
              return Object.values(lineReactionArg)[0] !== "userToken" ? (
                <TextField
                  disabled
                  id="outlined-disabled"
                  label={Object.values(lineReactionArg)[0]}
                  defaultValue={Object.values(lineReactionArg)[1]}
                />): null
              }
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
            <Grid container justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }}>
              <CircularProgress />
            </Grid>
          ): null}
          {createJob === "t" ? (
            <Grid item xs={12} justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                AREA — <strong>Created successfully !</strong>
              </Alert>
            </ Grid>
          ): null}
          {createJob === "f" ? (
            <Grid item xs={12} justifyContent="center" alignItems="center" direction="row" spacing={4} sx={{ mt: 16, mb: 16 }}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                AREA — <strong>Creation failed !</strong>
              </Alert>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              </Box>
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
  const [cookies, setCookie] = useCookies(['user']);

  const closeDialog = () => {
    setOpenDialog(false);
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