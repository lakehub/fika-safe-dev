* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
=======
import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  NavbarBrand,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from 'reactstrap';

import AuthNavbar from 'components/Navbars/AuthNavbar.jsx';
import AuthFooter from 'components/Footers/AuthFooter.jsx';

class Login extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  // handler functions
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  // this invokes the fetch api
  onSubmit = event => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/admin/index');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };
  render() {
    return (
      <>
        {/* this is the container */}
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-success py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7" />
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <div className="container div1" style={{ size: '50px' }}>
                        <NavbarBrand>
                          <img
                            alt="..."
                            src={require('assets/img/brand/fikas.png')}
                          />
                        </NavbarBrand>
                      </div>

                      <strong>Sign In </strong>
                    </div>
                    <Form role="form" onSubmit={this.onSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username} // in sync state
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password} //
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        {/* <Link to="/"> */}
                        <Button
                          className="my-4"
                          color="primary"
                          type="submit"
                          value="Submit"
                        >
                          Sign in
                        </Button>
                        {/* </Link> */}
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#/reset_password"
                      // onClick={e => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Login;
