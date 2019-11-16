# avatar

[![Build Status](https://travis-ci.org/frncsdrk/avatar.svg?branch=master)](https://travis-ci.org/frncsdrk/avatar)

Microservice for creating random avatars

Inspired by github default avatars

## Usage

Default **Port**: `9000`

### Routes

#### /avatar

- GET / - get a customizable avatar with sane defaults
  - query
    - {integer} width (default: 256px)
    - {integer} height (default: 256px)
    - {boolean} verticallySymmetric (default: true)
    - {boolean} horizontallySymmetric (default: false) (will only be used if verticallySymmetric is explicitly turned off)
    - {string}  type (element type, 'square' (default), 'circle')
    - {integer} elementWidth (default: 16px)
    - {string}  color - color of elements (default: blue)
    - {string}  bgColor - background color (default: black)
    - {boolean} stroke - add stroke to outline elements (default: false)
    - {string}  strokeColor
  - returns image

- GET /random - get a randomized avatar without the need to specify any parameters
  - returns image


#### /status

- GET
  - returns JSON
    - {number} status
    - {string} message

## License

[MIT](https://github.com/frncsdrk/avatar/blob/master/LICENSE) (c) 2018 - 2019 frncsdrk and contributors
