import React, { Component } from "react";
import {
  Row,
  Col,
  Alert,
  Button,
  Container,
  FormGroup,
  Label,
} from "reactstrap";

import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// import images
import logodark from "../../assets/images/smlogo.png";
import logolight from "../../assets/images/smlogo.png";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <Container fluid className="p-0">
            <Row className="g-0">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img
                                  src={logodark}
                                  height="40"
                                  alt="logo"
                                  className="logo-dark-element"
                                />
                                <img
                                  src={logolight}
                                  height="40"
                                  alt="logo"
                                  className="logo-light-element"
                                />
                              </Link>
                            </div>
                            <h4 className="font-size-18 mt-4">
                              Reset Password
                            </h4>
                            <p className="text-muted">
                              Reset your password to Vishwakarma Store.
                            </p>
                          </div>

                          <div className="p-2 mt-5">
                            <Alert color="success" className="mb-4">
                              Enter your Email and instructions will be sent to
                              you!
                            </Alert>

                            <AvForm className="form-horizontal">
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                <Label for="useremail">Email</Label>
                                <AvField
                                  name="username"
                                  type="email"
                                  className="form-control"
                                  id="useremail"
                                  placeholder="Enter email"
                                />
                              </FormGroup>

                              <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  {this.props.loading ? "Loading..." : "Reset"}
                                </Button>
                              </div>
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            <p>
                              Don't have an account ?{" "}
                              <Link
                                to="/auth-login"
                                className="fw-medium text-primary"
                              >
                                {" "}
                                Log in{" "}
                              </Link>{" "}
                            </p>
                            <p>
                              © 2025 Vishwakarma Store. Crafted with{" "}
                              <i className="mdi mdi-heart text-danger"></i> by
                              Ashish Panchal
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default ForgetPasswordPage;
