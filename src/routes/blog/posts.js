import { h, Component } from 'preact';
import Markup from 'preact-markup';
import Helmet from 'preact-helmet';
import Card from 'preact-material-components/Card';
import { protocol, baseUrl, blogTitle } from '../../constants';
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
		fetch(`${protocol}://${baseUrl}posts?page=${this.props.page || 1}`)
			.then(response => response.json())
			.then((data) => {
				let posts = data.map((post) => {
					const renderExcerpt =  `
					${post.excerpt.rendered.split(' ').splice(0, 54).join(' ')}...</p>
					`;

					return (
						<Card key={post.id} class={style.mdcCard}>
							<Helmet title={blogTitle} />
							<div class={style.cardHeader}>
								<h2 class=" mdc-typography--title"><Markup markup={post.title.rendered} /></h2>
							</div>
							<div class={style.cardBody}>
								<Markup markup={renderExcerpt} type="html" />
								<a href={post.slug}>Read More</a>
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

	render(props) {
		return (
			<div class={`${style.blog} page`}>
				<h1>Blog {props.page && ` - Page ${props.page}`}</h1>
				{this.loadPosts()}
			</div>
		);
	}
}
