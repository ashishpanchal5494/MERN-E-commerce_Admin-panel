import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Input,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

// Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

// Import Star Ratings
import StarRatings from "react-star-ratings";

// Import Reviews
import { useDispatch } from "react-redux";
import { getAProduct } from "../../../features/product/ProductSlice";

const EcommerceProductDetail = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  console.log(getProductId);
  const [getProductDetail, setGetProductDetail] = useState([]);
  console.log(getProductDetail);
  const [activeTab, setActiveTab] = useState("1");
  const [activeDescriptionTab, setActiveDescriptionTab] =
    useState("description");

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Product Detail", link: "#" },
  ];

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (getProductId !== undefined) {
        try {
          const productDetail = await dispatch(
            getAProduct(getProductId)
          ).unwrap();
          setGetProductDetail(productDetail);
        } catch (error) {
          console.error("Failed to fetch product detail: ", error);
        }
      }
    };

    fetchProductDetail();
  }, [getProductId, dispatch]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggledescription = (tab) => {
    if (activeDescriptionTab !== tab) {
      setActiveDescriptionTab(tab);
    }
  };

  const imageShow = (img, id) => {
    const expandImg = document.getElementById("expandedImg" + id);
    if (expandImg) {
      expandImg.src = img;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Product Detail"
            breadcrumbItems={breadcrumbItems}
          />

          {!isEmpty(getProductDetail) && (
            <React.Fragment>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xl="5">
                          <div className="product-detail">
                            <Row>
                              <Col xs="3">
                                <Nav className="flex-column" pills>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: activeTab === "1",
                                      })}
                                      onClick={() => {
                                        toggleTab("1");
                                      }}
                                    >
                                      <img
                                        src={getProductDetail?.images[0]?.url}
                                        alt=""
                                        onClick={() => {
                                          imageShow(
                                            getProductDetail?.images[0]?.url,
                                            1
                                          );
                                        }}
                                        className="img-fluid mx-auto d-block tab-img rounded"
                                      />
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: activeTab === "2",
                                      })}
                                      onClick={() => {
                                        toggleTab("2");
                                      }}
                                    >
                                      <img
                                        src={getProductDetail?.images[1]?.url}
                                        alt=""
                                        onClick={() => {
                                          imageShow(
                                            getProductDetail?.images[1]?.url,
                                            2
                                          );
                                        }}
                                        className="img-fluid mx-auto d-block tab-img rounded"
                                      />
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: activeTab === "3",
                                      })}
                                      onClick={() => {
                                        toggleTab("3");
                                      }}
                                    >
                                      <img
                                        src={getProductDetail?.images[2]?.url}
                                        alt=""
                                        onClick={() => {
                                          imageShow(
                                            getProductDetail?.images[2]?.url,
                                            3
                                          );
                                        }}
                                        className="img-fluid mx-auto d-block tab-img rounded"
                                      />
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: activeTab === "4",
                                      })}
                                      onClick={() => {
                                        toggleTab("4");
                                      }}
                                    >
                                      <img
                                        src={getProductDetail?.images[3]?.url}
                                        alt=""
                                        onClick={() => {
                                          imageShow(
                                            getProductDetail?.images[3]?.url,
                                            4
                                          );
                                        }}
                                        className="img-fluid mx-auto d-block tab-img rounded"
                                      />
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                              </Col>
                              <Col xs="9">
                                <TabContent
                                  activeTab={activeTab}
                                  className="position-relative"
                                >
                                  <TabPane tabId="1">
                                    <div className="product-img">
                                      <img
                                        src={getProductDetail?.images[0]?.url}
                                        alt=""
                                        id="expandedImg1"
                                        className="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </TabPane>
                                  <TabPane tabId="2">
                                    <div className="product-img">
                                      <img
                                        src={getProductDetail?.images[1]?.url}
                                        id="expandedImg2"
                                        alt=""
                                        className="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </TabPane>
                                  <TabPane tabId="3">
                                    <div className="product-img">
                                      <img
                                        src={getProductDetail?.images[0]?.url}
                                        id="expandedImg3"
                                        alt=""
                                        className="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </TabPane>
                                  <TabPane tabId="4">
                                    <div className="product-img">
                                      <img
                                        src={getProductDetail?.images[0]?.url}
                                        id="expandedImg4"
                                        alt=""
                                        className="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </TabPane>
                                </TabContent>
                              </Col>
                            </Row>
                          </div>
                        </Col>

                        <Col xl="7">
                          <div className="mt-4 mt-xl-3">
                            <Link to="#" className="text-primary">
                              {getProductDetail.category}
                            </Link>
                            <h5 className="mt-1 mb-3">
                              {getProductDetail.title}
                            </h5>

                            <div className="d-inline-flex">
                              <div className="text-muted me-3">
                                <StarRatings
                                  rating={4}
                                  starRatedColor="#F1B44C"
                                  starEmptyColor="#2D363F"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="14px"
                                  starSpacing="3px"
                                />
                              </div>
                              {/* <div className="text-muted">
                                ( {product.reviews} )
                              </div> */}
                            </div>

                            <h5 className="mt-2">
                              {/* <del className="text-muted me-2">
                                ${product.oldprice}
                              </del> */}
                              ₹{getProductDetail.price}
                              {/* {!product.isOffer && (
                                <span className="text-danger font-size-12 ms-2">
                                  {product.offer} % Off
                                </span>
                              )} */}
                            </h5>

                            <p
                              dangerouslySetInnerHTML={{
                                __html: getProductDetail.description,
                              }}
                              className="mt-3"
                            ></p>

                            <hr className="my-4" />

                            <Row>
                              <Col md="6">
                                <div>
                                  <h5 className="font-size-14">
                                    <i className="mdi mdi-location"></i>{" "}
                                    Delivery location
                                  </h5>
                                  <div className="d-flex flex-wrap">
                                    <div className="input-group mb-3 w-auto">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Delivery pincode"
                                      />
                                      <button
                                        className="btn btn-light"
                                        type="button"
                                      >
                                        Check
                                      </button>
                                    </div>
                                  </div>

                                  <h5 className="font-size-14">
                                    Specification :
                                  </h5>
                                  <ul className="list-unstyled product-desc-list">
                                    {/* {product.shortspecifications &&
                                      product.shortspecifications.map(
                                        (item, i) => (
                                          <li key={i}>
                                            <i className="mdi mdi-circle-medium me-1 align-middle"></i>{" "}
                                            {item}
                                          </li>
                                        )
                                      )} */}
                                  </ul>
                                </div>
                              </Col>

                              <Col md="6">
                                <h5 className="font-size-14">Services :</h5>
                                {/* <ul className="list-unstyled product-desc-list">
                                  {product.shortservices &&
                                    product.shortservices.map((item, i) => (
                                      <li key={i}>
                                        <i
                                          className={
                                            "mdi " +
                                            item.icon +
                                            " text-primary me-1 font-size-16"
                                          }
                                        ></i>{" "}
                                        {item.value}
                                      </li>
                                    ))}
                                </ul> */}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="6">
                                {/* <div className="product-color">
                                  <h5 className="font-size-15">Color :</h5>
                                  {product.colorOptions &&
                                    product.colorOptions.map((option, i) => (
                                      <Link
                                        to="#"
                                        className={i === 0 ? "active" : ""}
                                        key={i}
                                      >
                                        <div className="product-color-item">
                                          <img
                                            src={option.image}
                                            alt=""
                                            className="avatar-md"
                                          />
                                        </div>
                                        <p>{option.color}</p>
                                      </Link>
                                    ))}
                                </div> */}
                              </Col>
                              <Col sm="6">
                                <div className="product-color mt-3">
                                  <h5 className="font-size-14">Size :</h5>
                                  <Link to="#" className="active">
                                    <div className="product-color-item">
                                      <div className="avatar-xs">
                                        <span className="avatar-title bg-transparent text-body">
                                          S
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link to="#">
                                    <div className="product-color-item">
                                      <div className="avatar-xs">
                                        <span className="avatar-title bg-transparent text-body">
                                          M
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link to="#">
                                    <div className="product-color-item">
                                      <div className="avatar-xs">
                                        <span className="avatar-title bg-transparent text-body">
                                          L
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                  <Link to="#">
                                    <div className="product-color-item">
                                      <div className="avatar-xs">
                                        <span className="avatar-title bg-transparent text-body">
                                          XL
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <h5 className="font-size-14 mb-3">
                          Product description:{" "}
                        </h5>
                        <div className="product-desc">
                          <Nav tabs className="nav-tabs-custom">
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active:
                                    activeDescriptionTab === "description",
                                })}
                                onClick={() => {
                                  toggledescription("description");
                                }}
                              >
                                Description
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active:
                                    activeDescriptionTab === "specifications",
                                })}
                                onClick={() => {
                                  toggledescription("specifications");
                                }}
                              >
                                Specifications
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent
                            activeTab={activeDescriptionTab}
                            className="border border-top-0 p-4"
                          >
                            <TabPane tabId="description">
                              <div>
                                <p>
                                  If several languages coalesce, the grammar of
                                  the resulting language is more simple and
                                  regular than that of the individual{" "}
                                </p>
                                <p>
                                  To achieve this, it would be necessary to have
                                  uniform grammar, pronunciation and more common
                                  several languages coalesce, the grammar of the
                                  resulting.
                                </p>
                                <p>
                                  It will be as simple as occidental in fact.
                                </p>

                                <div>
                                  <p className="mb-2">
                                    <i className="mdi mdi-circle-medium me-1 align-middle"></i>{" "}
                                    If several languages coalesce
                                  </p>
                                  <p className="mb-2">
                                    <i className="mdi mdi-circle-medium me-1 align-middle"></i>{" "}
                                    To an English person, it will seem like
                                    simplified
                                  </p>
                                  <p className="mb-0">
                                    <i className="mdi mdi-circle-medium me-1 align-middle"></i>{" "}
                                    These cases are perfectly simple.
                                  </p>
                                </div>
                              </div>
                            </TabPane>
                            <TabPane tabId="specifications">
                              <div className="table-responsive">
                                <Table className="table-nowrap mb-0">
                                  {/* <tbody>
                                    {product.specification &&
                                      product.specification.map(
                                        (specification, i) => (
                                          <tr key={i}>
                                            <th
                                              scope="row"
                                              style={{ width: "20%" }}
                                            >
                                              {specification.type}
                                            </th>
                                            <td>{specification.value}</td>
                                          </tr>
                                        )
                                      )}
                                  </tbody> */}
                                </Table>
                              </div>
                            </TabPane>
                          </TabContent>
                        </div>
                      </div>

                      {/* <Reviews comments={product.comments} /> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md={4}>
                          <div className="d-flex">
                            <div className="avatar-sm me-3">
                              <span className="avatar-title bg-light rounded-circle text-primary font-size-24">
                                <i className="ri-checkbox-circle-line"></i>
                              </span>
                            </div>
                            <div className="flex-1 align-self-center overflow-hidden">
                              <h5>Free Shipping</h5>
                              <p className="text-muted mb-0">
                                Sed ut perspiciatis unde
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="d-flex mt-4 mt-md-0">
                            <div className="avatar-sm me-3">
                              <span className="avatar-title bg-light rounded-circle text-primary font-size-24">
                                <i className="ri-exchange-line"></i>
                              </span>
                            </div>
                            <div className="flex-1 align-self-center overflow-hidden">
                              <h5>Easy Return</h5>
                              <p className="text-muted mb-0">
                                Neque porro quisquam est
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="d-flex mt-4 mt-md-0">
                            <div className="avatar-sm me-3">
                              <span className="avatar-title bg-light rounded-circle text-primary font-size-24">
                                <i className="ri-money-dollar-circle-line"></i>
                              </span>
                            </div>
                            <div className="flex-1 align-self-center overflow-hidden">
                              <h5>Cash on Delivery</h5>
                              <p className="text-muted mb-0">
                                Ut enim ad minima quis
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceProductDetail;
