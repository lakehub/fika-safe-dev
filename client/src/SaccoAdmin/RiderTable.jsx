import React, { Component } from "react";
import { Table } from "reactstrap";
import RiderRow from "./RiderRow.jsx";

export default class AdminTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      sortType: "asc"
    };
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }
  componentWillMount() {
    this.setState({
      data: this.props.data
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }
  // compare methods
  compareBy(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
  compareBy2(key) {
    return function(a, b) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  }

  //  sorting methods
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ data: arrayCopy });
  }

  sortBy2(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy2(key));
    this.setState({ data: arrayCopy });
  }

  render() {
    // const revsort = ()
    // console.log(this.state.data);
    const rows = this.state.data.map(rowData => (
      <RiderRow key={rowData._id} data={rowData} />
    ));
    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">
              <i
                className="ni ni-bold-up"
                onClick={() => this.sortBy("name")}
              />{" "}
              <br />
              <i
                className="ni ni-bold-down"
                onClick={() => this.sortBy2("name")}
              />
              Sacco Name
            </th>
            <th scope="col">
              <i
                className="ni ni-bold-up"
                onClick={() => this.sortBy("created")}
              />{" "}
              <br />
              <i
                className="ni ni-bold-down"
                onClick={() => this.sortBy2("created")}
              />
              Registered Date
            </th>

            <th scope="col">
              <i
                className="ni ni-bold-up"
                onClick={() => this.sortBy("status")}
              />{" "}
              <br />
              <i
                className="ni ni-bold-down"
                onClick={() => this.sortBy2("status")}
              />
              Status
            </th>
            <th scope="col">
              <i
                className="ni ni-bold-up"
                onClick={() => this.sortBy("telephone_number")}
              />{" "}
              <br />
              Contacts
              <i
                className="ni ni-bold-down"
                onClick={() => this.sortBy2("telephone_number")}
              />
            </th>
            <th scope="col">
              <i
                className="ni ni-bold-up"
                onClick={() => this.sortBy("address")}
              />{" "}
              <br />
              <i
                className="ni ni-bold-down"
                onClick={() => this.sortBy2("address")}
              />
              Address
            </th>

            <th />
          </tr>
        </thead>
        {rows}
      </Table>
    );
  }
}
