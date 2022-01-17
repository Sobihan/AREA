# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Register user | `POST` | `/api/v1/register` |
| Login user | `POST` | `/api/v1/authenticate` |
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
        "id": 3,
        "createdAt": "2021-12-15T14:14:26.051Z",
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "password": "bugthesda",
        "name": null,
        "lstName": null,
        "token": "250f87f8-6026-4fe6-8d96-75449cc768b1",
        "points": 0,
        "distTrvl": 0,
        "avatar": null,
        "role": "USER",
        "teamId": null,
        "teamAdm": false
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
    "token": "250f87f8-6026-4fe6-8d96-75449cc768b1"
}
```
____
### **Update the user's data**

Request type: `POST`.

URL: `/api/v1/update-user-data`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/update-user-data' \
--header 'authToken: 250f87f8-6026-4fe6-8d96-75449cc768b1' \
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
        "token": "250f87f8-6026-4fe6-8d96-75449cc768b1",
        "points": 0,
        "distTrvl": 0,
        "avatar": "ccc",
        "role": "USER",
        "teamId": 10,
        "teamAdm": true
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
--header 'authToken: 250f87f8-6026-4fe6-8d96-75449cc768b1'
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