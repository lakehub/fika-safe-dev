import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { url } from 'domain.js';
import Image from "./ImageUpload.jsx"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
//Our higher order component
import withAuth from 'withAuth.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riderFname: '',
      riderSurName: '',
      riderLname: '',
      riderTelNumber: '',
      riderID: '',
      riderResidence: '',
      // riderPassportPhoto:'',
      riderBase: '',
      drivingLicense: '',
      DLIssueDate: '',
      DLExpDate: '',

      bikeOwnerFname: '',
      bikeOwnerLname: '',
      bikeOwnerResidence: '',
      bikeOwnerID: '',
      bikeOwnerTelNumber: '',

      motorBikeMake: '',
      motorBikeBrand: '',
      insuranceNumber: '',
      insuranceIssueDate: '',
      insuranceExpDate: '',
      numberPlate: '',

      // created,
      status: '',

      ratings: 3,
      sacco: '',
      diabled: true,
      red: true,
      name: 'active',

      // images
      uploading: false,
      imagePreviewUrl: '',
      images: [],
    };
  }

  // lifecycle control
  componentDidMount() {
    this.loadData();
  }

  // fetch data for the specific sacco
  loadData() {
    // axios is so messsy
    fetch(`${url}/api/saccos/email/${this.props.email}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let id = data.map(item => item._id);
        // set the state with the id
        this.setState({
          sacco: id[0],
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handle change
  handleChange = event => {
    const target = event.target;
    const { name, value } = target;
    const formData = new FormData();
    formData.append([name], value);
    event.preventDefault();
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveData(this.state.rider);
  };

  // onDeactivate:
  onDeactivate() {
    this.setState({ red: !this.state.red });
    this.setState({ name: !this.state.name });
  }

  // load Data for a specific sacc
  render() {
    let btn_class = this.state.red ? 'info' : 'danger';
    let btn_name = this.state.name ? 'Active' : 'Deactivated';
    //const { name,id} = this.props;
    console.log(this.props);
    console.log(this.state.sacco);
    const {
      riderFname,
      riderSurName,
      riderLname,
      riderTelNumber,
      riderID,
      riderResidence,
      riderPassportPhoto,
      riderBase,
      drivingLicense,
      DLIssueDate,
      DLExpDate,

      bikeOwnerFname,
      bikeOwnerLname,
      bikeOwnerResidence,
      bikeOwnerID,
      bikeOwnerTelNumber,

      motorBikeMake,
      motorBikeBrand,
      insuranceNumber,
      insuranceIssueDate,
      insuranceExpDate,
      numberPlate,
      uploading,
      images,

      created,
      status,
      _id,
      ratings,
      sacco,
    } = this.state;
    //console.log(id);

    // handle some photo sh*t

    const pic = riderPassportPhoto;
    const imagePreview = (
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '400px',
          backgroundImage: `url(/${pic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      ></div>
    );
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--8" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3" />
                </Row>

                <CardBody
                  style={{ background: '#e4f0f7' }}
                  className="pt-0 pt-md-4"
                >
                  <Image />
                  {/* <div>
                    <div className="buttons">{content()}</div>
                  </div> */}
                  {/* <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{`${ratings} star`}</span>
                          <span className="description">Rider's Rating</span>
                        </div>
                      </div>
                    </div>
                  </Row> */}
                  {/* <div className="text-center">
                    <h3></h3>
                    <h3 style={{ background: '#cee0eb', borderRadius: '10px' }}>
                      {btn_name}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {riderBase}, {riderResidence}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Insurance Number: {insuranceNumber}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Number Plate: {numberPlate}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni education_hat mr-2" />
                      License Number: {drivingLicense}
                    </div>
                    <hr className="my-4" />
                    <p>{`Insurance number  expires in ${moment(
                      insuranceExpDate
                    ).format('MM-DD-YYYY')}`}</p>
                  </div> */}
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  {/* <Link to="/admin/logs">
                    <Button color="success">Logs</Button>
                  </Link> */}
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Details</h3>
                    </Col>

                    <Col className="text-right" xs="4">
                      <Button
                        color={btn_class}
                        href="#pablo"
                        onClick={this.onDeactivate.bind(this)}
                        size="lg"
                      >
                        {btn_name}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Rider Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              First Name:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={riderFname}
                              onChange={this.handleChange}
                              name="riderFname"
                              placeholder="Sacco Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Surname:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={riderSurName}
                              onChange={this.handleChange}
                              name="riderSurName"
                              placeholder="Sacco Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Last Name:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={riderLname}
                              onChange={this.handleChange}
                              name="riderLname"
                              placeholder="Sacco Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Telephone Number:
                            </label>
                            <Input
                              value={riderTelNumber}
                              name="riderTelNumber"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Enter telephone number"
                              type="email"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Passport/ID Number:
                            </label>
                            <Input
                              value={riderID}
                              name="riderID"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Enter ID number"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Driving License:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={drivingLicense}
                              name="drivingLicense"
                              onChange={this.handleChange}
                              placeholder="Enter License number"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Issue Date:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={moment(DLIssueDate).format('MM-DD-YYYY')}
                              name="DLIssueDate"
                              onChange={this.handleChange}
                              placeholder="Issue date"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Exp Date:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={moment(DLExpDate).format('MM-DD-YYYY')}
                              name="DLExpDate"
                              onChange={this.handleChange}
                              placeholder="Exp date"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Area of Residence:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={riderResidence}
                              name="riderResidence"
                              onChange={this.handleChange}
                              placeholder="Area of Residence"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Operating Base:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={riderBase}
                              name="riderBase"
                              onChange={this.handleChange}
                              placeholder="Base"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      MotorBike Owner Details
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              First Name:
                            </label>
                            <Input
                              value={bikeOwnerFname}
                              name="bikeOwnerFname"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Enter first name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Last Name:
                            </label>
                            <Input
                              value={bikeOwnerLname}
                              name="bikeOwnerLname"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Enter last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Phone:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={bikeOwnerTelNumber}
                              name="bikeOwnerTelNumber"
                              onChange={this.handleChange}
                              placeholder="Enter Phone Number"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Passport/ID:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={bikeOwnerID}
                              name="bikeOwnerID"
                              onChange={this.handleChange}
                              placeholder="passport/ID"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Area of Residence:
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={bikeOwnerResidence}
                              name="bikeOwnerResidence"
                              onChange={this.handleChange}
                              placeholder="Enter area of residence"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">
                      MotorBike Details
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Brand:
                            </label>
                            <Input
                              value={motorBikeBrand}
                              name="motorBikeBrand"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="eg Boxer"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Make:
                            </label>
                            <Input
                              value={motorBikeMake}
                              name="motorBikeMake"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="eg BM-100"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Number Plate:
                            </label>
                            <Input
                              value={numberPlate}
                              name="numberPlate"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Enter plate number"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Insurance Number:
                            </label>
                            <Input
                              value={insuranceNumber}
                              name="insuranceNumber"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Enter insurance nunber "
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Issue Date:
                            </label>
                            <Input
                              value={moment(insuranceIssueDate).format(
                                'MM-DD-YYYY'
                              )}
                              name="insuranceIssueDate"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Issue Date"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Exp Date:
                            </label>
                            <Input
                              value={moment(insuranceExpDate).format(
                                'MM-DD-YYYY'
                              )}
                              name="insuranceExpDate"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Exp Date "
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <div className="pl-lg-4">
                      <Button
                        color="info"
                        diabled="true "
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
