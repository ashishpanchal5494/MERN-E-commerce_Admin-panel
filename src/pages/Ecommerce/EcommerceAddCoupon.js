import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../../features/coupon/CouponSlice";
import { useFormik } from "formik";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const EcommerceAddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[2];
  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon;
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/ecommerce-coupon-list");
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    updatedCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    navigate,
  ]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Add Coupon", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={getCouponId !== undefined ? "Edit Coupon" : "Add Coupon"}
            breadcrumbItems={breadcrumbItems}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div
                    id="addproduct-nav-pills-wizard"
                    className="twitter-bs-wizard"
                  >
                    <TabContent className="twitter-bs-wizard-tab-content">
                      <TabPane>
                        <CardTitle className="h5">Basic Information</CardTitle>
                        <p className="card-title-desc">
                          Fill all information below
                        </p>
                        <form>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="productname">
                              Enter Coupon Name
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="text"
                              className="form-control"
                              onChange={formik.handleChange("name")}
                              onBlur={formik.handleBlur("name")}
                              value={formik.values.name}
                            />
                            <div className="error">
                              {formik.touched.name && formik.errors.name}
                            </div>
                          </div>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="productname">
                              Enter Expiry Date
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="date"
                              className="form-control"
                              onChange={formik.handleChange("expiry")}
                              onBlur={formik.handleBlur("expiry")}
                              value={formik.values.expiry}
                            />
                            <div className="error">
                              {formik.touched.expiry && formik.errors.expiry}
                            </div>
                          </div>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="productname">
                              Enter Discount
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="text"
                              className="form-control"
                              onChange={formik.handleChange("discount")}
                              onBlur={formik.handleBlur("discount")}
                              value={formik.values.discount}
                            />
                            <div className="error">
                              {formik.touched.discount &&
                                formik.errors.discount}
                            </div>
                          </div>
                        </form>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li>
                        <Link onClick={formik.handleSubmit} to="#">
                          {getCouponId !== undefined ? "Edit" : "Add"} Coupon
                        </Link>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceAddCoupon;
