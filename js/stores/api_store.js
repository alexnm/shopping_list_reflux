var Actions = require('../actions/shopping_list_actions');
var Reflux = require('reflux');
var request = require('superagent');

var Store = Reflux.createStore({
    init: function() {
        this.listenTo(Actions.addItem,this.onItemAdded);
        this.listenTo(Actions.checkItem,this.onItemChecked);
        this.listenTo(Actions.removeItem,this.onItemRemoved);
        this.listenTo(Actions.getData,this.onDataRequested);
    },
    onItemAdded: function( item ) {
        request.post('/api/add').send(item).end();
        this.trigger();
    },
    onItemChecked: function( index ) {
        request.patch('/api/check/' + index).end();
        this.trigger();
    },
    onItemRemoved: function( index ) {
        request.del('/api/remove/' + index).end();
        this.trigger();
    },
    onDataRequested: function( ) {
        request.get('/api/list').end(function(response) {
            Actions.receiveData(response.body.data);
        });
    }
});

module.exports = Store;