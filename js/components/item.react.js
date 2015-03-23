var React = require('react/addons');

var ShoppingListItem = React.createClass({
	handleRemove: function( event ) {
		event.stopPropagation();
		this.props.onItemRemoved(this.props.index);
	},
	handleCheck: function() {
		this.props.onItemChecked(this.props.index);
	},
	render: function() {
		var item = this.props.item;
		var itemClass = React.addons.classSet({
			'shopping-list-item': true,
			'checked': item.checked
		});
		var removeLink = item.checked ? '' : (<a className="delete" href="javascript:void(0)" onClick={ this.handleRemove }> x </a>)
		return (
				<div className={ itemClass } onClick={ this.handleCheck }>
					<span> { item.name } </span>
					-
					<span> { item.qty } { item.unit } </span>
					{ removeLink }
				</div>
		);
	}
});

module.exports = ShoppingListItem;
