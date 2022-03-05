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

export function EditJob(jobJson)
{
  const [areaList, setAreaList] = React.useState("");
  const [areaName, setAreaName] = React.useState(jobJson.jobJson.name);
  const [areaInterval, setAreaInterval] = React.useState(jobJson.jobJson.interval);
  const [action, setAction] = React.useState(jobJson.jobJson.action);
  const [reaction, setReaction] = React.useState(jobJson.jobJson.reaction);
  const [actionArg, setActionArg] = React.useState(jobJson.jobJson.actionArg);
  const [reactionArg, setReactionArg] = React.useState(jobJson.jobJson.reactionArg);
  const [areaRunNow, setAreaRunNow] = React.useState(true);
  const [runNowLabel, setRunNowLabel] = React.useState(areaRunNow ? "Run Now": "Run Later");
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
          setActionArg(actionArg.filter((e)=>(Object.values(e)[0] !== Object.values(actionArg[i])[0])));
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
          setReactionArg(reactionArg.filter((e)=>(Object.values(e)[0] !== Object.values(reactionArg[i])[0])));
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
      setRunNowLabel("Run Now")
    }
    else {
      setRunNowLabel("Run Later")
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
          {action !== '' && action.description ?
            <Stack justifyContent="center" alignItems="center" direction="row" spacing={2} sx={{ mt: 1 }}>
              <h3>DESCRIPTION</h3>
              <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{action.description}</div>
            </Stack>: null
          }
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
          {reaction !== '' && reaction.description ?
            <Stack justifyContent="center" alignItems="center" direction="row" spacing={2} sx={{ mt: 1 }}>
              <h3>DESCRIPTION</h3>
              <div style={{backgroundColor: "gray", color: "white", padding: 4, "border-radius": 5}}>{reaction.description}</div>
            </Stack>: null
          }
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