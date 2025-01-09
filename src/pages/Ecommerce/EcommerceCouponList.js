import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteACoupon, getAllCoupon } from "../../features/coupon/CouponSlice";
import CustomModal from "../../components/CustomModel";

const EcommerceCouponList = () => {
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
        Header: "Discount",
        accessor: "discount",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Expiry",
        accessor: "expiry",
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
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);
  const couponState = useSelector((state) => state.coupon.coupons);
  console.log(couponState);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/ecommerce-add-coupon/${couponState[i]._id}`}
            className="me-3 text-primary"
          >
            <i className="mdi mdi-pencil font-size-18"></i>
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <i className="mdi mdi-trash-can font-size-18"></i>
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Coupon list", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Coupon List" breadcrumbItems={breadcrumbItems} />
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
              deleteCoupon(couponId);
            }}
            title="Are you sure you want to delete this Coupon?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCouponList;
