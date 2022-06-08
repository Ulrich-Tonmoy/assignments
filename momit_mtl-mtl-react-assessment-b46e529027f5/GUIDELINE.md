# Project Guideline

## Setup

**Node 14 is required for this boilerplate.**

First install npm packages `npm install`

## Run

- API server `npm run api`
- Development server `npm start`

Check `package.json` for more details.

## API

We are using [json-server](https://www.npmjs.com/package/json-server) for API. API server must run on port 4000.

- User registration

```JavaScript
METHOD: post,
URL: "http://localhost:4000/register",
BODY: {
    email: "String",
    password: "String"
}
```

- User Login

```JavaScript
METHOD: post,
URL: "http://localhost:4000/login",
BODY: {
    email: "String",
    password: "String"
}
```

- Products

```JavaScript
METHOD: get,
URL: "http://localhost:4000/products",

```

- Product

```JavaScript
METHOD: get,
URL: "http://localhost:4000/products/1",

```
