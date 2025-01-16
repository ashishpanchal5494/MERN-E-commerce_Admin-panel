import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/EnquirySlice";
import CustomModal from "../../components/CustomModel";

const EcommerceEnquiry = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);
  const enqState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enqState[i]._id)}
          >
            <i className="mdi mdi-trash-can font-size-18"></i>
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  const columns = useMemo(
    () => [
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
        Header: "Moblie No.",
        accessor: "mobile",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
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
    { title: "Coupon list", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Enquiry List" breadcrumbItems={breadcrumbItems} />
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
              deleteEnq(enqId);
            }}
            title="Are you sure you want to delete this enquiry?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceEnquiry;
