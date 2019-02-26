import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Posts from '../routes/blog/posts';
import Post from '../routes/blog/post';
import NotFound from '../routes/404';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	render() {
		return (
			<div id="app">
				<Header selectedRoute={this.state.currentUrl} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Post path="/:slug" />
					<Posts path="/blog" />
					<Posts path="/page/:page" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
