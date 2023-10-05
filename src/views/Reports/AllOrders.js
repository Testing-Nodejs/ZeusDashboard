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

const AllOrders = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [ResponseData2, setResponseData2] = useState([]);
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
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getAllOrders",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
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
            "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
            "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
            "Delivery Type": item.ORDER_DELIVERY_TYPE,
            "Cash Discount": item.ORDER_CASH_DISCOUNT + "%",
            "Grand Total": item.ORDER_ORDER_AMOUNT,
          };
        });
        setResponseData(items);
        GetOrderSupplyType();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "GET",
      url: MyApiUrl + "getAllOrdersImpoExpo",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData2(response.data);
        GetOrderSupplyType();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetOrderSupplyType = () => {
    document.getElementById("divLoading").className = "show";
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
      document.getElementById("divLoading").className = "show";
      axios({
        method: "GET",
        url: MyApiUrl + "getAllOrdersByDate/" + fromDate + "/" + toDate,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          const items = response.data.map((item, index) => {
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
              "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
              "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
              "Delivery Type": item.ORDER_DELIVERY_TYPE,
              "Cash Discount": item.ORDER_CASH_DISCOUNT,
              "Grand Total": item.ORDER_ORDER_AMOUNT,
            };
          });
          setResponseData(items);
          document.getElementById("divLoading").className = "hide";
        })
        .catch((error) => {
          console.log(error);
        });
      axios({
        method: "GET",
        url:
          MyApiUrl + "getAllOrdersImpoExpoByDate/" + fromDate + "/" + toDate,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          setResponseData2(response.data);
          document.getElementById("divLoading").className = "hide";
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

  const ToExcel = () => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Status","Order Date","Order Time","Time Till Now","Order Number","Order By","Order Placed By","Order Items","Supply Type","Company","Customer Name","Logistic","Logistic Designation","Logistic Payment Mode","Delivery Type","Cash Discount","Grand Total","Product Name","Unit","Quantity","MRP","Customer Price","Total Amount","Discount","Free Unit/Scheme","Item Total Amount"'
    );
    let Status = "";
    ResponseData2.map((item) => {
      if (item.ORDER_STATUS === "0" || item.ORDER_STATUS === 0) {
        Status = "Pending / New";
      } else if (item.ORDER_STATUS === "1" || item.ORDER_STATUS === 1) {
        Status = "Approved";
      } else if (item.ORDER_STATUS === "2" || item.ORDER_STATUS === 2) {
        Status = "Denied";
      } else if (item.ORDER_STATUS === "3" || item.ORDER_STATUS === 3) {
        Status = "Scheduling Order";
      } else if (item.ORDER_STATUS === "4" || item.ORDER_STATUS === 4) {
        Status = "Ready For Dispatched";
      } else if (item.ORDER_STATUS === "5" || item.ORDER_STATUS === 5) {
        Status = "Invoice Confirmed";
      } else if (item.ORDER_STATUS === "6" || item.ORDER_STATUS === 6) {
        Status = "Dispatched";
      } else if (item.ORDER_STATUS === "7" || item.ORDER_STATUS === 7) {
        Status = "Invoice Uploaded";
      } else if (item.ORDER_STATUS === "8" || item.ORDER_STATUS === 8) {
        Status = "Delivery Confirmed";
      } else {
        Status = "Denied";
      }
      let idate = new Date(
        new Date(item.ORDER_DATE).toISOString().split("T")[0]
      );
      let dateMDY = `${idate.getDate().toString().padStart(2, "0")}-${(
        idate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate.getFullYear()}`;

      let OrderTime = new Date(item.clock)
        .toISOString()
        .split("T")[1]
        .slice(0, -1);
      return (
        cnt++,
        csvData.push(
          '"' +
            cnt +
            '","' +
            Status +
            '","' +
            dateMDY +
            '","' +
            OrderTime +
            '","' +
            item.hrs +
            ' hrs","' +
            item.ORDER_NUMBER +
            '","' +
            item.ORDER_BY +
            '","' +
            item.TypeName +
            '","' +
            item.ItemCount +
            '","' +
            item.SUPPLY_NAME +
            '","' +
            item.COMPANY_NAME +
            '","' +
            item.CUSTOMER_NAME +
            '","' +
            item.ORDER_LOGISTIC +
            '","' +
            item.ORDER_LOGISTIC_DESTINATION +
            '","' +
            item.ORDER_LOGISTIC_PAY_MODE +
            '","' +
            item.ORDER_DELIVERY_TYPE +
            '","' +
            item.ORDER_CASH_DISCOUNT +
            '","' +
            item.ORDER_ORDER_AMOUNT +
            '","' +
            item.PRODUCT_NAME +
            '","' +
            item.PRD_PACKAGE_UNIT +
            " " +
            item.UNIT_OF_MEASUREMENT_SHORT_KEY +
            '","' +
            item.ORDER_ITEM_QTY +
            " " +
            item.UNIT_OF_MEASUREMENT_SHORT_KEY +
            '","' +
            item.PRD_PACKAGE_MRP +
            '","' +
            item.ORDER_ITEM_CUSTOMER_PRICE +
            '","' +
            item.ORDER_ITEM_TOTAL_AMOUNT +
            '","' +
            item.ORDER_ITEM_DISCOUNT +
            '","' +
            item.ORDER_ITEM_FREE_UNIT_SCHEME +
            '","' +
            item.ORDER_ITEM_ACTUAL_AMOUNT +
            '"'
        )
      );
    });

    const fileName = "AllOrders.csv";
    const buffer = csvData.join("\n");
    const blob = new Blob([buffer], {
      type: "text/csv;charset=utf8;",
    });

    //IN IE
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", fileName);
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
    }
    document.getElementById("divLoading").className = "hide";
  };

  React.useEffect(() => {
    GetAllPendingOrder();
  }, []);
  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">All Orders</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
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
                              document.getElementById("divLoading").className = "show";
                              axios({
                                method: "GET",
                                url:
                                  MyApiUrl +
                                  "/getAllOrdersBySupplyType/" +
                                  event.target.value,
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
                                        "Grand Total": item.ORDER_ORDER_AMOUNT,
                                      };
                                    }
                                  );
                                  setResponseData(items);
                                  document.getElementById("divLoading").className = "hide";
                                })
                                .catch((error) => {
                                  console.log(error);
                                });

                              axios({
                                method: "GET",
                                url:
                                  MyApiUrl +
                                  "/getAllOrdersImpoExpoBySupplyType/" +
                                  event.target.value,
                                headers: {
                                  "content-type": "application/json",
                                },
                              })
                                .then((response) => {
                                  console.log(response.data);
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
                                        "Grand Total": item.ORDER_ORDER_AMOUNT,
                                      };
                                    }
                                  );
                                  setResponseData(items);
                                  document.getElementById("divLoading").className = "hide";
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
                              document.getElementById("divLoading").className = "show";
                              axios({
                                method: "GET",
                                url:
                                  MyApiUrl +
                                  "/getAllOrdersByMonth/" +
                                  event.target.value,
                                headers: {
                                  "content-type": "application/json",
                                },
                              })
                                .then((response) => {
                                  setResponseData(response.data);
                                  document.getElementById("divLoading").className = "hide";
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                              axios({
                                method: "GET",
                                url:
                                  MyApiUrl +
                                  "/getAllOrdersImpoExpoByMonth/" +
                                  event.target.value,
                                headers: {
                                  "content-type": "application/json",
                                },
                              })
                                .then((response) => {
                                  setResponseData2(response.data);
                                  document.getElementById("divLoading").className = "hide";
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
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol col="6">All Orders</CCol>
                        <CCol col="6">
                          <CButton
                            onClick={ToExcel}
                            color="primary"
                            style={{
                              marginTop: "0%",
                            }}
                            size="sm"
                            id="AddEmp"
                          >
                            Export To Excel
                          </CButton>
                        </CCol>
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
                                  <span className="Denied">Denied</span>
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

export default AllOrders;
