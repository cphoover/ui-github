import React from 'react';
import _ from 'lodash';

export default class CopyTextField extends React.Component {
	constructor(props) {
		super(props);
		this.fieldId = `${this.props.label.replace(/[^A-Za-z]/gm, '-').replace(/-+/gm, '-')}-${_.uniqueId()}`;
	}
	render() {
		return <div className="component-copy-text-field">
					<label htmlFor={this.props.fieldId}>{this.props.label}</label><input id={this.fieldId} type="text" value={this.props.value} readOnly="true" />
				</div>;
	}

}
