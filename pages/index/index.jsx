import React from 'react';
import Navigation from '../../components/navigation/navigation.jsx';
import Masthead from '../../components/masthead/masthead.jsx';
import Repo from '../../components/repo/repo.jsx';
import SearchBar from '../../components/search_bar/search_bar.jsx';
import moment from 'moment';
import _ from 'lodash';

require('whatwg-fetch');

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repos : []
		};
	}
	handleChange(event) {
		this.setState({
			message: event.target.value
		});
	}

	formatDate(date) {
		return moment.utc(date).fromNow();
	}
	// @TODO put in separate component so we don't have to rerender the nav each time
	render() {
		return <div id="page-home">
				<Navigation/>
				<Masthead organization="Netflix" title="OSS Project Explorer"/>
				<SearchBar />
				{
					this.state.repos.map(repo => {
						return <Repo
							name={repo.name}
							description={repo.description}
							lastPushed={this.formatDate(repo.pushed_at)}
							stars={repo.stargazers_count}
							forks={repo.forks_count}
							openIssues={repo.open_issues_count}
							url={repo.git_url}
						/>
					})
				}
		</div>;
	}

	getRepos() {
		// first parse out queryString params...
		// then .. then ... e
		return global.fetch('https://api.github.com/orgs/google/repos')
			.then(x => x.json())
			.then(rows => this.setState(_.extend({}, this.state, {repos: rows})));

	}

	componentDidMount() {


		global.addEventListener('hashchange', () => {
			this.getRepos();
		});

		this.getRepos();

	}
}
