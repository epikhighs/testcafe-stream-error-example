const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const { pipeline, Transform } = require('stream');

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.get('/stream/error', (req, res) => {
  console.log('stream error route start')

  const errorStream = new ErrorStream();

  errorStream.on('error', (error) => {
    console.error('Error occurred:', error);
    res.status(500).send('An error occurred');
  });

  res.setHeader('Content-Type', 'application/octet-stream');
  pipeline(errorStream, res, (err) => {
    if (err) {
      console.error(err)
    }
    console.log('stream done')
  })
  console.log('stream error route end (server is still working fine)')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

class ErrorStream extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const error = new Error('Intentional error');
    callback(error);
  }
}
