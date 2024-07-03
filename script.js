document.getElementById('loadImage').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // Store original image data
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            applyFilter(); // Apply filter after image is loaded
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

document.getElementById("setImage").addEventListener('click', function() {
    if(originalImageData != null) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        newData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        originalImageData = newData;
    }
});

document.getElementById('saveImage').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = canvas.toDataURL();
    link.click();
});

const controls = document.querySelectorAll('#iterationSlider, #filterSelect');
controls.forEach(control => {
    control.addEventListener('input', applyFilter);
});

let originalImageData = null;
let staticInitial = null;

function applyFilter() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!originalImageData) return;
    
    const imageData = ctx.createImageData(originalImageData);
    imageData.data.set(originalImageData.data);
    const data = imageData.data;

    let iterations = parseInt(document.getElementById('iterationSlider').value);
    const filter = document.getElementById('filterSelect').value;

    if (filter === 'selfAlphaBlend') {
        selfAlphaBlend(data, iterations);
    } else if (filter === 'diamondPattern') {
        iterations = iterations * 0.05 + 1.0;
        diamondPattern(data, canvas.width, canvas.height, iterations);
    } else if (filter === "colorXor") {
        iterations = iterations * 0.01 + 1.0;
        colorXor(data, canvas.width, canvas.height, iterations);
    } else if (filter === "block") {
        block(data, canvas.width, canvas.height, iterations);
    } else if (filter === "reverseXOR") {
        reverseXOR(data, canvas.width, canvas.height, iterations);
    } else if (filter === "combinePixels") {
        combinePixels(data, canvas.width, canvas.height, iterations);
    } else if (filter === "side2Side") {
        side2Side(data, canvas.width, canvas.height, iterations);
    } else if (filter === "top2Bottom") {
        top2Bottom(data, canvas.width, canvas.height, iterations);
    } else if (filter === "blendAngle") {
        blendAngle(data, canvas.width, canvas.height, iterations);
    } else if (filter === "outward") {
        outward(data, canvas.width, canvas.height, iterations);
    } else if (filter === "outwardSquare") {
        outwardSquare(data, canvas.width, canvas.height, iterations);
    } else if (filter === "glitchSort") {
        glitchSort(data, canvas.width, canvas.height, iterations);
    } else if (filter === "pixelSort") {
        pixelSort(data, canvas.width, canvas.height, iterations);
    } else if (filter === "blend3") {
        blend3(data, canvas.width, canvas.height, iterations*0.1);
    } else if (filter === "negParadox") {
        negParadox(data, canvas.width, canvas.height, iterations*0.1);
    } else if (filter === "thoughtMode") {
        thoughtMode(data, canvas.width, canvas.height, iterations*0.1);
    } else if (filter === "blank") {
        blank(data, canvas.width, canvas.height, iterations*0.1);
    } else if (filter === "tri") {
        tri(data, canvas.width, canvas.height, iterations*0.1);
    } else if (filter === "distort") {
        distort(data, canvas.width, canvas.height, iterations*0.1);
    } else if (filter === "cDraw") {
        cDraw(data, canvas.width, canvas.height, iterations*0.1);
    }
    ctx.putImageData(imageData, 0, 0);
}

function selfAlphaBlend(data, iterations) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = (data[i] * iterations) % 255;       // Red
        data[i + 1] = (data[i + 1] * iterations) % 255; // Green
        data[i + 2] = (data[i + 2] * iterations) % 255;  // Blue
    }
}

function diamondPattern(data, width, height, iterations) {
    let pos = iterations; // set pos to iterations
    for (let z = 0; z < height; ++z) { // from top to bottom
        for (let i = 0; i < width; ++i) { // from left to right
            let index = (z * width + i) * 4; // calculate the index in the array

            if ((i % 2) === 0) { // if i % 2 equals 0
                if ((z % 2) === 0) { // if z % 2 equals 0
                    data[index] = (1 - pos * data[index]) % 255; // Red
                    data[index + 2] = ((i + z) * pos) % 255; // Blue
                } else {
                    data[index] = (pos * data[index] - z) % 255; // Red
                    data[index + 2] = ((i - z) * pos) % 255; // Blue
                }
            } else {
                if ((z % 2) === 0) { // if z % 2 equals 0
                    data[index] = (pos * data[index] - i) % 255; // Red
                    data[index + 2] = ((i - z) * pos) % 255; // Blue
                } else {
                    data[index] = (pos * data[index] - z) % 255; // Red
                    data[index + 2] = ((i + z) * pos) % 255; // Blue
                }
            }
        }
    }
}

