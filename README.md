# avatar

[![Build Status](https://api.cirrus-ci.com/github/frncsdrk/avatar.svg)](https://cirrus-ci.com/github/frncsdrk/avatar)

Microservice for creating random avatars

Inspired by github default avatars

## Usage

Default **Port**: `9000`

## Routes

### /avatar

**Type:** `GET`

Get a customizable avatar with sane defaults

NOTE: When using `jpeg` as MIME type specifying a background color
  becomes more important as it is not possible to keep transparency.

**query**

```
{integer} width (default: 256px)
{integer} height (default: 256px)
{boolean} verticallySymmetric (default: true)
{boolean} horizontallySymmetric (default: false) (will only be used if verticallySymmetric is explicitly turned off)
{string}  type (element type, 'square' (default), 'circle', 'triangle')
{integer} elementWidth (default: 16px)
{string}  color - color of elements (default: blue)
{string}  bgColor - background color (default: transparent)
{boolean} stroke - add stroke to outline elements (default: false)
{string}  strokeColor
{string}  mimeType - specify MIME type of image (default: image/png)
```

**returns image of specified MIME type**

### /avatar/random

**Type:** `GET`

Get a randomized avatar without the need to specify any parameters

**returns image of type png**

### /healthz

**Type:** `GET`

Get liveness of service

**returns JSON**

```
{string} msg
```

### /status (deprecated)

**Type:** `GET`

Get liveness of service

**returns JSON**

```
{number} status
{string} message
```

## Contributions

See [CONTRIBUTING](https://github.com/frncsdrk/avatar/blob/master/CONTRIBUTING.md)

## Credits

See [CREDITS](https://github.com/frncsdrk/avatar/blob/master/CREDITS)

## License

[MIT](https://github.com/frncsdrk/avatar/blob/master/LICENSE) (c) 2018 - 2020 frncsdrk and contributors
