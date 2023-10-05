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
  CLink,
  CRow,
  CDataTable,
  CImg,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTextarea
} from "@coreui/react";
import Swal from "sweetalert2";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Customer Name" },
  { key: "Customer Number" },
  { key: "GST No" },
  { key: "Customer Category" },
  { key: "Customer Type" },
  { key: "Customer Sub Type" },
  { key: "Email" },
  { key: "Alternate Email" },
  { key: "Contact Number" },
  { key: "Alternate Number" },
  { key: "Capacity" },
  { key: "Unit" },
  { key: "Superior" },
  { key: "Country" },
  { key: "State" },
  { key: "District" },
  { key: "Taluk" },
  { key: "Profile" },
  { key: "Password" },
  { key: "Address" },
  { key: "Documents" },
  { key: "Contact Persons" },
];

const ViewCustomersRequest = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [CustomerDocs, setCustomerDocs] = useState([]);
  const [ContactPersons, setContactPersons] = useState([]);
  const [RejectRemark, setRejectRemark] = useState();
  const [CustomerID, setCustomerID] = useState();


  const [block, setBlock] = useState(false);
  const [block2, setBlock2] = useState(false);
  const [Block8, setBlock8] = useState(false);


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

  const GetAllCustomers = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getPendingCustomersReqs",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            Country: item.COUNTRY_NAME,
            State: item.STATE_NAME,
            District: item.DISTRICT_NAME,
            Taluk: item.TALUK_NAME,
            "Customer Category": item.CUSTOMER_CATEGORY_NAME,
            "Customer Type": item.CUSTOMER_TYPE_NAME,
            "Customer Sub Type": item.CUSTOMER_SUBTYPE_NAME,
            "Customer Name": item.CUSTOMER_NAME,
            Email: item.CUSTOMER_EMAIL,
            "Alternate Email": item.CUSTOMER_EMAIL2,
            "Contact Number": item.CUSTOMER_MOBILE,
            "Alternate Number": item.CUSTOMER_ALT_MOBILE,
            "Customer Number": item.CUSTOMER_NUMBER,
            Capacity: item.CUSTOMER_CAPACITY,
            Unit: item.UNIT_NAME,
            Superior: item.EMPLOYEE_NAME,
            Password: item.CUSTOMER_PASSWORD,
            "GST No": item.CUSTOMER_GST_NO,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Accept = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios.put(MyApiUrl + "acceptCustomerReqs/" + pkid + "").then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Customer Accepted Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        GetAllCustomers();
        document.getElementById("divLoading").className = "hide";
      } else {
        Swal.fire({
          title: "Failed To Accept Customer!",
          icon: "error",
          confirmButtonText: "OK",
        });
        document.getElementById("divLoading").className = "hide";
      }
    });
  }

  const ConfirmReject = () => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to Deny..?");
    if (res) {
      document.getElementById("divLoading").className = "show";
      var obj = {
        remark: RejectRemark
      }
      axios.put(MyApiUrl + "rejectCustomerReqs/" + CustomerID + "", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Customer Denied Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetAllCustomers();
          setBlock8(!Block8);
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed To Deny Customer!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  }

  const Reject = (pkid) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to Deny");
    if (res) {
      setBlock8(!Block8);
      setCustomerID(pkid);
    }
  };

  const CustomerDocsBlock = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "customerdocs/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setCustomerDocs(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock2(!block2);
  };

  const ContactPersonsBlock = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "customercontactpersons/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setContactPersons(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock(!block);
  };

  React.useEffect(() => {
    GetAllCustomers();
  }, []);

  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">View Customers Request</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
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
                          Profile: (i) => {
                            let profile = "";
                            if (
                              i.CUSTOMER_PRFILE === "" ||
                              i.CUSTOMER_PRFILE === null
                            ) {
                              profile = "NoImage.png";
                            } else {
                              profile = i.CUSTOMER_PRFILE;
                            }
                            return (
                              <React.Fragment>
                                <td>
                                  <CLink
                                    href={ViewImg + "/" + profile}
                                    target="_blank"
                                  >
                                    <CImg
                                      src={ViewImg + "/" + profile}
                                      fluid
                                      className="mb-2"
                                      style={{ width: "100%" }}
                                    />
                                  </CLink>
                                </td>
                              </React.Fragment>
                            );
                          },
                          Documents: (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      CustomerDocsBlock(i.CUSTOMER_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Contact Persons": (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ContactPersonsBlock(i.CUSTOMER_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          Action: (item) => (
                            <td>
                              <CButton
                                onClick={() => {
                                  Accept(item.CUSTOMER_PKID);
                                }}
                                size="sm"
                                color="success"
                              >
                                Accept
                              </CButton>&nbsp;&nbsp;&nbsp;
                              <CButton
                                onClick={() => {
                                  Reject(item.CUSTOMER_PKID);
                                }}
                                size="sm"
                                color="danger"
                              >
                                Deny
                              </CButton>
                            </td>
                          ),
                          Address: (item) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() =>
                                      history.push("/AddCustomerAddress", {
                                        data: item,
                                      })
                                    }
                                  >
                                    Manage
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
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
          <CModalTitle>Contact Persons Info</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {ContactPersons.map((i) => (
              <React.Fragment>
                <CCol md="12">
                  <p
                    style={{
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      borderBottom: "1px solid #ebedef",
                      paddingBottom: "5%",
                    }}
                  >
                    First Contact People
                  </p>
                  <table id="ModelTable">
                    <tr>
                      <th>Name</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_PERSON_NAME}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_PERSON_EMAIL}</td>
                    </tr>
                    <tr>
                      <th>Alternate Email</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_PERSON_EMAIL2}</td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_PERSON_PHO}</td>
                    </tr>
                    <tr>
                      <th>Alternate Number</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_PERSON_PHO2}</td>
                    </tr>
                  </table>
                </CCol>
                <CCol md="12" style={{ marginTop: "5%" }}>
                  <p
                    style={{
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      borderBottom: "1px solid #ebedef",
                      paddingBottom: "5%",
                    }}
                  >
                    Second Contact People
                  </p>
                  <table id="ModelTable">
                    <tr>
                      <th>Name</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_SEC_PERSON_NAME}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_SEC_PERSON_EMAIL}</td>
                    </tr>
                    <tr>
                      <th>Alternate Email</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2}</td>
                    </tr>
                    <tr>
                      <th>Contact Number</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_SEC_PERSON_PHO}</td>
                    </tr>
                    <tr>
                      <th>Alternate Number</th>
                      <th>:</th>
                      <td>{i.CUSTOMER_CONTACT_SEC_PERSON_PHO2}</td>
                    </tr>
                  </table>
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block2} onClose={() => setBlock2(!block2)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Uploaded Documents</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {CustomerDocs.map((i) => (
              <React.Fragment>
                <CCol md="3">
                  <CImg
                    src={ViewImg + "/" + i.CUSTOMER_DOC1}
                    fluid
                    className="mb-2"
                    style={{ width: "100%" }}
                  />
                </CCol>
                <CCol md="3">
                  <CImg
                    src={ViewImg + "/" + i.CUSTOMER_DOC2}
                    fluid
                    className="mb-2"
                    style={{ width: "100%" }}
                  />
                </CCol>
                <CCol md="3">
                  <CImg
                    src={ViewImg + "/" + i.CUSTOMER_DOC3}
                    fluid
                    className="mb-2"
                    style={{ width: "100%" }}
                  />
                </CCol>
                <CCol md="3">
                  <CImg
                    src={ViewImg + "/" + i.CUSTOMER_DOC4}
                    fluid
                    className="mb-2"
                    style={{ width: "100%" }}
                  />
                </CCol>
                <CCol md="3">
                  <CImg
                    src={ViewImg + "/" + i.CUSTOMER_DOC5}
                    fluid
                    className="mb-2"
                    style={{ width: "100%" }}
                  />
                </CCol>
                <CCol md="3">
                  <CImg
                    src={ViewImg + "/" + i.CUSTOMER_DOC6}
                    fluid
                    className="mb-2"
                    style={{ width: "100%" }}
                  />
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock2(!block2)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={Block8} onClose={() => setBlock8(!Block8)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Remark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow style={{ padding: "0% 5% 0% 5% !important" }}>
            <CTextarea
              class="form-control"
              value={RejectRemark}
              onChange={(event) => {
                setRejectRemark(event.target.value);
              }}
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ height: "200px", fontSize: "16px" }}
            ></CTextarea>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock8(!Block8)}>
            Close
          </CButton>
          <CButton color="secondary" onClick={ConfirmReject}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
    </div >
  );
};

export default ViewCustomersRequest;
