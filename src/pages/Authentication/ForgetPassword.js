import React, { useState } from "react";
import { Row, Col, Alert, Button, Container, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { forgetUser } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo-dark.png";
import withRouter from "../../components/Common/withRouter";

const ForgetPasswordPage = (props) => {
  const [username, setUsername] = useState("");

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.forgetUser(values, props.history);
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
                          <div>
                            <Link to="/" className="logo">
                              <img src={logodark} height="20" alt="logo" />
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-4">Reset Password</h4>
                          <p className="text-muted">
                            Reset your password to Nazox.
                          </p>
                        </div>

                        <div className="p-2 mt-5">
                          {props.forgetError && (
                            <Alert color="danger" className="mb-4">
                              {props.forgetError}
                            </Alert>
                          )}
                          {props.message && (
                            <Alert color="success" className="mb-4">
                              {props.message}
                            </Alert>
                          )}
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={handleValidSubmit}
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-mail-line auti-custom-input-icon"></i>
                              <Label htmlFor="useremail">Email</Label>
                              <AvField
                                name="useremail"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="email"
                                validate={{ email: true, required: true }}
                                className="form-control"
                                id="useremail"
                                placeholder="Enter email"
                              />
                            </div>

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                {props.loading ? "Loading..." : "Reset"}
                              </Button>
                            </div>
                          </AvForm>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account?{" "}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              Log in
                            </Link>
                          </p>
                          <p>
                            © 2024 Vishwakarma. Created{" "}
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
  const { message, forgetError, loading } = state.Forget;
  return { message, forgetError, loading };
};

export default withRouter(
  connect(mapStatetoProps, { forgetUser })(ForgetPasswordPage)
);
