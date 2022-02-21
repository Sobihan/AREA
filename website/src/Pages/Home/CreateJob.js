import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
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
import { useCookies } from 'react-cookie';

export function CreateJob()
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
                      onClick={() => {
                        if (action !== '' && lineAction.name !== action.name) {
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
                      onClick={() => {
                        if (reaction !== '' && lineReaction.name !== reaction.name) {
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