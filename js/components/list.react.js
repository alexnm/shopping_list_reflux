var React = require('react/addons');
var ItemForm = require('./item_form.react')
var ShoppingListItem = require('./item.react')
var ShoppingListStore = require('../stores/shopping_list_store');
var ShoppingListActions = require('../actions/shopping_list_actions');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

ShoppingListActions.getData();

var ShoppingList = React.createClass({
	componentDidMount() {
    this.unsubscribe = ShoppingListStore.listen(this.onChange);
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
	onChange() {
		this.setState( { items: ShoppingListStore.getAll() } );
	},
	addItem( newItem ) {
		ShoppingListActions.addItem( newItem );
	},
	removeItem( index ) {
		ShoppingListActions.removeItem( index );
	},
	toggleItem( index ) {
		ShoppingListActions.checkItem( index );
	},
	getInitialState() {
		return { items : ShoppingListStore.getAll() };
	},
	render() {

		var itemList = this.state.items.map( (item, index) => {
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