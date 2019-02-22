import { h, Component } from 'preact';
import Markup from 'preact-markup';
import Helmet from 'preact-helmet';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Posts extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			posts: []
		};
	}

	componentDidMount() {
		fetch('https://michaelbrooks.co.uk/wp-json/wp/v2/posts')
			.then(response => response.json())
			.then((data) => {
				let posts = data.map((post) => {
					console.log(post);
					return (
						<Card key={post.id}>
							<Helmet title="This is a test" />
							<div class={style.cardHeader}>
								<h2 class=" mdc-typography--title"><Markup markup={post.title.rendered} /></h2>
							</div>
							<div class={style.cardBody}>
								<Markup markup={post.excerpt.rendered} type="html" />
							</div>
						</Card>
					);
				});
				this.setState({ loading: false, posts });
			})
			.catch(error => {
				console.log(error)
				this.setState({ loading: false });
			});
	}

	loadPosts() {
		if (this.state.loading) {
			return (
				<div>
					<p>Loading...</p>
				</div>
			);
		}

		if (this.state.loading === false && this.state.posts.length === 0) {
			return (
				<div>
					<p>No posts</p>
				</div>
			);
		}

		return (
			this.state.posts
		);
	}

	render() {
		return (
			<div class={`${style.blog} page`}>
				<h1>Blog</h1>
				{this.loadPosts()}
			</div>
		);
	}
}
