/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 12:14:40
 * @modify date 2021-12-06 15:20:08
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Swal from "sweetalert2";
import { MyApiUrl } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Reason" },
  { key: "Requested Date" },
  { key: "Requested Employee" },
  { key: "Customer Category" },
  { key: "Customer Type" },
  { key: "Customer Sub Type" },
  { key: "Customer Name" },
  { key: "Email" },
  { key: "Contact Number" },
  { key: "Superior" },
];

const ViewCustomers = () => {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [ResponseData, setResponseData] = useState([]);
  const [block, setBlock] = useState(false);
  const [DelReason, setDelReason] = useState();

  const GetAllCustomerRequest = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "custDeleteReq",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AcceptRequest = (pkid, custid) => {
    axios
      .put(MyApiUrl + "custdeleteacceptreq/" + pkid + "/" + custid)
      .then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Customer Deleted Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetAllCustomerRequest();
        } else {
          Swal.fire({
            title: "Failed!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const RejectRequest = (pkid) => {
    axios.put(MyApiUrl + "custdeleterejectreq/" + pkid).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Customer Deleted Request Rejected!",
          icon: "success",
          confirmButtonText: "OK",
        });
        GetAllCustomerRequest();
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const CustomerBlockReason = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "customerreaoson/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setDelReason(response.data[0].CUSTOMER_DELETE_REQ_REASON);
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock(!block);
  };

  React.useEffect(() => {
    GetAllCustomerRequest();
  }, []);

  return (
    <div id="city">
      <h1 id="ccmaster">View Customers Delete Request</h1>
      <br />
      <br />
      <CRow>
        <CCol col="12">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>All Customers Request</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={ResponseData}
                        fields={fields2}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        itemsPerPageSelect={items}
                        columnFilterSlot
                        size="sm"
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          "Requested Date": (i) => (
                            <td>{i.CUSTOMER_DELETE_REQ_DATE}</td>
                          ),
                          "Requested Employee": (i) => (
                            <td>{i.EMPLOYEE_NAME}</td>
                          ),
                          "Customer Category": (i) => (
                            <td>{i.CUSTOMER_CATEGORY_NAME}</td>
                          ),
                          "Customer Type": (i) => (
                            <td>{i.CUSTOMER_TYPE_NAME}</td>
                          ),
                          "Customer Sub Type": (i) => (
                            <td>{i.CUSTOMER_SUBTYPE_NAME}</td>
                          ),
                          "Customer Name": (i) => <td>{i.CUSTOMER_NAME}</td>,
                          Email: (i) => <td>{i.CUSTOMER_EMAIL}</td>,
                          "Contact Number": (i) => <td>{i.CUSTOMER_MOBILE}</td>,
                          Superior: (i) => <td>{i.EMPLOYEE_NAME}</td>,
                          Reason: (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      CustomerBlockReason(
                                        i.CUSTOMER_DELETE_REQ_PKID
                                      );
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          Action: (item) => {
                            if (item.CUSTOMER_DELETE_REQ_ACTIVE === 0) {
                              return (
                                <td>
                                  <CButton
                                    onClick={() => {
                                      AcceptRequest(
                                        item.CUSTOMER_DELETE_REQ_PKID,
                                        item.CUSTOMER_DELETE_REQ_CUST_FKID
                                      );
                                    }}
                                    size="sm"
                                    id="war-btn"
                                  >
                                    <EditIcon />
                                    {item.status}
                                  </CButton>
                                  <CButton
                                    onClick={() => {
                                      RejectRequest(
                                        item.CUSTOMER_DELETE_REQ_PKID
                                      );
                                    }}
                                    size="sm"
                                    id="war-btn1"
                                  >
                                    <DeleteSharpIcon />
                                    {item.status}
                                  </CButton>
                                </td>
                              );
                            } else if (item.CUSTOMER_DELETE_REQ_ACTIVE === 1) {
                              return <p className="fonts">Accepted</p>;
                            } else if (item.CUSTOMER_DELETE_REQ_ACTIVE === 2) {
                              return <p className="fontd">Rejected</p>;
                            }
                          },
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={block} onClose={() => setBlock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Reason</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{DelReason}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ViewCustomers;
