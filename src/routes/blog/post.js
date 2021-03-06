import { h, Component } from 'preact';
import Markup from 'preact-markup';
import Helmet from 'preact-helmet';
import Card from 'preact-material-components/Card';
import { protocol, baseUrl } from '../../constants';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Post extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			posts: []
		};
	}

	componentDidMount() {
		fetch(`${protocol}://${baseUrl}posts?slug=${this.props.slug}`)
			.then(response => response.json())
			.then((data) => {
				let posts = data.map((post) => {
					return (
						<Card key={post.id}>
							<Helmet title={post.title.rendered} />
							<div class={style.cardHeader}>
								<h1 class=" mdc-typography--title"><Markup markup={post.title.rendered} /></h1>
							</div>
							<div class={style.cardBody}>
								<Markup markup={post.content.rendered} type="html" />
							</div>
						</Card>
					);
				});
				this.setState({ loading: false, posts });
			})
			.catch(error => {
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
				{this.loadPosts()}
			</div>
		);
	}
}
