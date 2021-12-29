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

- USERS_DB=mongo db path for the users.
- USERS_COLLECTION=users collection name.
- ACCESS_TOKEN_SECRET=secret for access tokens.
- REFRESH_TOKEN_SECRET=secret for refresh tokens.

Add ssl folder and add inside:

- certificate.pem
- key.pem
