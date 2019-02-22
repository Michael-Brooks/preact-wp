import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	drawerRef = drawer => (this.drawer = drawer);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToBlog = this.linkTo('/blog');
	nonBlogLinks = [
		'/',
		'/blog'
	];

	render(props) {
		console.log('props', props);
		return (
			<div>
				<TopAppBar class={style.topbar} fixed>
					<TopAppBar.Row class={style.topbar__row}>
						<TopAppBar.Section align-st>
							<TopAppBar.Title>Michael Brooks</TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef} style={{ top: '0' }}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/blog'
							|| this.nonBlogLinks.indexOf(props.selectedRoute) === -1} onClick={this.goToBlog}
						>
							<List.ItemGraphic>toc</List.ItemGraphic>
							Blog
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
			</div>
		);
	}
}
