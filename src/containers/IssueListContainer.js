import React, { Component } from 'react';
import { connect } from 'react-redux';
import IssueList from '../components/IssueList';

class IssueListContainer extends Component {
	render() {
		return <IssueList {...this.props} />;
	}
}

function mapStateToProps(state) {
  const { issues } = state;
  const { list } = issues;

  return {
  	list,
  }
}

export default connect(mapStateToProps)(IssueListContainer);