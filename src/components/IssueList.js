import React, { Component } from 'react';
import { fetchIssues } from '../actions/index';
import marked from 'marked';

class IssueList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showIssueId: 0,
    };

    this.changeVisibleIssue = this.changeVisibleIssue.bind(this);
  }

  componentDidMount() {
    const { dispatch, repo } = this.props;
    dispatch(fetchIssues(repo));
  }

  changeVisibleIssue(id) {
    if (this.state.showIssueId === id)
      this.setState({showIssueId: 0});
    else
      this.setState({showIssueId: id});
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
  
  getColor(backgoundColor) {
    let color = "#000";

    const red = parseInt(backgoundColor.substr(0, 2), 16);
    const green = parseInt(backgoundColor.substr(2, 2), 16);
    const blue = parseInt(backgoundColor.substr(4, 2), 16);

    const black = (red - 0) + (green - 0) + (blue - 0);
    const white = (255 - red) + (255 - green) + (255 - blue);

    if (white > black) color = "#FFF";

    return color;
  }

  renderLabel(label) {
    let style = {marginLeft: 7};

   
    if (label.color) {
      style["backgroundColor"] = `#${label.color}`;
      style["color"] = this.getColor(label.color);
    }

    return (
      <span className="label label-success" key={label.id} style={style}>{label.name}</span>
    );
  }

  createMarkdown(markdown) {
    return {__html: marked(markdown)};
  }

  renderIssue(issue) {

    return (
      <div key={issue.id} style={{marginTop: 30}}>
        <h4 style={{display: "inline-block", cursor: "pointer", }} onClick={() => this.changeVisibleIssue(issue.id)}>{issue.title}</h4>

        { issue.labels.map(label => this.renderLabel(label)) }  

        <div style={this.state.showIssueId !== issue.id ? {display: "none"} : {}} dangerouslySetInnerHTML={this.createMarkdown(issue.body)} /> 
      </div>
    );
  }  
}

export default IssueList;