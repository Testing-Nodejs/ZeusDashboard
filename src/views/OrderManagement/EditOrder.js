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
  CFormGroup,
  CButton,
  CForm,
  CInput,
  CLabel,
  CSelect,
  CDataTable,
} from "@coreui/react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [
  { key: "Sl No" },
  { key: "Company" },
  { key: "Species" },
  { key: "Product Name" },
  { key: "Package Size" },
  { key: "Quantity" },
  { key: "Package Amount" },
  { key: "Product Amount" },
  { key: "Discount(%)" },
  { key: "Free Unit Scheme(%)" },
  { key: "Total Amount" },
];

const EditOrder = (props) => {
  const OrderID = props.location.state.data.ORDER_PKID;
  const [CustomerDetails, setCustomerDetails] = useState({
    Cname: "",
    Cemail: "",
    Cpho: "",
    category: "",
    type: "",
    SubType: "",
    CustomerID: "",
    FirmName: "",
    Capacity: "",
    Superior: "",
    Cemail2: "",
    Cpho2: "",
    altZipCode: "",
  });
  const [ResponseData, setResponseData] = useState([]);
  const [CustomerAddress, setCustomerAddress] = useState([]);
  const [CustomerBillingAddress, setCustomerBillingAddress] = useState([]);
  const [SupplyTypeArr, setSupplyTypeArr] = useState([]);
  const [CompanyDetails, setCompanyDetails] = useState([]);
  const [SelectedAddress, setSelectedAddress] = useState();
  const [BillingAddress, setBillingAddress] = useState();

  const [Discount, setDiscount] = useState();
  const [FreeUnit, setFreeUnit] = useState();
  const [FinalAMount, setFinalAMount] = useState([]);
  const [PackageAmtval, setPackageAmtval] = useState();
  const [ProductAmount2, setProductAmount] = useState();
  const [PackageSelect, setPackageSelect] = useState();
  const [FinalResult, setFinalResult] = useState([]);

  const [OrderTypeIDNew, setOrderTypeIDNew] = useState();

  const [calculation, setcalculation] = useState({
    productamt: 0,
    totalamt: 0,
  });

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

  const [OrderDetails, setOrderDetails] = useState({
    Logistic: "",
    LogisticDestination: "",
    LogisticPaymode: "",
    CashDiscount: 0,
    Remark: "",
    DeliveryType: "",
    SupplyType: "",
    CompanyID: "",
    CustomerID: "",
  });
  var TotalAmount = 0;
  var ProductAmount = 0;

  const GetOrderDetails = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "getOrderDetailsForEdit/" + OrderID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        setCustomerDetails({
          ...CustomerDetails,
          Cname: response.data[0].customer_details[0].CUSTOMER_NAME,
          Cemail: response.data[0].customer_details[0].CUSTOMER_EMAIL,
          Cpho: response.data[0].customer_details[0].CUSTOMER_MOBILE,
          category: response.data[0].customer_details[0].CUSTOMER_CATEGORY_NAME,
          type: response.data[0].customer_details[0].CUSTOMER_TYPE_NAME,
          SubType: response.data[0].customer_details[0].CUSTOMER_SUBTYPE_NAME,
          CustomerID: response.data[0].customer_details[0].CUSTOMER_PKID,
          FirmName: response.data[0].customer_details[0].CUSTOMER_FIRM_NAME,
          Capacity: response.data[0].customer_details[0].CUSTOMER_CAPACITY,
          Superior: response.data[0].customer_details[0].EMPLOYEE_NAME,
          Cemail2: response.data[0].customer_details[0].CUSTOMER_EMAIL2,
          Cpho2: response.data[0].customer_details[0].CUSTOMER_ALT_MOBILE,
        });
        setCustomerAddress(response.data[0].customer_shipping_address);
        setCustomerBillingAddress(response.data[0].customer_billing_address);
        setCompanyDetails(response.data[0].company_details);
        const items = response.data[0].product_details.map((item, index) => {
          return {
            ...item,
            "Sl No": index + 1,
            Company: item.COMPANY_NAME,
            Species: item.PRODUCT_SPECIES_NAME,
            "Product Name": item.PRODUCT_NAME,
          };
        });
        setResponseData(items);

        setOrderTypeIDNew(
          response.data[0].order_details[0].ORDER_ORDER_TYPE_FKID);
        setOrderDetails({
          ...OrderDetails,
          Logistic: response.data[0].order_details[0].ORDER_LOGISTIC,
          OrderType: response.data[0].order_details[0].ORDER_TYPE_NAME,
          OrderTypeID: response.data[0].order_details[0].ORDER_ORDER_TYPE_FKID,
          LogisticDestination:
            response.data[0].order_details[0].ORDER_LOGISTIC_DESTINATION,
          LogisticPaymode:
            response.data[0].order_details[0].ORDER_LOGISTIC_PAY_MODE,
          CashDiscount: response.data[0].order_details[0].ORDER_CASH_DISCOUNT,
          Remark: response.data[0].order_details[0].ORDER_REMARK,
          DeliveryType: response.data[0].order_details[0].ORDER_DELIVERY_TYPE,
          SupplyType: response.data[0].order_details[0].ORDER_SUPPLY_TYPE,
          CompanyID: response.data[0].order_details[0].ORDER_COMPANY_FKID,
          CustomerID: response.data[0].order_details[0].ORDER_CUSTOMER_FKID,
        });
        setSelectedAddress(
          response.data[0].order_details[0].ORDER_SHIPPING_ADDRESS
        );
        setBillingAddress(
          response.data[0].order_details[0].ORDER_BILLING_ADDRESS
        );
        var objarr = [];
        const items2 = response.data[0].product_details.map((item, index) => {
          document.getElementById("Discount-" + item.PRODUCT_PKID + "").value =
            item.Discount;
          document.getElementById("FreeUnit-" + item.PRODUCT_PKID + "").value =
            item.FreeUnitScheme;
          document.getElementById("amount-" + item.PRODUCT_PKID + "").value =
            item.packageamount;
          document.getElementById(
            "requiredqth" + item.PRODUCT_PKID + ""
          ).value = item.quantity;
          document.getElementById("packagesel" + item.PRODUCT_PKID + "").value =
            item.PRODUCT_PKID + "/" + item.packageID + "/" + item.packagesize;
          if (item.quantity === "0" || item.quantity === 0) {
          } else {
            objarr.push(item.PRODUCT_PKID);
          }
        });
        setFinalResult(objarr);
        calculatesummaryFirst(objarr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DiscountCalculate = (event) => {
    setDiscount(event.target.value);
    if (
      event.target.value === "" ||
      event.target.value == null ||
      event.target.value === "0"
    ) {
    } else {
      let productID = event.target.id.split("-");
      let actialamt = document.getElementById(
        "producttotalam1" + productID[1] + ""
      ).innerHTML;
      let finalamt = actialamt - (event.target.value / 100) * actialamt;
      document.getElementById("producttotalam" + productID[1] + "").innerHTML =
        finalamt.toFixed(2);
      setFinalAMount(actialamt - (event.target.value / 100) * actialamt);
      calculatesummary();
    }
  };

  const CalculateFeeUnit = (event) => {
    setFreeUnit(event.target.value);
  };

  const PackageAmt = (event) => {
    setPackageAmtval(event.target.value);

    let productID = event.target.id.split("-");

    let packagesize = document
      .getElementById("packagesel" + productID[1] + "")
      .value.split("/");

    let requiredqty = document.getElementById(
      "requiredqth" + productID[1] + ""
    ).value;

    let finalamt = (requiredqty / packagesize[2]) * event.target.value;
    setFinalAMount(finalamt);
    setProductAmount(finalamt);
    document.getElementById("producttotalam1" + productID[1] + "").innerHTML =
      finalamt.toFixed(2);
    document.getElementById("producttotalam" + productID[1] + "").innerHTML =
      finalamt.toFixed(2);
    calculatesummary();
  };

  const calculatesummaryFirst = (arr) => {
    var ProductAmt = 0;
    var totalamt = 0;
    arr.map((i) => {
      ProductAmt =
        ProductAmt +
        parseFloat(
          document.getElementById("producttotalam1" + i + "").innerHTML
        );
      totalamt =
        totalamt +
        parseFloat(
          document.getElementById("producttotalam" + i + "").innerHTML
        );
    });
    setcalculation({
      ...calculation,
      productamt: ProductAmt,
      totalamt: totalamt,
    });
  };

  const calculatesummary = () => {
    var ProductAmt = 0;
    var totalamt = 0;
    FinalResult.map((i) => {
      ProductAmt =
        ProductAmt +
        parseFloat(
          document.getElementById("producttotalam1" + i + "").innerHTML
        );
      totalamt =
        totalamt +
        parseFloat(
          document.getElementById("producttotalam" + i + "").innerHTML
        );
    });
    setcalculation({
      ...calculation,
      productamt: ProductAmt,
      totalamt: totalamt,
    });
  };

  const SelectPackage = (event) => {
    setPackageSelect(event.target.value);
    let splt = event.target.value;
    let splt2 = splt.split("/");
    let myArray = [...FinalResult, parseInt(splt2[0])];
    var unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
    setFinalResult(unique);
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
        console.log(response.data);
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.SUPPLY_TYPE_PKID}>
            {item.SUPPLY_NAME}
          </option>
        ));
        setSupplyTypeArr(Option);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SelectAddress = (event) => {
    if (event.target.checked === true) {
      setSelectedAddress(event.target.value);
    }
  };

  const SelectAddress2 = (event) => {
    if (event.target.checked === true) {
      setBillingAddress(event.target.value);
    }
  };

  const PlaceOrder = () => {
    if (SelectedAddress === "" || SelectedAddress == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Delivery Address!",
      });
    } else if (BillingAddress === "" || BillingAddress == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Billing Address!",
      });
    } else if (OrderDetails.Logistic === "" || OrderDetails.Logistic == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Logistic!",
      });
    } else if (
      OrderDetails.LogisticDestination === "" ||
      OrderDetails.LogisticDestination == null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Logistic Destination!",
      });
    } else if (
      OrderDetails.LogisticPaymode === "" ||
      OrderDetails.LogisticPaymode == null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Logistic Payment mode!",
      });
    } else if (OrderDetails.Remark === "" || OrderDetails.Remark == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Remark!",
      });
    } else if (
      OrderDetails.DeliveryType === "" ||
      OrderDetails.DeliveryType == null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Delivery Type!",
      });
    } else if (
      OrderDetails.SupplyType === "" ||
      OrderDetails.SupplyType == null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Supply Type!",
      });
    } else {
      var arr = [];
      FinalResult.map((i) => {
        let packageSize = document
          .getElementById("packagesel" + i + "")
          .value.split("/");
        var obj = {
          ProductID: i,
          PackageID: packageSize[1],
          Quantity: document.getElementById("requiredqth" + i + "").value,
          PackageAmt: document.getElementById("amount-" + i + "").value,
          Discount: document.getElementById("Discount-" + i + "").value,
          FreeUnitScheme: document.getElementById("FreeUnit-" + i + "").value,
          FinalAmount: document.getElementById("producttotalam" + i + "")
            .innerHTML,
          ProductAmount: document.getElementById("producttotalam1" + i + "")
            .innerHTML,
        };
        arr.push(obj);
      });
      let obj = {
        OrderBy: localStorage.getItem("SessionType"),
        OrderByID: localStorage.getItem("SessionID"),
        OrderID: OrderID,
        DeliveryAddress: SelectedAddress,
        BillingAddress: BillingAddress,
        Products: arr,
        OrderDetails: OrderDetails,
        OrderAmount: Math.round((
          parseFloat(calculation.totalamt) -
          parseFloat((OrderDetails.CashDiscount / 100) * calculation.totalamt)
        ).toFixed(2)), 
      };
      console.log(obj);
      axios.post(MyApiUrl + "updatePlaceOrder", obj).then((response) => {
        console.log(response);
        if (response.data === true) {
          Swal.fire({
            title: "Order Details Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          history.goBack();
        } else {
          Swal.fire({
            title: "Failed To Update The Order!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  console.log(OrderTypeIDNew);
  React.useEffect(() => {
    GetOrderDetails();
    GetOrderSupplyType();
  }, []);
  let history = useHistory();
  return (
    <div>
      <h1 id="ccmaster">Update Order Details</h1>
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
                <CCol md="10"></CCol>
                <CCol md="1">
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      axios
                        .put(MyApiUrl + "DeletePlacedOrder/", OrderID)
                        .then((response) => {
                          console.log(response);
                          if (response.data === true) {
                            Swal.fire({
                              title: "Order Deleted Successfully!",
                              icon: "success",
                              confirmButtonText: "OK",
                            });
                            history.push("/MyOrders");
                          } else {
                            Swal.fire({
                              title: "Failed To Delete The Order!",
                              icon: "error",
                              confirmButtonText: "OK",
                            });
                          }
                        });
                    }}
                  >
                    Delete
                  </CButton>
                </CCol>
              </CRow>
              <br />
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Customer Details Details</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <table id="customerDetails" style={{ width: "100%" }}>
                            <tr>
                              <td style={{ borderRight: "1px solid #7e0103" }}>
                                <tr>
                                  <th>
                                    <b>Customer Name :</b>
                                  </th>
                                  <td>{CustomerDetails.Cname}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Email :</b>
                                  </th>
                                  <td>{CustomerDetails.Cemail}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Contact Number :</b>
                                  </th>
                                  <td>{CustomerDetails.Cpho}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Category :</b>
                                  </th>
                                  <td>{CustomerDetails.category}</td>
                                </tr>
                              </td>
                              <td style={{ borderRight: "1px solid #7e0103" }}>
                                <tr>
                                  <th>
                                    <b>Type :</b>
                                  </th>
                                  <td>{CustomerDetails.type}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Sub Type :</b>
                                  </th>
                                  <td>{CustomerDetails.SubType}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Capacity :</b>
                                  </th>
                                  <td>{CustomerDetails.Capacity}</td>
                                </tr>
                              </td>
                              <td>
                                <tr>
                                  <th>
                                    <b>Superior :</b>
                                  </th>
                                  <td>{CustomerDetails.Superior}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Alternate Email :</b>
                                  </th>
                                  <td>{CustomerDetails.Cemail2}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Alternate Number :</b>
                                  </th>
                                  <td>{CustomerDetails.Cpho2}</td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardHeader>Address Management</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="6">
                          <p
                            style={{
                              fontWeight: "700",
                              fontSize: "small",
                            }}
                          >
                            Delivery Address
                          </p>
                          <CRow>
                            {CustomerAddress.map((i, key) => {
                              if (i.status === 1) {
                                return (
                                  <CCol md="12" style={{ marginTop: "2%" }}>
                                    <div
                                      style={{
                                        boxShadow:
                                          "rgb(236 50 53) 1px 1px 3px 1px",
                                        padding: "4%",
                                      }}
                                    >
                                      <CInput
                                        type="radio"
                                        name="area"
                                        id="area"
                                        className="CheckBoxClass"
                                        placeholder=" "
                                        style={{ width: "7% !important" }}
                                        value={i.CUSTOMER_ADDRESS_PKID}
                                        onClick={SelectAddress}
                                        checked
                                      />
                                      <p
                                        style={{
                                          fontWeight: "700",
                                          fontSize: "small",
                                          float: "right",
                                          marginRight: "42%",
                                        }}
                                      >
                                        Address {key + 1}
                                      </p>
                                      <hr />
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS1}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS2}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS3}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ZIP_CODE}
                                      </p>
                                    </div>
                                  </CCol>
                                );
                              } else {
                                return (
                                  <CCol md="12" style={{ marginTop: "2%" }}>
                                    <div
                                      style={{
                                        boxShadow:
                                          "rgb(236 50 53) 1px 1px 3px 1px",
                                        padding: "4%",
                                      }}
                                    >
                                      <CInput
                                        type="radio"
                                        name="area"
                                        id="area"
                                        className="CheckBoxClass"
                                        placeholder=" "
                                        style={{ width: "7% !important" }}
                                        value={i.CUSTOMER_ADDRESS_PKID}
                                        onClick={SelectAddress}
                                      />
                                      <p
                                        style={{
                                          fontWeight: "700",
                                          fontSize: "small",
                                          float: "right",
                                          marginRight: "42%",
                                        }}
                                      >
                                        Address {key + 1}
                                      </p>
                                      <hr />
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS1}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS2}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS3}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ZIP_CODE}
                                      </p>
                                    </div>
                                  </CCol>
                                );
                              }
                            })}
                          </CRow>
                        </CCol>
                        <CCol md="6">
                          <p
                            style={{
                              fontWeight: "700",
                              fontSize: "small",
                            }}
                          >
                            Billing Address
                          </p>
                          <CRow>
                            {CustomerBillingAddress.map((i, key) => {
                              if (i.status === 1) {
                                return (
                                  <CCol md="12" style={{ marginTop: "2%" }}>
                                    <div
                                      style={{
                                        boxShadow:
                                          "rgb(236 50 53) 1px 1px 3px 1px",
                                        padding: "4%",
                                      }}
                                    >
                                      <CInput
                                        type="radio"
                                        name="area2"
                                        id="area"
                                        className="CheckBoxClass"
                                        placeholder=" "
                                        style={{ width: "7% !important" }}
                                        value={i.CUSTOMER_ADDRESS_PKID}
                                        onClick={SelectAddress2}
                                        checked
                                      />
                                      <p
                                        style={{
                                          fontWeight: "700",
                                          fontSize: "small",
                                          float: "right",
                                          marginRight: "42%",
                                        }}
                                      >
                                        Address {key + 1}
                                      </p>
                                      <hr />
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS1}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS2}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS3}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ZIP_CODE}
                                      </p>
                                    </div>
                                  </CCol>
                                );
                              } else {
                                return (
                                  <CCol md="12" style={{ marginTop: "2%" }}>
                                    <div
                                      style={{
                                        boxShadow:
                                          "rgb(236 50 53) 1px 1px 3px 1px",
                                        padding: "4%",
                                      }}
                                    >
                                      <CInput
                                        type="radio"
                                        name="area2"
                                        id="area"
                                        className="CheckBoxClass"
                                        placeholder=" "
                                        style={{ width: "7% !important" }}
                                        value={i.CUSTOMER_ADDRESS_PKID}
                                        onClick={SelectAddress2}
                                      />
                                      <p
                                        style={{
                                          fontWeight: "700",
                                          fontSize: "small",
                                          float: "right",
                                          marginRight: "42%",
                                        }}
                                      >
                                        Address {key + 1}
                                      </p>
                                      <hr />
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS1}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS2}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ADDRESS3}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          lineHeight: "1",
                                        }}
                                      >
                                        {i.CUSTOMER_ADDRESS_ZIP_CODE}
                                      </p>
                                    </div>
                                  </CCol>
                                );
                              }
                            })}
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardHeader>Selected Products</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <CDataTable
                            items={ResponseData}
                            fields={fields}
                            hover
                            striped
                            bordered
                            sorter
                            tableFilter={table}
                            itemsPerPage={10}
                            pagination
                            size="sm"
                            itemsPerPageSelect={items}
                            scopedSlots={{
                              "Discount(%)": (i) => {
                                return (
                                  <td>
                                    <CInput
                                      type="text"
                                      id={"Discount-" + i.PRODUCT_PKID}
                                      placeholder="Amount"
                                      required
                                      onChange={DiscountCalculate}
                                    />
                                  </td>
                                );
                              },
                              "Free Unit Scheme(%)": (i) => {
                                return (
                                  <td>
                                    <CInput
                                      type="text"
                                      id={"FreeUnit-" + i.PRODUCT_PKID}
                                      placeholder="Free Unit Scheme"
                                      required
                                      onChange={CalculateFeeUnit}
                                    />
                                  </td>
                                );
                              },
                              "Package Amount": (i) => {
                                return (
                                  <td>
                                    <CInput
                                      type="text"
                                      id={"amount-" + i.PRODUCT_PKID}
                                      placeholder="Amount"
                                      required
                                      onChange={PackageAmt}
                                    />
                                  </td>
                                );
                              },
                              "Product Amount": (i) => (
                                <td>
                                  <p id={"producttotalam1" + i.PRODUCT_PKID}>
                                    {i.ProductAmount}
                                  </p>
                                </td>
                              ),
                              "Total Amount": (i) => (
                                <td>
                                  <p id={"producttotalam" + i.PRODUCT_PKID}>
                                    {i.FinalAmount}
                                  </p>
                                </td>
                              ),
                              Quantity: (i) => {
                                return (
                                  <td
                                    className="TDClass"
                                    style={{ width: "20% !important" }}
                                  >
                                    <CRow>
                                      <CCol
                                        md="6"
                                        style={{ paddingRight: "0%" }}
                                      >
                                        <CInput
                                          type="text"
                                          id={"requiredqth" + i.PRODUCT_PKID}
                                          placeholder="Required"
                                          required
                                          style={{
                                            width: "100%",
                                            float: "left",
                                          }}
                                        />
                                      </CCol>
                                      <CCol
                                        md="6"
                                        style={{ paddingLeft: "0%" }}
                                      >
                                        <CInput
                                          type="text"
                                          id="Unit"
                                          placeholder="Required"
                                          readOnly
                                          style={{
                                            width: "100%",
                                            textAlign: "center",
                                            fontWeight: "700",
                                          }}
                                          value={
                                            i.UNIT_OF_MEASUREMENT_SHORT_KEY
                                          }
                                        />
                                      </CCol>
                                    </CRow>
                                  </td>
                                );
                              },
                              "Package Size": (i) => {
                                const Option = i.packagesArr.map((item, j) => (
                                  <option
                                    key={j}
                                    value={
                                      i.PRODUCT_PKID +
                                      "/" +
                                      item.PRD_PACKAG_PKID +
                                      "/" +
                                      item.PRD_PACKAGE_UNIT
                                    }
                                  >
                                    {item.PRD_PACKAGE_UNIT +
                                      " " +
                                      item.UNIT_OF_MEASUREMENT_SHORT_KEY}
                                  </option>
                                ));
                                return (
                                  <td>
                                    <CSelect
                                      custom
                                      name="addtype"
                                      id={"packagesel" + i.PRODUCT_PKID}
                                      onChange={SelectPackage}
                                    >
                                      <option value="-1">Select Package</option>
                                      {Option}
                                    </CSelect>
                                  </td>
                                );
                              },
                            }}
                          />
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardBody>
                      <CRow>
                        <CCol md="6">
                          <CCard>
                            <CCardHeader>More Details</CCardHeader>
                            <CCardBody>
                              <CForm
                                action=""
                                method="post"
                                encType="multipart/form-data"
                                className="form-horizontal"
                              >
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Order Type</CLabel>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Logistic"
                                      readOnly
                                      type="text"
                                      value={OrderDetails.OrderType}
                                    />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Logistic</CLabel>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Logistic"
                                      type="text"
                                      value={OrderDetails.Logistic}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          Logistic: event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Logistic Destination</CLabel>
                                    <CInput
                                      id="text-input"
                                      name="text-input"
                                      placeholder="Logistic Destination"
                                      value={OrderDetails.LogisticDestination}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          LogisticDestination:
                                            event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Logistic Payment Mode</CLabel>
                                    <CSelect
                                      custom
                                      name="Country"
                                      id="Country"
                                      value={OrderDetails.LogisticPaymode}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          LogisticPaymode: event.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select Pay Mode</option>
                                      <option value="Paid">Paid</option>
                                      <option value="To Pay">To Pay</option>
                                    </CSelect>
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Cash Discount ( % )</CLabel>
                                    <CInput
                                      id="text-input"
                                      name="text-input"
                                      placeholder="Cash Discount"
                                      value={OrderDetails.CashDiscount}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          CashDiscount: event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Remark</CLabel>
                                    <CInput
                                      id="text-input"
                                      name="text-input"
                                      placeholder="Remark"
                                      value={OrderDetails.Remark}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          Remark: event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Delivery Type</CLabel>
                                    <CInput
                                      id="text-input"
                                      name="text-input"
                                      placeholder="Delivery Type"
                                      value={OrderDetails.DeliveryType}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          DeliveryType: event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Supply Type</CLabel>
                                    <CSelect
                                      custom
                                      name="Country"
                                      id="Country"
                                      value={OrderDetails.SupplyType}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          SupplyType: event.target.value,
                                        });
                                      }}
                                    >
                                      <option value="-1">
                                        Select Supply Type
                                      </option>
                                      {SupplyTypeArr}
                                    </CSelect>
                                  </CCol>
                                </CFormGroup>
                              </CForm>
                            </CCardBody>
                          </CCard>
                        </CCol>
                        <CCol md="6">
                          <CCol md="12">
                            <CCard>
                              <CCardHeader>Company Details</CCardHeader>
                              <CCardBody>
                                {CompanyDetails.map((item) => {
                                  return (
                                    <table
                                      id="customerDetails"
                                      style={{ width: "100%" }}
                                    >
                                      <tr>
                                        <td>
                                          <tr>
                                            <th>
                                              <b>HQ :</b>
                                            </th>
                                            <td>{item.HQ_NAME}</td>
                                          </tr>
                                          <tr>
                                            <th>
                                              <b>Company Name :</b>
                                            </th>
                                            <td>{item.COMPANY_NAME}</td>
                                          </tr>
                                          <tr>
                                            <th>
                                              <b>Short Key :</b>
                                            </th>
                                            <td>{item.COMPANY_SHORT_KEY}</td>
                                          </tr>
                                          <tr>
                                            <th>
                                              <b>Company Email :</b>
                                            </th>
                                            <td>{item.COMPANY_EMAIL}</td>
                                          </tr>
                                          <tr>
                                            <th>
                                              <b>Company Number :</b>
                                            </th>
                                            <td>{item.COMPANY_PHONE}</td>
                                          </tr>
                                          <tr>
                                            <th>
                                              <b>Company Address :</b>
                                            </th>
                                            <td><p className="comaddress">{item.COMPANY_ADDRESS}</p></td>
                                          </tr>
                                        </td>
                                      </tr>
                                    </table>
                                  );
                                })}
                              </CCardBody>
                            </CCard>
                          </CCol>
                          <CCol md="12">
                            <CCard>
                              <CCardHeader>Order Summary</CCardHeader>
                              <CCardBody>
                                {OrderTypeIDNew === 3 || OrderTypeIDNew === 4 || OrderTypeIDNew === 5 ?
                                  <table id="customerDetails2">
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Product Amount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>-</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Discount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          -
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Actual Amount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          -
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Cash Discount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          -
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Grand Total :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          -
                                        </p>
                                      </td>
                                    </tr>
                                  </table> : <table id="customerDetails2">
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Product Amount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>{calculation.productamt.toFixed(2)}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Discount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {(
                                            parseFloat(calculation.productamt) -
                                            parseFloat(calculation.totalamt)
                                          ).toFixed(2)}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Actual Amount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {parseFloat(
                                            calculation.totalamt
                                          ).toFixed(2)}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Cash Discount :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {parseFloat(
                                            (OrderDetails.CashDiscount / 100) *
                                            calculation.totalamt
                                          ).toFixed(2)}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p>
                                          <b>Grand Total :</b>
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {Math.round((
                                            parseFloat(calculation.totalamt) -
                                            parseFloat(
                                              (OrderDetails.CashDiscount / 100) *
                                              calculation.totalamt
                                            )
                                          ).toFixed(2))}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                }

                              </CCardBody>
                            </CCard>
                          </CCol>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="12">
                  <CButton
                    color="primary"
                    size="sm"
                    onClick={PlaceOrder}
                    style={{ float: "right" }}
                  >
                    Update Order
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="2" />
      </CRow>
    </div>
  );
};

export default EditOrder;
