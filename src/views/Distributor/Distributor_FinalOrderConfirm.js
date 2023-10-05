/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
} from "@coreui/react";
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

const Distributor_FinalOrderConfirm = (props) => {

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

  const ProceductArray = props.location.state.arr;
  const companyID = props.location.state.CompanyID;
  const CustomerID = props.location.state.DisctributorID;
  console.log(CustomerID);
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
  const [OrderDetails, setOrderDetails] = useState({
    Logistic: "",
    LogisticDestination: "",
    LogisticPaymode: "",
    CashDiscount: 0,
    Remark: "",
    DeliveryType: "",
    SupplyType: "",
    OrderType: "2",
    Attachment: "",
    EmailReference: "",
  });
  let TotalAmount = 0;
  let ProductAmount = 0;
  const GetCustomerDetails = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "customerById/" + props.location.state.DisctributorID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setCustomerDetails({
          ...CustomerDetails,
          Cname: response.data[0].CUSTOMER_NAME,
          Cemail: response.data[0].CUSTOMER_EMAIL,
          Cpho: response.data[0].CUSTOMER_MOBILE,
          category: response.data[0].CUSTOMER_CATEGORY_NAME,
          type: response.data[0].CUSTOMER_TYPE_NAME,
          SubType: response.data[0].CUSTOMER_SUBTYPE_NAME,
          CustomerID: response.data[0].CUSTOMER_PKID,
          FirmName: response.data[0].CUSTOMER_FIRM_NAME,
          Capacity: response.data[0].CUSTOMER_CAPACITY,
          Superior: response.data[0].EMPLOYEE_NAME,
          Cemail2: response.data[0].CUSTOMER_EMAIL2,
          Cpho2: response.data[0].CUSTOMER_ALT_MOBILE,
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      method: "GET",
      url:
        MyApiUrl + "shipAddressbycustomer/" + props.location.state.DisctributorID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setCustomerAddress(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      method: "GET",
      url:
        MyApiUrl +
        "/billingAddressbycustomer/" +
        props.location.state.DisctributorID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setCustomerBillingAddress(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });

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
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      method: "GET",
      url: MyApiUrl + "getCompanyNamebyId/" + companyID,
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        setCompanyDetails(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetSelectedProduct = () => {
    document.getElementById("divLoading").className = "show";
    const obj = {
      arr: ProceductArray,
    };
    axios.post(MyApiUrl + "getOrderPlaceCustDetails", obj).then((response) => {
      setResponseData(response.data);
      document.getElementById("divLoading").className = "hide";
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

  const Attachment = (event) => {
    document.getElementById("divLoading").className = "show";
    var formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios.post(MyApiUrl + "upload", formData).then((response) => {
      setOrderDetails({
        ...OrderDetails,
        Attachment: response.data,
      });
      document.getElementById("divLoading").className = "hide";
    });
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
      document.getElementById("divLoading").className = "show";
      let obj = {
        OrderBy: "distributor",
        OrderByID: CustomerID,
        CustomerID: CustomerID,
        DeliveryAddress: SelectedAddress,
        BillingAddress: BillingAddress,
        CompanyID: companyID,
        Products: ProceductArray,
        OrderDetails: OrderDetails,
        OrderAmount: (
          parseFloat(TotalAmount) -
          parseFloat((OrderDetails.CashDiscount / 100) * TotalAmount)
        ).toFixed(2),
      };
      axios.post(MyApiUrl + "placeOrder", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Order Placed Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
          history.push("/Distributor_MyOrders");
        } else {
          Swal.fire({
            title: "Failed To Place The Order!",
            icon: "erro",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };
  React.useEffect(() => {
    GetCustomerDetails();
    GetSelectedProduct();
  }, []);
  let history = useHistory();
  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Order Item</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="2" />
        <CCol md="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
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
                            {CustomerAddress.map((i, key) => (
                              <CCol md="12" style={{ marginTop: "2%" }}>
                                <div
                                  style={{
                                    boxShadow: "rgb(236 50 53) 1px 1px 3px 1px",
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
                            ))}
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
                            {CustomerBillingAddress.map((i, key) => (
                              <CCol md="12" style={{ marginTop: "2%" }}>
                                <div
                                  style={{
                                    boxShadow: "rgb(236 50 53) 1px 1px 3px 1px",
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
                            ))}
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
                          <table id="OrderProducts">
                            <tr>
                              <th>Sl No</th>
                              <th>Company</th>
                              <th>Species</th>
                              <th>Product Name</th>
                              <th>Package Size</th>
                              <th>Quantity</th>
                              <th>Package Amount</th>
                              <th>Product Amount</th>
                              <th>Discount( % )</th>
                              <th>Free Unit Scheme</th>
                              <th>Total Amount</th>
                            </tr>
                            {ResponseData.map((i, key) => {
                              TotalAmount =
                                parseFloat(TotalAmount) +
                                parseFloat(i.FinalAmount);
                              ProductAmount =
                                parseFloat(ProductAmount) +
                                parseFloat(i.ProductAmount);
                              return (
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{i.COMPANY_NAME}</td>
                                  <td>{i.PRODUCT_SPECIES_NAME}</td>
                                  <td>{i.PRODUCT_NAME}</td>
                                  <td>
                                    {i.PackageID +
                                      " " +
                                      i.UNIT_OF_MEASUREMENT_SHORT_KEY}
                                  </td>
                                  <td>
                                    {i.Quantity +
                                      " " +
                                      i.UNIT_OF_MEASUREMENT_SHORT_KEY}
                                  </td>
                                  <td>{i.PackageAmt}</td>
                                  <td>{i.ProductAmount}</td>
                                  <td>{i.Discount + "%"}</td>
                                  <td>{i.FreeUnitScheme}</td>
                                  <td>{i.FinalAmount}</td>
                                </tr>
                              );
                            })}
                          </table>
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
                                      type="text"
                                      readOnly
                                      value="Regular"
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
                                    <CLabel>PO Number</CLabel>
                                    <CInput
                                      id="text-input"
                                      name="text-input"
                                      placeholder="PO Number"
                                      value={OrderDetails.EmailReference}
                                      onChange={(event) => {
                                        setOrderDetails({
                                          ...OrderDetails,
                                          EmailReference: event.target.value,
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
                                <CFormGroup row>
                                  <CCol xs="12" md="12">
                                    <CLabel>Attachment</CLabel>
                                    <CInput
                                      type="file"
                                      id="exampleInputName2"
                                      placeholder=" "
                                      onChange={Attachment}
                                    />
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
                                        <td
                                        >
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
                                            <td>{item.COMPANY_ADDRESS}</td>
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
                                <table id="customerDetails2">
                                  <tr>
                                    <td>
                                      <p>
                                        <b>Total Amount :</b>
                                      </p>
                                    </td>
                                    <td>
                                      <p>{(ProductAmount).toFixed(2)}</p>
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
                                        {(parseFloat(ProductAmount) -
                                          parseFloat(TotalAmount)).toFixed(2)}
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
                                          TotalAmount
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
                                        {(
                                          parseFloat(TotalAmount) -
                                          parseFloat(
                                            (OrderDetails.CashDiscount / 100) *
                                            TotalAmount
                                          )
                                        ).toFixed(2)}
                                      </p>
                                    </td>
                                  </tr>
                                </table>
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
                    Place Order
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

export default Distributor_FinalOrderConfirm;
