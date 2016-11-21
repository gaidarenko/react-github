import React, { Component } from 'react';
import { connect } from 'react-redux';
import RepoList from '../components/RepoList';

class RepoListContainer extends Component {
	render() {
		return <RepoList {...this.props} />;
	}
}

function mapStateToProps(state) {
  const { repositories } = state;
  const { repos, activePage, sortBy } = repositories;

  return {
  	repos,
  	activePage,
  	sortBy,
  };
}

export default connect(mapStateToProps)(RepoListContainer);