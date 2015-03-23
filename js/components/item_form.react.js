var React = require('react/addons');

var DEFAULT_UNIT = 'pcs';

var ItemForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var newItem = {
      name: this.refs.name.getDOMNode().value.trim(),
      qty: this.refs.qty.getDOMNode().value.trim(),
      unit: this.refs.unit.getDOMNode().value.trim()
    };

    // send message to shopping list
    this.props.onItemAdded(newItem);

    // clear form
    this.refs.name.getDOMNode().value = '';
    this.refs.qty.getDOMNode().value = '';
    this.refs.unit.getDOMNode().value = DEFAULT_UNIT;

    this.refs.name.getDOMNode().focus();
  },
  render: function() {
    return (
      <form className="itemForm" onSubmit={ this.handleSubmit }>
        <div>
          <input className="input" type="text" placeholder="What do you need..." ref="name" />
        </div>
        <div>
          <input className="input" type="number" step="0.01" placeholder="How much..." ref="qty" />
          <select className="select" defaultValue="pcs" ref="unit">
            <option value="pcs"> pcs </option>
            <option value="kg"> kg </option>
            <option value="gr"> gr </option>
            <option value="l"> l </option>
            <option value="ml"> ml </option>
          </select>
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }
});

module.exports = ItemForm;