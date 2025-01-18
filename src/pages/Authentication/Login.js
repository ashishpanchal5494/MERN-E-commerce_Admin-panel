import React, { useEffect } from "react";
import { Row, Col, Input, Button, Container, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useFormik } from "formik";
import * as Yup from "yup";
import logodark from "../../assets/images/smlogo.png";
import logolight from "../../assets/images/smlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/AuthSlice";

let userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string().required("Password should be required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      window.location.reload();
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading, navigate]);

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
                          <div style={{ marginTop: "20px" }}>
                            <Link to="/" className="">
                              <img
                                src={logodark}
                                alt=""
                                height="40"
                                className="auth-logo logo-dark mx-auto"
                              />
                              <img
                                src={logolight}
                                alt=""
                                height="40"
                                className="auth-logo logo-light mx-auto"
                              />
                            </Link>
                          </div>

                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">
                            Sign in to continue to Vishwakarma Store.
                          </p>
                        </div>
                        {message.message === "Rejected"
                          ? "You are not an Admin"
                          : ""}
                        <div className="p-2 mt-5">
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={formik.handleSubmit}
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Email</Label>
                              <AvField
                                name="username"
                                onChange={formik.handleChange("email")}
                                value={formik.values.email}
                                onBlur={formik.handleBlur("email")}
                                type="text"
                                className="form-control"
                                id="username"
                                validate={{ email: true, required: true }}
                                placeholder="Enter username"
                              />
                            </div>
                            {/* <div className="error">
                              {formik.errors.email && formik.touched.email ? (
                                <div>{formik.errors.email}</div>
                              ) : null}
                            </div> */}

                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="userpassword">Password</Label>
                              <AvField
                                name="password"
                                onChange={formik.handleChange("password")}
                                value={formik.values.password}
                                onBlur={formik.handleBlur("password")}
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Enter password"
                              />
                            </div>
                            {/* <div className="error">
                              {formik.errors.password &&
                              formik.touched.password ? (
                                <div>{formik.errors.password}</div>
                              ) : null}
                            </div> */}

                            <div className="form-check">
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                {isLoading ? "Loging In" : "Log In"}
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1"></i> Forgot
                                your password?
                              </Link>
                            </div>
                          </AvForm>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            Don't have an account ?{" "}
                            <Link
                              to="/register"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Register{" "}
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

export default Login;
