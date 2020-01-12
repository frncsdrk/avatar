# avatar

[![Build Status](https://api.cirrus-ci.com/github/frncsdrk/avatar.svg)](https://cirrus-ci.com/github/frncsdrk/avatar)

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
    - {string}  type (element type, 'square' (default), 'circle', 'triangle')
    - {integer} elementWidth (default: 16px)
    - {string}  color - color of elements (default: blue)
    - {string}  bgColor - background color (default: transparent)
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

## Contributions

see `CONTRIBUTING`

## Credits

see `CREDITS` file

## License

[MIT](https://github.com/frncsdrk/avatar/blob/master/LICENSE) (c) 2018 - 2020 frncsdrk and contributors
