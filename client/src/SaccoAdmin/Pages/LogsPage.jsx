import React, { Component } from "react";
import Navbar from "../Navbars/SaccoNavbar.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Footer from "../Footers/AdminFooter.jsx";
import Logs from "./Logs.jsx";
import { Container } from "reactstrap";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Sidebar
          logo={{
            innerLink: "/sacco/home",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar />
          <Logs />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
