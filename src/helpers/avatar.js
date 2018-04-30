const { createCanvas, loadImage } = require('canvas');

const createAvatar = (conf, cb) => {
    const canvas = createCanvas(conf.width || 256, conf.height || 256);
    const ctx = canvas.getContext('2d');
    const WIDTH = conf.width || 256;
    const HEIGHT = conf.height || 256;
    const elementWidth = conf.elementWidth || 16;
    // const elementHeight = conf.element_height || 16;
    const verticallySymmetric = !conf.horizontallySymmetric ? conf.verticallySymmetric || true : false;
    const horizontallySymmetric = conf.horizontallySymmetric || false;

    // Write "Awesome!"
    /*
    ctx.font = '30px Impact';
    ctx.rotate(0.1);
    ctx.fillText('Awesome!', 50, 100);

    // Draw line under text
    const text = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + text.width, 102);
    ctx.stroke();
    */

    // cross with border
    /*
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();

    // cross
    ctx.moveTo(0, 0);
    ctx.lineTo(256, 256);

    ctx.moveTo(256, 0);
    ctx.lineTo(0, 256);

    // outer border
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    ctx.lineTo(256, 0);
    ctx.lineTo(256, 256);
    ctx.lineTo(0, 256);
    ctx.lineTo(0, 0);

    ctx.stroke();
    */

    ctx.fillStyle = conf.color || 'blue';
    ctx.strokeStyle = conf.strokeColor || 'black';
    const elementsPerRow = !verticallySymmetric ? WIDTH / elementWidth : WIDTH / elementWidth / 2;
    const elementsPerCol = horizontallySymmetric && !verticallySymmetric ? HEIGHT / elementWidth / 2 : HEIGHT / elementWidth;

    for (let i = 0; i < elementsPerCol; i++) {
        for (let j = 0; j < elementsPerRow; j++) {
            if (Math.random() > 0.5) {
                if (conf.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(j * elementWidth + elementWidth / 2, i * elementWidth + elementWidth / 2, elementWidth / 2, 0, 2 * Math.PI);
                    ctx.fill();
                    conf.stroke && ctx.stroke();
                    if (verticallySymmetric) {
                        // mirror vertically
                        ctx.beginPath();
                        ctx.arc((((elementsPerRow * 2 - j) - 1) * elementWidth) + elementWidth / 2, i * elementWidth + elementWidth / 2, elementWidth / 2, 0, 2 * Math.PI);
                        ctx.fill();
                        conf.stroke && ctx.stroke();
                    }
                    else if (horizontallySymmetric && !verticallySymmetric) {
                        // mirror horizontally
                        ctx.beginPath();
                        ctx.arc(j * elementWidth + elementWidth / 2, (((elementsPerCol * 2 - i) - 1) * elementWidth) + elementWidth / 2, elementWidth / 2, 0, 2 * Math.PI);
                        ctx.fill();
                        conf.stroke && ctx.stroke();
                    }
                }
                else {
                    ctx.rect(j * elementWidth, i * elementWidth, elementWidth, elementWidth);
                    if (verticallySymmetric) {
                        // mirror vertically
                        ctx.rect(((elementsPerRow * 2 - j) - 1) * elementWidth, i * elementWidth, elementWidth, elementWidth);
                    }
                    else if (horizontallySymmetric && !verticallySymmetric) {
                        // mirror horizontally
                        ctx.rect(j * elementWidth, ((elementsPerCol * 2 - i) - 1) * elementWidth, elementWidth, elementWidth);
                    }
                }
            }
        }
    }

    ctx.fill();
    conf.stroke && ctx.stroke();

    let buffer = canvas.toBuffer();

    cb(null, buffer);
};

module.exports = {
    createAvatar
};