import React from 'react';
import SearchField from '../search_field/search_field.jsx';
import Sorter from '../sorter/sorter.jsx';
import updateHash from '../../util/updateHash';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}

	updateSearch(value) {
		updateHash({ search : value });
	}

	updateSort(value) {
		updateHash({ sort : value });
	}

	render() {
		return <div className="component-search-bar">
			<SearchField placeholder="Search" onSubmit={this.updateSearch.bind(this)}/>
			<Sorter onChange={this.updateSort.bind(this)} />
			<div className="clearfix" />
		</div>;
	}

}
