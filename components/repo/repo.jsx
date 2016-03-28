import React from 'react';
import CopyTextField from '../copy_text_field/copy_text_field.jsx';

export default class Repo extends React.Component {
	constructor(props) {
		super(props);
	}
	getCloseRate() {
		const closed = parseInt(this.props.closedIssues, 10);
		const opened = parseInt(this.props.openIssues, 10);
		return Math.floor(
			(closed / (opened + closed)) * 100
		);
	}
	render() {
		return <div className="component-repo">
					<h2>{this.props.name}</h2>
					<p>{this.props.description}</p>
					<p><span className="stat">Last commit {this.props.lastCommit} </span></p>
					<p><span className="stat">Stars: {this.props.stars}</span>&nbsp;<span className="stat">Forks: {this.props.forks}</span></p>
					<p><span className="stat">Open Issues: {this.props.openIssues}</span>&nbsp;<span className="stat">Closed Issues: {this.props.closedIssues}</span> = <strong>{this.getCloseRate()}%</strong> Close Rate</p>
					<CopyTextField label="url:" value={this.props.url} />
				</div>;
	}

}
