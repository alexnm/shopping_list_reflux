var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "addItem",
    "checkItem",
    "removeItem"
  ]);

module.exports = Actions;