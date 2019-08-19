import React, { Component } from 'react';
import Navbar from 'components/Navbars/AuthNavbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import Footer from 'components/Footers/AdminFooter.jsx';
import Header from 'components/Headers/Header.jsx';
import SaccoHome from 'components/SaccoHome.jsx';
import { Container } from 'reactstrap';
import { url } from 'domain.js';

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from 'AuthHelperMethods.js';
//Our higher order component
import withAuth from 'withAuth.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1: [],
      sortBy: 'name',
      searchQuery: '',
      space: ' ',
      query: { status: '' },
    };
  }
  // loading the data

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    // axios is so messsy
    fetch(`${url}/api/riders/email/${this.props.match.params.email}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          data: data,
          data1: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log(this.state.data);
    const email = this.props.match.params.email;
    console.log(this.props);
    return (
      <>
        <Sidebar
          email={this.props.match.params.email}
          logo={{
            innerLink: '/sacco/home',
            imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
        />
        <div className="main-content">
          <Navbar />
          <Header data={this.state.data} />
          <SaccoHome
            // data={this.state.data}
            // data1={this.state.data1}
            email={this.props.match.params.email}
          />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default Dashboard;
