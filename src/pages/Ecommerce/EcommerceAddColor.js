import React, { useEffect } from "react";
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
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../../features/color/ColorSlice";
import { useFormik } from "formik";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const EcommerceAddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[2];
  console.log(getColorId);
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId, dispatch]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      navigate("/ecommerce-color-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, navigate, updatedColor]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Add Color", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={getColorId !== undefined ? "Edit Color" : "Add Color"}
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
                              Select Color
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="color"
                              className="form-control"
                              onChange={formik.handleChange("title")}
                              onBlur={formik.handleBlur("title")}
                              value={formik.values.title}
                            />
                          </div>
                          <div className="error">
                            {formik.touched.title && formik.errors.title}
                          </div>
                        </form>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li>
                        <Link onClick={formik.handleSubmit} to="#">
                          {" "}
                          {getColorId !== undefined ? "Edit" : "Add"} Color
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

export default EcommerceAddColor;
