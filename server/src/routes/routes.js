const express = require('express');
const router = express.Router();
const user_controllers = require('../controllers/user/user');
const api_access = require('../controllers/api_access/api_access');
const job = require('../controllers/job/job');

router.post('/authenticate', user_controllers.authenticate);
router.post('/register', user_controllers.register);
router.post('/google-auth', user_controllers.googleRegisterOrAuthenticate);
router.post('/update-user-data', user_controllers.updateUserData);
router.get('/get-user-data', user_controllers.getUserData);

router.post('/update-api-token', api_access.ApiAuth);
router.post('/get-user-loged-api', api_access.getLogedIn);

router.post('/update-job', job.updateJob);
router.post('/delete-job', job.deleteJob);
router.post('/search-job', job.searchJob);
router.post('/stop-job', job.stopJob);
router.get('/re-action-info', job.getReActionInfo);


router.get('/test-token-api', job.testTokenApi);

module.exports = router;