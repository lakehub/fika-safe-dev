import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import PropTypes from "prop-types";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import { Link } from "react-router-dom";
import AdminRow from "components/AdminRow.jsx";

export default class TableWhite extends React.Component {
  state = {
    query: "",
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    this.setState(
      {
        query: event.target.value
      },
      () => {
        this.filterArray();
      }
    );
  };

  getData = () => {
    fetch(`http://localhost:4000/saccos`)
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData)
        this.setState({
          data: responseData,
          searchString: responseData
        });
      });
  };

  filterArray = () => {
    let searchString = this.state.query;
    let responseData = this.state.data;

    if (searchString.length > 0) {
      // console.log(responseData[i].name);
      responseData = responseData.filter(searchString);
      this.setState({
        responseData
      });
    }
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    const { data, sortQuery, handleSortChange } = this.props;
    console.log(data);
    const Row = data.map((value, index) => {
      return <AdminRow key={value._id} sacco={value} />;
    });
    return (
      <div>
        <Link to="/admin/new">
          <Button style={{ margin: '40px', float: 'right' }} color="success">
            New Sacco
          </Button>
        </Link>
        <br />
        <UncontrolledDropdown style={{ marginTop: "20px" }} group>
          <DropdownToggle caret color="info" data-toggle="dropdown">
            Sort By
          </DropdownToggle>
          <DropdownMenu value={sortQuery} onClick={handleSortChange}>
            <DropdownItem value="name">Sacco Name</DropdownItem>
            <DropdownItem value="created">Date</DropdownItem>
            <DropdownItem value="address">Location</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <MDBCol style={{ float: "right" }} md="4">
          <form className="form-inline mt-4 mb-4">
            <MDBIcon icon="search" />
            <input
              ref={input => (this.search = input)}
              onChange={this.handleSearchInputChange}
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              id="filter"
              placeholder="Search"
              aria-label="Search"
              name="query"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>
            {this.state.filteredData.map(i => (
              <p>{i.name}</p>
            ))}
          </div>
        </MDBCol>

        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Sacco Name</th>
              <th scope="col">Registered Date</th>
              <th scope="col">Status</th>
              <th scope="col">Contacts</th>
              <th scope="col">Location</th>
              <th scope="col" />
            </tr>
          </thead>

          <tbody>{Row}</tbody>
        </Table>
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

TableWhite.propTypes = {
  data: PropTypes.array.isRequired
};
