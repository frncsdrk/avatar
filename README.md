# avatar

[![Build Status](https://travis-ci.org/frncsdrk/avatar.svg?branch=master)](https://travis-ci.org/frncsdrk/avatar)

create a random avatar  
Inspired by github default avatars

## routes

### /avatar

- GET / - get an avatar with the possiblity to customize it to some degree
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

- GET /random - get an avatar without the need to specify any parameters
  - image


### /status

- GET
  - {number} status
  - {string} message

## License

[License](https://github.com/frncsdrk/avatar/blob/master/LICENSE)  
(c) 2019 frncsdrk
