# avatar

[![Build Status](https://github.com/frncsdrk/avatar/workflows/build/badge.svg?branch=master&event=push)](https://github.com/frncsdrk/avatar/actions)

Service for creating random avatars

Inspired by github default avatars

## Usage

Default **Port**: `9000`

## Routes

### /avatar

**Type:** `GET`

Get a customizable avatar with sane defaults

NOTE: When using `image/jpeg` as MIME type specifying a background color
  becomes more important as it is not possible to keep transparency.

**query**

```
{integer} width (default: 256px)
{integer} height (default: 256px)
{boolean} verticallySymmetric (default: true)
{boolean} horizontallySymmetric (default: false) (will only be used if verticallySymmetric is explicitly turned off)
{string}  direction (default: 'top') (only relevant for triangles)
{string}  type (element type, 'square' (default), 'circle', 'triangle')
{integer} elementWidth (default: 16px)
{string}  color - color of elements (default: blue)
{string}  bgColor - background color (default: transparent)
{boolean} stroke - add stroke to outline elements (default: false)
{string}  strokeColor
{string}  mimeType - specify MIME type of image (default: image/png)
```

**returns image of specified MIME type (default: image/png)**

### /avatar

**Type:** `POST`

Create an avatar of specified form

**query**

Same parameters as in request of type `GET` apply.

**body**

**MIME type:** `text/plain`

example:
```
# #
 #
# #
```

**returns image of specified MIME type (default: image/png)**

### /avatar/random

**Type:** `GET`

Get a randomized avatar without the need to specify any parameters

**query**

Parameters are overwritable as in `/avatar` request of type `GET`.

**returns image of specified MIME type (default: image/png)**

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

[MIT](https://github.com/frncsdrk/avatar/blob/master/LICENSE) (c) 2018 - 2021 frncsdrk and contributors
