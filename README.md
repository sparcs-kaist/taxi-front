# SPARCS Taxi

KAIST Taxi Party Matching Web Service

## About

Taxi는 KAIST 구성원들의 택시 동승 인원 모집을 위한 서비스입니다. 🚖
비교적 거리가 먼 장소에 갈 때 택시 동승이 빈번하게 발생하는 점을 인지하고, 이를 어플/웹 서비스를 통해 보다 편리하게 이루어지도록 하고자 합니다.

## Management Information

- Notion : [Sparcs Notion Taxi page](https://www.notion.so/sparcs/Taxi-9d371e8ac5ac4f0c9b9c35869682a0eb) (Only SPARCS members can access it)
- Slack : #taxi-main, #taxi-notice, #taxi-bug-report, #taxi-github-bot, #taxi-notion-bot (Only SPARCS members can access it)

## Prerequisites

- Recommended npm version : 8.5.5 (with node v.16.15.0)
- Recommended mognoDB version : 5.0.8
- [Issue with node version](https://github.com/sparcs-kaist/taxi-front/issues/76)

## Project Setup

### Clone Repositories

```bash
$ git clone https://github.com/sparcs-kaist/taxi-front
$ git clone https://github.com/sparcs-kaist/taxi-back
```

### Install Requirements

```bash
$ pnpm install
```

### Set Environment Configuration

See [notion page](https://www.notion.so/sparcs/Environment-Variables-1b404bd385fa495bac6d5517b57d72bf).
Refer to [.env.example](.env.example) and write your own `.env`.


## Development

Run scoped scripts

```bash
pnpm <scope> <script>
```

Valid scopes are:
- `web`: Corresponds to `@taxi/web`
- ~~`app`: (intended) Corresponds to `@taxi/app`~~
- ~~`core`: (intended) Corresponds to `@taxi/core`~~

### Examples

Run `web` development server
```bash
pnpm web start
```

Install new dependency to `app`
```bash
pnpm app install <package_name>
```

## Testing

This project contains E2E tests with Cypress. To run the test, start React development server with `npm start` and run test script by `npm run test` on another shell.

> **Currently, test only supports local environment**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contributors

See [contributors](https://github.com/sparcs-kaist/taxi-front/graphs/contributors) of frontend and [contributors](https://github.com/sparcs-kaist/taxi-back/graphs/contributors) of backend.

## Accompanying Project

- frontend : https://github.com/sparcs-kaist/taxi-front
- backend : https://github.com/sparcs-kaist/taxi-back
- app : https://github.com/sparcs-kaist/taxi-app
- docker : https://github.com/sparcs-kaist/taxi-docker
- figma : https://www.figma.com/file/li34hP1oStJAzLNjcG5KjN/SPARCS-Taxi?node-id=0%3A1
- taxiSampleGenerator : https://github.com/sparcs-kaist/taxiSampleGenerator
