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
  { key: "Type" },
  { key: "Address 1" },
  { key: "Address 2" },
  { key: "Address 3" },
  { key: "Zip Code" },
];

const AddCustomerAddress = (props) => {
  const CustID = props.location.state.data.CUSTOMER_PKID;
  const CustName = props.location.state.data.CUSTOMER_NAME;
  const [CustomerAddress, setCustomerAddress] = useState({
    type: "",
    add1: "",
    add2: "",
    add3: "",
    zip: "",
    pkid: "",
    ResponseData: [],
    AddButton: true,
    UpdateButton: false,
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

  const AddAddress = () => {
    if (
      CustomerAddress.type === "-1" ||
      CustomerAddress.type === null ||
      CustomerAddress.type === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Select Address Type",
      });
    } else if (CustomerAddress.add1 === "" || CustomerAddress.add1 === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Address 1",
      });
    } else if (CustomerAddress.add2 === "" || CustomerAddress.add2 === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Address 2",
      });
    } else if (CustomerAddress.add3 === "" || CustomerAddress.add3 === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Address 3",
      });
    } else if (CustomerAddress.zip === "" || CustomerAddress.zip === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Zip Code",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        CUSTOMER_ADDRESS_ADDRESS1: CustomerAddress.add1,
        CUSTOMER_ADDRESS_ADDRESS2: CustomerAddress.add2,
        CUSTOMER_ADDRESS_ADDRESS3: CustomerAddress.add3,
        CUSTOMER_ADDRESS_ZIP_CODE: CustomerAddress.zip,
        CUSTOMER_ADDRESS_TYPE: CustomerAddress.type,
        CUSTOMER_ADDRESS_CUST_FKID: CustID,
      };

      axios.post(MyApiUrl + "addresstype", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Customer Address Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
          setCustomerAddress({
            ...CustomerAddress,
            type: "-1",
            add1: "",
            add2: "",
            add3: "",
            zip: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data == false) {
          Swal.fire({
            title: "Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const UpdateAddress = () => {
    if (CustomerAddress.type === "-1" || CustomerAddress.type === null) {
      Toast.fire({
        icon: "warning",
        title: "Select Address Type",
      });
    } else if (CustomerAddress.add1 === "" || CustomerAddress.add1 === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Address 1",
      });
    } else if (CustomerAddress.add2 === "" || CustomerAddress.add2 === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Address 2",
      });
    } else if (CustomerAddress.add3 === "" || CustomerAddress.add3 === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Address 3",
      });
    } else if (CustomerAddress.zip === "" || CustomerAddress.zip === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Zip Code",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        CUSTOMER_ADDRESS_ADDRESS1: CustomerAddress.add1,
        CUSTOMER_ADDRESS_ADDRESS2: CustomerAddress.add2,
        CUSTOMER_ADDRESS_ADDRESS3: CustomerAddress.add3,
        CUSTOMER_ADDRESS_ZIP_CODE: CustomerAddress.zip,
        CUSTOMER_ADDRESS_TYPE: CustomerAddress.type,
        CUSTOMER_ADDRESS_CUST_FKID: CustID,
      };

      axios
        .put(MyApiUrl + "addresstype/" + CustomerAddress.pkid, obj)
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Customer Address Updated Successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });
            fetchData();
            setCustomerAddress({
              ...CustomerAddress,
              type: "-1",
              add1: "",
              add2: "",
              add3: "",
              zip: "",
              pkid: "",
              AddButton: true,
              UpdateButton: false,
            });
            document.getElementById("divLoading").className = "hide";
          } else if (response.data == false) {
            Swal.fire({
              title: "Failed To Update!",
              icon: "error",
              confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
          }
        });
    }
  };

  const EditAddress = (id, add1, add2, add3, zip, type) => {
    setCustomerAddress({
      ...CustomerAddress,
      type: type,
      add1: add1,
      add2: add2,
      add3: add3,
      zip: zip,
      pkid: id,
      AddButton: false,
      UpdateButton: true,
    });
  };

  const DeleteAddress = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "addresstype/" + id + "",
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
              title: "Customer Address Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            fetchData();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Customer Address Failed To Deleted!",
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
      url: MyApiUrl + "addresstype/" + CustID,
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
            Type: item.CUSTOMER_ADDRESS_TYPE,
            "Address 1": item.CUSTOMER_ADDRESS_ADDRESS1,
            "Address 2": item.CUSTOMER_ADDRESS_ADDRESS2,
            "Address 3": item.CUSTOMER_ADDRESS_ADDRESS3,
            "Zip Code": item.CUSTOMER_ADDRESS_ZIP_CODE,
          };
        });
        setCustomerAddress({
          ...CustomerAddress,
          ResponseData: items,
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateAddress} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddAddress} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Customer Address</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Customer Address</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>Customer Name</CLabel>
                              <CInput
                                id="add1"
                                placeholder="Address 1"
                                value={CustName}
                                readOnly
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Address Type</CLabel>
                              <CSelect
                                custom
                                name="addtype"
                                id="addtype"
                                value={CustomerAddress.type}
                                onChange={(event) => {
                                  setCustomerAddress({
                                    ...CustomerAddress,
                                    type: event.target.value,
                                  });
                                }}
                              >
                                <option value="-1">Select Customer Type</option>
                                <option value="Billing">Billing</option>
                                <option value="Shipping">Shipping</option>
                              </CSelect>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Address 1</CLabel>
                              <CInput
                                id="add1"
                                placeholder="Address 1"
                                value={CustomerAddress.add1}
                                onChange={(event) => {
                                  setCustomerAddress({
                                    ...CustomerAddress,
                                    add1: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Address 2</CLabel>
                              <CInput
                                id="add2"
                                placeholder="Address 2"
                                value={CustomerAddress.add2}
                                onChange={(event) => {
                                  setCustomerAddress({
                                    ...CustomerAddress,
                                    add2: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Address 3</CLabel>
                              <CInput
                                id="add3"
                                placeholder="Address 3"
                                value={CustomerAddress.add3}
                                onChange={(event) => {
                                  setCustomerAddress({
                                    ...CustomerAddress,
                                    add3: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Zip Code</CLabel>
                              <CInput
                                id="zip"
                                placeholder="Zip Code"
                                value={CustomerAddress.zip}
                                onChange={(event) => {
                                  setCustomerAddress({
                                    ...CustomerAddress,
                                    zip: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                          </CFormGroup>

                          {CustomerAddress.UpdateButton && <Updatebtn />}
                          {CustomerAddress.AddButton && <Addbtn />}
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
                      <CCardHeader>Added Address</CCardHeader>
                      <CCardBody>
                        <CDataTable
                          items={CustomerAddress.ResponseData}
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
                                    EditAddress(
                                      item.CUSTOMER_ADDRESS_PKID,
                                      item.CUSTOMER_ADDRESS_ADDRESS1,
                                      item.CUSTOMER_ADDRESS_ADDRESS2,
                                      item.CUSTOMER_ADDRESS_ADDRESS3,
                                      item.CUSTOMER_ADDRESS_ZIP_CODE,
                                      item.CUSTOMER_ADDRESS_TYPE
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
                                    DeleteAddress(item.CUSTOMER_ADDRESS_PKID);
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

export default AddCustomerAddress;
