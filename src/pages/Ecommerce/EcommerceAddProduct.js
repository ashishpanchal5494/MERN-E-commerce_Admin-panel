import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/BrandSlice";
import { getCategories } from "../../features/productCategory/ProductCategorySlice";
import { getColors } from "../../features/color/ColorSlice";
import { delImg, uploadImg } from "../../features/upload/UploadSlice";
import {
  createProducts,
  resetState,
} from "../../features/product/ProductSlice";
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Validation schema for the form
const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const EcommerceAddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.productCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

  // Mapping colors for the select component
  const colorOptions = colorState.map((i) => ({
    label: i.title,
    value: i._id,
  }));

  // Mapping images
  const img = imgState.map((i) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: [],
      quantity: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  useEffect(() => {
    const selectedColors = color.map((c) => c.value);
    // Update color field only if the values have changed
    if (
      JSON.stringify(formik.values.color) !== JSON.stringify(selectedColors)
    ) {
      formik.setFieldValue("color", selectedColors);
    }

    // Update images field only if the values have changed
    if (JSON.stringify(formik.values.images) !== JSON.stringify(img)) {
      formik.setFieldValue("images", img);
    }
  }, [color, img, formik.values.color, formik.values.images, formik]);

  const handleColors = (selectedOptions) => {
    setColor(selectedOptions);
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Add Product", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Add Product" breadcrumbItems={breadcrumbItems} />

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
                        {/* 
                        <form onSubmit={formik.handleSubmit}>
                          <div className="form-floating mb-3 mt-3">
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              placeholder=""
                              onChange={formik.handleChange("title")}
                              onBlur={formik.handleBlur("title")}
                              value={formik.values.title}
                            />
                            <label htmlFor="floatingPassword">
                              Enter Product Title
                            </label>
                          </div>
                          <div className="error">
                            {formik.touched.title && formik.errors.title}
                          </div>
                        
                          <textarea
                            className="form-control"
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                            rows="5"
                          ></textarea>
                          <div className="error">
                            {formik.touched.description &&
                              formik.errors.description}
                          </div>
                          <div className="form-floating mb-3 mt-3">
                            <input
                              type="number"
                              className="form-control"
                              id="number"
                              name="number"
                              placeholder=""
                              onChange={formik.handleChange("price")}
                              onBlur={formik.handleBlur("price")}
                              value={formik.values.price}
                            />
                            <label htmlFor="floatingPassword">
                              Enter Product Price
                            </label>
                          </div>
                          <div className="error">
                            {formik.touched.price && formik.errors.price}
                          </div>
                          <select
                            name="brand"
                            onChange={formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                            value={formik.values.brand}
                            className="form-control py-3 mb-3"
                            id=""
                          >
                            <option value="">Select Brand</option>
                            {brandState.map((i, j) => {
                              return (
                                <option key={j} value={i.title}>
                                  {i.title}
                                </option>
                              );
                            })}
                          </select>
                          <div className="error">
                            {formik.touched.brand && formik.errors.brand}
                          </div>
                          <select
                            name="category"
                            onChange={formik.handleChange("category")}
                            onBlur={formik.handleBlur("category")}
                            value={formik.values.category}
                            className="form-control py-3 mb-3"
                            id=""
                          >
                            <option value="">Select Category</option>
                            {catState.map((i, j) => {
                              return (
                                <option key={j} value={i.title}>
                                  {i.title}
                                </option>
                              );
                            })}
                          </select>
                          <div className="error">
                            {formik.touched.category && formik.errors.category}
                          </div>
                          <select
                            name="tags"
                            onChange={formik.handleChange("tags")}
                            onBlur={formik.handleBlur("tags")}
                            value={formik.values.tags}
                            className="form-control py-3 mb-3"
                            id=""
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            <option value="featured">Featured</option>
                            <option value="popular">Popular</option>
                            <option value="special">Special</option>
                          </select>
                          <div className="error">
                            {formik.touched.tags && formik.errors.tags}
                          </div>

                          <Select
                            isMulti
                            name="color"
                            options={colorOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleColors}
                            value={color}
                          />
                          <div className="error">
                            {formik.touched.color && formik.errors.color}
                          </div>
                          <div className="form-floating mb-3 mt-3">
                            <input
                              type="number"
                              className="form-control"
                              id="quantity"
                              name="quantity"
                              placeholder=""
                              onChange={formik.handleChange("quantity")}
                              onBlur={formik.handleBlur("quantity")}
                              value={formik.values.quantity}
                            />
                            <label htmlFor="floatingPassword">
                              Enter Product Quantity
                            </label>
                          </div>
                          <div className="error">
                            {formik.touched.quantity && formik.errors.quantity}
                          </div>
                          <div className="bg-white border-1 p-5 text-center">
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                dispatch(uploadImg(acceptedFiles))
                              }
                            >
                              {({ getRootProps, getInputProps }) => (
                                <section>
                                  <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>
                                      Drag 'n' drop some files here, or click to
                                      select files
                                    </p>
                                  </div>
                                </section>
                              )}
                            </Dropzone>
                          </div>
                          <div className="showimages d-flex flex-wrap gap-3">
                            {imgState?.map((i, j) => {
                              return (
                                <div className=" position-relative" key={j}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      dispatch(delImg(i.public_id))
                                    }
                                    className="btn-close position-absolute"
                                    style={{ top: "10px", right: "10px" }}
                                  ></button>
                                  <img
                                    src={i.url}
                                    alt=""
                                    width={200}
                                    height={200}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <button
                            className="btn btn-success border-0 rounded-3 my-5"
                            type="submit"
                          >
                            Add Product
                          </button>
                        </form> */}

                        <form onSubmit={formik.handleSubmit}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="productname">
                              Product Title
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              placeholder=""
                              onChange={formik.handleChange("title")}
                              onBlur={formik.handleBlur("title")}
                              value={formik.values.title}
                            />
                          </div>
                          <div className="error">
                            {formik.touched.title && formik.errors.title}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="productdesc">
                              Product Description
                            </Label>
                            <textarea
                              className="form-control"
                              name="description"
                              onChange={formik.handleChange("description")}
                              value={formik.values.description}
                              rows="5"
                            ></textarea>
                          </div>
                          <div className="error">
                            {formik.touched.description &&
                              formik.errors.description}
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="manufacturerbrand"
                                >
                                  Manufacturer Brand
                                </Label>
                                <select
                                  name="brand"
                                  onChange={formik.handleChange("brand")}
                                  onBlur={formik.handleBlur("brand")}
                                  value={formik.values.brand}
                                  className="form-control select2"
                                >
                                  <option value="">Select</option>
                                  {brandState.map((i, j) => {
                                    return (
                                      <option key={j} value={i.title}>
                                        {i.title}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                            <div className="error">
                              {formik.touched.brand && formik.errors.brand}
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="price">
                                  Price
                                </Label>
                                <Input
                                  id="price"
                                  name="price"
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  onChange={formik.handleChange("price")}
                                  onBlur={formik.handleBlur("price")}
                                  value={formik.values.price}
                                />
                              </div>
                            </div>
                            <div className="error">
                              {formik.touched.price && formik.errors.price}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="price">
                                  Quantity
                                </Label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="quantity"
                                  name="quantity"
                                  placeholder=""
                                  onChange={formik.handleChange("quantity")}
                                  onBlur={formik.handleBlur("quantity")}
                                  value={formik.values.quantity}
                                />
                              </div>
                            </div>
                            <div className="error">
                              {formik.touched.quantity &&
                                formik.errors.quantity}
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="manufacturerbrand"
                                >
                                  Category
                                </Label>
                                <select
                                  name="tags"
                                  onChange={formik.handleChange("tags")}
                                  onBlur={formik.handleBlur("tags")}
                                  value={formik.values.tags}
                                  className="form-control select2"
                                >
                                  <option value="" disabled>
                                    Select Category
                                  </option>
                                  <option value="featured">Featured</option>
                                  <option value="popular">Popular</option>
                                  <option value="special">Special</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <Label className="form-label">
                                  Item Category
                                </Label>
                                <select
                                  name="category"
                                  onChange={formik.handleChange("category")}
                                  onBlur={formik.handleBlur("category")}
                                  value={formik.values.category}
                                  className="form-control select2"
                                >
                                  <option value="">Select</option>
                                  {catState.map((i, j) => {
                                    return (
                                      <option key={j} value={i.title}>
                                        {i.title}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="error">
                                {formik.touched.category &&
                                  formik.errors.category}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <Label className="form-label">Color</Label>
                                <Select
                                  options={colorOptions}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleColors}
                                  value={color}
                                  isMulti
                                  allowClear
                                />
                              </div>
                            </div>
                            <div className="error">
                              {formik.touched.color && formik.errors.color}
                            </div>
                          </div>
                        </form>
                      </TabPane>
                      <TabPane tabId={2}>
                        <CardTitle className="h4">Product Images</CardTitle>
                        <p className="card-title-desc">Upload product image</p>
                        <div className="dropzone">
                          <Dropzone
                            onDrop={(acceptedFiles) =>
                              dispatch(uploadImg(acceptedFiles))
                            }
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
                                key={i + "-file"}
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
                        </div>
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
                          <Link type="button" onClick={formik.handleSubmit}>
                            Add Product
                          </Link>
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

export default EcommerceAddProduct;
