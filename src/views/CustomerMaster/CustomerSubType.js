/**
 * @author KimoSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 18:21:31
 * @modify date 2021-12-07 12:26:04
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CRow,
  CDataTable,
  CLabel,
  CSelect,
} from "@coreui/react";

import { MyApiUrl } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [
  { key: "Action" },
  { key: "CustomerType" },
  { key: "CustomerSubType" },
];

const CustomerSubType = () => {
  const [Kimo, setKimo] = useState({
    typePkid: "",
    CustomerType: "-1",
    ResponseData: [],
    AddButton: true,
    UpdateButton: false,
  });

  const [CustTypeData, setCustTypeData] = useState([]);

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

  const GetCustomerType = React.useCallback(() => {
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
        setCustTypeData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const AddCustomerSubType = () => {
    if (Kimo.CustomerType === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Select Customer Type!",
      });
    } else if (Kimo.CustomerSubType == "" || Kimo.CustomerSubType == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Customer Sub Type!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        CustType: Kimo.CustomerType,
        CustSubType: Kimo.CustomerSubType,
      };

      axios.post(MyApiUrl + "custsubtype", obj).then((response) => {
        if (response.data === "Already Existed!") {
          Swal.fire({
            title: "Customer Sub Type Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
          fetchData();
          setKimo({
            ...Kimo,
            typePkid: "",
            CustomerType: "",
            CustomerSubType: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "Customer Sub Type Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
          setKimo({
            ...Kimo,
            typePkid: "",
            CustomerType: "",
            CustomerSubType: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === false) {
          Swal.fire({
            title: "Customer Sub Type Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const UpdateCustomerSubType = () => {
    if (Kimo.CustomerType === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Select Customer Type!",
      });
    } else if (Kimo.CustomerSubType == "" || Kimo.CustomerSubType == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Customer Sub Type!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        CustType: Kimo.CustomerType,
        CustSubType: Kimo.CustomerSubType,
      };
      axios
        .put(MyApiUrl + "custsubtype/" + Kimo.typeSubPkid, obj)
        .then((response) => {
          if (response.data == false) {
            Swal.fire({
              title: "Customer Sub Type Not Updated!",
              icon: "warning",
              confirmButtonText: "OK",
            });

            fetchData();
            setKimo({
              ...Kimo,
              typePkid: "",
              CustomerType: "",
              CustomerSubType: "",
              AddButton: true,
              UpdateButton: false,
            });
            document.getElementById("divLoading").className = "hide";
          } else if (response.data == "1") {
            Swal.fire({
              title: "Customer Sub Type Updated!",
              icon: "success",
              confirmButtonText: "OK",
            });

            fetchData();
            setKimo({
              ...Kimo,
              typePkid: "",
              CustomerType: "",
              CustomerSubType: "",
              AddButton: true,
              UpdateButton: false,
            });
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Customer Sub Type Already Existed!",
              icon: "info",
              confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
          }
        });
    }
  };

  const EditCustomerSubType = (id, Emptsubtype, Emptype) => {
    console.log(id, Emptsubtype, Emptype);
    setKimo({
      ...Kimo,
      typeSubPkid: id,
      CustomerType: Emptype,
      CustomerSubType: Emptsubtype,
      AddButton: false,
      UpdateButton: true,
    });
  };

  const DeleteCustomerSubType = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "custsubtype/" + id + "",
        headers: {
          "content-type": "application/json",
        },
        params: {
          language_code: "en",
        },
      })
        .then((response) => {
          if (response.data == true) {
            Swal.fire({
              title: "Customer Sub Type Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            fetchData();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Customer Sub Type Failed To Deleted!",
              icon: "error",
              confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchData = React.useCallback(() => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "custsubtype",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            CustomerType: item.CUSTOMER_TYPE_NAME,
            CustomerSubType: item.CUSTOMER_SUBTYPE_NAME
          };
        });
        setKimo({
          ...Kimo,
          ResponseData: items,
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Updatebtn = () => (
    <CButton
      type="button"
      onClick={UpdateCustomerSubType}
      size="md"
      id="Add-btn"
    >
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddCustomerSubType} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    fetchData();
    GetCustomerType();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Customer Sub Type</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Customer Sub Type</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>Customer Type</CLabel>
                              <CSelect
                                custom
                                name="CustType"
                                id="CustType"
                                value={Kimo.CustomerType}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    CustomerType: e.target.value,
                                  });
                                }}
                              >
                                <option value="-1">Select Customer Type</option>
                                {CustTypeData}
                              </CSelect>
                            </CCol>
                          </CFormGroup>
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>Customer Sub Type</CLabel>
                              <CInput
                                id="text-input1"
                                name="text-input"
                                placeholder="Customer Sub Type"
                                type="text"
                                value={Kimo.CustomerSubType}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    CustomerSubType: e.target.value,
                                  });
                                }}
                              />
                            </CCol>
                          </CFormGroup>

                          {Kimo.UpdateButton && <Updatebtn />}
                          {Kimo.AddButton && <Addbtn />}
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </div>
        </CCol>

        <CCol xs="12" sm="12" md="8" lg="8" xl="8" className="mb-3 mb-xl-0">
          <div id="country-table">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Added Customer Sub Type</CCardHeader>
                      <CCardBody>
                        <CDataTable
                          items={Kimo.ResponseData}
                          fields={fields}
                          hover
                          striped
                          bordered
                          tableFilter={table}
                          itemsPerPageSelect={items}
                          sorter
                          size="sm"
                          itemsPerPage={10}
                          pagination
                          scopedSlots={{

                            Action: (item) => (
                              <td>
                                <CButton
                                  onClick={() => {
                                    EditCustomerSubType(
                                      item.CUSTOMER_SUBTYPE_PKID,
                                      item.CUSTOMER_SUBTYPE_NAME,
                                      item.CUSTOMER_SUBTYPE_TYPE_FKID
                                    );
                                  }}
                                  size="sm"
                                  id="war-btn"
                                >
                                  <EditIcon />
                                  {item.status}
                                </CButton>
                                <CButton
                                  size="sm"
                                  onClick={() => {
                                    DeleteCustomerSubType(
                                      item.CUSTOMER_SUBTYPE_PKID
                                    );
                                  }}
                                  id="war-btn1"
                                >
                                  <DeleteSharpIcon />
                                  {item.status}
                                </CButton>
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
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default CustomerSubType;
