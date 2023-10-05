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
} from "@coreui/react";

import { MyApiUrl } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [{ key: "Action" }, { key: "Supply Type" }];

const OrderType = () => {
  const [Kimo, setKimo] = useState({
    typePkid: "",
    OrderType: "",
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

  const AddOrderType = () => {
    if (Kimo.OrderType === "" || Kimo.OrderType === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Order Supply Type!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        SUPPLY_NAME: Kimo.OrderType,
      };

      axios.post(MyApiUrl + "OrderSupplyType", obj).then((response) => {
        if (response.data === "Already Existed!") {
          Swal.fire({
            title: "Order Supply Type Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
          GetOrderSupplyType();
          setKimo({
            ...Kimo,
            typePkid: "",
            OrderType: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "Order Supply Type Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetOrderSupplyType();
          setKimo({
            ...Kimo,
            typePkid: "",
            OrderType: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === false) {
          Swal.fire({
            title: "Order Supply Type Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const UpdateOrderType = () => {
    if (Kimo.OrderType === "" || Kimo.OrderType === null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Order Supply Type!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        SUPPLY_NAME: Kimo.OrderType,
      };
      axios
        .put(MyApiUrl + "OrderSupplyType/" + Kimo.typePkid, obj)
        .then((response) => {
          if (response.data === false) {
            Swal.fire({
              title: "Order Supply Type Not Updated!",
              icon: "warning",
              confirmButtonText: "OK",
            });
            GetOrderSupplyType();
            setKimo({
              ...Kimo,
              typePkid: "",
              OrderType: "",
              AddButton: true,
              UpdateButton: false,
            });
            document.getElementById("divLoading").className = "hide";
          } else if (response.data === true) {
            Swal.fire({
              title: "Order Supply Type Updated!",
              icon: "success",
              confirmButtonText: "OK",
            });
            GetOrderSupplyType();
            setKimo({
              ...Kimo,
              typePkid: "",
              OrderType: "",
              AddButton: true,
              UpdateButton: false,
            });
            document.getElementById("divLoading").className = "hide";
          }
        });
    }
  };

  const EditOrderType = (id, SupplyType) => {
    setKimo({
      ...Kimo,
      typePkid: id,
      OrderType: SupplyType,
      AddButton: false,
      UpdateButton: true,
    });
  };

  const DeleteOrderType = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "OrderSupplyTypeDel/" + id + "",
        headers: {
          "content-type": "application/json",
        },
        params: {
          language_code: "en",
        },
      })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Order Supply Type Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            GetOrderSupplyType();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Order Supply Type Failed To Deleted!",
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
        const items = response.data.map((item) => {
          return {
            ...item,
            "Supply Type": item.SUPPLY_NAME,
          };
        });
        setKimo({
          ...Kimo,
          typePkid: "",
          OrderType: "",
          AddButton: true,
          UpdateButton: false,
          ResponseData: items,
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateOrderType} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddOrderType} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    GetOrderSupplyType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Order Supply Type</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Supply Type</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>Supply Type</CLabel>
                              <CInput
                                id="text-input1"
                                name="text-input"
                                placeholder="Supply Type"
                                type="text"
                                value={Kimo.OrderType}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    OrderType: e.target.value,
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
                      <CCardHeader>Added Order Supply Type</CCardHeader>
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
                                    EditOrderType(
                                      item.SUPPLY_TYPE_PKID,
                                      item.SUPPLY_NAME
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
                                    DeleteOrderType(item.SUPPLY_TYPE_PKID);
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

export default OrderType;
