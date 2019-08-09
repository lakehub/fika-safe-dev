import React, { Component } from "react";
import Navbar from "../Navbars/SaccoNavbar.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Footer from "../Footers/AdminFooter.jsx";
import Profile from "../Profile.jsx";
import { Container } from "reactstrap";

import AuthHelperMethods from "AuthHelperMethods.js";
//Our higher order component
import withAuth from "withAuth.js";
class RiderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rider: {},
      id: ""
    };
    console.log(this.props);
  }
  // componentWillReceiveProps(newProps) {
  //   console.log(newProps);
  // }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    });
    this.loadData();
  }

  loadData() {
    console.log(this.state.id);
    fetch(`/api/riders/${this.props.match.params.id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(rider => {
            console.log(rider);
            this.setState({ rider });
          });
        } else {
          response.text().then(error => {
            alert(`Failed to fetch  sacco: ${error.message}`);
          });
        }
      })
      .catch(err => {
        alert(`Error in fetching data from server: ${err.message}`);
      });
  }
  // saves the data to the database
  update = data => {
    console.log(this.props.match.params.id);
    fetch(`/api/riders/${this.props.match.params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        data
      })
    })
      .then(response => {
        response.json().then(response => {
          console.log(response);
          this.setState({
            rider: response
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    console.log(this.props);
    return (
      <>
        <Sidebar
          logo={{
            innerLink: "/admin/home",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar />
          <Profile saveData={this.update} rider={this.state.rider} />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default RiderProfile;
