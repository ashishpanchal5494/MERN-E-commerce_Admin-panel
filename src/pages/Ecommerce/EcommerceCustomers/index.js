import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { customers } from "../../../common/data/ecommerce";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../features/customers/CustomerSlice";

const EcommerceOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerstate = useSelector((state) => state.customer.customers);
  console.log(customerstate);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Customer ",
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
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        disableFilters: true,
        filterable: false,
      },
    ],
    []
  );

  const breadcrumbItems = [
    { title: "Ecommerce", link: "/" },
    { title: "Customers", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Customers" breadcrumbItems={breadcrumbItems} />
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
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceOrders;
