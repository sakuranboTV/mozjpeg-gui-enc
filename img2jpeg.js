import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
const imagePool = new ImagePool(cpus().length);

import fs from 'fs/promises';
const file = await fs.readFile('./landscape.png');
const image = imagePool.ingestImage(file);

const encodeOptions = {
    mozjpeg: {}, //an empty object means 'use default settings'
  };
const result = await image.encode(encodeOptions);

await imagePool.close();



// promiseっていう型になってしまっているので、その中身を取得する。
// Promise.resoleveでPromiseを再生成して、中身をvaluで取得する
Promise.resolve(image.encodedWith.mozjpeg).then((valu)=>{
  console.log(valu.binary);
  fs.writeFile('./image.jpg', valu.binary);
});

