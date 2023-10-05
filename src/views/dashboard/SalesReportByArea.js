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
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
  CButton,
  CLabel,
  CSelect,
  CInput,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import DateFilter from "../masters/DateFilter";
import { Toast } from "src/services/SweetAlerts";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };

const SalesReportByArea = (props) => {
  console.log(props);
  const CompanyID = props.location.state.data.CompanyID;
  const COMPANY_NAME = props.location.state.data.COMPANY_NAME;

  const [ResponseData, setResponseData] = useState([]);
  const [AllArea, setAllArea] = useState([]);
  const [block, setblock] = useState(false);
  const [block1, setblock1] = useState(false);
  const [block2, setblock2] = useState(false);
  const [BillingAddress, setBillingAddress] = useState([]);
  const [ShippingAddress, setShippingAddress] = useState([]);
  const [OrderRemark, setOrderRemark] = useState([]);
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();


  const GetEmployeeOrders = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetOrdWithArea/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData(response.data);
        GetAreaList();
      })
      .catch((error) => {
        console.log(error);
      });
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
        url: MyApiUrl + "GetOrdWithAreaByDate/" + fromDate + "/" + toDate + "/" + CompanyID,
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
    }
  };

  const FilterReset = () => {
    GetEmployeeOrders();
    setfromDate("");
    settoDate("");
  };

  const GetAreaList = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetAllOrdArea/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.CUSTOMER_AREA_FKID}>
            {item.VILLAGE_NAME + "( " + item.ordcnt + " )"}
          </option>
        ));
        setAllArea(Option);
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

  const ToExcel = () => {
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Area","Status","Order Date","Order Time","Time Till Now","Order Number","Order By","Order Placed By","Order Items","Supply Type","Company","Customer Name","Logistic","Logistic Designation","Logistic Payment Mode","Delivery Type","Cash Discount","Grand Total"'
    );
    let Status = "";
    ResponseData.map((item) => {
      Status = "Delivery Confirmed";
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
          item.VILLAGE_NAME +
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
          '"'
        )
      );
    });

    const fileName = "Orders List.csv";
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
  };

  React.useEffect(() => {
    GetEmployeeOrders();
  }, []);
  let history = useHistory();
  return (
    <div>
      <h1 id="ccmaster">Area Wise Sales</h1>
      <br />
      <CRow>
        <CCol md="2" />
        <CCol md="12">
          <CCard>
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
                        <CCol md="3">
                          <CLabel htmlFor="nf-email">Select Area</CLabel>
                          <CSelect
                            custom
                            name="merchant"
                            onChange={(event) => {
                              if (event.target.value === "0") {
                                GetEmployeeOrders();
                              } else {
                                axios({
                                  method: "GET",
                                  url:
                                    MyApiUrl +
                                    "/GetOrdByArea/" +
                                    CompanyID +
                                    "/" +
                                    event.target.value,
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
                              }
                            }}
                            id="merchant"
                          >
                            <option value="0">
                              All ({ResponseData.length} )
                            </option>
                            {AllArea}
                          </CSelect>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol col="2">Order Details</CCol>
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
                        <CCol md="2">
                          <CButton
                            onClick={ToExcel}
                            color="primary"
                            style={{
                              marginTop: "28px", width: "100%"
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
                      <CRow>
                        <CCol md="12">
                          <div style={{ overflow: "auto" }}>
                            <table id="Attendence">
                              <thead>
                                <tr>
                                  <th>Sl</th>
                                  <th>Status</th>
                                  <th>Order Date</th>
                                  <th>Order Time</th>
                                  <th>Customer Name</th>
                                  <th>Order Items</th>
                                  <th>Company</th>
                                  <th>Order Number</th>
                                  <th>Order By</th>
                                  <th>Ordered Person</th>
                                  <th>Order Type</th>
                                  <th>Supply Type</th>
                                  <th>Days Till Now</th>
                                  <th>Billing Address</th>
                                  <th>Shipping Address</th>
                                  <th>Logistic</th>
                                  <th>Logistic Designation</th>
                                  <th>Logistic Payment Mode</th>
                                  <th>Delivery Type</th>
                                  <th>Cash Discount</th>
                                  <th>Grand Total</th>
                                  <th>Remark</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ResponseData.map((i, index) => {
                                  let cname = "";
                                  cname =
                                    '<td><span class="ReadyForDelivery">Delivery Confirmed </span></td>';
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: cname,
                                          }}
                                        />
                                      </td>
                                      <td>
                                        {<DateFilter date={i.ORDER_DATE} />}
                                      </td>
                                      <td>
                                        {new Date(i.clock)
                                          .toISOString()
                                          .split("T")[1]
                                          .slice(0, -1)}
                                      </td>
                                      <td>{i.CUSTOMER_NAME}</td>
                                      <td>
                                        <CButton
                                          style={{ float: "none" }}
                                          onClick={() => {
                                            history.push("/OrderItems", {
                                              data: i,
                                            });
                                          }}
                                        >
                                          {i.ItemCount}
                                        </CButton>
                                      </td>
                                      <td>{i.COMPANY_NAME}</td>
                                      <td>{i.ORDER_NUMBER}</td>
                                      <td>{i.ORDER_BY}</td>
                                      <td>{i.TypeName}</td>
                                      <td>{i.ORDER_TYPE_NAME}</td>
                                      <td>{i.SUPPLY_NAME}</td>
                                      <td>{i.HDays}</td>
                                      <td>
                                        <CButton
                                          style={{ float: "none" }}
                                          color="primary"
                                          size="sm"
                                          id="AddEmp"
                                          onClick={() => {
                                            ViewBillingAddress(i.ORDER_PKID);
                                          }}
                                        >
                                          View
                                        </CButton>
                                      </td>
                                      <td>
                                        <CButton
                                          color="primary"
                                          size="sm"
                                          id="AddEmp"
                                          style={{ float: "none" }}
                                          onClick={() => {
                                            ViewShippingAddress(i.ORDER_PKID);
                                          }}
                                        >
                                          View
                                        </CButton>
                                      </td>
                                      <td>{i.ORDER_LOGISTIC}</td>
                                      <td>{i.ORDER_LOGISTIC_DESTINATION}</td>
                                      <td>{i.ORDER_LOGISTIC_PAY_MODE}</td>
                                      <td>{i.ORDER_DELIVERY_TYPE}</td>
                                      <td>{i.ORDER_CASH_DISCOUNT}</td>
                                      <td>{i.ORDER_ORDER_AMOUNT}</td>
                                      <td>
                                        <CButton
                                          color="primary"
                                          size="sm"
                                          id="AddEmp"
                                          style={{ float: "none" }}
                                          onClick={() => {
                                            ViewOderRemark(i.ORDER_PKID);
                                          }}
                                        >
                                          View
                                        </CButton>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="2" />
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

export default SalesReportByArea;
