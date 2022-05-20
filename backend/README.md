# AuthService-API

Authentication service api using express and mongo db over ssl.

## Auth Service features:

- Register users with name and password.
- Hash passwords in the database using **Bcrypt and salt**.
- Manage data in **mongo** database.
- Login with the name and password.
- Generate access **JWT** with expired time for authenticated users.
- Generate refresh **JWT** for getting new access tokens.
- Unit-tests via **Mocha** framework.

## Essential environment variables and files:

Add .env file and add this variables:
```
DATA_BASE=
USERS_COLLECTION=
POSTS_COLLECTION=
COMMENTS_COLLECTION=
VOTES_COLLECTION=

ACCESS_TOKEN_NAME=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_TTL=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_TT=

PORT=
CLIENT_DNS=
```
Add ssl folder and add inside:

- certificate.pem
- key.pem