let alpha = [
    Math.floor(Math.random() * 4),
    Math.floor(Math.random() * 4),
    Math.floor(Math.random() * 4)
];

let dir = [
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2)
];

function setpixel(data, x, y, w, pixel) {
    let pos = (y * w + x) * 4;
    data[pos] = pixel[0];
    data[pos + 1] = pixel[1];
    data[pos + 2] = pixel[2];
    data[pos + 3] = pixel[3];
}

function getpixel(data, x, y, w) {
    let pos = (y * w + x) * 4;
    let pix = [0, 0, 0, 0];
    pix[0] = data[pos];
    pix[1] = data[pos + 1];
    pix[2] = data[pos + 2];
    pix[3] = data[pos + 3];
    return pix;
}

function colorXor(data, width, height, iterations) {
    for (let it = 0; it < iterations; ++it) {
        for (let z = 0; z < height; ++z) {
            for (let i = 0; i < width; ++i) {
                let index = (z * width + i) * 4;
                for (let q = 0; q < 3; ++q) {
                    let value = Math.floor(alpha[q] * data[index + q]) % 255;
                    data[index + q] = data[index + q] ^ value;
                }
            }
        }

        for (let q = 0; q < 3; ++q) {
            if (dir[q] === 1) {
                alpha[q] += 0.1;
                if (alpha[q] >= 3.0) {
                    alpha[q] = 3.0;
                    dir[q] = 0;
                }
            } else {
                alpha[q] -= 0.1;
                if (alpha[q] <= 1.0) {
                    alpha[q] = 1.0;
                    dir[q] = 1;
                }
            }
        }
    }
}

let direction = 1;

function block(data, w, h, square) {
    for (let z = 0; z < h; z += square) {
        for (let i = 0; i < w; i += square) {
            let pixel = getpixel(data, i, z, w);
            for (let x = 0; x < square; ++x) {
                for (let y = 0; y < square; ++y) {
                    if (y + z < h && i + x < w) {
                        setpixel(data, i + x, y + z, w, pixel);
                    }
                }
            }
        }
    }
    if (direction == 1) {
        square += 2;
        if (square >= 32) direction = 0;
    } else {
        square -= 2;
        if (square <= 2) direction = 1;
    }
}

function swapColors(data, index) {
    [data[index], data[index + 2]] = [data[index + 2], data[index]]; // Example swap red and blue
}

function invert(data, index) {
    data[index] = 255 - data[index];
    data[index + 1] = 255 - data[index + 1];
    data[index + 2] = 255 - data[index + 2];
}

function reverseXOR(data, width, height, pos) {
    staticInitial = staticInitial || new Uint8ClampedArray(data);
    if (staticInitial.length !== data.length) {
        staticInitial = new Uint8ClampedArray(data);
    }
    let start = new Uint8ClampedArray(data);
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let index = (z * width + i) * 4;
            data[index] ^= staticInitial[index + 2];     // Red
            data[index + 1] ^= staticInitial[index + 1]; // Green
            data[index + 2] ^= staticInitial[index];     // Blue
            swapColors(data, index);
        }
    }
    staticInitial.set(start);
}

function combinePixels(data, width, height, pos) {
    for (let z = 2; z < height - 2; ++z) {
        for (let i = 2; i < width - 2; ++i) {
            let index = (z * width + i) * 4;
            let pixels = [
                getpixel(data, i + 1, z, width),
                getpixel(data, i, z + 1, width),
                getpixel(data, i + 1, z + 1, width)
            ];
            data[index] = (data[index] ^ (pixels[0][0] + pixels[1][0] + pixels[2][0]) * pos) % 255;
            data[index + 1] = (data[index + 1] ^ (pixels[0][1] + pixels[1][1] + pixels[2][1]) * pos) % 255;
            data[index + 2] = (data[index + 2] ^ (pixels[0][2] + pixels[1][2] + pixels[2][2]) * pos) % 255;
            swapColors(data, index);
        }
    }
}

