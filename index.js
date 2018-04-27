const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(256, 256);
const ctx = canvas.getContext('2d');
const mkdirp = require('mkdirp');
const fs = require('fs');

const WIDTH = 256;
const HEIGHT = 256;
const squareWidth = 16;
const squareHeight = 16;
const symmetric = true;

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

ctx.fillStyle = 'blue';
const elementsPerRow = !symmetric ? WIDTH / squareWidth : WIDTH / squareWidth / 2;
const elementsPerCol = HEIGHT / squareHeight;

for (let i = 0; i < elementsPerCol; i++) {
    for (let j = 0; j < elementsPerRow; j++) {
        if (Math.random() > 0.5) {
            ctx.rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight);
            if (symmetric) {
                // mirror vertically
                ctx.rect(((elementsPerRow * 2 - j) - 1) * squareWidth, i * squareHeight, squareWidth, squareHeight);
            }
        }
    }
}

ctx.fill();

const buffer = canvas.toBuffer();

mkdirp('./out', function(err) {
    if (err) {
        throw err;
    }
    fs.writeFile('./out/example.png', buffer, (err) => {
        if (err) {
            throw err;
        }
        console.log('DONE');
    });
});