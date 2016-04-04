import React from 'react';
import querystring from 'querystring';
import Navigation from '../../components/navigation/navigation.jsx';
import Masthead from '../../components/masthead/masthead.jsx';
import Repo from '../../components/repo/repo.jsx';
import SearchBar from '../../components/search_bar/search_bar.jsx';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import updateHash from '../../util/update_hash';

require('whatwg-fetch');

const PER_PAGE = 20;

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
					this.state.repos.length ?
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
					}) : <h2 className='no-results'>No Results Found</h2>
				}
				<ReactPaginate
					forceSelected={this.state.page || 0}
					previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={<a href="">...</a>}
					pageNum={this.state.total / PER_PAGE}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					clickCallback={this.handlePageClick}
					containerClassName={"pagination"}
					subContainerClassName={"pages pagination"}
					activeClassName={"active"}
				/>
		</div>;
	}

	handlePageClick({selected}) {
		updateHash({page : selected});
		global.scroll(0,0);
		// global.alert(`test: ${JSON.stringify(arguments, null, 4)}`);
	}

	getRepos() {
		const query = querystring.parse(global.location.hash.slice(1));
		const apiParams = {};

		if (query.page) {
			apiParams.page = query.page;
		}

		if (query.search) {
			apiParams.text = query.search;
		}

		if (query.sort) {
			apiParams.sort = query.sort;
		}

		// first parse out queryString params...
		// @todo grab endpoint from config
		return global.fetch(`https://smiwuru1k0.execute-api.us-east-1.amazonaws.com/dev/repos?${querystring.stringify(apiParams)}`)
			.then(x => x.json())
			.then(resp => this.setState(
				_.extend(
					{},
					this.state,
					{total : resp.total, repos: resp.results, page : query.page }
				)
			));

	}

	componentDidMount() {


		global.addEventListener('hashchange', () => {
			this.getRepos();
		});

		this.getRepos();

	}
}
