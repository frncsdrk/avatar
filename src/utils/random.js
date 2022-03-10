/**
 * Select random shape type
 * @returns {string} shape type
 */
const getRandomShapeType = () => {
  const factor = Math.round(Math.random() * 2);
  let type = ''; // '' equals rect
  switch (factor) {
    case 0:
      type = '';
      break;
    case 1:
      type = 'circle';
      break;
    case 2:
      type = 'triangle';
      break;
    default:
      type = '';
      break;
  }

  return type;
};

module.exports = {
  getRandomShapeType,
};