function side2Side(data, width, height, pos) {
    for (let z = 0; z < height; ++z) {
        let total = [0, 0, 0];
        for (let i = 0; i < width; ++i) {
            let index = (z * width + i) * 4;
            total[0] += data[index] / 2;
            total[1] += data[index + 1] / 2;
            total[2] += data[index + 2] / 2;
            data[index] = (data[index] + total[0] * pos * 0.01) % 255;
            data[index + 1] = (data[index + 1] + total[1] * pos * 0.01) % 255;
            data[index + 2] = (data[index + 2] + total[2] * pos * 0.01) % 255;
            swapColors(data, index);
        }
    }
}

function top2Bottom(data, width, height, pos) {
    for (let i = 0; i < width; ++i) {
        let total = [0, 0, 0];
        for (let z = 0; z < height; ++z) {
            let index = (z * width + i) * 4;
            total[0] += data[index] / 2;
            total[1] += data[index + 1] / 2;
            total[2] += data[index + 2] / 2;
            data[index] = (data[index] + total[0] * pos * 0.01) % 255;
            data[index + 1] = (data[index + 1] + total[1] * pos * 0.01) % 255;
            data[index + 2] = (data[index + 2] + total[2] * pos * 0.01) % 255;
            swapColors(data, index);
        }
    }
}

function blendAngle(data, width, height, pos) {
    for (let z = 0; z < height; ++z) {
        let total = [0, 0, 0];
        for (let i = 0; i < width; ++i) {
            let index = (z * width + i) * 4;
            total[0] += data[index] * 0.01;
            total[1] += data[index + 1] * 0.01;
            total[2] += data[index + 2] * 0.01;
            data[index] = (data[index] + total[0] * pos * 0.1) % 255;
            data[index + 1] = (data[index + 1] + total[1] * pos * 0.1) % 255;
            data[index + 2] = (data[index + 2] + total[2] * pos * 0.1) % 255;
            swapColors(data, index);
        }
    }
}

function outward(data, width, height, pos) {
    let startPos = pos;
    let offset = [5, 50, 100];
    for (let y = Math.floor(height / 2); y > 0; --y) {
        for (let x = 0; x < width; ++x) {
            let index = (y * width + x) * 4;
            data[index] = (data[index] + pos * offset[0]) % 255;
            data[index + 1] = (data[index + 1] + pos * offset[1]) % 255;
            data[index + 2] = (data[index + 2] + pos * offset[2]) % 255;
            swapColors(data, index);
        }
        pos += 0.005;
    }
    pos = startPos;
    for (let y = Math.floor(height / 2) + 1; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            let index = (y * width + x) * 4;
            data[index] = (data[index] + pos * offset[0]) % 255;
            data[index + 1] = (data[index + 1] + pos * offset[1]) % 255;
            data[index + 2] = (data[index + 2] + pos * offset[2]) % 255;
            swapColors(data, index);
        }
        pos += 0.005;
    }
    offset = offset.map(v => v + 12);
    offset.forEach((v, i) => { if (v > 200) offset[i] = 0; });
}

function outwardSquare(data, width, height, pos) {
    let wx = Math.floor(width / 2);
    let startPos = pos;
    let offset = [5, 50, 100];
    for (let y = Math.floor(height / 2); y > 0; --y) {
        for (let x = 0; x < wx; ++x) {
            let index = (y * width + x) * 4;
            data[index] = (data[index] + pos * offset[0]) % 255;
            data[index + 1] = (data[index + 1] + pos * offset[1]) % 255;
            data[index + 2] = (data[index + 2] + pos * offset[2]) % 255;
            swapColors(data, index);
        }
        pos += 0.005;
    }
    for (let y = Math.floor(height / 2); y > 0; --y) {
        for (let x = width - 1; x > wx - 1; --x) {
            let index = (y * width + x) * 4;
            data[index] = (data[index] + pos * offset[0]) % 255;
            data[index + 1] = (data[index + 1] + pos * offset[1]) % 255;
            data[index + 2] = (data[index + 2] + pos * offset[2]) % 255;
            swapColors(data, index);
        }
        pos += 0.005;
    }
    pos = startPos;
    for (let y = Math.floor(height / 2) + 1; y < height; ++y) {
        for (let x = 0; x < wx; ++x) {
            let index = (y * width + x) * 4;
            data[index] = (data[index] + pos * offset[0]) % 255;
            data[index + 1] = (data[index + 1] + pos * offset[1]) % 255;
            data[index + 2] = (data[index + 2] + pos * offset[2]) % 255;
            swapColors(data, index);
        }
        pos += 0.005;
    }
    for (let y = Math.floor(height / 2) + 1; y < height; ++y) {
        for (let x = width - 1; x > wx - 1; --x) {
            let index = (y * width + x) * 4;
            data[index] = (data[index] + pos * offset[0]) % 255;
            data[index + 1] = (data[index + 1] + pos * offset[1]) % 255;
            data[index + 2] = (data[index + 2] + pos * offset[2]) % 255;
            swapColors(data, index);
        }
        pos += 0.005;
    }
    offset = offset.map(v => v + 12);
    offset.forEach((v, i) => { if (v > 200) offset[i] = 0; });
}

