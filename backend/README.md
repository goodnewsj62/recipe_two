# Setup

- pull the latest code from github

- then install nodejs and the npm package manager

- run npm install to install all packages

```bash
npm install
```

- To setup the application copy the content from .env.example to .env

- create an upload thing account to get upload thing secret an id "We are using upload thing to store files for free" [uploadthing](https://uploadthing.com)

- make sure you also have docker installed on your machine

- now run

```bash
~$: docker compose up
```

- now open another terminal and run the below commad to apply migrations

```bash
npx prisma migrate dev
```

- finally run the command to start the server locally

```bash
npm run start:dev
```

- to run unit test

```bash
npm run test
```

- to run end ro end test

```bash
npm run test:e2e
```

## Structure

This project currently use the layered architecture approach thanks to nestjs...

the services handle core busincess logic and interact with the database model

the controllers are responsible to handle incoming request

the response interceptor folder helps make uniform api response interface

and main.ts is the main file from where the server is spawned
