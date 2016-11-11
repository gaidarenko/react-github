import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
	render() {
		return <Profile {...this.props} />;
	}
}

function mapStateToProps(state) {
  const { profile } = state;
  return profile;
}

export default connect(mapStateToProps)(ProfileContainer);