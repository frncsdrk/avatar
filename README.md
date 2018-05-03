avatar
===

create a random avatar

## routes

### /avatar

- POST / - get an avatar with the possiblity to customize it to some degree
  - body
    - {integer} width
    - {integer} height
    - {boolean} verticallySymmetric
    - {boolean} horizontallySymmetric (will only be used if verticallySymmetric is explicitly turned off)
    - {string}  type (element type, 'square' (default), 'circle')
    - {integer} elementWidth
    - {string}  color - color of elements
    - {string}  bgColor - background color
    - {boolean} stroke - add stroke to outline elements
    - {string}  strokeColor

- GET /random - get an avatar without the need to specify any parameters
  - image


### /status

- GET
  - {number} status
  - {string} message

## License

[License](https://github.com/frncsdrk/avatar/blob/master/LICENSE)  
(c) 2018 frncsdrk
