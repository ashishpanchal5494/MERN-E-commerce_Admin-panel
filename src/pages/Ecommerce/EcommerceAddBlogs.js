import React, { useEffect, useMemo, useState } from "react";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
} from "reactstrap";
import { toast } from "react-toastify";

import * as yup from "yup";
import Dropzone from "react-dropzone";
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../../features/blog/BlogSlice";
import { getCategories } from "../../features/blogCategory/BlogCategorySlice";
import { useFormik } from "formik";
import { delImg, uploadImg } from "../../features/upload/UploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const EcommerceAddBlog = () => {
  const [activeTab, setActiveTab] = useState(1);
  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Add Blog", link: "#" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const imgState = useSelector((state) => state.upload.images, shallowEqual);
  const bCatState = useSelector(
    (state) => state.blogCategory.bCategories,
    shallowEqual
  );
  const blogState = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,

    createdBlog,
    blogName,
    blogDesc,
    blogCategory,

    updatedBlog,
  } = blogState;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        dispatch(delImg());
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const img = useMemo(() => {
    return imgState.map((i) => ({
      public_id: i.public_id,
      url: i.url,
    }));
  }, [imgState]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogId]);

  useEffect(() => {
    if (img.length > 0 && formik.values.images !== img) {
      formik.setFieldValue("images", img);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
      formik.resetForm();
      dispatch(resetState());
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");
      navigate("/ecommerce-blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    createdBlog,
    updatedBlog,
    dispatch,
    navigate,
    formik,
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={getBlogId !== undefined ? "Edit Blog" : "Add Blog"}
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
                    <Nav className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 1,
                          })}
                          onClick={() => {
                            toggleTab(1);
                          }}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title">Basic Info</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === 2,
                          })}
                          onClick={() => {
                            toggleTab(2);
                          }}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title">Product Img</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      activeTab={activeTab}
                      className="twitter-bs-wizard-tab-content"
                    >
                      <TabPane tabId={1}>
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
                          <div className="row">
                            <div className="mb-3">
                              <Label
                                className="form-label"
                                htmlFor="manufacturerbrand"
                              >
                                Blog Category
                              </Label>
                              <select
                                className="form-control select2"
                                value={formik.values.category}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "category",
                                    e.target.value
                                  )
                                }
                                onBlur={formik.handleBlur("category")}
                              >
                                <option value="">Select Blog Category</option>
                                {bCatState.map((i, j) => (
                                  <option key={j} value={i.title}>
                                    {i.title}
                                  </option>
                                ))}
                              </select>
                              <div className="error">
                                {formik.touched.category &&
                                  formik.errors.category}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label" htmlFor="productdesc">
                              Blog Description
                            </label>
                            <textarea
                              className="form-control"
                              id="productdesc"
                              rows="5"
                              onChange={formik.handleChange("description")}
                              value={formik.values.description}
                            ></textarea>
                            <div className="error">
                              {formik.touched.description &&
                                formik.errors.description}
                            </div>
                          </div>
                        </form>
                      </TabPane>
                      <TabPane tabId={2}>
                        <CardTitle className="h4">Product Images</CardTitle>
                        <p className="card-title-desc">Upload product image</p>
                        <Form className="dropzone">
                          <Dropzone
                            maxSize={1048576} // 1MB
                            maxFiles={5} // Maximum 5 files
                            onDrop={(acceptedFiles) => {
                              if (acceptedFiles.length > 5) {
                                toast.error(
                                  "You can upload a maximum of 5 files."
                                );
                              } else {
                                dispatch(uploadImg(acceptedFiles));
                              }
                            }}
                            accept={{
                              "image/jpeg": [".jpeg", ".jpg"],
                              "image/png": [".png"],
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div>
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="mb-3">
                                    <i className="display-4 text-muted ri-upload-cloud-2-line" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {imgState?.map((f, i) => (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt=""
                                        src={f.url}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to={f.url}
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.url}
                                      </Link>
                                      <button
                                        type="button"
                                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                                        onClick={() =>
                                          dispatch(delImg(i.public_id))
                                        }
                                      >
                                        <i className="mdi mdi-trash-can font-size-18"></i>
                                      </button>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </Form>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTab === 1 ? "previous disabled" : "previous"
                        }
                      >
                        <Link to="#" onClick={() => toggleTab(activeTab - 1)}>
                          Previous
                        </Link>
                      </li>
                      <li className="next">
                        {activeTab === 1 ? (
                          <Link to="#" onClick={() => toggleTab(activeTab + 1)}>
                            Next
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.preventDefault();
                              formik.handleSubmit();
                            }}
                          >
                            Add Blog
                          </button>
                        )}
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

export default EcommerceAddBlog;
