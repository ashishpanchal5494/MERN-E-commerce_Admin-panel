import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from "../../../features/auth/AuthSlice";

const EcommerceOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders.orders);
  console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      orderId: orderState[i]._id,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      billingName:
        orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
      amount: orderState[i]?.totalPrice,
      status: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            className="form-control form-select"
            id=""
            onChange={(e) =>
              updateOrderStatus(e.target.value, orderState[i]?._id)
            }
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>

            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a, b) => {
    console.log(a, b);
    const data = { id: b, status: a };
    dispatch(updateAOrder(data));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "key",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Order ID",
        accessor: "orderId",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Billing Name",
        accessor: "billingName",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Total",
        accessor: "amount",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Payment Status",
        disableFilters: true,
        filterable: true,
        accessor: "status",
      },
      {
        Header: "Invoice",
        accessor: (cellProps) => {
          return (
            <button className="btn btn-light btn-rounded">
              Invoice <i className="mdi mdi-download ms-2"></i>
            </button>
          );
        },
        disableFilters: true,
        filterable: false,
      },
    ],
    []
  );

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Orders", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Orders" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={data1 || []}
                isPagination={false}
                isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                className="custom-header-css table align-middle table-nowrap"
                tableClassName="table-centered align-middle table-nowrap mb-0"
                theadClassName="text-muted table-light"
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceOrders;
