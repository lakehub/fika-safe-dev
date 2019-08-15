import React, { Component } from "react";
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

export default class RiderRow extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const sacco = data;
    // console.log(sacco.status);
    this.state = {
      status: sacco.status
    };
  }

  // onclik handler functions
  onEditSacco = ({
    event: {
      target: { name, value }
    }
  }) => {
    Redirect(`admin/sacco-profile/`);
  };

  render() {
    const { status } = this.state;
    const { data } = this.props;
    const rider = data;
    console.log(rider);

    return (
      <>
        <tbody className="thead-dark">
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <Media>
                  <a href="/admin/sacco-profile">
                    <span style={{ color: "#5dd143" }} className="mb-0 text-sm">
                      {`${rider.riderFname} ${rider.riderSurName} ${rider.riderLname}`}
                    </span>
                  </a>
                </Media>
              </Media>
            </th>
            <th style={{ color: "white" }}>{rider.created.substr(0, 10)}</th>
            <th>
              {status === "Active" ? (
                <Badge color="white" className="badge-dot mr-4">
                  <i className="bg-success" />
                  Active
                </Badge>
              ) : (
                <Badge color="white" className="badge-dot mr-4">
                  <i className="bg-warning" />
                  Deactivated
                </Badge>
              )}
            </th>
            <th>
              <span style={{ color: "white" }} className="mb-0 text-sm">
                {rider.riderTelNumber}
              </span>
            </th>
            <th>
              <div className="d-flex align-items-center">
                <span style={{ color: "white" }} className="mb-0 text-sm">
                  {rider.riderID}
                </span>
              </div>
            </th>
            <th className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  // href={{ pathname: `sacco/rider-profile/${rider._id}` }}
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem onClick={e => e.preventDefault()}>
                    <Link to={{ pathname: `rider-profile/${rider._id}` }}>
                      Edit
                    </Link>
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    Deactivate
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </th>
          </tr>
        </tbody>
      </>
    );
  }
}
