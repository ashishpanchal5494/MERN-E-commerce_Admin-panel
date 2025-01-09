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
import * as yup from "yup";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../../features/brand/BrandSlice";
import { useFormik } from "formik";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const EcommerceAddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[2];
  console.log(getBrandId);
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfullly!");
      navigate("/ecommerce-brand-list");
      dispatch(resetState());
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    updatedBrand,
    createdBrand,
    dispatch,
    navigate,
  ]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Add Brand", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}

          <Breadcrumbs
            title={getBrandId !== undefined ? "Edit Blog" : "Add Blog"}
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
                              Brand Name
                            </Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="text"
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
                          {getBrandId !== undefined ? "Edit" : "Add"} Brand
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

export default EcommerceAddBrand;
