# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Update api token | `POST` | `/update-api-token` |

## **Routes description**

### **Update api token**

Request type: `POST`.

URL: `/update-api-token`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v1/update-api-token' \
--header 'authToken: fe70bb1b-7f5b-4db6-bf1c-8e231b02ca04' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=LOL' \
--data-urlencode 'type=REDDIT'
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