import React, { Component } from "react";
import axios from "axios";

class CreateHotel extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      openingYear: "",
      employeesNumber: "",
      numberOfRooms: "",
      hotelChain: "",
      hotelChains: [],
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleCancel = () => {
    this.setState({
      name: "",
      openingYear: "",
      employeesNumber: "",
      numberOfRooms: "",
      hotelChain: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios("https://localhost:44360/api//Hotels/", {
      method: "POST",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      data: {
        Name: this.state.name,
        OpeningYear: this.state.openingYear,
        EmployeesNumber: this.state.employeesNumber,
        NumberOfRooms: this.state.numberOfRooms,
        HotelChainId: this.state.hotelChain,
      },
    })
      .then(() => alert("Create successful!"))
      .then(() => {
        window.location.reload();
      })

      .catch(() => {
        alert("Create failed! ");
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSelectChange(event) {
    this.setState({ hotelChain: event.target.value });
  }

  componentDidMount() {
    fetch("https://localhost:44360/api/Hotels/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(this.state.hotelChain);

        this.setState({ hotelChains: data });
      });
  }

  render() {
    const options = this.state.hotelChains.map((x) => (
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
            Add hotel
          </h5>

          <div className="form-inline">
            <label className="control-label col-sm-pull-2">
              {" "}
              <strong> Hotel chain: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <select
                style={{
                  width: "160%",
                  marginLeft: "40px",
                }}
                name="hotelChain"
                className="form-control"
                onChange={this.handleSelectChange}
                value={this.state.hotelChain}
              >
                [{options}]
              </select>
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
                style={{ width: "152%", marginLeft: "98px" }}
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
                minLength="3"
                maxLength="75"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Year of opening: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "105%", marginLeft: "118px" }}
                type="number"
                className="form-control"
                name="openingYear"
                value={this.state.openingYear}
                onChange={this.handleChange}
                required
                min="1950"
                max="2021"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong> Number of employees: </strong>{" "}
            </label>
            <div className="col-sm-5">
              <input
                style={{ width: "75%", marginLeft: "159px" }}
                type="number"
                className="form-control"
                name="employeesNumber"
                value={this.state.employeesNumber}
                onChange={this.handleChange}
                required
                min="2"
                max="9999"
              />
            </div>
          </div>

          <br />
          <div className="form-inline">
            <label className="control-label col-sm-pull-4">
              {" "}
              <strong>Number of rooms: </strong>{" "}
            </label>
            <div className="col-sm-6">
              <input
                style={{ width: "75%", marginLeft: "161px" }}
                type="number"
                className="form-control"
                name="numberOfRooms"
                value={this.state.numberOfRooms}
                onChange={this.handleChange}
                required
                min="10"
                max="999"
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
