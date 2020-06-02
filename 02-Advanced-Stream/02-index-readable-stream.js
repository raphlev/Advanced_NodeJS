const {
  Readable
} = require('stream');

const peaks = [
  "Tallac",
  "Ralston",
  "Rubicon",
  "Twin Peaks",
  "Castle Peak",
  "Rose",
  "Freel Peak"
];

class StreamFromArray extends Readable {

  constructor(array) {
    super({
      objectMode: true
    });
    this.array = array;
    this.index = 0;
  }

  // https://nodejs.org/api/stream.html#stream_readable_read_size_1
  /*
  This
  function MUST NOT be called by application code directly.It should be implemented by child classes, and called by the internal Readable class methods only.

  All Readable stream implementations must provide an implementation of the readable._read() method to fetch data from the underlying resource.

  When readable._read() is called,
    if data is available from the resource, the implementation should begin pushing that data into the read queue using the this.push(dataChunk) method._read() should
  continue reading from the resource and pushing data until readable.push() returns false.Only when _read() is called again after it has stopped should it resume pushing additional data onto the queue.

  Once the readable._read() method has been called, it will not be called again until more data is pushed through the readable.push() method.Empty data such as empty buffers and strings will not cause readable._read() to be called.

  The size argument is advisory.For implementations where a "read"
  is a single operation that returns data can use the size argument to determine how much data to fetch.Other implementations may ignore this argument and simply provide data whenever it becomes available.There is no need to "wait"
  until size bytes are available before calling stream.push(chunk).

  The readable._read() method is prefixed with an underscore because it is internal to the class that defines it, and should never be called directly by user programs.

From documentation:

  readable._read:

  "When readable._read() is called, if data is available from the resource, the implementation should begin pushing that data into the read queue using the this.push(dataChunk) method. link"

readable.push:

  "The readable.push() method is intended be called only by Readable implementers, and only from within the readable._read() method. link"
  

  */
  _read() {
    if (this.index <= this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index
      };
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }

}

const peakStream = new StreamFromArray(peaks);

peakStream.on('data', (chunk) => console.log(chunk));

peakStream.on('end', () => console.log('done!'));
