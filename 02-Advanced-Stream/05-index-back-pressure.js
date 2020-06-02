const {
    createReadStream,
    createWriteStream
} = require('fs');

const readStream = createReadStream('./powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4', {
    //highWaterMark: 1628920128
});

// https://nodejs.org/es/docs/guides/backpressuring-in-streams/


readStream.on('data', (chunk) => {
    const result = writeStream.write(chunk);
    if (!result) {
        // In any scenario where the data buffer has exceeded the [highWaterMark][] or 
        // the write queue is currently busy, [.write()][] will return false.

        console.log('backpressure')
        readStream.pause();
    }
});

readStream.on('error', (error) => {
    console.log('an error occurred', error.message);
});

readStream.on('end', () => {
    writeStream.end();
});

writeStream.on('drain', () => {
    console.log('drained');
    readStream.resume();
})

writeStream.on('close', () => {
    process.stdout.write('file copied\n');
    process.stdout.write('uncomment line <highWaterMark: 162892012> in code and start again.')
})
