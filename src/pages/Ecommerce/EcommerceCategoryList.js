import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../../features/productCategory/ProductCategorySlice";
import CustomModal from "../../components/CustomModel";

const EcommerceCategoryList = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Serial No.",
        accessor: "key",
        disableFilters: true,
        filterable: false,
      },

      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
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

  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);
  const pCatStat = useSelector((state) => state.productCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <React.Fragment>
          <Link
            to={`/ecommerce-add-category/${pCatStat[i]._id}`}
            className="me-3 text-primary"
          >
            <i className="mdi mdi-pencil font-size-18"></i>
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCatStat[i]._id)}
          >
            <i className="mdi mdi-trash-can font-size-18"></i>
          </button>
        </React.Fragment>
      ),
    });
  }

  const deleteCategory = async (e) => {
    await dispatch(deleteAProductCategory(e)); // Make sure the deletion finishes
    dispatch(getCategories()); // Fetch the updated list after deletion
    setOpen(false);
  };

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Category list", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Cateogry List"
            breadcrumbItems={breadcrumbItems}
          />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={data1 || []}
                isPagination={false}
                // isGlobalFilter={false}
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
              deleteCategory(pCatId);
            }}
            title="Are you sure you want to delete this Product Category?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCategoryList;
