console.log('Initialize Testing')

MockFirebase.override();

var context = require.context('./test', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;

console.log('Testing Complete')
