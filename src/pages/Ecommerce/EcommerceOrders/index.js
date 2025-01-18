import React, { useEffect, useMemo, useCallback } from "react";
import TableContainer from "../../../components/Common/TableContainer";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from "../../../features/auth/AuthSlice";
import { Link } from "react-router-dom";

const EcommerceOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders.orders) || [];

  const updateOrderStatus = useCallback(
    (status, orderId, email) => {
      dispatch(updateAOrder({ status, orderId, email }));
    },
    [dispatch]
  );

  const data = useMemo(
    () =>
      orderState.map((order, index) => ({
        key: index + 1,
        orderId: order._id,
        date: new Date(order.createdAt).toLocaleString(),
        product: order.orderItems?.map((item, idx) => (
          <div key={idx}>
            <Link to={`/ecommerce-product-detail/${item.product}`}>
              View Product
            </Link>
          </div>
        )),
        billingName: `${order.user?.firstname || ""} ${
          order.user?.lastname || ""
        }`.trim(),
        amount: `₹${order.totalPrice?.toFixed(2)}`,
        status: (
          <select
            defaultValue={order.orderStatus}
            className="form-control form-select"
            onChange={(e) =>
              updateOrderStatus(e.target.value, order._id, order.user?.email)
            }
          >
            {[
              "Ordered",
              "Processed",
              "Shipped",
              "Out For Delivery",
              "Delivered",
            ].map((status) => (
              <option
                key={status}
                value={status}
                disabled={status === "Ordered"}
              >
                {status}
              </option>
            ))}
          </select>
        ),
        invoice: (
          <button className="btn btn-light btn-rounded">
            Invoice <i className="mdi mdi-download ms-2"></i>
          </button>
        ),
      })),
    [orderState, updateOrderStatus]
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "key" },
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Date", accessor: "date" },
      { Header: "Product View", accessor: "product" },
      { Header: "Billing Name", accessor: "billingName" },
      { Header: "Total", accessor: "amount" },
      { Header: "Payment Status", accessor: "status" },
      { Header: "Invoice", accessor: "invoice" },
    ],
    []
  );

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Orders", link: "#" },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Orders" breadcrumbItems={breadcrumbItems} />
        <Card>
          <CardBody>
            <TableContainer
              columns={columns}
              data={data}
              isPagination={true}
              isGlobalFilter={true}
              customPageSize={10}
              className="custom-header-css table align-middle table-nowrap"
              tableClassName="table-centered align-middle table-nowrap mb-0"
              theadClassName="text-muted table-light"
            />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default EcommerceOrders;
