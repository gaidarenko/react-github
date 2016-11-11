import React, { Component } from 'react';
import { fetchUserData, changeUserName } from '../actions/index';
import {Button} from 'react-bootstrap'

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { dispatch } = this.props;
    
    if (e) {
      e.preventDefault();
    }

    dispatch(fetchUserData());
  }

  render() {
  	const { name, dispatch } = this.props;

    return (
      <div className="row">
        <div className="col-sm-4 text-left" style={{marginTop: 20}}>
          <input type="text"
            value={name}
            style={{marginRight: 10}}
            onChange={ (event) => { dispatch(changeUserName(event.target.value)) } }
            onKeyPress={ (target) => { if (target.charCode === 13) this.handleClick(); }}
          />
          <Button bsStyle="primary" onClick={this.handleClick} >Search</Button>
        </div>
      </div>
    );
  }
}

export default Search;