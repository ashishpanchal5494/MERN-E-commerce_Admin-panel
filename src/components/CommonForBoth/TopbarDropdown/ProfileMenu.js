// In ProfileMenu.js
import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import AuthService from "../../../features/auth/AuthService"; // Import default AuthService

// users
import avatar2 from "../../../assets/images/users/Photo.png";

const ProfileMenu = (props) => {
  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu((prevState) => !prevState);
  };

  const handleLogout = () => {
    AuthService.logout(); // Call the logout method from AuthService
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to login page after logout
  };

  let username = "Ashish";
  if (localStorage.getItem("user")) {
    const obj = JSON.parse(localStorage.getItem("user"));
    const uNm = obj.email.split("@")[0];
    username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={toggle}
        className="d-inline-block user-dropdown"
      >
        <DropdownToggle
          tag="button"
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
        >
          <img
            className="rounded-circle header-profile-user me-1"
            src={avatar2}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 text-transform">
            {username}
          </span>
          <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem href="#">
            <i className="ri-user-line align-middle me-1"></i>{" "}
            {props.t("Profile")}
          </DropdownItem>
          <DropdownItem className="d-block" href="#">
            <span className="badge badge-success float-end mt-1">11</span>
            <i className="ri-settings-2-line align-middle me-1"></i>{" "}
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger" onClick={handleLogout}>
            <i className="ri-shut-down-line align-middle me-1 text-danger"></i>{" "}
            {props.t("Logout")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default connect(null)(withTranslation()(ProfileMenu));
