import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class AdressDawaHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  state = { val: '' };


  componentDidMount() {
    fetch("https://dawa.aws.dk/autocomplete?q=")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="autocomplete-wrapper">
        <h3>React Autocomplete Demo</h3>
        {this.state.isLoaded && 
        <Autocomplete
          value={this.state.val}
          items={this.state.items}
          getItemValue={item => item.title}
          renderMenu={item => (
            <div className="dropdown">
              {item}
            </div>
          )}
          renderItem={(item, isHighlighted) =>
            <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
              {item.title}
            </div>
          }
          onChange={(event, val) => this.setState({ val })}
          onSelect={val => this.setState({ val })}
        />
        }
        {this.state.items}
      </div>
    );
  }
}

export default AdressDawaHandler;