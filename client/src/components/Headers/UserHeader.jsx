
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" + require("assets/img/brand/argon-react.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="12" md="12">
                <h1 className="display-2 text-white">{this.props.name}</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
