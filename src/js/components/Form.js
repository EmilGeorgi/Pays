import React, { Component } from "react"
import ReactDOM from "react-dom"
import Axios from "axios";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      foos: ""
    };

    Axios.get(`api/foos`)
      .then(response => {
        const foos = response.data
        this.setState({ foos })
      })
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.foos)}
        <a href="logout">Log ud</a>
      </div>
    );
  }
}

export default Form;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;