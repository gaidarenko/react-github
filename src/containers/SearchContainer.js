import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';

class SearchContainer extends Component {
	render() {
		return <Search {...this.props} />;
	}
}

function mapStateToProps(state) {
  const { user } = state;
  const { name } = user;

  return {
  	name,
  };
}

export default connect(mapStateToProps)(SearchContainer);