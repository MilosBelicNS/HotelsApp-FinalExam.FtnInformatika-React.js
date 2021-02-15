import React, { Component } from "react";
import axios from "axios";

class CreateHotel extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      role: "",
      birth: "",
      employmentYear: "",
      salary: "",
      team: "",
      teams: [], //deklaracija selekta, dropdown
      // errors: []
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleCancel = () => {
    this.setState({
      name: "",
      role: "",
      birth: "",
      employmentYear: "",
      salary: "",
      team: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios("https://localhost:44311/api//Employee/", {
      method: "POST",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      data: {
        TeamId: this.state.team,
        Role: this.state.role,
        Name: this.state.name,
        Birth: this.state.birth,
        EmploymentYear: this.state.employmentYear,
        Salary: this.state.salary,
      },
    })
      .then(() => alert("Added successful!"))
      .then(() => {
        window.location.reload();
      })

      .catch(() => {
        alert("Adding failed! ");
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }; //setuj vrednost za input u formi

  handleSelectChange(event) {
    this.setState({ team: event.target.value });
  } //setuj vrednost za dropdown

  componentDidMount() {
    fetch("https://localhost:44311/api/Teams/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(this.state.team);

        this.setState({ teams: data });
      });
  } //dobavljanje timova za selekt

  render() {
    const options = this.state.teams.map((x) => (
      <option value={x.Id} key={x.Id} className="form-control">
        {" "}
        {x.Name}{" "}
      </option>
    ));

    return (
      <div>
        <form className="form-group" style={{ marginTop: "50px" }}>
          <h5
            style={{
              backgroundColor: "darkred",
              color: "white",
              textAlign: "center",
            }}
          >
            Add employee
          </h5>

          <div className="form-inline">
            <label className="control-label col-sm-pull-2">
              {" "}
              <strong> Team: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <select
                style={{ width: "170%", marginLeft: "40px" }}
                name="team"
                className="form-control"
                onChange={this.handleSelectChange}
                value={this.state.team}
              >
                [{options}]
              </select>
            </div>
          </div>
          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Role: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "140%", marginLeft: "95px" }}
                type="text"
                className="form-control"
                name="role"
                value={this.state.role}
                onChange={this.handleChange}
                required
                minLength="3"
                maxLength="30"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Name: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "140%", marginLeft: "84px" }}
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
                minLength="3"
                maxLength="60"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Birth: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "75%", marginLeft: "185px" }}
                type="number"
                className="form-control"
                name="birth"
                value={this.state.birth}
                onChange={this.handleChange}
                required
                min="1960"
                max="1998"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Employment year: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "75%", marginLeft: "91px" }}
                type="number"
                className="form-control"
                name="employmentYear"
                value={this.state.employmentYear}
                onChange={this.handleChange}
                required
                min="2001"
                max="2020"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Salary: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "75%", marginLeft: "178px" }}
                type="number"
                className="form-control"
                name="salary"
                value={this.state.salary}
                onChange={this.handleChange}
                required
                min="2001"
                max="2020"
                step="0.1"
              />
            </div>
          </div>

          <br />
          <div className="form-group">
            <button
              onClick={this.handleSubmit}
              className="btn btn-secondary"
              style={{
                marginRight: "195px",
                backgroundColor: "darkred",
                color: "white",
              }}
            >
              {" "}
              Add{" "}
            </button>
            <button onClick={this.handleCancel} className="btn btn-secondary">
              {" "}
              Reset{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateHotel;
