import React, { Component } from "react";
import CreateHotel from "./CreateHotel";
import { Table } from "react-bootstrap";
import axios from "axios";

class TableIn extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      property: "",
      min: "",
      max: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios("https://localhost:44360/api/capacity/", {
      method: "POST",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      data: {
        Min: this.state.min,
        Max: this.state.max,
      },
    }).then((object) => {
      this.setState({
        data: object.data,
      });
      this.setState({ isLoading: false });
    });
  };

  componentDidMount() {
    fetch("https://localhost:44360//api/Hotels", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
        this.setState({ isLoading: false });
      });
  }

  handleClick = (event) => {
    axios("https://localhost:44360/api/Hotels/" + event.target.name, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    }).then(() => {
      window.location.reload();
    });
  };

  render() {
    if (!this.isLoading) {
      const rows = this.state.data.map((x) => (
        <tr key={x.Id}>
          <td>{x.Name}</td>
          <td>{x.OpeningYear}</td>
          <td>{x.EmployeesNumber}</td>
          <td>{x.NumberOfRooms}</td>
          <td>{x.HotelChain.Name}</td>
          <td>
            <button
              onClick={this.handleClick}
              className="btn btn-danger"
              name={x.Id}
            >
              Delete
            </button>
          </td>
        </tr>
      ));

      return (
        <div className="container">
          <div className="row">
            <div
              className="form-horizontal"
              style={{ marginTop: "5%", marginLeft: "28%" }}
            >
              <h5
                style={{
                  backgroundColor: "darkred",
                  color: "white",
                  textAlign: "center",
                  marginRight: "10%",
                }}
              >
                Search by number of rooms
              </h5>
              <form
                className="form-inline"
                style={{ marginTop: "4%", marginRight: "5%" }}
              >
                <label
                  style={{
                    marginRight: "10px",
                  }}
                >
                  {" "}
                  <strong> From: </strong>{" "}
                </label>

                <input
                  style={{ marginRight: "10px", width: "30%" }}
                  type="number"
                  placeholder="Enter number"
                  className="form-inline"
                  name="min"
                  value={this.state.min}
                  onChange={this.handleChange}
                />

                <br />

                <label
                  style={{
                    marginRight: "1px",
                  }}
                >
                  {" "}
                  <strong> To: </strong>{" "}
                </label>

                <input
                  style={{
                    marginLeft: "10px",
                    width: "30%",
                    marginRight: "20px",
                  }}
                  type="number"
                  placeholder="Enter number"
                  className="form-inline"
                  name="max"
                  value={this.state.max}
                  onChange={this.handleChange}
                />

                <br />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ backgroundColor: "darkred", color: "white" }}
                  onClick={this.handleSubmit}
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="row">
            <div
              style={{
                textAlign: "center",
                marginTop: "5%",
                marginLeft: "13%",
              }}
            >
              <h3
                style={{
                  backgroundColor: "darkred",
                  color: "white",
                }}
              >
                Hotels
              </h3>

              <Table striped bordered hover variant="dark" size="sm">
                <thead>
                  <tr
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                    }}
                  >
                    <th> Name</th>
                    <th> Opening year</th>
                    <th> Number of employees</th>
                    <th> Number of rooms</th>
                    <th> Hotel chain</th>
                    <th> Option</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </div>

          <div className="row">
            <div
              style={{
                textAlign: "center",
                marginLeft: "32%",
              }}
            >
              {sessionStorage.getItem("token") ? <CreateHotel /> : null}
            </div>
          </div>
        </div>
      );
    } else {
      return <h1> Loading </h1>;
    }
  }
}

export default TableIn;
