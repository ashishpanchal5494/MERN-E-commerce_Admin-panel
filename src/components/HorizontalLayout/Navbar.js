import React, { Component } from "react";
import { Row, Col, Collapse, Container } from "reactstrap";
import { Link } from "react-router-dom";
import classname from "classnames";

// i18n
import { withTranslation } from "react-i18next";

// Redux
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogState: false,
      marketingState: false,
      pagesState: false,
      uiState: false,
    };
  }

  // Function to toggle a specific menu
  toggleMenu = (menu) => {
    this.setState({
      blogState: false,
      marketingState: false,
      pagesState: false,
      uiState: false,
      [menu]: !this.state[menu], // Only toggle the selected menu
    });
  };

  // Function to close all menus
  closeAllMenus = () => {
    this.setState({
      blogState: false,
      marketingState: false,
      pagesState: false,
      uiState: false,
    });
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
                  {/* Dashboard */}
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => this.closeAllMenus()} // Close all menus on Dashboard click
                    >
                      <i className="ri-dashboard-line me-2"></i>{" "}
                      {this.props.t("Dashboard")}
                    </Link>
                  </li>

                  {/* E-commerce */}
                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggleMenu("uiState");
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      role="button"
                    >
                      <i className="ri-pencil-ruler-2-line me-2"></i>
                      {this.props.t("E-commerce")}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname(
                        "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl",
                        { show: this.state.uiState }
                      )}
                    >
                      <Row>
                        <Col lg={4}>
                          <div>
                            <Link
                              to="/ecommerce-products"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Products")}
                            </Link>
                            <Link
                              to="/ecommerce-add-product"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Add Product")}
                            </Link>
                            <Link
                              to="/ecommerce-product-list"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Product List")}
                            </Link>
                            <Link
                              to="/ecommerce-add-brand"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Brand")}
                            </Link>
                            <Link
                              to="/ecommerce-brand-list"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
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
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Category")}
                            </Link>
                            <Link
                              to="/ecommerce-category-list"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Category List")}
                            </Link>
                            <Link
                              to="/ecommerce-add-color"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Color")}
                            </Link>
                            <Link
                              to="/ecommerce-color-list"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Color List")}
                            </Link>
                            <Link
                              to="/ecommerce-orders"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Orders")}
                            </Link>
                            <Link
                              to="/ecommerce-customers"
                              className="dropdown-item"
                              onClick={() => this.toggleMenu("uiState")}
                            >
                              {this.props.t("Customers")}
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>

                  {/* Blogs */}
                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggleMenu("blogState");
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      role="button"
                    >
                      <i className="ri-apps-2-line me-2"></i>
                      {this.props.t("Blogs")}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.blogState,
                      })}
                    >
                      <Link
                        to="/ecommerce-add-blog"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("blogState")}
                      >
                        {this.props.t("Add Blog")}
                      </Link>
                      <Link
                        to="/ecommerce-blog-list"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("blogState")}
                      >
                        {this.props.t("Blog List")}
                      </Link>
                      <Link
                        to="/ecommerce-add-blog-category"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("blogState")}
                      >
                        {this.props.t("Add Blog Category")}
                      </Link>
                      <Link
                        to="/ecommerce-blog-category-list"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("blogState")}
                      >
                        {this.props.t("Blog Cartegory List")}
                      </Link>
                    </div>
                  </li>

                  {/* Marketing */}
                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggleMenu("marketingState");
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      role="button"
                    >
                      <i className="ri-apps-2-line me-2"></i>
                      {this.props.t("Marketing")}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.marketingState,
                      })}
                    >
                      <Link
                        to="/ecommerce-add-coupon"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("marketingState")}
                      >
                        {this.props.t("Add Coupon")}
                      </Link>
                      <Link
                        to="/ecommerce-coupon-list"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("marketingState")}
                      >
                        {this.props.t("Coupon List")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/ecommerce-enquiry"
                      onClick={() => this.closeAllMenus()} // Close all menus on Dashboard click
                    >
                      <i className="ri-dashboard-line me-2"></i>{" "}
                      {this.props.t("Enquiry")}
                    </Link>
                  </li>

                  {/* Pages */}
                  <li className="nav-item dropdown">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        this.toggleMenu("pagesState");
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                      to="/#"
                      role="button"
                    >
                      <i className="ri-file-copy-2-line me-2"></i>
                      {this.props.t("Pages")}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.pagesState,
                      })}
                    >
                      <Link
                        to="/login"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("pagesState")}
                      >
                        {this.props.t("Login")}
                      </Link>
                      <Link
                        to="/register"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("pagesState")}
                      >
                        {this.props.t("Register")}
                      </Link>
                      <Link
                        to="/forgot-password"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("pagesState")}
                      >
                        {this.props.t("Recover Password")}
                      </Link>
                      <Link
                        to="/lock-screen"
                        className="dropdown-item"
                        onClick={() => this.toggleMenu("pagesState")}
                      >
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

export default withRouter(connect(null, {})(withTranslation()(Navbar)));
