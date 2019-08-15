import React from "react";
import Picker from "./DatePicker.jsx";
import { MDBCol, MDBIcon } from "mdbreact";
import queryString from "query-string";
import { withRouter } from "react-router";
import {url} from 'domain.js'

import AdminTable from "./AdminTable.jsx";

import {
  Button,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { Link } from "react-router-dom";

class TableWhite extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1: [],
      sortBy: "name",
      searchQuery: "",
      space: " ",
      query: { status: "" }
    };
  }
  // loading the data

  componentDidMount() {
    this.loadData();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     this.loadData();
  //   }
  // }

  setFilter(query) {
    // very important to stringify the data
    const { history, location } = this.props;
    const dataQuery = queryString.stringify(query);
    console.log(dataQuery);
    history.push(`${location.pathname}?${dataQuery}`);
  }

  // sorting handler function
  handleSortChange(event) {
    this.setState({
      sortBy: event.target.value
    });
  }
  handleSearchChange = event => {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.value
    });
    // this.loadData();
    this.search(event.target.value);
    // console.log(this.state.searchQuery);
  };

  // handles tchages in the status inputs
  onChangeStatus = ({ target: { value } }) => {
    this.setState({
      query: { status: value }
    });
    console.log(this.state.query.status);
  };

  // get data from the db and loads it to state
  loadData() {
    // axios is so messsy
    fetch(`${url}/api/saccos`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          data: data,
          data1: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handle any change in the search
  search = searchQuery => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (searchQuery.length > 0) {
      // this.loadData();
      currentList = this.state.data1;
      // Assign the original list to currentList
      // currentList = this.state.data;
      const filter = searchQuery.trim();

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      for (var i = 0; i < currentList.length; i++) {
        for (let keys in currentList[i]) {
          if (
            currentList[i][keys].toString().indexOf(filter) !== -1 &&
            !newList.includes(currentList[i])
          ) {
            newList.push(currentList[i]);
          }
        }
      }

      // Set the filtered state based on what our rules added to newList
      if (newList !== []) {
        this.setState({
          data: newList
        });
      }
    } else if (searchQuery.length < 1 && searchQuery === "") {
      this.setState({
        data: currentList
      });
    } else {
      this.setState({
        data: currentList
      });
    }
    // console.log(newList);
  };

  render() {
    console.log(this.state.searchQuery);
    const { data } = this.state;
    const { status } = this.state.query;
    console.log(this.props);
    return (
      <div>
        <Link to="/admin/new-sacco">
          <Button style={{ margin: "40px", float: "right" }} color="success">
            New Sacco
          </Button>
        </Link>
        <br />
        <UncontrolledDropdown style={{ marginTop: "20px" }} group>
          <DropdownToggle caret color="info" data-toggle="dropdown">
            Status
          </DropdownToggle>
          <DropdownMenu value={status} onChange={this.onChangeStatus}>
            <DropdownItem value="Active">Active</DropdownItem>
            <DropdownItem value="Deactivated">Deactivated</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <MDBCol style={{ float: "right" }} md="4">
          <form className="form-inline mt-4 mb-4">
            <MDBIcon icon="search" />
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              name="searchQuery"
              onChange={this.handleSearchChange}
              value={`${this.state.space}${this.state.searchQuery}`}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </MDBCol>
        <div style={{ marginLeft: "130px", marginTop: "-43px" }}>
          <Picker />
        </div>
        {/* <UncontrolledDropdown style={{ marginTop: "-120px" }} group>
          <DropdownToggle caret color="info" data-toggle="dropdown">
            Status
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Active</DropdownItem>
            <DropdownItem>Inactive</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <AdminTable data={data} />
        <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              <PaginationItem className="disabled">
                <PaginationLink
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="active">
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  2 <span className="sr-only">(current)</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter>
      </div>
    );
  }
}
export default withRouter(TableWhite);
