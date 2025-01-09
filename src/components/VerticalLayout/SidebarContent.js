import React, { Component } from "react";
import { FaClipboardList } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";

// MetisMenu
import MetisMenu from "metismenujs";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";
import withRouter from "../Common/withRouter";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.router.location.pathname,
    };
  }

  componentDidMount() {
    this.initMenu();
  }

  UNSAFE_componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
    if (
      this.props.router.location.pathname !== prevProps.router.location.pathname
    ) {
      this.setState({ pathName: this.props.router.location.pathname }, () => {
        this.initMenu();
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");
    const { pathName } = this.state;

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
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
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end">
                  3
                </span>
                <span className="ms-1">{this.props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ms-1">{this.props.t("Products")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ecommerce-products">
                    {this.props.t("Products")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-product">
                    {this.props.t("Add Product")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-product-List">
                    {this.props.t("Product List")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-brand">{this.props.t("Brand")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-brand-list">
                    {this.props.t("Brand-List")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-category">
                    {this.props.t("Category")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-category-list">
                    {this.props.t("Category List")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-color">{this.props.t("Color")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-color-list">
                    {this.props.t("Color List")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-orders">{this.props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="/ecommerce-customers">
                    {this.props.t("Customers")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <FaBloggerB className="fs-5" />
                <span className="ms-2">{this.props.t("Blogs")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ecommerce-add-blog">
                    {this.props.t("Add Blog")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-blog-list">
                    {this.props.t("Blog List")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-add-blog-category">
                    {this.props.t("Add Blog Category")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-blog-category-list">
                    {this.props.t("Blog Cartegory List")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <SiMarketo className="fs-5" />
                <span className="ms-2">{this.props.t("Marketing")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ecommerce-add-coupon">
                    {this.props.t("Add Coupon")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-coupon-list">
                    {this.props.t("Coupon List")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/ecommerce-enquiry" className=" waves-effect">
                <FaClipboardList className="fs-5" />
                <span className="ms-2">{this.props.t("Enquiry")}</span>
              </Link>
            </li>

            <li className="menu-title">{this.props.t("Pages")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-account-circle-line"></i>
                <span className="ms-1">{this.props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/login">{this.props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/register">{this.props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/forgot-password">
                    {this.props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/lock-screen">{this.props.t("Lock Screen")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withTranslation()(SidebarContent))
);
