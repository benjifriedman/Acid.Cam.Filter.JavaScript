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

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "l":
      document.getElementById("loadImage").click();
      break;
    case "s":
      document.getElementById("saveImage").click();
      break;
    case "c":
      document.getElementById("setImage").click();
      break;
  }
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
    iterations = iterations * 0.1;
    if (filter === 'selfAlphaBlend') {
        selfAlphaBlend(data, iterations);
    } else if (filter === 'diamondPattern') {
        diamondPattern(data, canvas.width, canvas.height, iterations);
    } else if (filter === "colorXor") {
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
        blend3(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "negParadox") {
        negParadox(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "thoughtMode") {
        thoughtMode(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "blank") {
        blank(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "tri") {
        tri(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "distort") {
        distort(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "cDraw") {
        cDraw(data, canvas.width, canvas.height, iterations * 0.1);
    } else if (filter === "oppositeBlend") {
        oppositeBlend(data, canvas.width, canvas.height, iterations);
    } else if (filter === "diagonalLines") {
        diagonalLines(data, canvas.width, canvas.height, iterations);
    } else if (filter === "horizontalLines") {
        horizontalLines(data, canvas.width, canvas.height, iterations);
    } else if (filter === "invertedScanlines") {
        invertedScanlines(data, canvas.width, canvas.height, iterations);
    } else if (filter === "softMirror") {
        softMirror(data, canvas.width, canvas.height, iterations);
    } else if (filter === "kanapaTrip") {
       kanapaTrip(data, canvas.width, canvas.height, iterations); 
    } else if (filter === "scanSwitch") {
        scanSwitch(data, canvas.width, canvas.height, iterations);
    } else if (filter === "scanAlphaSwitch") {
        scanAlphaSwitch(data, canvas.width, canvas.height, iterations);
    } else if (filter === "negativeStrobe") {
        negativeStrobe(data, canvas.width, canvas.height, iterations);
     } else if (filter === "xorAddMul") {
        xorAddMul(data, canvas.width, canvas.height, iterations);
    } else if (filter === "blendSwitch") {
        blendSwitch(data, canvas.width, canvas.height, iterations);
    } else if (filter === "allRed") {
        allRed(data, canvas.width, canvas.height, iterations);
    } else if (filter === "allGreen") {
        allGreen(data, canvas.width, canvas.height, iterations);
    } else if (filter === "allBlue") {
        allBlue(data, canvas.width, canvas.height, iterations);
    } else if (filter === "lineRGB") {
        lineRGB(data, canvas.width, canvas.height, iterations);
    } else if (filter === "pixelRGB") {
        pixelRGB(data, canvas.width, canvas.height, iterations);
    } else if (filter === "boxedRGB") {
        boxedRGB(data, canvas.width, canvas.height, iterations);
    } else if (filter === "kruegerSweater") {
        kruegerSweater(data, canvas.width, canvas.height, iterations);
    } else if (filter === "rgbFlash") {
        rgbFlash(data, canvas.width, canvas.height, iterations);
    } else if (filter === "increaseBlendHorizontal") {
        increaseBlendHorizontal(data, canvas.width, canvas.height, iterations);
    } else if (filter === "blendIncrease") {
        blendIncrease(data, canvas.width, canvas.height, iterations);
    } else if (filter === "gradientReverse") {
        gradientReverse(data, canvas.width, canvas.height, iterations);
    } else if (filter === "gradientReverseBox") {
        gradientReverseBox(data, canvas.width, canvas.height, iterations);
    } else if (filter === "gradientReverseVertical") {
        gradientReverseVertical(data, canvas.width, canvas.height, iterations);
    } else if (filter === "gradientNewFilter") {
        gradientNewFilter(data, canvas.width, canvas.height, iterations);
    } else if (filter === "reinterpretDouble") {
        reinterpretDouble(data, canvas.width, canvas.height, iterations);
    } else if (filter === "reinterpSelfScale") {
        reinterpSelfScale(data, canvas.width, canvas.height, iterations);
    } else if (filter === "averageLines") {
        averageLines(data, canvas.width, canvas.height, iterations);
    } else if (filter === "colorRange") {
        colorRange(data, canvas.width, canvas.height, iterations);
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
    square = Math.floor(square);
    if(square < 1) square = 1.0;

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

// new ones

let isNegative = false;

function oppositeBlend(data, width, height, iterations) {
    const temp = new Uint8ClampedArray(data);
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width - 1; ++i) {
            let index = (z * width + i) * 4;
            let tempIndex = (z * width + (width - i - 1)) * 4;
            for (let j = 0; j < 3; ++j) {
                data[index + j] = (data[index + j] + temp[tempIndex + j] * iterations) % 255;
            }
            swapColors(data, index);
            if (isNegative) invert(data, index);
        }
    }
}

function diagonalLines(data, width, height, iterations) {
    const temp = new Uint8ClampedArray(data);
    let pos = 1.0;
    for (let i = 0; i < width - 1; ++i) {
        for (let z = 0; z < height - 1; ++z) {
            let index = (z * width + i) * 4;
            let tempIndex = ((height - z - 1) * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                data[index + j] = (data[index + j] + temp[tempIndex + j] + pos * iterations) % 255;
                ++pos;
                if (pos > 100) pos = 0;
            }
            swapColors(data, index);
            if (isNegative) invert(data, index);
        }
    }
}

function horizontalLines(data, width, height, iterations) {
    let pos = [1.0, 16.0, 32.0];
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let index = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                data[index + j] = (data[index + j] + pos[j] * iterations) % 255;
                pos[j] += 0.1;
                if (pos[j] > 100) pos[j] = 0;
            }
            swapColors(data, index);
            if (isNegative) invert(data, index);
        }
    }
}

function invertedScanlines(data, width, height, iterations) {
    let index = 0;
    let alpha = 1.0;
    const posMax = 14.0;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (index) {
                case 0:
                    for (let j = 0; j < 3; ++j) {
                        data[dataIndex + j] = (~data[dataIndex + j] * alpha * iterations) % 255;
                    }
                    index++;
                    break;
                case 1:
                    let temp = data.slice(dataIndex, dataIndex + 3);
                    data[dataIndex] = (temp[2] * alpha * iterations) % 255;
                    data[dataIndex + 1] = (temp[1] * alpha * iterations) % 255;
                    data[dataIndex + 2] = (temp[0] * alpha * iterations) % 255;
                    index++;
                    break;
                case 2:
                    index = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    procPos(alpha, posMax);
}

function softMirror(data, width, height, iterations) {
    let index = 0;
    const temp = new Uint8ClampedArray(data);
    for (let z = 1; z < height - 1; ++z) {
        for (let i = 1; i < width - 1; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (index) {
                case 0:
                    index++;
                    break;
                case 1:
                    let tempIndex = ((height - z - 1) * width + (width - i - 1)) * 4;
                    for (let j = 0; j < 3; ++j) {
                        data[dataIndex + j] = (temp[tempIndex + j] * iterations) % 255;
                    }
                    index = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
}

function kanapaTrip(data, width, height, iterations) {
    let start_index = 0;
    let index = start_index;
    const temp = new Uint8ClampedArray(data);
    for (let z = 1; z < height - 1; ++z) {
        for (let i = 1; i < width - 1; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (index) {
                case 0:
                    index++;
                    break;
                case 1:
                    let tempIndex = ((height - z - 1) * width + (width - i - 1)) * 4;
                    for (let j = 0; j < 3; ++j) {
                        data[dataIndex + j] = (temp[tempIndex + j] * iterations) % 255;
                    }
                    index = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    if (start_index == 0) start_index = 1;
    else start_index = 0;
}

function scanSwitch(data, width, height, iterations) {
    let start_index = 0;
    let index = start_index;
    for (let z = 3; z < height - 3; ++z) {
        for (let i = 3; i < width - 3; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (index) {
                case 0:
                    index++;
                    break;
                case 1:
                    for (let j = 0; j < 3; ++j) {
                        data[dataIndex + j] = (~data[dataIndex + j] * iterations) % 255;
                    }
                    index = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    if (start_index == 0) start_index = 1;
    else start_index = 0;
}

function procPos(pos, pos_max) {

}

function scanAlphaSwitch(data, width, height, iterations) {
    let start_index = 0;
    let alpha = 1.0, alpha_max = 10.0;
    let index = start_index;
    for (let z = 3; z < height - 3; ++z) {
        for (let i = 3; i < width - 3; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (index) {
                case 0:
                    index++;
                    for (let j = 0; j < 3; ++j) {
                        data[dataIndex + j] = (~data[dataIndex + j] * iterations) % 255;
                    }
                    break;
                case 1:
                    for (let j = 0; j < 3; ++j) {
                        data[dataIndex + j] = (data[dataIndex + j] + data[dataIndex + j] * alpha * iterations) % 255;
                    }
                    index = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    if (start_index == 0) start_index = 1;
    else start_index = 0;
    procPos(alpha, alpha_max);
}

function negativeStrobe(data, width, height, iterations) {
    let flash = 1;
    if (flash == 1) {
        for (let z = 0; z < height; ++z) {
            for (let i = 0; i < width; ++i) {
                let dataIndex = (z * width + i) * 4;
                for (let j = 0; j < 3; ++j) {
                    data[dataIndex + j] = (~data[dataIndex + j] * iterations) % 255;
                }
            }
        }
    }
    if (flash == 1) {
        flash = 0;
    } else {
        flash = 1;
    }
}

function xorAddMul(data, width, height, iterations) {
    let blend = 1.0, blend_max = 13.0;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            let b = Math.floor(blend);
            data[dataIndex] = (data[dataIndex] ^ (b * iterations)) % 255;
            data[dataIndex + 1] = (data[dataIndex + 1] + (b * iterations)) % 255;
            data[dataIndex + 2] = (data[dataIndex + 2] * (b * iterations)) % 255;
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    procPos(blend, blend_max);
}

function blendSwitch(data, width, height, iterations) {
    let pos = 0;
    let blend_pixel = 0;
    for (let i = 0; i < width; ++i) {
        for (let z = 0; z < height; ++z) {
            let dataIndex = (z * width + i) * 4;
            data[dataIndex + pos] = (data[dataIndex + pos] * (blend_pixel++ * iterations)) % 255;
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        pos++;
        if (pos > 2) pos = 0;
    }
}

function allRed(data, width, height, iterations) {
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            data[dataIndex + 1] = data[dataIndex + 2] = 0;
        }
    }
}

function allGreen(data, width, height, iterations) {
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            data[dataIndex] = data[dataIndex + 2] = 0;
        }
    }
}

function allBlue(data, width, height, iterations) {
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            data[dataIndex] = data[dataIndex + 1] = 0;
        }
    }
}

function lineRGB(data, width, height, iterations) {
    let counter = 0;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (counter) {
                case 0:
                    data[dataIndex + 1] = data[dataIndex + 2] = 0;
                    break;
                case 1:
                    data[dataIndex] = data[dataIndex + 2] = 0;
                    break;
                case 2:
                    data[dataIndex + 1] = data[dataIndex] = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        ++counter;
        if (counter > 2) counter = 0;
    }
}

function pixelRGB(data, width, height, iterations) {
    let counter = 0;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (counter) {
                case 0:
                    data[dataIndex + 1] = data[dataIndex + 2] = 0;
                    break;
                case 1:
                    data[dataIndex] = data[dataIndex + 2] = 0;
                    break;
                case 2:
                    data[dataIndex + 1] = data[dataIndex] = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
            ++counter;
            if (counter > 2) counter = 0;
        }
    }
}

function boxedRGB(data, width, height, iterations) {
    let row_counter = 0;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (row_counter) {
                case 0:
                    data[dataIndex + 1] = data[dataIndex + 2] = 0;
                    break;
                case 1:
                    data[dataIndex] = data[dataIndex + 2] = 0;
                    break;
                case 2:
                    data[dataIndex + 1] = data[dataIndex] = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        if ((z % 32) == 0) {
            ++row_counter;
            if (row_counter > 3) row_counter = 0;
        }
    }
}

function kruegerSweater(data, width, height, iterations) {
    let row_counter = 0;
    let rg = 0;
    row_counter = rg;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (row_counter) {
                case 0:
                    data[dataIndex + 1] = data[dataIndex + 2] = 0;
                    break;
                case 1:
                    data[dataIndex] = data[dataIndex + 2] = 0;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        if ((z % 32) == 0) {
            ++row_counter;
            if (row_counter >= 2) {
                row_counter = 0;
            }
        }
    }
    rg = (rg == 0) ? 1 : 0;
}

function rgbFlash(data, width, height, iterations) {
    let counter = 0;
    let start = 0;
    for (let z = start; z < height; z += 2) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            switch (counter) {
                case 0:
                    data[dataIndex + 2] = 255;
                    break;
                case 1:
                    data[dataIndex + 1] = 255;
                    break;
                case 2:
                    data[dataIndex] = 255;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    ++counter;
    if (counter > 2) counter = 0;
    start = (start == 0) ? 1 : 0;
}

function increaseBlendHorizontal(data, width, height, iterations) {
    let orig_frame = new Uint8ClampedArray(data);
    for (let i = 0; i < width; ++i) {
        let pix = [0, 0, 0];
        for (let z = 0; z < height; ++z) {
            let dataIndex = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                pix[j] += data[dataIndex + j] / (j + 2);
                data[dataIndex + j] += (data[dataIndex + j] * (pix[j] / 32) * iterations) % 255;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
}

function blendIncrease(data, width, height, iterations) {
    let blend_r = Math.floor(Math.random() * 255);
    let blend_g = Math.floor(Math.random() * 255);
    let blend_b = Math.floor(Math.random() * 255);
    let cblend_r = true, cblend_g = true, cblend_b = true;
    let increase_value_r = 2, increase_value_g = 2, increase_value_b = 2;
    if (blend_r > 255) {
        blend_r = Math.floor(Math.random() * 255);
        if (cblend_r == true) {
            blend_r = -blend_r;
            cblend_r = false;
        } else {
            cblend_r = true;
        }
    }
    if (blend_g > 255) {
        blend_g = Math.floor(Math.random() * 255);
        if (cblend_g == true) {
            blend_g = -blend_g;
            cblend_g = false;
        } else {
            cblend_g = true;
        }
    }
    if (blend_b > 255) {
        blend_b = Math.floor(Math.random() * 255);
        if (cblend_b == true) {
            blend_b = -blend_b;
            cblend_b = false;
        } else {
            cblend_b = true;
        }
    }
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            data[dataIndex + 2] = (data[dataIndex + 2] + blend_r * iterations) % 255;
            data[dataIndex + 1] = (data[dataIndex + 1] + blend_g * iterations) % 255;
            data[dataIndex] = (data[dataIndex] + blend_b * iterations) % 255;
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    blend_r += increase_value_r;
    blend_g += increase_value_g;
    blend_b += increase_value_b;
    increase_value_r += Math.floor(Math.random() * 5);
    increase_value_g += Math.floor(Math.random() * 5);
    increase_value_b += Math.floor(Math.random() * 5);
    if (increase_value_r > 20) {
        increase_value_r = 2;
    }
    if (increase_value_g > 20) {
        increase_value_g = 2;
    }
    if (increase_value_b > 20) {
        increase_value_b = 2;
    }
}

function gradientReverse(data, width, height, iterations) {
    let direction = true;
    let alpha = 1.0, alpha_max = 8;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                if (direction == true)
                    data[dataIndex + j] = (data[dataIndex + j] + i * alpha * iterations) % 255;
                else
                    data[dataIndex + j] = (data[dataIndex + j] - i * alpha * iterations) % 255;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        direction = (direction == true) ? false : true;
    }
    procPos(alpha, alpha_max);
}

function gradientReverseBox(data, width, height, iterations) {
    let direction = true;
    let alpha = 1.0, alpha_max = 8;
    for (let i = 0; i < width; ++i) {
        for (let z = 0; z < height; ++z) {
            let dataIndex = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                if (direction == true)
                    data[dataIndex + j] = (data[dataIndex + j] + i * alpha * iterations) % 255;
                else
                    data[dataIndex + j] = (data[dataIndex + j] - z * alpha * iterations) % 255;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        direction = (direction == true) ? false : true;
    }
    procPos(alpha, alpha_max);
}

function gradientReverseVertical(data, width, height, iterations) {
    let direction = true;
    let alpha = 1.0, alpha_max = 8;
    for (let i = 0; i < width; ++i) {
        for (let z = 0; z < height; ++z) {
            let dataIndex = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                if (direction == true)
                    data[dataIndex + j] = (data[dataIndex + j] + z * alpha * iterations) % 255;
                else
                    data[dataIndex + j] = (data[dataIndex + j] - z * alpha * iterations) % 255;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        direction = (direction == true) ? false : true;
    }
    procPos(alpha, alpha_max);
}

function gradientNewFilter(data, width, height, iterations) {
    let index = 0;
    let alpha = 1.0, alpha_max = 9;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                switch (index) {
                    case 0:
                        data[dataIndex + j] = (data[dataIndex + j] ^ Math.floor(alpha * z * iterations)) % 255;
                        break;
                    case 1:
                        data[dataIndex + j] = (data[dataIndex + j] & Math.floor(alpha * i * iterations)) % 255;
                        break;
                    case 2:
                        data[dataIndex + j] = (data[dataIndex + j] ^ Math.floor(alpha * iterations)) % 255;
                        break;
                }
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
            ++index;
            if (index > 2) index = 0;
        }
    }
    procPos(alpha, alpha_max);
}

function reinterpretDouble(data, width, height, iterations) {
    let alpha = 1.0, alpha_max = 8;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            let value = new Uint8Array(new Float64Array([alpha * iterations]).buffer);
            for (let j = 0; j < 3; ++j)
                data[dataIndex + j] = (data[dataIndex + j] ^ value[j]) % 255;

            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    procPos(alpha, alpha_max);
}

function reinterpSelfScale(data, width, height, iterations) {
    let index = 0;
    let alpha = 1.0, alpha_max = 8;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            let value = new Uint8Array(new Float64Array([alpha * iterations]).buffer);
            switch (index) {
                case 0:
                    data[dataIndex] = (data[dataIndex] * alpha ^ value[0]) % 255;
                    data[dataIndex + 1] = (data[dataIndex + 1] * alpha) % 255;
                    data[dataIndex + 2] = (data[dataIndex + 2] * alpha) % 255;
                    break;
                case 1:
                    data[dataIndex] = (data[dataIndex] * alpha) % 255;
                    data[dataIndex + 1] = (data[dataIndex + 1] * alpha ^ value[1]) % 255;
                    data[dataIndex + 2] = (data[dataIndex + 2] * alpha) % 255;
                    break;
                case 2:
                    data[dataIndex] = (data[dataIndex] * alpha) % 255;
                    data[dataIndex + 1] = (data[dataIndex + 1] * alpha) % 255;
                    data[dataIndex + 2] = (data[dataIndex + 2] * alpha ^ value[2]) % 255;
                    break;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        ++index;
        if (index > 2) index = 0;
    }
    procPos(alpha, alpha_max);
}

function averageLines(data, width, height, iterations) {
    let average = [0, 0, 0];
    let alpha = 1.0, alpha_max = 11;
    for (let z = 0; z < height; ++z) {
        let s = [1, 1, 1];
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            for (let j = 0; j < 3; ++j) {
                s[j] += data[dataIndex + j];
                data[dataIndex + j] = ((data[dataIndex + j] ^ average[j]) * alpha * iterations) % 255;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
        for (let j = 0; j < 3; ++j) {
            average[j] = Math.floor(s[j] / width);
        }
    }
    procPos(alpha, alpha_max);
}

function colorRange(data, width, height, iterations) {
    let alpha = 1.0, alpha_max = 6;
    for (let z = 0; z < height; ++z) {
        for (let i = 0; i < width; ++i) {
            let dataIndex = (z * width + i) * 4;
            let value = new Uint8Array(new Float64Array([alpha * iterations]).buffer);
            for (let j = 0; j < 3; ++j) {
                data[dataIndex + j] = (data[dataIndex + j] * value[j]) % 255;
            }
            swapColors(data, dataIndex);
            if (isNegative) invert(data, dataIndex);
        }
    }
    procPos(alpha, alpha_max);
}
