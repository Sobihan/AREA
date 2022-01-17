const express = require('express');
const router = express.Router();
const user_controllers = require('../controllers/user/user');
const api_access = require('../controllers/api_access/api_access');

router.post('/authenticate', user_controllers.authenticate);
router.post('/register', user_controllers.register);
router.post('/update-user-data', user_controllers.updateUserData);
router.get('/get-user-data', user_controllers.getUserData);

router.post('/update-api-token', api_access.ApiAuth);
router.post('/acess-api-token', api_access.getApiToken);

module.exports = router;