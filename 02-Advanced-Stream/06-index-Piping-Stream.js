const {
    createWriteStream
} = require('fs');

const writeStream = createWriteStream('./file.txt');

process.stdin.pipe(writeStream);

console.log(`Press any key and refresh content of file.txt !!`);
