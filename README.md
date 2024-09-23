# cdp-example-node-frontend

Core delivery platform Node.js Frontend example.

Based on the CDP template https://github.com/DEFRA/cdp-node-frontend-template

---

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Local development](#local-development)
  - [Setup](#setup)
  - [Development](#development)
    - [Updating dependencies](#updating-dependencies)
  - [AWS CLI](#aws-cli)
    - [AWS Local](#aws-local)
      - [AWS local alias](#aws-local-alias)
    - [LocalStack](#localstack)
      - [Docker](#docker)
    - [Localstack CLI](#localstack-cli)
  - [Local JSON API](#local-json-api)
  - [Production](#production)
  - [Npm scripts](#npm-scripts)
- [Docker](#docker)
  - [Development Image](#development-image)
  - [Production Image](#production-image)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements


### Node.js

Please install [Node.js](http://nodejs.org/) `>= v18` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd cdp-example-node-frontend
nvm use
```

## Local development

### Setup

Install application dependencies:

```bash
npm install
```
### Development

To run the application in `development` mode run:

```bash
npm run dev
```

#### Updating dependencies

To update dependencies, globally install https://www.npmjs.com/package/npm-check-updates. Then run the below script,
run tests, test the application and commit the altered `package.json` and `package-lock.json` files. For more
options around updates check the package docs.

```bash
ncu -i
```

### AWS CLI

- Install the AWS CLI https://aws.amazon.com/cli/
- And add to your `.aws/credentials`

```bash
[localstack]
aws_access_key_id = test
aws_secret_access_key = test
```

### LocalStack

Either run _localstack_ directly via _docker_ and _AWS CLI_, or via the _localstack CLI_.

#### Docker

- Run AWS LocalStack Docker container:

```bash
docker run --pull=always -d -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack:latest
```

Note the exposed endpoint is `http://localhost:4566`

### Localstack CLI

- Install [LocalStack CLI](https://docs.localstack.cloud/getting-started/installation/#localstack-cli)
- Run the CLI

```
localstack start
```

Note the exposed endpoint is `https://localhost:4566`

### Local JSON API

Whilst the APIs are being developed this app uses a local JSON mock API. To start this locally run:

```bash
npm run mockApi
```

### Production

To mimic the application running in `production` mode locally run:

```bash
npm start
```

### Npm scripts

All available Npm scripts can be seen in [package.json](./package.json)
To view them in your command line run:

```bash
npm run
```

## Docker

### Development image

Build:

```bash
docker build --target development --no-cache --tag cdp-example-node-frontend:development .
```

Run:

```bash
docker run -p 3000:3000 cdp-example-node-frontend:development
```

### Production image

Build:

```bash
docker build --no-cache --tag cdp-example-node-frontend .
```

Run:

```bash
docker run -p 3000:3000 cdp-example-node-frontend
```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
