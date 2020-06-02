const {
  createServer
} = require('http');
const {
  stat,
  createReadStream
} = require('fs');
const {
  promisify
} = require('util');
const fileName = './powder-day.mp4';
const fileInfo = promisify(stat);

createServer(async (req, res) => {
  const {
    size
  } = await fileInfo(fileName);
  res.writeHead(200, {
    'Content-Length': size,
    'Content-Type': 'video/mp4'
  });
  createReadStream(fileName).pipe(res);
}).listen(3000, () => console.log('HTTP streaming to browser: http://localhost:3000'));

console.log('THIS WILL NOT WORK IN SAFARI BECAUSE IT DOES NOT MANAGE HEADER RANGE');
console.log('HEADER RANGE So it is not possible to skip ahead the cusror');
