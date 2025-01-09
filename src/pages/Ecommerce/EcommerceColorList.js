import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";
import { orders } from "../../common/data/ecommerce";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../../features/color/ColorSlice";
import CustomModal from "../../components/CustomModel";

const EcommerceColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link
            to={`/ecommerce-add-color/${colorState[i]._id}`}
            className="me-3 text-primary"
          >
            <i className="mdi mdi-pencil font-size-18"></i>
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <i className="mdi mdi-trash-can font-size-18"></i>
          </button>
        </>
      ),
    });
  }
  const deleteColor = async (e) => {
    await dispatch(deleteAColor(e));
    setOpen(false);
    dispatch(getColors());
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
    { title: "Color list", link: "#" },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Color List" breadcrumbItems={breadcrumbItems} />
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
              deleteColor(colorId);
            }}
            title="Are you sure you want to delete this color?"
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceColorList;
