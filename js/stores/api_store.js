var Actions = require('../actions/shopping_list_actions');
var Reflux = require('reflux');
var request = require('superagent');

var Store = Reflux.createStore({
    init() {
        this.listenTo(Actions.addItem,this.onItemAdded);
        this.listenTo(Actions.checkItem,this.onItemChecked);
        this.listenTo(Actions.removeItem,this.onItemRemoved);
        this.listenTo(Actions.getData,this.onDataRequested);
    },
    onItemAdded( item ) {
        request.post('/api/add').send(item).end();
        this.trigger();
    },
    onItemChecked( index ) {
        request.patch(`/api/check/${index}`).end();
        this.trigger();
    },
    onItemRemoved( index ) {
        request.del(`/api/remove/${index}`).end();
        this.trigger();
    },
    onDataRequested( ) {
        request.get('/api/list').end(response => Actions.receiveData(response.body.data));
    }
});

module.exports = Store;