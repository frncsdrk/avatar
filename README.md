avatar
===

create a random avatar

## routes

### /avatar

- POST
  - body
    - {integer} width
    - {integer} height
    - {boolean} verticallySymmetric
    - {boolean} horizontallySymmetric (will only be used if verticallySymmetric is explicitly turned off)
    - {string}  type (element type, 'square' (default), 'circle')
    - {integer} elementWidth
    - {string}  color
    - {string}  bgColor
    - {boolean} stroke
    - {string}  strokeColor

### /status

- GET
  - {number} status
  - {string} message