function pixelSort(data, width, height, pos) {
    let v = [];
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let index = (z * width + i) * 4;
            let vv = pos*(data[index] << 16) | pos*(data[index + 1] << 8) | pos*data[index + 2];
            v.push(vv);
        }
        if (v.length > 0) {
            v.sort((a, b) => a - b);
            for (let i = 0; i < width; ++i) {
                let index = (z * width + i) * 4;
                let value = v[i];
                data[index] = value & 0xFF;
                data[index + 1] = (value >> 8) & 0xFF;
                data[index + 2] = (value >> 16) & 0xFF;
            }
            v = [];
        }
    }
}

function glitchSort(data, width, height, pos) {
    let v = [];

    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let index = (z * width + i) * 4;
            let vv = (data[index] << 16) | (data[index + 1] << 8) | data[index + 2];
            v.push(vv);
        }
        if (v.length > 0) {
            v.sort((a, b) => a - b);
            for (let i = 0; i < width; ++i) {
                let index = (z * width + i) * 4;
                let value = v[i];
                data[index] = (data[index] + (pos * (value & 0xFF))) % 255;
                data[index + 1] = (data[index + 1] + (pos * ((value >> 8) & 0xFF))) % 255;
                data[index + 2] = (data[index + 2] + (pos * ((value >> 16) & 0xFF))) % 255;
            }
            v = [];
        }
    }
}

function strobeEffect(data, width, height, iterations) {
    let passIndex = 0;
    let alpha = iterations;

    for (let z = 0; z < width - 2; ++z) {
        for (let i = 0; i < height - 2; ++i) {
            const index = (z * width + i) * 4;
            let colors = [data[index], data[index + 1], data[index + 2]];

            switch (passIndex) {
                case 0:
                    colors[0] = (colors[0] * (-alpha)) % 255;
                    colors[1] = (colors[1] * alpha) % 255;
                    colors[2] = (colors[2] * alpha) % 255;
                    break;
                case 1:
                    colors[0] = (colors[0] + colors[0] * alpha) % 255;
                    colors[1] = (colors[1] + colors[1] * (-alpha)) % 255;
                    colors[2] = (colors[2] + colors[2] * alpha) % 255;
                    break;
                case 2:
                    colors[0] = (colors[0] * alpha) % 255;
                    colors[1] = (colors[1] * alpha) % 255;
                    colors[2] = (colors[2] * (-alpha)) % 255;
                    break;
                case 3:
                    const index1 = ((z + 1) * width + i) * 4;
                    const index2 = ((z + 2) * width + i) * 4;
                    colors[0] = (colors[0] + data[index1] * alpha) % 255;
                    colors[1] = (colors[1] + data[index1 + 1] * alpha) % 255;
                    colors[2] = (colors[2] + data[index2 + 2] * alpha) % 255;
                    break;
            }

            [data[index], data[index + 1], data[index + 2]] = colors;
            swapColors(data, index);
        }
    }
    passIndex = (passIndex + 1) % 4;
}

function blend3(data, width, height, iterations) {
    let rValue = [0, 0, 0];
    let pos = iterations;

    for (let z = 0; z < width; ++z) {
        for (let i = 0; i < height; ++i) {
            const index = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                data[index + j] = pos*(data[index + j] + pos*data[index + j] * rValue[j]) % 255;
            }
            swapColors(data, index);
        }
    }
    rValue = rValue.map(value => value + ((Math.random() * 10 > 5) ? -0.1 : 0.1));
}

