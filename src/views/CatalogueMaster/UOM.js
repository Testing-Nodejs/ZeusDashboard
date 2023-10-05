/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 16:52:18
 * @modify date 2021-12-06 15:18:27
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
const fields = [{ key: "Action" }, { key: "UomName" }, { key: "UomShortKey" }];

const UOM = () => {
  const [Kimo, setKimo] = useState({
    UoMPkid: "",
    UoMName: "",
    UoMKey: "",
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

  const AddUoM = () => {
    if (Kimo.UoMName == "" || Kimo.UoMName == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter UoM Name!",
      });
    } else if (Kimo.UoMKey == "" || Kimo.UoMKey == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter UoM Key!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        UomName: Kimo.UoMName,
        UomKey: Kimo.UoMKey,
      };

      axios.post(MyApiUrl + "uom", obj).then((response) => {
        if (response.data == "0") {
          Swal.fire({
            title: "UoM Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
          fetchData();
          setKimo({
            ...Kimo,
            UoMPkid: "",
            UoMName: "",
            UoMKey: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data == "1") {
          Swal.fire({
            title: "UoM Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
          setKimo({
            ...Kimo,
            UoMPkid: "",
            UoMName: "",
            UoMKey: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data == "2") {
          Swal.fire({
            title: "UoM Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const UpdateUoM = () => {
    if (Kimo.UoMName == "" || Kimo.UoMName == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter UoM Name!",
      });
    } else if (Kimo.UoMKey == "" || Kimo.UoMKey == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter UoM Key!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        UomName: Kimo.UoMName,
        UomKey: Kimo.UoMKey,
      };
      axios.put(MyApiUrl + "uom/" + Kimo.UoMPkid, obj).then((response) => {
        if (response.data == "0") {
          Swal.fire({
            title: "UoM Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data == "1") {
          Swal.fire({
            title: "UoM Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });

          fetchData();
          setKimo({
            ...Kimo,
            UoMPkid: "",
            UoMName: "",
            UoMKey: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const EditUoM = (id, UoMName, UoMKey) => {
    setKimo({
      ...Kimo,
      UoMPkid: id,
      UoMName: UoMName,
      UoMKey: UoMKey,
      AddButton: false,
      UpdateButton: true,
    });
  };

  const DeleteUoM = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "uom/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "UoM Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            fetchData();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "UoM Failed To Deleted!",
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

  const fetchData = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "uom",
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
            UomName: item.UNIT_OF_MEASUREMENT_NAME,
            UomShortKey: item.UNIT_OF_MEASUREMENT_SHORT_KEY,
          };
        });
        setKimo({
          ...Kimo,
          UoMPkid: "",
          UoMName: "",
          UoMKey: "",
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
    <CButton type="button" onClick={UpdateUoM} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddUoM} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Unit Of Measurement </h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Unit of Measurement</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>UOM Name</CLabel>
                              <CInput
                                id="text-input1"
                                name="text-input"
                                placeholder="UOM Name"
                                type="text"
                                value={Kimo.UoMName}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    UoMName: e.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <br />
                            <br />
                            <br />

                            <CCol xs="12" md="12">
                              <CLabel>Short Key</CLabel>
                              <CInput
                                id="text-input1"
                                name="text-input"
                                placeholder="Short Key"
                                type="text"
                                value={Kimo.UoMKey}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    UoMKey: e.target.value,
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
                      <CCardHeader>Added Customer-Type</CCardHeader>
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
                                    EditUoM(
                                      item.UNIT_OF_MEASUREMENT_PKID,
                                      item.UNIT_OF_MEASUREMENT_NAME,
                                      item.UNIT_OF_MEASUREMENT_SHORT_KEY
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
                                    DeleteUoM(item.UNIT_OF_MEASUREMENT_PKID);
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

export default UOM;
