import React, { Component } from "react";
import RegLogForms from "./RegLogForms";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      return { showForm: !prevState.showForm };
    });
  };

  render() {
    return !this.state.showForm ? (
      <div className="col-sm-2 col-sm-push-1">
        <button
          onClick={this.handleClick}
          className="btn btn-secondary"
          style={{
            marginLeft: "293%",
            marginTop: "20%",
            width: "160px",
            backgroundColor: "darkred",
            color: "white",
          }}
        >
          Register and Login
        </button>
      </div>
    ) : (
      <RegLogForms />
    );
  }
}

export default RegisterForm;
