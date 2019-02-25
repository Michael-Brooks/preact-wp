import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { homeTitle } from '../../constants';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={`${style.home} page`}>
				<Helmet title={homeTitle} />
				<img src={'../../assets/images/splash-image.jpg'} />
			</div>
		);
	}
}
