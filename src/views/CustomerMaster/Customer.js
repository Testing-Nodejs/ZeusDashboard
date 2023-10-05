/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 16:48:42
 * @modify date 2021-12-06 15:18:44
 * @desc [description]
 */

import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { MyApiUrl } from "src/services/service";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CLink,
} from "@coreui/react";
import "../../../src/style.css";
import "../../style.css";

const Customer = () => {
  const history = useHistory();

  const [CategoryData, setCategoryData] = useState([]);
  const [TypeData, setTypeData] = useState([]);
  const [SubTypeData, setSubTypeData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [UnitData, setUnitData] = useState([]);
  const [AreaData, setAreaData] = useState([]);

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

  const [CustomerFeilds, setCustomerFeilds] = useState({
    Category: "-1",
    type: "-1",
    Subtype: "-1",
    Unit: "-1",
    CustNo: "",
    GstNo: "",
    Name: "",
    Email: "",
    Email2: "",
    PhoCode: "",
    PhoneNumber: "",
    AltPhoCode: "",
    AlterNateNumber: "",
    Capacity: "",
    Manager: "-1",
    Area: "-1",
    Profile: "",
    password: "",
    Doc1: "",
    Doc2: "",
    Doc3: "",
    Doc4: "",
    Doc5: "",
    Doc6: "",
    ContactPersonName: "",
    ContactPersonEmail: "",
    ContactPersonEmail2: "",
    ContactPersonPhoCode: "",
    ContactPersonPho: "",
    ContactPersonPho2Code: "",
    ContactPersonPho2: "",
    ContactPersonName_2: "",
    ContactPersonEmail_2: "",
    ContactPersonEmail2_2: "",
    ContactPersonPho_Code: "",
    ContactPersonPho_2: "",
    ContactPersonPho_2Code: "",
    ContactPersonPho2_2: "",
  });

  const GetCountryCode = (id) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "CountryCodeByArea/" + id + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setCustomerFeilds({
          ...CustomerFeilds,
          PhoCode: response.data[0].COUNTRY_CODE,
          AltPhoCode: response.data[0].COUNTRY_CODE,
          ContactPersonPhoCode: response.data[0].COUNTRY_CODE,
          ContactPersonPho2Code: response.data[0].COUNTRY_CODE,
          ContactPersonPho_Code: response.data[0].COUNTRY_CODE,
          ContactPersonPho_2Code: response.data[0].COUNTRY_CODE,
          Area: id,
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const GetCustomerCategory = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "custcat",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.CUSTOMER_CATEGORY_PKID}>
            {item.CUSTOMER_CATEGORY_NAME}
          </option>
        ));
        setCategoryData(Option);
        GetCustomerType();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetCustomerType = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "custtype",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.CUSTOMER_TYPE_PKID}>
            {item.CUSTOMER_TYPE_NAME}
          </option>
        ));
        setTypeData(Option);
        GetAllManagers();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetCustomerSubType = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "custsubtypebytype/" + pkid,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.CUSTOMER_SUBTYPE_PKID}>
            {item.CUSTOMER_SUBTYPE_NAME}
          </option>
        ));
        setSubTypeData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetAllManagers = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getAllManagers",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.EMPLOYEE_PKID}>
            {item.EMPLOYEE_NAME}
          </option>
        ));
        setManagerData(Option);
        GetCustomerUnit();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetManagerArea = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetTalukByEmployee/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.TALUK_PKID}>
            {item.TALUK_NAME}
          </option>
        ));
        setAreaData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const GetCustomerUnit = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "custunits",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.UNIT_PKID}>
            {item.UNIT_NAME}
          </option>
        ));
        setUnitData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const AddCustomer = () => {
    let lastAtPos = CustomerFeilds.Email.lastIndexOf("@");
    let lastDotPos = CustomerFeilds.Email.lastIndexOf(".");

    let lastAtPos1 = CustomerFeilds.Email2.lastIndexOf("@");
    let lastDotPos1 = CustomerFeilds.Email2.lastIndexOf(".");

    let lastAtPos2 = CustomerFeilds.ContactPersonEmail.lastIndexOf("@");
    let lastDotPos2 = CustomerFeilds.ContactPersonEmail.lastIndexOf(".");

    let lastAtPos3 = CustomerFeilds.ContactPersonEmail2.lastIndexOf("@");
    let lastDotPos3 = CustomerFeilds.ContactPersonEmail2.lastIndexOf(".");

    if (CustomerFeilds.Name === "" || CustomerFeilds.Name === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Customer Name!",
      });
    }
    // else if (CustomerFeilds.CustNo === "" || CustomerFeilds.CustNo === "") {

    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Customer Number!",
    //   });
    // } else if (CustomerFeilds.GstNo === "" || CustomerFeilds.GstNo === "") {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter GST Number!",
    //   });
    // } 
    else if (CustomerFeilds.Category === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Customer Category!",
      });
    } else if (CustomerFeilds.type === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Customer Type!",
      });
    } else if (CustomerFeilds.Subtype === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Customer Sub Type!",
      });
    } 
    // else if (CustomerFeilds.Email === "" || CustomerFeilds.Email === null) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Customer Email!",
    //   });
    // }
    // else if (
    //   !(
    //     lastAtPos < lastDotPos &&
    //     lastAtPos > 0 &&
    //     CustomerFeilds.Email.indexOf("@@") === -1 &&
    //     lastDotPos > 2 &&
    //     CustomerFeilds.Email.length - lastDotPos > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Employee Email!",
    //   });
    // } else if (CustomerFeilds.Email2 === "" || CustomerFeilds.Email2 === null) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Customer Alternate Email!",
    //   });
    // } else if (
    //   !(
    //     lastAtPos1 < lastDotPos1 &&
    //     lastAtPos1 > 0 &&
    //     CustomerFeilds.Email2.indexOf("@@") === -1 &&
    //     lastDotPos1 > 2 &&
    //     CustomerFeilds.Email2.length - lastDotPos1 > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Employee Email!",
    //   });
    // } 
    // else if (
    //   CustomerFeilds.PhoCode === "" ||
    //   CustomerFeilds.PhoCode === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Country Code Of The Contact Number!",
    //   });
    // } else if (
    //   CustomerFeilds.PhoneNumber === "" ||
    //   CustomerFeilds.PhoneNumber === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Customer Contact Number!",
    //   });
    // } else if (CustomerFeilds.PhoneNumber.length !== 10) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Contact Number!",
    //   });
    // }
    else if (
      CustomerFeilds.Capacity === "" ||
      CustomerFeilds.Capacity === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Customer Capacity!",
      });
    } else if (
      CustomerFeilds.Unit === "-1"
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Unit!",
      });
    } else if (
      CustomerFeilds.Manager === "-1" ||
      CustomerFeilds.Manager === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Customer Superior!",
      });
    } else if (
      CustomerFeilds.Area === "-1" ||
      CustomerFeilds.Area === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Customer Area!",
      });
    }
    // else if (
    //   CustomerFeilds.Profile === "" ||
    //   CustomerFeilds.Profile === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Select Customer Profile!",
    //   });
    // } 
    else if (
      CustomerFeilds.password === "" ||
      CustomerFeilds.password === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Customer Password!",
      });
    }
    // else if (
    //   CustomerFeilds.ContactPersonName === "" ||
    //   CustomerFeilds.ContactPersonName === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter First Contact Person Name!",
    //   });
    // } else if (
    //   CustomerFeilds.ContactPersonEmail === "" ||
    //   CustomerFeilds.ContactPersonEmail === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter First Contact Person Email!",
    //   });
    // } else if (
    //   !(
    //     lastAtPos2 < lastDotPos2 &&
    //     lastAtPos2 > 0 &&
    //     CustomerFeilds.ContactPersonEmail.indexOf("@@") === -1 &&
    //     lastDotPos2 > 2 &&
    //     CustomerFeilds.ContactPersonEmail.length - lastDotPos2 > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Employee Email!",
    //   });
    // } else if (
    //   CustomerFeilds.ContactPersonEmail2 === "" ||
    //   CustomerFeilds.ContactPersonEmail2 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter First Contact Person Alternate Email!",
    //   });
    // } else if (
    //   !(
    //     lastAtPos3 < lastDotPos3 &&
    //     lastAtPos3 > 0 &&
    //     CustomerFeilds.ContactPersonEmail2.indexOf("@@") === -1 &&
    //     lastDotPos3 > 2 &&
    //     CustomerFeilds.ContactPersonEmail2.length - lastDotPos3 > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Employee Email!",
    //   });
    // } else if (
    //   CustomerFeilds.ContactPersonPho === "" ||
    //   CustomerFeilds.ContactPersonPho === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter First Contact Person Contact Number!",
    //   });
    // } else if (CustomerFeilds.ContactPersonPho.length !== 10) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid First Contact Person Number!",
    //   });
    // } else if (
    //   CustomerFeilds.ContactPersonPho2 === "" ||
    //   CustomerFeilds.ContactPersonPho2 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter First Contact Person Alternate Contact Number!",
    //   });
    // } else if (CustomerFeilds.ContactPersonPho2.length !== 10) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid First Contact Person Alternate Number!",
    //   });
    // } 
    else {
      document.getElementById("divLoading").className = "show";
      var obj = {
        CUSTOMER_CATEGORY_FKID: CustomerFeilds.Category,
        CUSTOMER_TYPE_FKID: CustomerFeilds.type,
        CUSTOMER_SUBTYPE_FKID: CustomerFeilds.Subtype,
        CUSTOMER_UNIT_FKID: CustomerFeilds.Unit,
        CUSTOMER_NAME: CustomerFeilds.Name,
        CUSTOMER_NUMBER: CustomerFeilds.CustNo,
        CUSTOMER_GST_NO: CustomerFeilds.GstNo,
        CUSTOMER_AREA_FKID: CustomerFeilds.Area,
        CUSTOMER_EMAIL: CustomerFeilds.Email,
        CUSTOMER_EMAIL2: CustomerFeilds.Email2,
        CUSTOMER_MOBILE_CODE: CustomerFeilds.PhoCode,
        CUSTOMER_MOBILE: CustomerFeilds.PhoneNumber,
        CUSTOMER_ALT_MOBILE_CODE: CustomerFeilds.AltPhoCode,
        CUSTOMER_ALT_MOBILE: CustomerFeilds.AlterNateNumber,
        CUSTOMER_CAPACITY: CustomerFeilds.Capacity,
        CUSTOMER_REPRESENTATIVE_FKID: CustomerFeilds.Manager,
        CUSTOMER_PRFILE: CustomerFeilds.Profile,
        CUSTOMER_PASSWORD: CustomerFeilds.password,
        CUSTOMER_DOC1: CustomerFeilds.Doc1,
        CUSTOMER_DOC2: CustomerFeilds.Doc2,
        CUSTOMER_DOC3: CustomerFeilds.Doc3,
        CUSTOMER_DOC4: CustomerFeilds.Doc4,
        CUSTOMER_DOC5: CustomerFeilds.Doc5,
        CUSTOMER_DOC6: CustomerFeilds.Doc6,
        CUSTOMER_CONTACT_PERSON_NAME: CustomerFeilds.ContactPersonName,
        CUSTOMER_CONTACT_PERSON_EMAIL: CustomerFeilds.ContactPersonEmail,
        CUSTOMER_CONTACT_PERSON_EMAIL2: CustomerFeilds.ContactPersonEmail2,
        CUSTOMER_CONTACT_PERSON_PHO_CODE: CustomerFeilds.ContactPersonPhoCode,
        CUSTOMER_CONTACT_PERSON_PHO: CustomerFeilds.ContactPersonPho,
        CUSTOMER_CONTACT_PERSON_PHO2_CODE: CustomerFeilds.ContactPersonPho2Code,
        CUSTOMER_CONTACT_PERSON_PHO2: CustomerFeilds.ContactPersonPho2,
        CUSTOMER_CONTACT_SEC_PERSON_NAME: CustomerFeilds.ContactPersonName_2,
        CUSTOMER_CONTACT_SEC_PERSON_EMAIL: CustomerFeilds.ContactPersonEmail_2,
        CUSTOMER_CONTACT_SEC_PERSON_EMAIL2:
          CustomerFeilds.ContactPersonEmail2_2,
        CUSTOMER_CONTACT_SEC_PERSON_PHO_CODE: CustomerFeilds.ContactPersonPho_Code,
        CUSTOMER_CONTACT_SEC_PERSON_PHO: CustomerFeilds.ContactPersonPho_2,
        CUSTOMER_CONTACT_SEC_PERSON_PHO2_CODE: CustomerFeilds.ContactPersonPho_2Code,
        CUSTOMER_CONTACT_SEC_PERSON_PHO2: CustomerFeilds.ContactPersonPho2_2,
      };
      console.log(obj);
      axios.post(MyApiUrl + "customer/", obj).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          Swal.fire({
            title: "Customer Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
          history.push("/ViewCustomers");
        } else {
          Swal.fire({
            title: "Already Existed!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  useEffect(() => {
    GetCustomerCategory();
  }, []);
  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Add Customer</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol md="1">
                  <div>
                    <CLink to="/ViewCustomers">
                      <CButton size="sm" id="AddEmp">
                        Back
                      </CButton>
                    </CLink>
                    <br />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add Customer</CCardHeader>
                    <CCardBody>
                      <CForm
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <CFormGroup className="pr-1">
                          <div>
                            <p>
                              <b>Customer Information</b>
                            </p>
                            <CRow id="firstrow">
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Name Of The Customer
                                </CLabel>
                                <CInput
                                  id="cname"
                                  placeholder="Customer Name"
                                  value={CustomerFeilds.Name}
                                  onChange={(event) => {
                                    let value = event.target.value;
                                    value = value.replace(/[^A-Z a-z]/gi, "");
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Name: value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Number
                                </CLabel>
                                <CInput
                                  id="cname"
                                  placeholder="Customer Number"
                                  value={CustomerFeilds.CustNo}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      CustNo: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  GST No
                                </CLabel>
                                <CInput
                                  id="cname"
                                  placeholder="Customer GST No"
                                  value={CustomerFeilds.GstNo}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      GstNo: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Category
                                </CLabel>
                                <CSelect
                                  custom
                                  name="CustCat"
                                  id="CustCat"
                                  value={CustomerFeilds.Category}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Category: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">
                                    Select Customer Category
                                  </option>
                                  {CategoryData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Type
                                </CLabel>
                                <CSelect
                                  custom
                                  name="CustType"
                                  id="CustType"
                                  value={CustomerFeilds.type}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      type: event.target.value,
                                    });
                                    GetCustomerSubType(event.target.value);
                                  }}
                                >
                                  <option value="-1">
                                    Select Customer Type
                                  </option>
                                  {TypeData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Sub Type
                                </CLabel>
                                <CSelect
                                  custom
                                  name="CustSubType"
                                  id="CustSubType"
                                  value={CustomerFeilds.Subtype}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Subtype: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">
                                    Select Customer Sub Type
                                  </option>
                                  {SubTypeData}
                                </CSelect>
                              </CCol>

                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Email
                                </CLabel>
                                <CInput
                                  id="email"
                                  placeholder="Customer Email"
                                  value={CustomerFeilds.Email}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Email: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Alternate Email
                                </CLabel>
                                <CInput
                                  id="email2"
                                  placeholder="Customer Alternate Email"
                                  value={CustomerFeilds.Email2}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Email2: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Superior
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Suprior"
                                  id="Suprior"
                                  value={CustomerFeilds.Manager}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Manager: event.target.value,
                                    });
                                    GetManagerArea(event.target.value);
                                  }}
                                >
                                  <option value="-1">
                                    Select Customer Superior
                                  </option>
                                  {ManagerData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Area
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Suprior"
                                  id="Suprior"
                                  value={CustomerFeilds.Area}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Area: event.target.value,
                                    });
                                    GetCountryCode(event.target.value);
                                  }}
                                >
                                  <option value="-1">
                                    Select Area
                                  </option>
                                  {AreaData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Contact Number
                                </CLabel>
                                <CRow>
                                  <CCol md="2" style={{ paddingRight: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Code"
                                      value="+"
                                      readOnly
                                      style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                    />
                                  </CCol>
                                  <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      style={{ borderRadius: "0px", padding: "7px" }}
                                      value={CustomerFeilds.PhoCode}
                                      maxLength="3"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setCustomerFeilds({
                                            ...CustomerFeilds,
                                            PhoCode: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="8" style={{ paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Contact Number"
                                      value={CustomerFeilds.PhoneNumber}
                                      maxLength="10"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setCustomerFeilds({
                                            ...CustomerFeilds,
                                            PhoneNumber: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                </CRow>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Landline Number
                                </CLabel>
                                <CRow>
                                  <CCol md="2" style={{ paddingRight: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Code"
                                      value="+"
                                      readOnly
                                      style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                    />
                                  </CCol>
                                  <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      style={{ borderRadius: "0px", padding: "7px" }}
                                      value={CustomerFeilds.AltPhoCode}
                                      maxLength="3"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setCustomerFeilds({
                                            ...CustomerFeilds,
                                            AltPhoCode: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="8" style={{ paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Customer Landline Number"
                                      value={CustomerFeilds.AlterNateNumber}
                                      maxLength="10"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setCustomerFeilds({
                                            ...CustomerFeilds,
                                            AlterNateNumber: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                </CRow>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Customer Capacity
                                </CLabel>
                                <CInput
                                  id="Capacity"
                                  placeholder="Customer Capacity"
                                  value={CustomerFeilds.Capacity}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Capacity: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Unit
                                </CLabel>
                                <CSelect
                                  custom
                                  name="CustCat"
                                  id="CustCat"
                                  value={CustomerFeilds.Unit}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      Unit: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">
                                    Select Unit
                                  </option>
                                  {UnitData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Profile
                                </CLabel>
                                <CInput
                                  type="file"
                                  id="exampleInputName2"
                                  placeholder=" "
                                  onChange={(event) => {
                                    var formData = new FormData();
                                    formData.append(
                                      "file",
                                      event.target.files[0]
                                    );
                                    axios
                                      .post(MyApiUrl + "upload", formData)
                                      .then((response) => {
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          Profile: response.data,
                                        });
                                      });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Password
                                </CLabel>
                                <CInput
                                  type="password"
                                  id="exampleInputName2"
                                  placeholder="********"
                                  value={CustomerFeilds.password}
                                  onChange={(event) => {
                                    setCustomerFeilds({
                                      ...CustomerFeilds,
                                      password: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="12">
                                <CRow
                                  style={{
                                    marginTop: "3%",
                                    borderTop: "1px solid rgb(211, 211, 211)",
                                    borderBottom:
                                      "1px solid rgb(211, 211, 211)",
                                    padding: "2%",
                                    paddingBottom: "3%",
                                  }}
                                >
                                  <CCol md="12">
                                    <p
                                      htmlFor="nf-email"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        textAlign: "center",
                                        textTransform: "uppercase"
                                      }}
                                    >
                                      Upload Documents
                                    </p>
                                  </CCol>
                                  <CCol md="4">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Document 1
                                    </CLabel>
                                    <CInput
                                      type="file"
                                      id="Doc1"
                                      placeholder=" "
                                      onChange={(event) => {
                                        var formData = new FormData();
                                        formData.append(
                                          "file",
                                          event.target.files[0]
                                        );
                                        axios
                                          .post(MyApiUrl + "upload", formData)
                                          .then((response) => {
                                            setCustomerFeilds({
                                              ...CustomerFeilds,
                                              Doc1: response.data,
                                            });
                                          });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="4">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Document 2
                                    </CLabel>
                                    <CInput
                                      type="file"
                                      id="Doc2"
                                      placeholder=" "
                                      onChange={(event) => {
                                        var formData = new FormData();
                                        formData.append(
                                          "file",
                                          event.target.files[0]
                                        );
                                        axios
                                          .post(MyApiUrl + "upload", formData)
                                          .then((response) => {
                                            setCustomerFeilds({
                                              ...CustomerFeilds,
                                              Doc2: response.data,
                                            });
                                          });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="4">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Document 3
                                    </CLabel>
                                    <CInput
                                      type="file"
                                      id="Doc3"
                                      placeholder=" "
                                      onChange={(event) => {
                                        var formData = new FormData();
                                        formData.append(
                                          "file",
                                          event.target.files[0]
                                        );
                                        axios
                                          .post(MyApiUrl + "upload", formData)
                                          .then((response) => {
                                            setCustomerFeilds({
                                              ...CustomerFeilds,
                                              Doc3: response.data,
                                            });
                                          });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="4">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Document 4
                                    </CLabel>
                                    <CInput
                                      type="file"
                                      id="Doc4"
                                      placeholder=" "
                                      onChange={(event) => {
                                        var formData = new FormData();
                                        formData.append(
                                          "file",
                                          event.target.files[0]
                                        );
                                        axios
                                          .post(MyApiUrl + "upload", formData)
                                          .then((response) => {
                                            setCustomerFeilds({
                                              ...CustomerFeilds,
                                              Doc4: response.data,
                                            });
                                          });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="4">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Document 5
                                    </CLabel>
                                    <CInput
                                      type="file"
                                      id="Doc5"
                                      placeholder=" "
                                      onChange={(event) => {
                                        var formData = new FormData();
                                        formData.append(
                                          "file",
                                          event.target.files[0]
                                        );
                                        axios
                                          .post(MyApiUrl + "upload", formData)
                                          .then((response) => {
                                            setCustomerFeilds({
                                              ...CustomerFeilds,
                                              Doc5: response.data,
                                            });
                                          });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="4">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Document 6
                                    </CLabel>
                                    <CInput
                                      type="file"
                                      id="Doc6"
                                      placeholder=" "
                                      onChange={(event) => {
                                        var formData = new FormData();
                                        formData.append(
                                          "file",
                                          event.target.files[0]
                                        );
                                        axios
                                          .post(MyApiUrl + "upload", formData)
                                          .then((response) => {
                                            setCustomerFeilds({
                                              ...CustomerFeilds,
                                              Doc6: response.data,
                                            });
                                          });
                                      }}
                                    />
                                  </CCol>
                                </CRow>
                              </CCol>

                              <CCol md="12" style={{ marginTop: "2%" }}>
                                <CRow>
                                  <CCol md="4">
                                    <p
                                      htmlFor="nf-email"
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "left",
                                        textTransform: "uppercase",
                                        marginLeft: "7%"
                                      }}
                                    >
                                      <b style={{ color: "black", fontSize: "12px", }}>Customer :  {CustomerFeilds.Name}</b>
                                    </p>
                                  </CCol>
                                  <CCol md="8">
                                    <p
                                      htmlFor="nf-email"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        textTransform: "uppercase",
                                        marginLeft: "8%"
                                      }}
                                    >
                                      Contact People Details
                                    </p>
                                  </CCol>
                                </CRow>

                              </CCol>
                              <CCol md="12">
                                <CRow
                                  style={{
                                    borderBottom:
                                      "1px solid rgb(211, 211, 211)",
                                    padding: "2%",
                                  }}
                                >
                                  <CCol md="12">
                                    <p
                                      htmlFor="nf-email"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        textAlign: "left",
                                        textDecoration: "underline",
                                        textTransform: "uppercase"
                                      }}
                                    >
                                      Contact Person 1
                                    </p>
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Name
                                    </CLabel>
                                    <CInput
                                      id="Person_Name"
                                      placeholder="Name"
                                      value={CustomerFeilds.ContactPersonName}
                                      onChange={(event) => {
                                        let value = event.target.value;
                                        value = value.replace(
                                          /[^A-Z a-z]/gi,
                                          ""
                                        );
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          ContactPersonName: value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Email
                                    </CLabel>
                                    <CInput
                                      id="Person_Email"
                                      placeholder="Email"
                                      value={CustomerFeilds.ContactPersonEmail}
                                      onChange={(event) => {
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          ContactPersonEmail:
                                            event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Alternate Email
                                    </CLabel>
                                    <CInput
                                      id="Person_Email2"
                                      placeholder="Alternate Email"
                                      value={CustomerFeilds.ContactPersonEmail2}
                                      onChange={(event) => {
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          ContactPersonEmail2:
                                            event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Contact Number
                                    </CLabel>
                                    <CRow>
                                      <CCol md="2" style={{ paddingRight: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Code"
                                          value="+"
                                          readOnly
                                          style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                        />
                                      </CCol>
                                      <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          style={{ borderRadius: "0px", padding: "7px" }}
                                          value={CustomerFeilds.ContactPersonPhoCode}
                                          maxLength="3"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPhoCode: event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                      <CCol md="8" style={{ paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Contact Number"
                                          value={CustomerFeilds.ContactPersonPho}
                                          maxLength="10"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho:
                                                  event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                    </CRow>
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Alternate Number
                                    </CLabel>
                                    <CRow>
                                      <CCol md="2" style={{ paddingRight: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Code"
                                          value="+"
                                          readOnly
                                          style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                        />
                                      </CCol>
                                      <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          style={{ borderRadius: "0px", padding: "7px" }}
                                          value={CustomerFeilds.ContactPersonPho2Code}
                                          maxLength="3"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho2Code: event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                      <CCol md="8" style={{ paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Alternate Number"
                                          value={CustomerFeilds.ContactPersonPho2}
                                          maxLength="10"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho2:
                                                  event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                    </CRow>
                                  </CCol>
                                </CRow>
                                <CRow
                                  style={{
                                    borderTop: "1px solid rgb(211, 211, 211)",
                                    borderBottom:
                                      "1px solid rgb(211, 211, 211)",
                                    padding: "2%",
                                  }}
                                >
                                  <CCol md="12">
                                    <p
                                      htmlFor="nf-email"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        textAlign: "left",
                                        textDecoration: "underline",
                                        textTransform: "uppercase"
                                      }}
                                    >
                                      Contact Person 2
                                    </p>
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Name
                                    </CLabel>
                                    <CInput
                                      id="Person_Name"
                                      placeholder="Name"
                                      value={CustomerFeilds.ContactPersonName_2}
                                      onChange={(event) => {
                                        let value = event.target.value;
                                        value = value.replace(
                                          /[^A-Z a-z]/gi,
                                          ""
                                        );
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          ContactPersonName_2: value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Email
                                    </CLabel>
                                    <CInput
                                      id="Person_Email"
                                      placeholder="Email"
                                      value={
                                        CustomerFeilds.ContactPersonEmail_2
                                      }
                                      onChange={(event) => {
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          ContactPersonEmail_2:
                                            event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Alternate Email
                                    </CLabel>
                                    <CInput
                                      id="Person_Email2"
                                      placeholder="Alternate Email"
                                      value={
                                        CustomerFeilds.ContactPersonEmail2_2
                                      }
                                      onChange={(event) => {
                                        setCustomerFeilds({
                                          ...CustomerFeilds,
                                          ContactPersonEmail2_2:
                                            event.target.value,
                                        });
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Contact Number
                                    </CLabel>
                                    <CRow>
                                      <CCol md="2" style={{ paddingRight: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Code"
                                          value="+"
                                          readOnly
                                          style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                        />
                                      </CCol>
                                      <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          style={{ borderRadius: "0px", padding: "7px" }}
                                          value={CustomerFeilds.ContactPersonPho_Code}
                                          maxLength="3"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho_Code: event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                      <CCol md="8" style={{ paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Contact Number"
                                          value={CustomerFeilds.ContactPersonPho_2}
                                          maxLength="10"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho_2:
                                                  event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                    </CRow>
                                  </CCol>
                                  <CCol md="3">
                                    <CLabel
                                      htmlFor="exampleInputName2"
                                      className="pr-1"
                                    >
                                      Alternate Number
                                    </CLabel>
                                    <CRow>
                                      <CCol md="2" style={{ paddingRight: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Code"
                                          value="+"
                                          readOnly
                                          style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                        />
                                      </CCol>
                                      <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          style={{ borderRadius: "0px", padding: "7px" }}
                                          value={CustomerFeilds.ContactPersonPho_2Code}
                                          maxLength="3"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho_2Code: event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                      <CCol md="8" style={{ paddingLeft: "0%" }}>
                                        <CInput
                                          id="text-input1"
                                          name="text-input"
                                          placeholder="Alternate Number"
                                          value={CustomerFeilds.ContactPersonPho2_2}
                                          maxLength="10"
                                          onChange={(event) => {
                                            const re = /^[0-9\b]+$/;
                                            if (
                                              event.target.value === "" ||
                                              re.test(event.target.value)
                                            ) {
                                              setCustomerFeilds({
                                                ...CustomerFeilds,
                                                ContactPersonPho2_2:
                                                  event.target.value,
                                              });
                                            }
                                          }}
                                        />
                                      </CCol>
                                    </CRow>
                                  </CCol>
                                </CRow>
                              </CCol>
                            </CRow>
                          </div>

                          <CRow>
                            <CCol md="4">
                              <p
                                htmlFor="nf-email"
                                style={{
                                  fontSize: "14px",
                                  textAlign: "left",
                                  textTransform: "uppercase",
                                  marginLeft: "7%"
                                }}
                              >
                                <b style={{ color: "black", fontSize: "12px", }}>Customer :  {CustomerFeilds.Name}</b>
                              </p>
                            </CCol>
                            <CCol md="8">
                              <div id="inline-btn">
                                <CButton
                                  type="button"
                                  onClick={AddCustomer}
                                  color="success"
                                  style={{ float: "right", fontWeight: "600" }}
                                >
                                  ADD CUSTOMER
                                </CButton>
                              </div>
                            </CCol>
                          </CRow>
                        </CFormGroup>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Customer;
