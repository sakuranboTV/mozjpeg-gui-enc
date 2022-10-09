
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
const imagePool = new ImagePool(cpus().length);

import fs from 'fs/promises';
const file = await fs.readFile('./sakura.png');
const image = imagePool.ingestImage(file);

const encodeOptions = {
    mozjpeg: {}, //an empty object means 'use default settings'
    jxl: {
      quality: 90,
    },
  };
const result = await image.encode(encodeOptions);

    
//ここから下がわからない。
const rawEncodedImage = image.encodedWith.mozjpeg.binary;

fs.writeFile('./image.jpg', result.binary);