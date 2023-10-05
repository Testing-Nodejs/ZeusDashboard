/* eslint-disable react-hooks/exhaustive-deps */
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
  CLabel,
  CInput,
  CSelect,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import { Toast } from "src/services/SweetAlerts";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Status", _style: { width: "60%" } },
  { key: "Order Date" },
  { key: "Order Time" },
  { key: "Time Till Now" },
  { key: "Days Till Now" },
  { key: "Order Number" },
  { key: "Order By" },
  { key: "Order Placed By" },
  { key: "Order Items" },
  { key: "Supply Type" },
  { key: "Company" },
  { key: "Customer Name" },
  { key: "Billing Address" },
  { key: "Shipping Address" },
  { key: "Logistic" },
  { key: "Logistic Designation" },
  { key: "Logistic Payment Mode" },
  { key: "Delivery Type" },
  { key: "Cash Discount" },
  { key: "Grand Total" },
  { key: "Remark" },
];

const TotalOrdersFromCompany = (props) => {
  const CompanyID = props.location.state.data.CompanyID;
  const COMPANY_NAME = props.location.state.data.CompanyName;
  const [ResponseData, setResponseData] = useState([]);
  const [BillingAddress, setBillingAddress] = useState([]);
  const [ShippingAddress, setShippingAddress] = useState([]);
  const [OrderRemark, setOrderRemark] = useState([]);
  const [fromDate, setfromDate] = useState();
  const [Otype, setOtype] = useState();
  const [Omonth, setOmonth] = useState();
  const [toDate, settoDate] = useState();
  const [block, setblock] = useState(false);
  const [block1, setblock1] = useState(false);
  const [block2, setblock2] = useState(false);

  // Filters

  const [OderSupplyType, setOderSupplyType] = useState([]);

  const GetAllPendingOrder = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "getAllOrdersByCompId/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map(
          (item, index) => {
            return {
              ...item,
              "Time Till Now": item.hrs + " hrs",
              "Days Till Now": item.HDays,
              "Order Number": item.ORDER_NUMBER,
              "Order By": item.ORDER_BY,
              "Order Placed By": item.TypeName,
              "Supply Type": item.SUPPLY_NAME,
              Company: item.COMPANY_NAME,
              "Customer Name": item.CUSTOMER_NAME,
              Logistic: item.ORDER_LOGISTIC,
              "Logistic Designation":
                item.ORDER_LOGISTIC_DESTINATION,
              "Logistic Payment Mode":
                item.ORDER_LOGISTIC_PAY_MODE,
              "Delivery Type":
                item.ORDER_DELIVERY_TYPE,
              "Cash Discount":
                item.ORDER_CASH_DISCOUNT,
              "Grand Total":
                item.ORDER_ORDER_AMOUNT,
            };
          }
        );
        setResponseData(items);
        GetOrderSupplyType();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetOrderSupplyType = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "OrderSupplyType",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.SUPPLY_TYPE_PKID}>
            {item.SUPPLY_NAME}
          </option>
        ));
        setOderSupplyType(Option);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewBillingAddress = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "OrderBillingAddress/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setBillingAddress(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setblock(!block);
  };

  const ViewShippingAddress = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "OrderShippingAddress/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setShippingAddress(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setblock1(!block1);
  };

  const ViewOderRemark = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "OrderRemark/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setOrderRemark(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setblock2(!block2);
  };

  const FilterDates = () => {
    if (fromDate === "" || fromDate == null) {
      Toast.fire({
        icon: "warning",
        title: "Select From Date!",
      });
    } else if (toDate === "" || toDate == null) {
      Toast.fire({
        icon: "warning",
        title: "Select To Date!",
      });
    } else {
      axios({
        method: "GET",
        url:
          MyApiUrl +
          "/getAllOrdersByCompIdByDate/" +
          fromDate +
          "/" +
          toDate +
          "/" +
          CompanyID,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          const items = response.data.map(
            (item, index) => {
              return {
                ...item,
                "Time Till Now": item.hrs + " hrs",
                "Days Till Now": item.HDays,
                "Order Number": item.ORDER_NUMBER,
                "Order By": item.ORDER_BY,
                "Order Placed By": item.TypeName,
                "Supply Type": item.SUPPLY_NAME,
                Company: item.COMPANY_NAME,
                "Customer Name": item.CUSTOMER_NAME,
                Logistic: item.ORDER_LOGISTIC,
                "Logistic Designation":
                  item.ORDER_LOGISTIC_DESTINATION,
                "Logistic Payment Mode":
                  item.ORDER_LOGISTIC_PAY_MODE,
                "Delivery Type":
                  item.ORDER_DELIVERY_TYPE,
                "Cash Discount":
                  item.ORDER_CASH_DISCOUNT,
                "Grand Total":
                  item.ORDER_ORDER_AMOUNT,
              };
            }
          );
          setResponseData(items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const FilterReset = () => {
    GetAllPendingOrder();
    setfromDate("");
    settoDate("");
    setOtype("0");
    setOmonth("0");
  };

  React.useEffect(() => {
    GetAllPendingOrder();
  }, []);
  let history = useHistory();
  return (
    <div id="city">
      <h1 id="ccmaster">All Orders From {COMPANY_NAME}</h1>
      <br />
      <br />
      <CRow>
        <CCol col="12">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol md="1">
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </CButton>
                </CCol>
              </CRow>
              <br />
              <CRow>
                <CCol>
                  <CCard>
                    <CCardBody>
                      <CRow>
                        <CCol md="2">
                          <CLabel htmlFor="nf-email">Select Order Type</CLabel>
                          <CSelect
                            custom
                            name="merchant"
                            value={Otype}
                            onChange={(event) => {
                              axios({
                                method: "GET",
                                url:
                                  MyApiUrl +
                                  "/getAllOrdersByCompIdBySupplyType/" +
                                  event.target.value +
                                  "/" +
                                  CompanyID,
                                headers: {
                                  "content-type": "application/json",
                                },
                              })
                                .then((response) => {
                                  const items = response.data.map(
                                    (item, index) => {
                                      return {
                                        ...item,
                                        "Time Till Now": item.hrs + " hrs",
                                        "Days Till Now": item.HDays,
                                        "Order Number": item.ORDER_NUMBER,
                                        "Order By": item.ORDER_BY,
                                        "Order Placed By": item.TypeName,
                                        "Supply Type": item.SUPPLY_NAME,
                                        Company: item.COMPANY_NAME,
                                        "Customer Name": item.CUSTOMER_NAME,
                                        Logistic: item.ORDER_LOGISTIC,
                                        "Logistic Designation":
                                          item.ORDER_LOGISTIC_DESTINATION,
                                        "Logistic Payment Mode":
                                          item.ORDER_LOGISTIC_PAY_MODE,
                                        "Delivery Type":
                                          item.ORDER_DELIVERY_TYPE,
                                        "Cash Discount":
                                          item.ORDER_CASH_DISCOUNT,
                                        "Grand Total":
                                          item.ORDER_ORDER_AMOUNT,
                                      };
                                    }
                                  );
                                  setResponseData(items);
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            }}
                            id="merchant"
                          >
                            <option value="0">All</option>
                            {OderSupplyType}
                          </CSelect>
                        </CCol>
                        <CCol md="2">
                          <CLabel htmlFor="nf-email">Select Month</CLabel>
                          <CSelect
                            custom
                            name="Marchant"
                            id="Marchant"
                            value={Omonth}
                            onChange={(event) => {
                              axios({
                                method: "GET",
                                url:
                                  MyApiUrl +
                                  "/getAllOrdersByCompIdByMonth/" +
                                  event.target.value +
                                  "/" +
                                  CompanyID,
                                headers: {
                                  "content-type": "application/json",
                                },
                              })
                                .then((response) => {
                                  const items = response.data.map(
                                    (item, index) => {
                                      return {
                                        ...item,
                                        "Time Till Now": item.hrs + " hrs",
                                        "Days Till Now": item.HDays,
                                        "Order Number": item.ORDER_NUMBER,
                                        "Order By": item.ORDER_BY,
                                        "Order Placed By": item.TypeName,
                                        "Supply Type": item.SUPPLY_NAME,
                                        Company: item.COMPANY_NAME,
                                        "Customer Name": item.CUSTOMER_NAME,
                                        Logistic: item.ORDER_LOGISTIC,
                                        "Logistic Designation":
                                          item.ORDER_LOGISTIC_DESTINATION,
                                        "Logistic Payment Mode":
                                          item.ORDER_LOGISTIC_PAY_MODE,
                                        "Delivery Type":
                                          item.ORDER_DELIVERY_TYPE,
                                        "Cash Discount":
                                          item.ORDER_CASH_DISCOUNT,
                                        "Grand Total":
                                          item.ORDER_ORDER_AMOUNT,
                                      };
                                    }
                                  );
                                  setResponseData(items);
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            }}
                          >
                            <option value="0">All</option>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">Jun</option>
                            <option value="7">Jul</option>
                            <option value="8">Aug</option>
                            <option value="9">Sept</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                          </CSelect>
                        </CCol>
                        <CCol md="2">
                          <CLabel>From:</CLabel>
                          <CInput
                            type="date"
                            onChange={(event) => {
                              setfromDate(event.target.value);
                            }}
                            value={fromDate}
                          />
                        </CCol>

                        <CCol md="2">
                          <CLabel>To:</CLabel>
                          <CInput
                            type="date"
                            onChange={(event) => {
                              settoDate(event.target.value);
                            }}
                            value={toDate}
                          />
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            color="info"
                            style={{ marginTop: "28px", width: "100%" }}
                            onClick={FilterDates}
                          >
                            Filter
                          </CButton>
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            color="danger"
                            style={{ marginTop: "28px", width: "100%" }}
                            onClick={FilterReset}
                          >
                            Reset
                          </CButton>
                        </CCol>
                      </CRow>
                      <hr />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol col="12">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol col="6">All Orders</CCol>
                        <CCol col="6"></CCol>
                      </CRow>
                    </CCardHeader>
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
                                <CCol md="10">
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
                                <CCol md="10">
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
                                <CCol md="10">
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
                  <p
                    style={{
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      borderBottom: "1px solid #ebedef",
                      paddingBottom: "5%",
                    }}
                  >
                    Remark
                  </p>
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
    </div>
  );
};

export default TotalOrdersFromCompany;
