import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert, Container, Label } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  registerUser,
  registerUserFailed,
  apiError,
} from "../../store/actions";

// import images
import logodark from "../../assets/images/smlogo.png";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    props.registerUserFailed("");
    props.apiError("");
    document.body.classList.add("auth-body-bg");

    return () => {
      document.body.classList.remove("auth-body-bg");
    };
  }, [props]);

  const handleSubmit = (event, values) => {
    props.registerUser(values);
  };

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
                          <div style={{ marginTop: "50px" }}>
                            <Link to="#" className="logo">
                              <img src={logodark} height="30" alt="logo" />
                            </Link>
                          </div>

                          <h4 className="font-size-18">Register account</h4>
                          <p className="text-muted">
                            Get your free Vishwakarma Store account now.
                          </p>
                        </div>

                        {props.user && (
                          <Alert color="success">
                            Registration Done Successfully.
                          </Alert>
                        )}

                        {props.registrationError && (
                          <Alert color="danger">
                            {props.registrationError}
                          </Alert>
                        )}

                        <div className="p-2 mt-5">
                          <AvForm
                            onValidSubmit={handleSubmit}
                            className="form-horizontal"
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-mail-line auti-custom-input-icon"></i>
                              <Label htmlFor="useremail">Email</Label>
                              <AvField
                                name="email"
                                value={email}
                                validate={{ email: true, required: true }}
                                type="email"
                                className="form-control"
                                id="useremail"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                              />
                            </div>

                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Username</Label>
                              <AvField
                                name="username"
                                value={username}
                                type="text"
                                className="form-control"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                              />
                            </div>

                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Password</Label>
                              <AvField
                                name="password"
                                value={password}
                                type="password"
                                className="form-control"
                                id="userpassword"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                              />
                            </div>

                            <div className="text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                {props.loading ? "Loading ..." : "Register"}
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                By registering you agree to the Vishwakarma
                                Store{" "}
                                <Link to="#" className="text-primary">
                                  Terms of Use
                                </Link>
                              </p>
                            </div>
                          </AvForm>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                          </p>
                          <p>
                            © 2024 Vishwakarma Store. Created{" "}
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
};

const mapStatetoProps = (state) => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register);
