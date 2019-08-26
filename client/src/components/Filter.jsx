import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryStrings from "query-string";
import { Dropdown, SplitButton, FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { withRouter } from "react-router-dom";
class Filter extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    let parsed_data = queryStrings.parse(this.props.initFilter.search);
    this.state = {
      status: "",
      dateGte: "",
      dateLte: "",
      changed: false
    };

    console.log(this.props.initFilter); // this is a function that initiates a filter

    console.log(parsed_data);
  }

  onChangeStatus = e => {
    e.preventDefault();
    this.setState({
      status: e.target.value,
      changed: true
    });
  };

  onChangeDateGte = e => {
    e.preventDefault();
    let range = e.target.value;
    //lower date validation
    if (range.match(/^\d*$/gm)) {
      this.setState({
        dateGte: range,
        changed: true
      });
    }
  };

  onChangeDateLte = e => {
    e.preventDefault();
    let range = e.target.value;
    // upper date validation
    if (range.match(/^\d*$/gm)) {
      this.setState({
        dateLte: range,
        changed: true
      });
    }
  };
  clearFilter = () => {
    this.props.setFilter({});
  };
  applyFilter = () => {
    let filter = {};
    if (this.state.status) filter.status = this.state.status;
    if (this.state.dateGte) filter.dateGte = this.state.dateGte;
    if (this.state.dateLte) filter.dateLte = this.state.dateLte;
    this.props.setFilter(filter);
  };

  // reset the filter their initial state
  resetFilter = () => {
    this.setState({
      status: this.props.status || "",
      dateGte: this.props.dateGte || "",
      dateLte: this.props.dateLte || "",
      changed: false
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props)
      this.setState({
        status: nextProps.status || "",
        dateGte: this.props.dateGte || "",
        dateLte: this.props.dateLte || "",
        changed: false
      });
  }

  render() {
    console.log(this.state.status);
    return (
      <div>
        {/* <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Status
          </Dropdown.Toggle>

          <Dropdown.Menu
            value={this.state.status}
            onClick={this.onChangeStatus}
          >
            <Dropdown.Item value="">Any</Dropdown.Item>
            <Dropdown.Item value="Active">Active</Dropdown.Item>
            <Dropdown.Item value="Deactivated">Deactivated</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="Active">New</option>
          <option value="Deactivated">Open</option>
        </select>
        &nbsp;Date between:
        <input
          size={15}
          value={this.state.dateGte}
          onChange={this.onChangeDateGte}
        />
        &nbsp;-&nbsp;
        <input
          size={15}
          value={this.state.dateLte}
          onChange={this.onChangeDateLte}
        />
        <button onClick={this.applyFilter}>Apply</button>
        <button onClick={this.resetFilter} disabled={!this.state.changed}>
          Reset
        </button>
        <button onClick={this.clearFilter}>Clear</button>
      </div>
    );
  }
}
// prop validations
Filter.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default withRouter(Filter);
