var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "addItem",
    "checkItem",
    "removeItem",
    "getData",
    "receiveData"
  ]);

module.exports = Actions;