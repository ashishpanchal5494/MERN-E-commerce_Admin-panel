import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCat,
  getCategories,
  resetState,
} from "../../features/blogCategory/BlogCategorySlice";
import CustomModal from "../../components/CustomModel";

const EcommerceBlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);
  const bCatState = useSelector((state) => state.blogCategory.bCategories);
  console.log(bCatState);
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      action: (
        <>
          <Link
            to={`/ecommerce-add-blog-category/${bCatState[i]._id}`}
            className="me-3 text-primary"
          >
            <i className="mdi mdi-pencil font-size-18"></i>
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <i className="mdi mdi-trash-can font-size-18"></i>
          </button>
        </>
      ),
    });
  }
  const deleteBlogCategory = async (e) => {
    await dispatch(deleteABlogCat(e));
    setOpen(false);
    dispatch(getCategories());
  };

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

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Blog Category list", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Blog Category List"
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
              deleteBlogCategory(blogCatId);
            }}
            title="Are you sure you want to delete this blog category?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceBlogCategoryList;
