var React = require('react/addons');
var ItemForm = require('./item_form.react')
var ShoppingListItem = require('./item.react')
var ShoppingListStore = require('../stores/shopping_list_store');
var ShoppingListActions = require('../actions/shopping_list_actions');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

ShoppingListActions.getData();

var ShoppingList = React.createClass({
	componentDidMount: function() {
    this.unsubscribe = ShoppingListStore.listen(this.onChange);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
	onChange: function() {
		this.setState( { items: ShoppingListStore.getAll() } );
	},
	addItem: function( newItem ) {
		ShoppingListActions.addItem( newItem );
	},
	removeItem: function( index ) {
		ShoppingListActions.removeItem( index );
	},
	toggleItem: function( index ) {
		ShoppingListActions.checkItem( index );
	},
	getInitialState: function() {
		return { items : ShoppingListStore.getAll() };
	},
	render: function() {

		var itemList = this.state.items.map( function(item, index) {
			return (
				<ShoppingListItem
						key = { index }
						item = { item }
						index = { index }
						onItemRemoved = { this.removeItem }
						onItemChecked = { this.toggleItem }
				/>
				);
		}.bind(this));
		return (
				<div>
					<ReactCSSTransitionGroup transitionName="example">
						{ itemList }
					</ReactCSSTransitionGroup>
					<ItemForm onItemAdded = { this.addItem } />
				</div>
		);
	}
});

module.exports = ShoppingList;