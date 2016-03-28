import React from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 2};
	}

	handleChange(event, index, value) {
		console.log('value', value)
		this.setState({value});
	}

	render() {
		return <div className="component-search-bar">
		<TextField hintText="Hit enter when done." floatingLabelText="Search for Repositories" />
		<div className="sort">
			<SelectField value={this.state.value} onChange={this.handleChange}>
				 <MenuItem value={1} primaryText="Stars"/>
				 <MenuItem value={2} primaryText="Forks"/>
				 <MenuItem value={3} primaryText="Last Commit (Most Recent)"/>
				 <MenuItem value={4} primaryText="Last Commit (Least Recent)"/>
				 <MenuItem value={5} primaryText="Open Issues"/>
				 <MenuItem value={6} primaryText="Closed Issues"/>
				 <MenuItem value={7} primaryText="Closed Rate (i.e closed issues/total issues)"/>
			</SelectField>
		</div>
		</div>;
	}

}
