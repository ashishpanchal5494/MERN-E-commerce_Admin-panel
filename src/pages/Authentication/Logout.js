import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions";
import withRouter from "../../components/Common/withRouter";

const Logout = (props) => {
  useEffect(() => {
    // Fire Action for Remove all items from local storage and redirect to login page
    setTimeout(() => {
      props.logoutUser(props.router.navigate);
    }, 100);
  }, [props]);

  return (
    <React.Fragment>
      <h1>&nbsp;</h1>
    </React.Fragment>
  );
};

export default withRouter(connect(null, { logoutUser })(Logout));
