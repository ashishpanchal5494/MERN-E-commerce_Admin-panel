import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { getProducts } from "../../../features/product/ProductSlice";

const ITEMS_PER_PAGE = 6;

const EcommerceProducts = () => {
  const [isCategoryOpen1, setIsCategoryOpen1] = useState(false);
  const [isCategoryOpen2, setIsCategoryOpen2] = useState(false);
  const [isCategoryOpen3, setIsCategoryOpen3] = useState(false);
  const [isCategoryOpen4, setIsCategoryOpen4] = useState(false);
  const [isFilterProductDiscountOpen, setIsFilterProductDiscountOpen] =
    useState(false);
  const [isFilterProductSizeOpen, setIsFilterProductSizeOpen] = useState(false);
  const [isFilterProductRatingOpen, setIsFilterProductRatingOpen] =
    useState(false);
  const [searchInput, setSearchInput] = useState(""); // Search input state
  const [activeTab, setActiveTab] = useState(null);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const tabs = [
    { id: "special", label: "Special" },
    { id: "popular", label: "Popular" },
    { id: "featured", label: "Featured" },
  ];

  const discountData = [
    { value: "10%", label: "10% or more" },
    { value: "20%", label: "20% or more" },
    { value: "30%", label: "30% or more" },
  ];

  const toggleCategory1 = useCallback(
    () => setIsCategoryOpen1(!isCategoryOpen1),
    [isCategoryOpen1]
  );
  const toggleCategory2 = useCallback(
    () => setIsCategoryOpen2(!isCategoryOpen2),
    [isCategoryOpen2]
  );
  const toggleCategory3 = useCallback(
    () => setIsCategoryOpen3(!isCategoryOpen3),
    [isCategoryOpen3]
  );
  const toggleCategory4 = useCallback(
    () => setIsCategoryOpen4(!isCategoryOpen4),
    [isCategoryOpen4]
  );
  const toggleDiscount = useCallback(
    () => setIsFilterProductDiscountOpen(!isFilterProductDiscountOpen),
    [isFilterProductDiscountOpen]
  );

  const filtersizetoggle = () => {
    setIsFilterProductSizeOpen(!isFilterProductSizeOpen);
  };

  const filterratingtoggle = () => {
    setIsFilterProductRatingOpen(!isFilterProductRatingOpen);
  };

  const onUpdate = (values) => {
    console.log(values);
  };

  const onChangeRating = (rating) => {
    console.log(`Rating changed: ${rating}`);
  };

  const onUncheckMark = (rating) => {
    console.log(`Rating unchecked: ${rating}`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productState = useSelector((state) => state.product.products);
  console.log(productState);

  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(productState.length / ITEMS_PER_PAGE);

  const filteredProducts = productState.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageClick = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage) {
      setPage(pageNum);
    }
  };

  // Slice the product array for the current page

  const breadcrumbItems = [
    { title: "Ecommerce", link: "#" },
    { title: "Products", link: "#" },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Products" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col lg="4" xl="3">
            <Card>
              <CardHeader className="bg-transparent border-bottom">
                <h5 className="mb-0">Filters</h5>
              </CardHeader>

              <CardBody>
                <h5 className="font-size-14 mb-3">Categories</h5>
                <div className="accordion ecommerce" id="accordionExample">
                  {/* Electronics */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className={
                          isCategoryOpen1
                            ? "accordion-button"
                            : "accordion-button collapsed"
                        }
                        onClick={toggleCategory1}
                        data-bs-toggle="collapse"
                      >
                        <i className="mdi mdi-desktop-classic font-size-16 align-middle me-2"></i>{" "}
                        Electronic
                      </button>
                    </h2>
                    <Collapse
                      isOpen={isCategoryOpen1}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled categories-list mb-0">
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Smart Phones
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Computer accessories
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              MacBook
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Laptops
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Speakers
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>

                  {/* Other Categories */}
                  {/* You can repeat similar sections for Fashion, Baby & Kids, Fitness using their respective state values and toggle functions */}
                  {/* Example: */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className={
                          isCategoryOpen2
                            ? "accordion-button"
                            : "accordion-button collapsed"
                        }
                        onClick={toggleCategory2}
                        data-bs-toggle="collapse"
                      >
                        <i className="mdi mdi-hanger font-size-16 align-middle me-2"></i>{" "}
                        Fashion
                      </button>
                    </h2>
                    <Collapse
                      isOpen={isCategoryOpen2}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled categories-list mb-0">
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Clothing
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Footwear
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Watches
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Sportswear
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>

                  {/* Add remaining categories similar to above */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className={
                          isCategoryOpen3
                            ? "accordion-button"
                            : "accordion-button collapsed"
                        }
                        onClick={toggleCategory3}
                        data-bs-toggle="collapse"
                      >
                        <i className="mdi mdi-hanger font-size-16 align-middle me-2"></i>{" "}
                        Baby & Kids
                      </button>
                    </h2>
                    <Collapse
                      isOpen={isCategoryOpen3}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled categories-list mb-0">
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Clothing
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Footwear
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Watches
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Sportswear
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className={
                          isCategoryOpen4
                            ? "accordion-button"
                            : "accordion-button collapsed"
                        }
                        onClick={toggleCategory4}
                        data-bs-toggle="collapse"
                      >
                        <i className="mdi mdi-hanger font-size-16 align-middle me-2"></i>{" "}
                        Fitness
                      </button>
                    </h2>
                    <Collapse
                      isOpen={isCategoryOpen4}
                      className="accordion-collapse"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled categories-list mb-0">
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i> gym
                              equipments
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Yoga mat
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Dumbbells
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium me-1"></i>{" "}
                              Protien supplements
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </CardBody>

              <CardBody className="border-top">
                <div>
                  <h5 className="font-size-14 mb-4">Price</h5>
                  <br />
                  <Nouislider
                    range={{ min: 0, max: 600 }}
                    tooltips={true}
                    start={[100, 500]}
                    connect
                    onSlide={onUpdate}
                  />
                </div>
              </CardBody>

              <div className="custom-accordion">
                <CardBody className="border-top">
                  <div>
                    <h5 className="font-size-14 mb-0">
                      <Link
                        to="#"
                        onClick={toggleDiscount}
                        className={`${
                          isFilterProductDiscountOpen ? "collapse" : "collapsed"
                        } text-dark d-block`}
                      >
                        Discount{" "}
                        <i className="mdi mdi-minus float-end accor-plus-icon"></i>
                      </Link>
                    </h5>
                    <Collapse
                      isOpen={isFilterProductDiscountOpen}
                      id="filterproductcolor-collapse"
                    >
                      <div className="mt-4">
                        {discountData.map((discount, i) => (
                          <div
                            className="form-check mt-2"
                            key={"_discount_" + i}
                          >
                            <Input
                              type="checkbox"
                              value={discount.value}
                              className="form-check-input"
                              id={i}
                              onChange={(e) => console.log(e.target.value)}
                            />
                            <Label className="form-check-label" htmlFor={i}>
                              {discount.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  </div>
                </CardBody>

                {/* Add similar sections for Size, Customer Rating, etc. */}

                <CardBody className="border-top">
                  {/* Size Filter */}
                  <div>
                    <h5 className="font-size-14 mb-0">
                      <Link
                        to="#"
                        className={`${
                          isFilterProductSizeOpen ? "collapse" : "collapsed"
                        } text-dark d-block`}
                        onClick={filtersizetoggle}
                      >
                        Size{" "}
                        <i className="mdi mdi-minus float-end accor-plus-icon"></i>
                      </Link>
                    </h5>

                    <Collapse isOpen={isFilterProductSizeOpen}>
                      <div className="mt-4">
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            value="x-large"
                            className="form-check-input"
                            id="productsizeRadio1"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productsizeRadio1"
                          >
                            X-Large
                          </Label>
                        </div>
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            value="large"
                            className="form-check-input"
                            id="productsizeRadio2"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productsizeRadio2"
                          >
                            Large
                          </Label>
                        </div>
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            value="medium"
                            className="form-check-input"
                            id="productsizeRadio3"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productsizeRadio3"
                          >
                            Medium
                          </Label>
                        </div>
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            value="small"
                            className="form-check-input"
                            id="productsizeRadio4"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productsizeRadio4"
                          >
                            Small
                          </Label>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </CardBody>

                {/* Customer Rating Filter */}
                <CardBody className="border-top">
                  <div>
                    <h5 className="font-size-14 mb-0">
                      <Link
                        to="#"
                        onClick={filterratingtoggle}
                        className={`${
                          isFilterProductRatingOpen ? "collapse" : "collapsed"
                        } text-dark d-block`}
                      >
                        Customer Rating{" "}
                        <i className="mdi mdi-minus float-end accor-plus-icon"></i>
                      </Link>
                    </h5>
                    <Collapse isOpen={isFilterProductRatingOpen}>
                      <div className="mt-4">
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="productratingCheck1"
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChangeRating(4);
                              } else {
                                onUncheckMark(4);
                              }
                            }}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productratingCheck1"
                          >
                            4 <i className="mdi mdi-star text-warning"></i> &
                            Above
                          </Label>
                        </div>
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="productratingCheck2"
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChangeRating(3);
                              } else {
                                onUncheckMark(3);
                              }
                            }}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productratingCheck2"
                          >
                            3 <i className="mdi mdi-star text-warning"></i> &
                            Above
                          </Label>
                        </div>
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="productratingCheck3"
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChangeRating(2);
                              } else {
                                onUncheckMark(2);
                              }
                            }}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productratingCheck3"
                          >
                            2 <i className="mdi mdi-star text-warning"></i> &
                            Above
                          </Label>
                        </div>
                        <div className="form-check mt-2">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="productratingCheck4"
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChangeRating(1);
                              } else {
                                onUncheckMark(1);
                              }
                            }}
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="productratingCheck4"
                          >
                            1 <i className="mdi mdi-star text-warning"></i>
                          </Label>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Col>

          <Col lg="8" xl="9">
            <Card>
              <CardBody>
                <Row>
                  <Col md="6">
                    <div>
                      <h5>Electronics & Accessories</h5>
                      <ol className="breadcrumb p-0 bg-transparent mb-2">
                        <li className="breadcrumb-item">
                          <Link to="#">Speaker</Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link to="#">TV</Link>
                        </li>
                        <li className="breadcrumb-item active">Tab</li>
                      </ol>
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-inline float-md-end">
                      <div className="search-box ms-2">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control rounded"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={handleSearchChange} // Update search input
                          />
                          <i className="mdi mdi-magnify search-icon"></i>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <ul className="list-inline my-3 ecommerce-sortby-list mb-5">
                  <li className="list-inline-item">
                    <span className="fw-medium font-family-secondary">
                      Sort by:
                    </span>
                  </li>{" "}
                  <li
                    className={`list-inline-item ${
                      activeTab === null ? "active" : ""
                    }`}
                  >
                    <Link onClick={() => setActiveTab(null)}> All</Link>
                  </li>{" "}
                  {tabs.map((tab) => (
                    <li
                      key={tab.id}
                      className={`list-inline-item ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                    >
                      <Link onClick={() => setActiveTab(tab.id)}>
                        {" "}
                        {tab.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Row className="g-0">
                  {activeTab
                    ? displayedProducts
                        ?.filter((product) => product.tags === activeTab)
                        ?.map((product, key) => (
                          <Col xl="4" sm="6" key={"_col_" + key}>
                            <Link
                              to={`/ecommerce-products/${product._id}`}
                              style={{ height: "343px", cursor: "pointer" }}
                              className="product-box"
                            >
                              <div className="product-img">
                                {product.isLabel ? (
                                  <div className="product-ribbon badge bg-warning">
                                    {product.label}
                                  </div>
                                ) : null}
                                {product.isOffer ? (
                                  <div className="product-ribbon badge bg-primary">
                                    {`- ${product.offer} %`}
                                  </div>
                                ) : null}
                                <div className="product-like">
                                  <Link to="#">
                                    <i
                                      className={
                                        product.isLike
                                          ? "mdi mdi-heart text-danger"
                                          : "mdi mdi-heart-outline"
                                      }
                                    ></i>
                                  </Link>
                                </div>
                                <img
                                  src={product.images[0]?.url}
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>

                              <div className="text-center">
                                <p className="font-size-12 mb-1">
                                  {product.extraDetails}
                                </p>
                                <h5 className="font-size-15">
                                  <div className="text-dark">
                                    {product.title
                                      .split(" ")
                                      .slice(0, 10)
                                      .join(" ")}
                                    ...
                                  </div>
                                </h5>
                                <h5 className="mt-3 mb-0">
                                  <span className="text-muted me-2">
                                    <del>{product.oldPrice}</del>
                                  </span>
                                  ₹{product.price}
                                </h5>
                              </div>
                            </Link>
                          </Col>
                        ))
                    : displayedProducts?.map((product, key) => (
                        <Col xl="4" sm="6" key={"_col_" + key}>
                          <Link
                            to={`/ecommerce-products/${product._id}`}
                            style={{ height: "343px", cursor: "pointer" }}
                            className="product-box"
                          >
                            <div className="product-img">
                              {product.isLabel ? (
                                <div className="product-ribbon badge bg-warning">
                                  {product.label}
                                </div>
                              ) : null}
                              {product.isOffer ? (
                                <div className="product-ribbon badge bg-primary">
                                  {`- ${product.offer} %`}
                                </div>
                              ) : null}
                              <div className="product-like">
                                <Link to="#">
                                  <i
                                    className={
                                      product.isLike
                                        ? "mdi mdi-heart text-danger"
                                        : "mdi mdi-heart-outline"
                                    }
                                  ></i>
                                </Link>
                              </div>
                              <img
                                src={product.images[0]?.url}
                                alt=""
                                className="img-fluid mx-auto d-block"
                              />
                            </div>

                            <div className="text-center">
                              <p className="font-size-12 mb-1">
                                {product.extraDetails}
                              </p>
                              <h5 className="font-size-15">
                                <div>
                                  {product.title
                                    .split(" ")
                                    .slice(0, 10)
                                    .join(" ")}
                                  ...
                                </div>
                              </h5>
                              <h5 className="mt-3 mb-0">
                                <span className="text-muted me-2">
                                  <del>{product.oldPrice}</del>
                                </span>
                                ₹{product.price}
                              </h5>
                            </div>
                          </Link>
                        </Col>
                      ))}
                </Row>

                <Row className="mt-4">
                  <Col sm="6">
                    <div>
                      <p className="mb-sm-0">
                        Page {page} of {totalPage}
                      </p>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="float-sm-end">
                      <Pagination className="pagination pagination-rounded d-flex gap-4 mb-sm-0">
                        <PaginationItem disabled={page === 1}>
                          <PaginationLink
                            previous
                            to="#"
                            onClick={() => handlePageClick(page - 1)}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPage }).map((_, i) => (
                          <PaginationItem
                            active={i + 1 === page}
                            key={`_pagination_${i}`}
                          >
                            <PaginationLink
                              onClick={() => handlePageClick(i + 1)}
                              to="#"
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem disabled={page === totalPage}>
                          <PaginationLink
                            next
                            to="#"
                            onClick={() => handlePageClick(page + 1)}
                          />
                        </PaginationItem>
                      </Pagination>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceProducts;
