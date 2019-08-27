import React, { Component } from "react";
import Navbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Footer from "components/Footers/AdminFooter.jsx";
import Profile from "components/Profile.jsx";
import { Container } from "reactstrap";
import { url } from "domain.js";

//Our higher order component
import withAuth from "withAuth.js";
class SaccoProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sacco: {
        name: "",
        email: "",
        registration_number: "",
        date_founded: "",
        description: "",
        address: "",
        status: "",
        // location: "",
        telephone_number: "",
        postal_code: "",
        website: "",
        password: ""
      },
      resetPassword1: "",
      resetPassword2: "",
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

  // updates the state with the child components data==> this is passed to the child comp
  handleChange = event => {
    // event.preventDefault();
    const sacco = Object.assign({}, this.state.sacco);
    sacco[event.target.name] = event.target.value;

    this.setState({
      sacco
    });
  };

  handleDateChange = date => {
    const sacco = Object.assign({}, this.state.sacco);
    // sacco[event.target.name] = event.target.value;
    sacco.date_founded = date;
    this.setState({
      sacco
    });
  };

  handlePasswordChange = event => {
    event.preventDefault();
    // const state = Object.assign({}, this.state);
    // state[event.target.name] = event.target.value;

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    let updateData = this.state.sacco;
    if (this.state.resetPassword2) {
      updateData.password = this.state.resetPassword2;
    }
    this.update(updateData);
  };

  loadData() {
    console.log(this.state.id);
    fetch(`${url}/api/saccos/${this.props.match.params.id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(sacco => {
            console.log(sacco);
            this.setState({
              sacco: {
                name: sacco.name,
                email: sacco.email,
                registration_number: sacco.registration_number,
                date_founded: sacco.date_founded,
                description: sacco.description,
                address: sacco.address,
                status: sacco.status,
                // location: sacco.location,
                telephone_number: sacco.telephone_number,
                postal_code: sacco.postal_code,
                website: sacco.website,
                password: sacco.password
              }
            });
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
  onChange = event => {
    // let updateData = this.state.sacco;
    // if (this.state.resetPassword2) {
    //   updateData.password = this.state.resetPassword2;
    // }
    event.preventDefault();
    fetch(`${url}/api/saccos/${this.props.match.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.sacco)
    })
      .then(response => {
        response.json().then(response => {
          console.log(response);
          this.setState({
            sacco: response
          });
          window.alert("Update successfull");
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    console.log(this.state.sacco);

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
          <Profile
            state={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.onChange}
            handleDateChange={this.handleDateChange}
            handlePasswordChange={this.handlePasswordChange}
          />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default SaccoProfile;
