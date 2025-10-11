# avatar

Self-hosted service for creating random avatars

Inspired by github default avatars

## Examples

### Random

![random squares](./img/random-0.png "squares")
![random circles](./img/random-1.png "circles")
![random triangles](./img/random-2.png "triangles")

### Initials

![initials AV](./img/initials-0.png "initials")

## Usage

Default **Port**: `9000`

### Download

Either download a release from the [Tags page](https://codeberg.org/frncsdrk/avatar/tags) or clone the repo.
Then follow the steps under [Development Setup](#setup).

### Docker

There is a container image available on [Docker Hub](https://hub.docker.com/r/frncsdrk/avatar)
and there is a Docker-Compose file in the repo.
Both are provided for convenience and as a starting point for a production setup.

```
docker|podman run -p 9000:9000/tcp docker.io/frncsdrk/avatar
```

### Configuration

You can put config files into `./config/`. See [file load order](https://github.com/node-config/node-config/wiki/Configuration-Files#file-load-order) for configuration names and there priority.

**Mount configuration into container**

*Generally mounting a custom configuration shouldn't be necessary, except if you want to set a custom port*

Using another name than `prod.yml` will lead to a warning when using the container image from this repository.
The warning is irrelevant as long as you follow the configuration naming conventions.

```
docker|podman run -p <custom port>:<custom port>/tcp -v ./vol:/app/config docker.io/frncsdrk/avatar
```

## API

See [API Docs](https://frncsdrk.github.io/avatar)

## Logs

The service uses a preconfigured log directory and logs into a combined log with all messages and an error log.
For the development environment the default directory is `./log` and for production it is `/var/log/avatar`.
Additionally, if the service is not running in production mode all messages get logged to stdout.

## Development

### Setup

#### Prerequisites

- Node.js installation
- Libraries for image editing
- [apiDoc](https://www.npmjs.com/package/apidoc) installation, if editing docs

#### Steps

- Run `brew install node` or similar to install Node.js
- Run `brew install pkg-config cairo pango libpng jpeg giflib librsvg` or similar to install libraries for image editing
- Run `npm install -g apidoc` to install apiDoc globally

### Usage

- Run `npm start` to start service
- Run `npm run dev` to start service with nodemon
- Run `npm run generate:docs` to generate API docs from source code

## Contributions

See [CONTRIBUTING](./CONTRIBUTING.md)

## Credits

See [CREDITS](./CREDITS)

## License

[MIT](./LICENSE) (c) 2018 - 2025 frncsdrk and contributors
