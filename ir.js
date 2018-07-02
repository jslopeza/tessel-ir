const tessel = require('tessel');
const infraredlib = require('ir-attx4');
const infrared = infraredlib.use(tessel.port['B']);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({}));

const powerBuffer = new Buffer({
  type: 'Buffer',
  data: [
    34,
    246,
    238,
    208,
    2,
    88,
    253,
    218,
    2,
    88,
    254,
    12,
    2,
    88,
    254,
    12,
    2,
    88,
    249,
    142,
    2,
    88,
    249,
    142,
    2,
    88,
    254,
    12,
    2,
    138,
    254,
    12,
    2,
    88,
    249,
    142,
    2,
    88,
    249,
    142,
    2,
    88,
    249,
    192,
    2,
    138,
    249,
    192,
    2,
    138,
    249,
    192,
    2,
    88,
    254,
    12,
    2,
    88,
    249,
    142,
    2,
    138,
    249,
    192,
    2,
    138,
    254,
    62,
    2,
    88,
    249,
    142,
    2,
    88,
    253,
    218,
    2,
    88,
    254,
    12,
    2,
    88,
    249,
    142,
    2,
    88,
    249,
    142,
    2,
    88,
    254,
    12,
    2,
    88,
    253,
    218,
    2,
    88,
    254,
    12,
    2,
    88,
    254,
    12,
    2,
    88,
    249,
    142,
    2,
    88,
    249,
    142,
    2,
    88,
    254,
    12,
    2,
    88,
    253,
    218,
    2,
    88,
    249,
    142,
    2,
    38,
    249,
    92,
    2,
    38,
    249,
    92,
    2,
    38,
  ],
});

app.get('/', (req, res) => res.send('Hello from Room Overseer!'));

app.post('/ac', (req, res) => {
  console.log('Request Received', req.body, new Date());

  const queryResult = req.body.queryResult;
  console.log('Query Result', queryResult, new Date());

  if (
    queryResult &&
    queryResult.parameters &&
    queryResult.parameters.device === 'AC'
  ) {
    console.log('Should turn on AC now', new Date());
    infrared.sendRawSignal(38, powerBuffer, err => {
      if (err) {
        console.log('Cannot Send Signal', err);
        res.status(500).send();
      } else {
        console.log('Signal Sent');
        res.status(200).send();
      }
    });
    return res.status(200).send();
  }

  console.log('Cannot find device', new Date());
  res.status(500).send();
});

infrared.on('ready', () => {
  console.log('Connected to IR');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
