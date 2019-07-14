const fs = require('fs');
const path = require('path');

const input = "./test";

console.log(fs.existsSync(path.resolve(input)) && fs.lstatSync(path.resolve(input)).isDirectory())