const tessel = require('tessel');
const infraredlib = require('ir-attx4');
const infrared = infraredlib.use(tessel.port['B']);

infrared.on('ready', () => {
  console.log('Connected to IR');

  infrared.on('data', data => {
    console.log(JSON.stringify(data));
  });
});
