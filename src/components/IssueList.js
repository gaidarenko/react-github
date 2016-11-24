import React, { Component } from 'react';
import { fetchIssues } from '../actions/index';

class IssueList extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, repo } = this.props;
    dispatch(fetchIssues(repo));
  }

  render() {
    const { list } = this.props;

    return (
      <div className="row" style={{marginTop: 30}}>
        <h3>Issues:</h3>
        { list.map(issue => this.renderIssue(issue)) }
      </div>
    );
  }

  renderIssue(issue) {
    return (
      <div key={issue.id}>
        <h4>{issue.title}</h4>
      </div>
    );
  }
}

export default IssueList;