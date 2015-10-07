var calc = require('./calc');
var argv = require('yargs').argv;


var actionName = argv.fn;

console.log(calc[actionName](argv.x,argv.y));


