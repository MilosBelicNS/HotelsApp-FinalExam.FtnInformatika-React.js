import React, { Component } from "react";
import { Table } from "react-bootstrap";

//import axios from "axios"

class TableOut extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
    };
  }

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

  render() {
    if (!this.isLoading) {
      const rows = this.state.data.map((x) => (
        <tr key={x.Id}>
          <td>{x.Name}</td>
          <td>{x.OpeningYear}</td>
          <td>{x.EmployeesNumber}</td>
          <td>{x.NumberOfRooms}</td>
          <td>{x.HotelChain.Name}</td>{" "}
        </tr>
      ));

      return (
        <div>
          <br />
          <br />
          <div className="row">
            <div style={{ textAlign: "center", marginLeft: "23%" }}>
              <Table striped bordered hover variant="dark">
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
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1> Loading</h1>;
    }
  }
}

export default TableOut;
