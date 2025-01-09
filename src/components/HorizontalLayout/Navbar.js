import React, { Component } from "react";
import { Row, Col, Collapse, Container } from "reactstrap";
import { Link } from "react-router-dom";
import classname from "classnames";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({});
    }
  }

  componentDidMount() {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.router.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div className="topnav">
          <Container fluid>
            <nav
              className="navbar navbar-light navbar-expand-lg topnav-menu"
              id="navigation"
            >
              <Collapse
                isOpen={this.props.menuOpen}
                className="navbar-collapse"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <i className="ri-dashboard-line me-2"></i>{" "}
                      {this.props.t("Dashboard")}
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ uiState: !this.state.uiState });
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      id="topnav-uielement"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-pencil-ruler-2-line me-2"></i>
                      {this.props.t("E-commerce")}{" "}
                      <div className="arrow-down"></div>
                    </Link>

                    <div
                      className={classname(
                        "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl",
                        { show: this.state.uiState }
                      )}
                      aria-labelledby="topnav-uielement"
                    >
                      <Row>
                        <Col lg={4}>
                          <div>
                            <Link
                              to="/ecommerce-products"
                              className="dropdown-item"
                            >
                              {this.props.t("Products")}
                            </Link>
                            <Link
                              to="/ecommerce-add-product"
                              className="dropdown-item"
                            >
                              {this.props.t("Add Product")}
                            </Link>
                            <Link
                              to="/ecommerce-product-List"
                              className="dropdown-item"
                            >
                              {this.props.t("Product List")}
                            </Link>
                            <Link
                              to="/ecommerce-add-brand"
                              className="dropdown-item"
                            >
                              {this.props.t("Brand")}
                            </Link>
                            <Link
                              to="/ecommerce-brand-list"
                              className="dropdown-item"
                            >
                              {this.props.t("Brand-List")}
                            </Link>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div>
                            <Link
                              to="/ecommerce-add-category"
                              className="dropdown-item"
                            >
                              {this.props.t("Category")}
                            </Link>
                            <Link
                              to="/ecommerce-category-list"
                              className="dropdown-item"
                            >
                              {this.props.t("Category List")}
                            </Link>
                            <Link
                              to="/ecommerce-add-color"
                              className="dropdown-item"
                            >
                              {this.props.t("Color")}
                            </Link>
                            <Link
                              to="/ecommerce-color-list"
                              className="dropdown-item"
                            >
                              {this.props.t("Color List")}
                            </Link>
                            <Link
                              to="/ecommerce-orders"
                              className="dropdown-item"
                            >
                              {this.props.t("Orders")}
                            </Link>
                            <Link
                              to="/ecommerce-customers"
                              className="dropdown-item"
                            >
                              {this.props.t("Customers")}
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ appState: !this.state.appState });
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      id="topnav-apps"
                      role="button"
                    >
                      <i className="ri-apps-2-line me-2"></i>
                      {this.props.t("Blogs")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu dropdown-menu-end", {
                        show: this.state.appState,
                      })}
                      aria-labelledby="topnav-apps"
                    >
                      <Link to="/ecommerce-add-blog" className="dropdown-item">
                        {this.props.t("Add Blog")}
                      </Link>
                      <Link to="/ecommerce-blog-list" className="dropdown-item">
                        {this.props.t("Blog List")}
                      </Link>
                      <Link
                        to="/ecommerce-add-blog-category"
                        className="dropdown-item"
                      >
                        {this.props.t("Add Blog Category")}
                      </Link>
                      <Link
                        to="/ecommerce-blog-category-list"
                        className="dropdown-item"
                      >
                        {this.props.t("Blog Cartegory List")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ appState: !this.state.appState });
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      id="topnav-apps"
                      role="button"
                    >
                      <i className="ri-apps-2-line me-2"></i>
                      {this.props.t("Marketing")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu dropdown-menu-end", {
                        show: this.state.appState,
                      })}
                      aria-labelledby="topnav-apps"
                    >
                      <Link
                        to="/ecommerce-add-coupon"
                        className="dropdown-item"
                      >
                        {this.props.t("Add Coupon")}
                      </Link>
                      <Link
                        to="/ecommerce-coupon-list"
                        className="dropdown-item"
                      >
                        {this.props.t("Coupon List")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/ecommerce-enquiry">
                      <i className="ri-dashboard-line me-2"></i>{" "}
                      {this.props.t("Enquiry")}
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ extraState: !this.state.extraState });
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      id="topnav-more"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-file-copy-2-line me-2"></i>
                      {this.props.t("Pages")} <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu dropdown-menu-end", {
                        show: this.state.appState,
                      })}
                      aria-labelledby="topnav-apps"
                    >
                      <Link to="/login" className="dropdown-item">
                        {this.props.t("Login")}
                      </Link>
                      <Link to="/register" className="dropdown-item">
                        {this.props.t("Register")}
                      </Link>
                      <Link to="/forgot-password" className="dropdown-item">
                        {this.props.t("Recover Password")}
                      </Link>
                      <Link to="/lock-screen" className="dropdown-item">
                        {this.props.t("Lock Screen")}
                      </Link>
                    </div>
                  </li>
                </ul>
              </Collapse>
            </nav>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { leftSideBarType, leftSideBarTheme } = state.Layout;
  return { leftSideBarType, leftSideBarTheme };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
);
