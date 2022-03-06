# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Update api token | `POST` | `/update-api-token` |
| Get user's logedin APIs | `POST` | `/get-user-loged-api` |

## **Routes description**

### **Update api token**

Request type: `POST`.

URL: `/update-api-token`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/update-api-token' \
--header 'authToken: [authToken]' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=OVV2kNr2yb_oyWucsghPUOCknU5ohA' \
--data-urlencode 'type=REDDIT' \
--data-urlencode 'mobile=true'
```

Here is an example of a **response**:
```json
{
    "body": "ApiAuth done!",
    "user": {
        "id": 1,
        "createdAt": "2022-01-12T13:48:27.955Z",
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "password": "bugthesda",
        "name": "aaa",
        "lstName": "aaa",
        "token": "fe70bb1b-7f5b-4db6-bf1c-8e231b02ca04",
        "avatar": "aaa",
        "role": "USER"
    }
}
```
____
### **Get user's logedin APIs**

Request type: `POST`.

URL: `/get-user-loged-api`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/get-user-loged-api' \
--header 'authToken: [authToken]'
```

Here is an example of a **response**:
```json
{
    "body": "getLogedIn done!",
    "reddit": true,
    "google": false
}
```