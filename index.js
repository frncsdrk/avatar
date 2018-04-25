const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(256, 256);
const ctx = canvas.getContext('2d');
const mkdirp = require('mkdirp');
const fs = require('fs');

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