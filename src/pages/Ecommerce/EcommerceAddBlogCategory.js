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
import {
  createNewblogCat,
  getABlogCat,
  resetState,
  updateABlogCat,
} from "../../features/blogCategory/BlogCategorySlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const EcommerceAddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[2];
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId, dispatch]);
  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Blog Category Added Successfullly!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfullly!");
      navigate("/ecommerce-blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, updatedBlogCategory, createBlogCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Add Blog Category", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={
              getBlogCatId !== undefined
                ? "Edit Blog Category"
                : "Add Blog Category"
            }
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
                              Blog Title
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
                            <div className="error">
                              {formik.touched.title && formik.errors.title}
                            </div>
                          </div>
                        </form>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li>
                        <Link onClick={formik.handleSubmit} to="#">
                          {getBlogCatId !== undefined ? "Edit" : "Add"} Blog
                          Category
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

export default EcommerceAddBlogCategory;
