var Actions = require('../actions/shopping_list_actions');
var Reflux = require('reflux');

var items = [];

var Store = Reflux.createStore({
    init: function() {
        this.listenTo(Actions.addItem,this.onItemAdded);
        this.listenTo(Actions.checkItem,this.onItemChecked);
        this.listenTo(Actions.removeItem,this.onItemRemoved);
    },
    getAll: function() {
        return items;
    },
    onItemAdded: function( item ) {
        items.push(item);
        this.trigger();
    },
    onItemChecked: function( index ) {
        items[index].checked = !items[index].checked;
        this.trigger();
    },
    onItemRemoved: function( index ) {
        items.splice(index, 1);
        this.trigger();
    }
});

module.exports = Store;