function negParadox(data, width, height, iterations) {
    let alpha = iterations;

    for (let z = 0; z < width - 3; ++z) {
        for (let i = 0; i < height - 3; ++i) {
            const index = (z * width + i) * 4;
            const colors = [
                [data[index], data[index + 1], data[index + 2]],
                [data[index + 4], data[index + 5], data[index + 6]],
                [data[index + 8], data[index + 9], data[index + 10]],
                [data[index + 12], data[index + 13], data[index + 14]]
            ];

            data[index] = (colors[0][0] * alpha + colors[1][0] * alpha) % 255;
            data[index + 1] = (colors[1][1] * alpha + colors[3][1] * alpha) % 255;
            data[index + 2] = (colors[1][2] * alpha + colors[2][2] * alpha) % 255;

            swapColors(data, index);
        }
    }
}

function thoughtMode(data, width, height, iterations) {
    let alpha = iterations;
    let mode = 0;
    let sw = 1, tr = 1;

    for (let z = 2; z < width - 2; ++z) {
        for (let i = 2; i < height - 4; ++i) {
            const index = (z * width + i) * 4;
            if (sw === 1) data[index] = (data[index] + data[index + mode] * alpha) % 255;
            if (tr === 0) data[index + mode] = (data[index + mode] - data[index + (Math.random() * 2) * 4] * alpha) % 255;
            data[index + mode] = (data[index + mode] + data[index + mode] * alpha) % 255;

            mode = (mode + 1) % 3;
            swapColors(data, index);
        }
    }
    sw = !sw;
    tr = !tr;

}

function blank(data, width, height, iterations) {
    let alpha = iterations;
    let color_switch = false;
    const val = [0, 0, 0];

    for (let z = 0; z < width; ++z) {
        for (let i = 0; i < height; ++i) {
            const index = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                val[j] = (alpha * data[index + j]) / (2 - j + 1);
                data[index + j] += val[2 - j] / (j + 1);
                if (color_switch) data[index + j] = 255 - data[index + j];
            }
            swapColors(data, index);
        }
    }

    color_switch = !color_switch;
    
}

function tri(data, width, height, iterations) {
    let alpha = iterations;

    for (let z = 0; z < width - 3; ++z) {
        for (let i = 0; i < height - 3; ++i) {
            const index = (z * width + i) * 4;
            const colors = [
                data[index + 4],
                data[index + 8]
            ];

            data[index] = (data[index] + data[index] * alpha) % 255;
            data[index + 1] = (data[index + 1] + colors[0] + colors[1] * alpha) % 255;
            data[index + 2] = (data[index + 2] + colors[0] + colors[1] * alpha) % 255;

            swapColors(data, index);
        }
    }
}

function distort(data, width, height, iterations) {
    let alpha = iterations;

    for (let z = 0; z < width; ++z) {
        for (let i = 0; i < height; ++i) {
            const index = (z * width + i) * 4;
            data[index] = (i * alpha + data[index]) % 255;
            data[index + 2] = (z * alpha + data[index + 2]) % 255;
            data[index + 1] = (alpha * data[index + 1]) % 255;

            data[index + 1] = ((i + z) * alpha + data[index + 1]) % 255;
            swapColors(data, index);
        }
    }
}

function cDraw(data, width, height, iterations) {
    let alpha = iterations;
    let rad = 80.0;
    let deg = 1.0;

    for (let z = 0; z < width; ++z) {
        for (let i = 0; i < height; ++i) {
            const index = (z * width + i) * 4;
            const cX = Math.floor(rad * Math.cos(deg));
            const cY = Math.floor(rad * Math.sin(deg));

            data[index] = (data[index] * (cX * alpha)) % 255;
            data[index + 1] = (data[index + 1] * (cY * alpha)) % 255;
            data[index + 2] = (data[index + 2] * alpha) % 255;

            deg += 0.1;
            swapColors(data, index);
        }
    }

    rad += 0.1;
    if (rad > 90) rad = 0;
    if (alpha > 20) alpha = 0;
}
