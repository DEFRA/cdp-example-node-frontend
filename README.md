# cdp-example-node-frontend

Core delivery platform Node.js Frontend example.

Based on the CDP template https://github.com/DEFRA/cdp-node-frontend-template

---

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Server-side Caching](#server-side-caching)
- [Redis](#redis)
- [Proxy](#proxy)
- [Local development](#local-development)
  - [Setup](#setup)
  - [Git hooks](#git-hooks)
  - [Local dependencies](#local-dependencies)
  - [Development](#development)
  - [Production](#production)
  - [Npm scripts](#npm-scripts)
  - [Update dependencies](#update-dependencies)
  - [Formatting](#formatting)
    - [Windows prettier issue](#windows-prettier-issue)
- [Docker](#docker)
  - [Development image](#development-image)
  - [Production image](#production-image)
  - [Docker Compose](#docker-compose)
  - [Dependabot](#dependabot)
  - [SonarCloud](#sonarcloud)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements

### Node.js

Please install Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd cdp-example-node-frontend
nvm use
```

## Server-side Caching

We use Catbox for server-side caching. By default the service will use CatboxRedis when deployed and CatboxMemory for
local development.
You can override the default behaviour by setting the `SESSION_CACHE_ENGINE` environment variable to either `redis` or
`memory`.

Please note: CatboxMemory (`memory`) is _not_ suitable for production use! The cache will not be shared between each
instance of the service and it will not persist between restarts.

## Redis

Redis is an in-memory key-value store. Every instance of a service has access to the same Redis key-value store similar
to how services might have a database (or MongoDB). All frontend services are given access to a namespaced prefixed that
matches the service name. e.g. `my-service` will have access to everything in Redis that is prefixed with `my-service`.

## Proxy

We are using forward-proxy which is set up by default. Services are automatically configured with the proxy environment
variables when deployed.

Node.js 24 uses these variables to route outbound HTTP(S) requests through the proxy:

NODE_USE_ENV_PROXY=1
HTTPS_PROXY=...
NO_PROXY=...

No additional proxy configuration is required in the service.

## Local development

### Setup

Install application dependencies:

```bash
npm install
```

### Git hooks

Install git hooks (optional)

```bash
npm run setup:husky
```

### Local dependencies

The examples need [cdp-uploader](https://github.com/DEFRA/cdp-uploader), an S3 bucket and Redis. Start them with
[Docker Compose](#docker-compose):

```bash
docker compose up -d
```

The Animals, Creatures, Plants and Birds examples also need
[cdp-example-node-backend](https://github.com/DEFRA/cdp-example-node-backend) and its MongoDB:

```bash
docker compose --profile backend up -d
```

The frontend talks to the local AWS emulator with these credentials, so export them before running it:

```bash
export AWS_REGION=eu-west-2
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
```

### Development

To run the application in `development` mode run:

```bash
npm run dev
```

The frontend is then available on [http://localhost:3000](http://localhost:3000).

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

### Update dependencies

To update dependencies use [npm-check-updates](https://github.com/raineorshine/npm-check-updates):

> The following script is a good start. Check out all the options on
> the [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

```bash
ncu --interactive --format group
```

### Formatting

#### Windows prettier issue

If you are having issues with formatting of line breaks on Windows update your global git config by running:

```bash
git config --global core.autocrlf false
```

## Docker

### Development image

> [!TIP]
> For Apple Silicon users, you may need to add `--platform linux/amd64` to the `docker run` command to ensure
> compatibility fEx: `docker build --platform=linux/arm64 --no-cache --tag cdp-example-node-frontend`

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

### Docker Compose

A local environment with:

- Floci (replacing Localstack) for AWS services (S3, SQS), with the `cdp-example-node-frontend` bucket
- Redis
- [cdp-uploader](https://github.com/DEFRA/cdp-uploader) on [http://localhost:7337](http://localhost:7337), with its
  mock virus scanner (files with `virus` in the name are rejected)
- Optional, with `--profile backend`: [cdp-example-node-backend](https://github.com/DEFRA/cdp-example-node-backend) on
  [http://localhost:3049](http://localhost:3049) and MongoDB

```bash
docker compose up -d
```

The frontend itself runs on your machine with `npm run dev`: cdp-uploader hands back `http://localhost:7337` upload and
status URLs, which only resolve from the host.

The Birds example sends cdp-uploader a callback URL that points at the backend on `localhost`, which cdp-uploader
cannot reach from inside Docker, so the backend is not told when a Birds upload has been scanned.

### Dependabot

Dependabot is configured in [.github/dependabot.yml](.github/dependabot.yml).

### SonarCloud

Instructions for setting up SonarCloud can be found in [sonar-project.properties](./sonar-project.properties).

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
