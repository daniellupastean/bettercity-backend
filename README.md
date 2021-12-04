<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## API Endoints

---

**POST** /login

```JSON
{
  "email": "user@example.com",
  "password": "pass"
}
```

**POST** /register

```JSON
{
  "email": "user@example.com",
  "password": "pass",
  "name": "Name"
}
```

**POST** /reset-password

```JSON
{
  "email": "user@example.com",
}
```

**GET** /me

`Authenticated user needed - Bearer token`

**GET** /users

`Authenticated user needed - Bearer token`

**POST** /issues/create

`Authenticated user needed - Bearer token`

```JSON
{
	"title":"Issue Title 1",
	"description":"This is a good description for testing",
	"zone":"Centru",
	"priority":"medium",
	"lat":"0",
	"lng":"0",
	"pictures":["some base64 string", "some base64 string"]
}

```

**GET** /issues/mine

`Authenticated user needed - Bearer token`

**GET** /issues
