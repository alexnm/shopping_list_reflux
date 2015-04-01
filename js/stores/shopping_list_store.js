var Actions = require('../actions/shopping_list_actions');
var Reflux = require('reflux');

var items = [];

var Store = Reflux.createStore({
    init() {
        this.listenTo(Actions.addItem,this.onItemAdded);
        this.listenTo(Actions.checkItem,this.onItemChecked);
        this.listenTo(Actions.removeItem,this.onItemRemoved);
        this.listenTo(Actions.receiveData,this.onDataReceived);
    },
    getAll() {
        return items;
    },
    onItemAdded( item ) {
        items.push(item);
        this.trigger();
    },
    onItemChecked( index ) {
        items[index].checked = !items[index].checked;
        this.trigger();
    },
    onItemRemoved( index ) {
        items.splice(index, 1);
        this.trigger();
    },
    onDataReceived( apiItems ) {
        items = apiItems;
        this.trigger();
    }
});

module.exports = Store;