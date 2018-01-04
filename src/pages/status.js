import React from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import Logo from '../assets/logo';

const Page = styled.div`
	background-color: #004062;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	min-width: 400px;
	height 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	color: #f0f0f0;
`;

const H1 = styled.h1`
	font-weight: 100;
	font-size: 350%;
	padding: 0;
	margin: 0;
`;

const H2 = styled.h2`
	font-weight: 100;
	padding: 0;
	margin: 0;
`;

const H4 = styled.h4`
	font-weight: 100;
	padding: 0;
	margin: 0;
`;

const flicker = keyframes`
	0%   { opacity:1; }
	50%  { opacity:0; }
	100% { opacity:1; }
`;

const A = styled.a`
	cursor: pointer;
	&:hover {
		animation: ${flicker} 2s linear infinite;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
		width: 100%;
`;

const Opendiv = styled.div`
	background-color: #75BD7C;
	border-radius: 0.3em;
	padding: 1em;
`;

const Closeddiv = styled.div`
	background-color: #EA7264;
	border-radius: 0.3em;
	padding: 1em;
`;

const Timediv = styled.div`
	padding: 1em;
`;

const Hoursdiv = styled.div`
	padding: 1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default class Status extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			online: false,
			is_open_for_business: false,
			open: '',
			close: '',
			time: '',
			date: '',
		};
	}

	componentWillMount() {
		let url = 'https://app.akira.md/api/system_status';
		axios.get(url).then((response) => {
			console.log(response.data);
			this.setState({
				loading: false,
				online: response.data.online,
				is_open_for_business: response.data.is_open_for_business,
				open: moment(response.data.open_hours_today.open_at).format('h A'),
				close: moment(response.data.open_hours_today.close_at).format('h A'),
				time: moment(response.system_time).format('h:mm'),
				date: moment(response.system_time).format('dddd, MMMM D'),
			});
			console.log(this.state);
		}).catch((error) => {
			console.log(error);
		});
	}

	loading() {
		if (this.state.loading) {
			return (
				<p>Loading....</p>
			);
		} else {
			return (
				<Content>
					{this.time()}
					{this.status()}
					{this.hours()}
				</Content>
			);
		}
	}

	time() {
		return (
			<Timediv>
				<H1>{this.state.time}</H1>
				<H4>{this.state.date}</H4>
			</Timediv>
		);
	}

	status() {
		if (this.state.is_open_for_business) {
			return (
				<Opendiv><H2>We are currently open!</H2></Opendiv>
			);
		} else {
			return (
				<Closeddiv><H2>We are currently closed</H2></Closeddiv>
			);
		}
	}

	hours() {
		return (
			<Hoursdiv>
				<H4><i>Our hours are</i></H4>
				<br/>
				<H2>{this.state.open} to {this.state.close}</H2>
			</Hoursdiv>
		);
	} 

	refresh() {
		console.log('hello');
		this.setState({loading: true});
		let url = 'https://app.akira.md/api/system_status';
		axios.get(url).then((response) => {
			console.log(response.data);
			this.setState({
				loading: false,
				online: response.data.online,
				is_open_for_business: response.data.is_open_for_business,
				open: moment(response.data.open_hours_today.open_at).format('h A'),
				close: moment(response.data.open_hours_today.close_at).format('h A'),
				time: moment(response.system_time).format('h:mm'),
				date: moment(response.system_time).format('dddd, MMMM D'),
			});
			console.log(this.state);
		}).catch((error) => {
			console.log(error);
		});	
	}

	render() {
		return (
			<Page>
				<A onClick={() => {this.refresh()}}><Logo/></A>
				{this.loading()}
			</Page>
		);
	}
}
