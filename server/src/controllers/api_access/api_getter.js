const api_access = require('../../db_management/api_access/db_api_access');

async function apiGetter(/*type*/)
{
    const apiTokens = new Map();
    /*
    {
        userToken: {
            REDDIT: {
                token: '',
                disableAt: '',
            },
            Google: {
                ???
            }
        }
    }
    */

    if (apiTokens.get(userToken) != undefined) {
        if (apiTokens.get(userToken)[type] != undefined) {
            if (apiTokens.get(userToken)[type].disableAt < Date.now()) {
                //return apiTokens.get(userToken).get(type).token;
                return apiTokens.get(userToken)[type].token;
            }
        }
    }
    //else refresh.
    //get data from db.
    //impossible to do.

}

module.exports.apiGetter = apiGetter;