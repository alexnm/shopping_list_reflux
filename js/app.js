var React = require('react/addons');
var Router = require('react-router');
var ShoppingList = require('./components/list.react');
var Home = require('./components/home.react');
require('./stores/api_store');
var { Route, DefaultRoute, RouteHandler, Link } = Router; 

var App = React.createClass({
	render() {
		return (
				<div>
					<ul>
						<li> <Link to="/"> Home </Link> </li>
						<li> <Link to="list"> List </Link> </li>
					</ul>
					
					<RouteHandler />
				</div>
		);
	}
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route name="list" handler={ShoppingList} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('react-root'));
});