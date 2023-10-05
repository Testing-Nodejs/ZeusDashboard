/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
  CInput,
  CLink,
  CImg
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl, ViewImg } from "src/services/service";
import { Toast } from "src/services/SweetAlerts";
import EditIcon from "@material-ui/icons/Edit";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Status", _style: { width: "60%" } },
  { key: "Order Date" },
  { key: "Order Time" },
  { key: "Customer Name" },
  { key: "Order Items" },
  { key: "Company" },
  { key: "Order Number" },
  { key: "Order By" },
  { key: "Ordered Person" },
  { key: "Order Type" },
  { key: "Supply Type" },
  { key: "Day Till Now" },
  { key: "Billing Address" },
  { key: "Shipping Address" },
  { key: "Logistic" },
  { key: "Logistic Designation" },
  { key: "Logistic Payment Mode" },
  { key: "Delivery Type" },
  { key: "Cash Discount" },
  { key: "Grand Total" },
  { key: "Attachment" },
  { key: "Remark" },
];

const Distributor_Dashboard = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [BillingAddress, setBillingAddress] = useState([]);
  const [ShippingAddress, setShippingAddress] = useState([]);
  const [OrderRemark, setOrderRemark] = useState([]);
  const [block, setblock] = useState(false);
  const [block1, setblock1] = useState(false);
  const [block2, setblock2] = useState(false);
  const [block3, setblock3] = useState(false);
  const [OrderProcessRemark, setOrderProcessRemark] = useState([]);
  const [TentativeDate, setTentativeDate] = useState();

  // Filters

  const DistributerID = localStorage.getItem("DistributerID");

  const GetAllDistributorOrders = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getAllOrdersByDistributer/" + DistributerID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          return {
            ...item,
            "Day Till Now": item.HDays,
            "Order Number": item.ORDER_NUMBER,
            "Order By": item.ORDER_BY,
            "Ordered Person": item.TypeName,
            "Order Type": item.ORDER_TYPE_NAME,
            "Supply Type": item.SUPPLY_NAME,
            Company: item.COMPANY_NAME,
            "Customer Name": item.CUSTOMER_NAME,
            Logistic: item.ORDER_LOGISTIC,
            "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
            "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
            "Delivery Type": item.ORDER_DELIVERY_TYPE,
            "Cash Discount": item.ORDER_CASH_DISCOUNT + "%",
            "Grand Total": item.ORDER_ORDER_AMOUNT,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewBillingAddress = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "OrderBillingAddress/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setBillingAddress(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setblock(!block);
  };

  const ViewShippingAddress = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "OrderShippingAddress/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setShippingAddress(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setblock1(!block1);
  };

  const ViewOderRemark = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "OrderRemark/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setOrderRemark(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setblock2(!block2);
  };

  const ViewOderProcessRemark = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "OrderProcessRemark/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setOrderProcessRemark(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setblock3(!block3);
  };
  React.useEffect(() => {
    GetAllDistributorOrders();
  }, []);
  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">My Orders</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>My Orders</CCardHeader>
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
                        size="sm"
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          "Order Date": (i) => (
                            <td>{<DateFilter date={i.ORDER_DATE} />}</td>
                          ),
                          "Order Time": (i) => {
                            return (
                              <td>
                                {new Date(i.clock)
                                  .toISOString()
                                  .split("T")[1]
                                  .slice(0, -1)}
                              </td>
                            );
                          },
                          Attachment: (i) => {
                            let profile = "";
                            if (
                              i.ORD_DOC === "" ||
                              i.ORD_DOC === null
                            ) {
                              profile = "NoImage.png";
                            } else {
                              profile = i.ORD_DOC;
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
                          Status: (i) => {
                            if (
                              i.ORDER_STATUS === "0" ||
                              i.ORDER_STATUS === 0
                            ) {
                              return (
                                <td>
                                  <span className="PendingOrder">
                                    Pending / New
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "1" ||
                              i.ORDER_STATUS === 1
                            ) {
                              return (
                                <td>
                                  <span className="ApprovedOrders">
                                    Approved
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "2" ||
                              i.ORDER_STATUS === 2
                            ) {
                              return (
                                <td>
                                  <span className="Rejected">Rejected</span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "3" ||
                              i.ORDER_STATUS === 3
                            ) {
                              return (
                                <td>
                                  <span className="ScheduledOrders">
                                    Scheduling Order
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "4" ||
                              i.ORDER_STATUS === 4
                            ) {
                              return (
                                <td>
                                  <span className="ReadyForDispatchOrders">
                                    Ready For Dispatched
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "5" ||
                              i.ORDER_STATUS === 5
                            ) {
                              return (
                                <td>
                                  <span className="InvoiceOrders">
                                    Invoice Confirmed
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "6" ||
                              i.ORDER_STATUS === 6
                            ) {
                              return (
                                <td>
                                  <span className="DispatchedOrders">
                                    Dispatched
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "7" ||
                              i.ORDER_STATUS === 7
                            ) {
                              return (
                                <td>
                                  <span className="InvoiceGenerated">
                                    Invoice Uploaded
                                  </span>
                                </td>
                              );
                            } else if (
                              i.ORDER_STATUS === "8" ||
                              i.ORDER_STATUS === 8
                            ) {
                              return (
                                <td>
                                  <span className="ReadyForDelivery">
                                    Delivery Confirmed
                                  </span>
                                </td>
                              );
                            } else {
                              return (
                                <td>
                                  <span className="PendingOrder">
                                    Pending / New
                                  </span>
                                </td>
                              );
                            }
                          },
                          "Order Items": (i) => (
                            <td>
                              <CButton
                                onClick={() => {
                                  history.push("/OrderItems", {
                                    data: i,
                                  });
                                }}
                              >
                                {i.ItemCount}
                              </CButton>
                            </td>
                          ),
                          "Billing Address": (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewBillingAddress(i.ORDER_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Shipping Address": (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewShippingAddress(i.ORDER_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          Remark: (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewOderRemark(i.ORDER_PKID);
                                    }}
                                  >
                                    View
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
      <CModal show={block} onClose={() => setblock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Customer Billing Address</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {BillingAddress.map((i) => (
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
                    Billing Address
                  </p>
                  <table>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ADDRESS1}</td>
                    </tr>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ADDRESS2}</td>
                    </tr>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ADDRESS3}</td>
                    </tr>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ZIP_CODE}</td>
                    </tr>
                  </table>
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setblock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block1} onClose={() => setblock1(!block1)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Customer Shipping Address</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {ShippingAddress.map((i) => (
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
                    Shipping Address
                  </p>
                  <table>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ADDRESS1}</td>
                    </tr>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ADDRESS2}</td>
                    </tr>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ADDRESS3}</td>
                    </tr>
                    <tr>
                      <td>{i.CUSTOMER_ADDRESS_ZIP_CODE}</td>
                    </tr>
                  </table>
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setblock1(!block1)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block2} onClose={() => setblock2(!block2)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Order Remark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {OrderRemark.map((i) => (
              <React.Fragment>
                <CCol md="12">
                  <table>
                    <tr>
                      <td>{i.ORDER_REMARK}</td>
                    </tr>
                  </table>
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setblock2(!block2)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block3} onClose={() => setblock3(!block3)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Process Remark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {OrderProcessRemark.map((i) => (
              <React.Fragment>
                <CCol md="12">
                  <table>
                    <tr>
                      <td>{i.ORDER_REMARK_BY_PROCESSTEAM}</td>
                    </tr>
                  </table>
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setblock3(!block3)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Distributor_Dashboard;
