# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Create or update a given job | `POST` | `/update-job` |
| Delete a given job | `POST` | `/delete-job` |
| Search in your job list | `POST` | `/search-job` |
| Stop a given job | `POST` | `/stop-job` |
| Get list of actions and reactions | `GET` | `/re-action-info` |

## **Routes description**

### **Create or update a given job**

Request type: `POST`.

URL: `/update-job`.

Exemple of request in cURL:

If `jobToken` is equal to an existing job said job will be updated otherwise it will be created.

```bash
curl --location --request POST 'http://localhost:8080/api/v1/update-job' \
--header 'authToken: [authToken]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jobToken": "",
    "name": "chmmma",
    "action": "[Twitch] getStream",
    "actionArg": [{"channelName":"ponce"}],
    "reaction": "[Discord] sendPrivateMessages",
    "reactionArg": [
        {
            "userID": "[userID]"
        }
    ],
    "interval": "5",
    "runNow": "true"
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Update of job done!",
    "good_job": {
        "jobToken": "249ac525-e0f4-4bdb-9448-e62a63ef057a",
        "name": "chmmma",
        "action": "[Twitch] getStream",
        "actionArg": [
            {
                "key": "channelName",
                "value": "ponce"
            }
        ],
        "reaction": "[Discord] sendPrivateMessages",
        "reactionArg": [
            {
                "key": "userID",
                "value": "000000000000000000"
            }
        ],
        "interval": 5
    }
}
```
____
### **Delete a given job**

Request type: `POST`.

URL: `/delete-job`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/delete-job' \
--header 'authToken: [authToken]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'jobToken=[jobToken]'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "deletion of job done!"
}
```
____
### **Search in your job list**

Request type: `POST`.

URL: `/search-job`.

Exemple of request in cURL:
```bash
curl --location --request GET 'http://localhost:8080/api/v1/search-job' \
--header 'authToken: [authToken]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=' \
--data-urlencode 'action=' \
--data-urlencode 'reaction='
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Find job done!",
    "job": [
        {
            "jobToken": "c1c1e8fd-b311-447e-8c7d-346c3a7233da",
            "name": "chmmma",
            "action": "[Twitch] getStream",
            "actionArg": [
                {
                    "key": "channelName",
                    "value": "solary"
                }
            ],
            "reaction": "[Discord] sendPrivateMessages",
            "reactionArg": [
                {
                    "key": "userID",
                    "value": "000000000000000000"
                }
            ],
            "interval": 5
        },
        {
            "jobToken": "35ab92f6-50f1-4622-89d0-8914d7051cdd",
            "name": "chmmma",
            "action": "[Twitch] getStream",
            "actionArg": [
                {
                    "key": "channelName",
                    "value": "ponce"
                }
            ],
            "reaction": "[Discord] sendPrivateMessages",
            "reactionArg": [
                {
                    "key": "userID",
                    "value": "000000000000000000"
                }
            ],
            "interval": 5
        }
    ]
}
```
____
### **Stop a given job**

Request type: `POST`.

URL: `/stop-job`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/stop-job' \
--header 'authToken: [authToken]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'jobToken=[jobToken]' \
--data-urlencode 'stop=true'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Stop job done!"
}
```
____
### **Get list of actions and reactions**

Request type: `GET`.

URL: `/re-action-info`.

Exemple of request in cURL:
```bash
curl --location --request GET 'http://localhost:8080/api/v1/re-action-info' \
--header 'authToken: [authToken]'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Stop job done!",
    "jsonArr": [
        {
            "name": "twitch",
            "actions": [
                {
                    "name": "[Twitch] getStream",
                    "description": "I am a description",
                    "args": [
                        {
                            "channelName": "I describe an arg"
                        },
                        {
                            "yolo": "I describe another arg"
                        }
                    ]
                },
                {
                    "name": "testAction",
                    "description": "I am new description",
                    "args": []
                }
            ]
        },
        {
            "name": "testInfo",
            "reactions": [
                {
                    "name": "testReaction",
                    "description": "I am a reaction description",
                    "args": [
                        {
                            "text": "Text to display after the Hello World :)"
                        }
                    ]
                }
            ]
        }
    ]
}
```