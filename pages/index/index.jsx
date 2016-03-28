import React from 'react';
import Navigation from '../../components/navigation/navigation.jsx';
import Masthead from '../../components/masthead/masthead.jsx';
import Repo from '../../components/repo/repo.jsx';
import SearchBar from '../../components/search_bar/search_bar.jsx';

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Hello!'
		};
	}
	handleChange(event) {
		this.setState({
			message: event.target.value
		});
	}
	render() {
		return <div id="page-home">
				<Navigation/>
				<Masthead organization="Netflix" title="OSS Project Explorer"/>
				<SearchBar />
				<Repo
					name="SimianArymy"
					description="Tools for keeping your cloud operating in top form. Chaos Monkey is a resiliency tool that helps applications tolerate random instance failures."
					lastCommit="2 Days Ago"
					stars="322"
					forks="151"
					openIssues="200"
					closedIssues="932"
					url="https://github.com/Netflix/SimianArmy.git"
				/>
		</div>;
	}
	componentDidMount() {
	}
}
