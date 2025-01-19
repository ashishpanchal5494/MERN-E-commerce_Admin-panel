import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProducts,
  getProducts,
  resetState,
} from "../../features/product/ProductSlice";
import CustomModal from "../../components/CustomModel";

const EcommerceProductList = () => {
  const [open, setOpen] = useState(false);
  const [pId, setPId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setPId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "key",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Title",
        accessor: "title",
        disableFilters: true,
        filterable: false,
        sorter: (a, b) => a.title.length - b.title.length,
      },
      {
        Header: "Brand",
        accessor: "brand",
        disableFilters: true,
        filterable: false,
        sorter: (a, b) => a.brand.length - b.brand.length,
      },
      {
        Header: "Category",
        accessor: "category",
        disableFilters: true,
        filterable: false,
        sorter: (a, b) => a.category.length - b.category.length,
      },
      {
        Header: "Color",
        accessor: "color",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Price",
        accessor: "price",
        disableFilters: true,
        filterable: false,
        sorter: (a, b) => a.price - b.price,
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        filterable: false,
      },
    ],
    []
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  // Sorting the products by title (or any other property) to ensure numbering is ascending
  const sortedProducts = [...productState].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const data1 = [];
  sortedProducts.forEach((product, index) => {
    // Shorten the title by keeping the first two parts split by commas
    const shortenedTitle = product.title.split(",").slice(0, 2).join(",");

    data1.push({
      key: index + 1, // Numbering starts from 1
      title: shortenedTitle, // Shortened title
      brand: product.brand,
      category: product.category,
      color: product.color,
      price: `${product.price}`,
      action: (
        <>
          <button
            onClick={() => showModal(product._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <i className="mdi mdi-trash-can font-size-18"></i>
          </button>
        </>
      ),
    });
  });

  console.log(data1.color);

  const deleteProduct = (e) => {
    dispatch(deleteAProducts(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Products", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Product List" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={data1 || []}
                isPagination={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                className="custom-header-css table align-middle table-nowrap"
                tableClassName="table-centered align-middle table-nowrap mb-0"
                theadClassName="text-muted table-light"
              />
            </CardBody>
          </Card>
          <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteProduct(pId);
            }}
            title="Are you sure you want to delete this product?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceProductList;
