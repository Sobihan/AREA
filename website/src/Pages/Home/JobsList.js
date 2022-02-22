import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Sleep } from '../../Sleep';
import { EditJob } from './EditJob';
import { useCookies } from 'react-cookie';

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

export function JobsList()
{
  const [jobsList, setJobsList] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editJob, setEditJob] = React.useState(null);
  const [cookies, setCookie] = useCookies(['user']);

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
    if (response.status !== 200) {
      setCookie('logged', "false", { path: '/' });
      window.location.reload();
    }
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