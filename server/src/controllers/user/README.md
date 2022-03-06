# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Register user | `POST` | `/api/v1/register` |
| Login user | `POST` | `/api/v1/authenticate` |
| Login user | `POST` | `/api/v1/google-auth` |
| Update the user's data | `POST` | `/api/v1/update-user-data` |
| Get the user's data | `GET` | `/api/v1/get-user-data` |

## **Routes description**

### **Register user**

Request type: `POST`.

URL: `/api/v1/register`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/register' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=itjustworks' \
--data-urlencode 'email=itjustworks@bugthesda.com' \
--data-urlencode 'password=bugthesda' \
--data-urlencode 'name=' \
--data-urlencode 'lstName='
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Registration done!",
    "user": {
        "id": 1,
        "createdAt": "2022-03-06T19:51:02.753Z",
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "password": "bugthesda",
        "name": null,
        "lstName": null,
        "token": "[authToken]",
        "avatar": null,
        "role": "USER"
    }
}
```
____
### **Login user**

Request type: `POST`.

URL: `/api/v1/authenticate`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/authenticate' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=itjustworks@bugthesda.com' \
--data-urlencode 'password=bugthesda'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Registration done!",
    "token": "[authToken]"
}
```
____
### **Login user with google (WEB)**

Request type: `POST`.

URL: `/api/v1/google-auth`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/google-auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "is_mobile": false,
    "test": true,
    "response": {
        "code": "4/0AX4XfWg8ee8aTv_AXcaww6IoBBlmAn-ejwALfP[...]"
    }
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "updateApiToken done!",
    "token": "[authToken]"
}
```
____
### **Login user with google (MOBIL)**

Request type: `POST`.

URL: `/api/v1/google-auth`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/google-auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "is_mobile": true,
    "refreshToken": "1//03tYbxXhXXcILCgYIARAAGAMSNwF-L9[...]",
    "accessToken": "ya29.A0ARrdaM_QHaP03S3RXSc0o09X_Q6_FRASUI8BpISt5hIq7Gz6Pif1[...]",
    "googleId": "118204546452644603236",
    "givenName": "Jean",
    "familyName": "Paul",
    "email": "[USER EMAIL]"
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "updateApiToken done!",
    "token": "[authToken]"
}
```
____
### **Update the user's data**

Request type: `POST`.

URL: `/api/v1/update-user-data`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/update-user-data' \
--header 'authToken: [authToken]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=bbb' \
--data-urlencode 'lstName=aaa' \
--data-urlencode 'avatar=ccc'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Update user's data done!",
    "user": {
        "id": 1,
        "createdAt": "2021-12-13T14:59:13.618Z",
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "password": "bugthesda",
        "name": "bbb",
        "lstName": "aaa",
        "token": "[authToken]",
        "avatar": "ccc",
        "role": "USER"
    }
}
```
____
### **Get the user's data**

Request type: `GET`.

URL: `/api/v1/get-user-data`.

Exemple of request in cURL:
```bash
curl --location --request GET 'http://localhost:8080/api/v1/get-user-data' \
--header 'authToken: [authToken]'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "body": "Get user's data done!",
    "user": {
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "name": "bbb",
        "lstName": "aaa",
        "avatar": "ccc"
    }
}
```