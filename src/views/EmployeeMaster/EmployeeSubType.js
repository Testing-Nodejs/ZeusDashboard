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
  CSelect,
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
const fields1 = [
  { key: "Action" },
  { key: "Employee-Type" },
  { key: "Employee Sub-Type" },
];

const StateMaster = () => {

  const [EmpSubtypePkid, setEmpSubtypePkid] = useState();
  const [EmpTypeData, setEmpTypeData] = useState();
  const [EmpSubtypeData, setEmpSubtypeData] = useState();
  const [Emptype, setEmptype] = useState("-1");
  const [EmpSubtype, setEmpSubtype] = useState("");
  const [AddButton, setAddButton] = useState(true);
  const [UpdateButton, setUpdateButton] = useState(false);

  const EmptypeChange = (event) => {
    setEmptype(event.target.value);
  };

  const EmpSubtypeChange = (event) => {
    setEmpSubtype(event.target.value);
  };

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




  const AddSubEmp = () => {
    if (Emptype === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Employee-Type!",
      });
    } else if (EmpSubtype == "" || EmpSubtype == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Employee Sub-Type!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        EmpTypeId: Emptype,
        EmpSubTypeName: EmpSubtype,
      };

      axios.post(MyApiUrl + "empsubtypes/", obj).then((response) => {
        if (response.data === "Already Existed!") {
          Swal.fire({
            title: "Employee Sub-Type Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
          GetEmployeeSubType();
          GetEmptype();
          setEmpSubtype("");
          setEmptype("");
          setEmpSubtype("");
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "Employee Sub-Type Added SuccessFully!",
            icon: "success",
            confirmButtonText: "OK",
          });

          GetEmployeeSubType();
          GetEmptype();
          setEmpSubtype("");
          setEmptype("");
          setEmpSubtype("");
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === false) {
          Swal.fire({
            title: "Employee Sub-Type Failed To Added!",
            icon: "error",
            confirmButtonText: "OK",
          });
          GetEmployeeSubType();
          GetEmptype();
          setEmpSubtype("");
          setEmptype("");
          setEmpSubtype("");
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };




  const EditSubType = (id, countryid, state) => {
    setEmpSubtypePkid(id);
    setEmptype(countryid);
    setEmpSubtype(state);
    setAddButton(false);
    setUpdateButton(true);
  };

  const UpdateSubEmp = () => {
    if (Emptype == "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Employee-Type!",
      });

    } else if (EmpSubtype == "" || EmpSubtype == null) {
      Toast.fire({
        icon: "warning",
        title: "Enter Employee Sub-Type!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        EmpTypeId: Emptype,
        EmpSubTypeName: EmpSubtype,
        EmpSubTypeId: EmpSubtypePkid,
      };
      axios
        .put(MyApiUrl + "empsubtypes/" + EmpSubtypePkid, obj)
        .then((response) => {
          if (response.data === false) {
            Swal.fire({
              title: "Failed!",
              icon: "error",
              confirmButtonText: "OK",
            });
            GetEmployeeSubType();
            GetEmptype();
            setEmpSubtype("");
            setEmptype("");
            setEmpSubtype("");
            document.getElementById("divLoading").className = "hide";
          } else if (response.data === true) {
            Swal.fire({
              title: "Employee Sub-Type Updated!",
              icon: "success",
              confirmButtonText: "OK",
            });
            GetEmployeeSubType();
            GetEmptype();
            setEmpSubtype("");
            setEmptype("");
            setEmpSubtype("");
            document.getElementById("divLoading").className = "hide";
          }
        });
    }
  };

  const DeleteSubtype = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "empsubtypes/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data == true) {
            Swal.fire({
              title: "Employee Sub-Type Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            GetEmptype();
            GetEmployeeSubType();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Employee Sub-Type Deleted!",
              icon: "error",
              confirmButtonText: "OK",
            });
            GetEmptype();
            GetEmployeeSubType();
            document.getElementById("divLoading").className = "hide";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const GetEmptype = React.useCallback(() => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "emptypes",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.EMPLOYEE_TYPE_PKID}>
            {item.EMPLOYEE_TYPE_NAME}
          </option>
        ));
        setEmpTypeData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const GetEmployeeSubType = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "empsubtypes",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            "Employee-Type": item.EMPLOYEE_TYPE_NAME,
            "Employee Sub-Type": item.EMPLOYEE_SUB_TYPE_NAME,
          };
        });
        setEmpSubtypeData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateSubEmp} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddSubEmp} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    GetEmptype();
    GetEmployeeSubType();
  }, []);

  return (
    <div id="state">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Employee Sub Type</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add Emp Sub-Type</CCardHeader>
                    <CCardBody>
                      <CForm
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select Emp Type</CLabel>
                            <CSelect
                              custom
                              name="Emptype"
                              id="Emptype"
                              onChange={EmptypeChange}
                              value={Emptype}
                            >
                              <option value="-1">Select Emp Type</option>
                              {EmpTypeData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Employee Sub-Type</CLabel>
                            <CInput
                              id="text-input"
                              name="text-input"
                              placeholder="Employee Sub-Type"
                              value={EmpSubtype}
                              onChange={EmpSubtypeChange}
                            />
                          </CCol>
                        </CFormGroup>
                      </CForm>
                      {UpdateButton && <Updatebtn />}
                      {AddButton && <Addbtn />}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol col="10">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Added Sub Type</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={EmpSubtypeData}
                        fields={fields1}
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
                          Action: (item, i) => (
                            <td>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  EditSubType(
                                    item.EMPLOYEE_SUB_TYPE_PKID,
                                    item.EMPLOYEE_SUB_TYPE_TYPE_FKID,
                                    item.EMPLOYEE_SUB_TYPE_NAME
                                  );
                                }}
                                id="war-btn"
                              >
                                <EditIcon />
                                {item.status}
                              </CButton>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  DeleteSubtype(item.EMPLOYEE_SUB_TYPE_PKID);
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
        </CCol>
      </CRow>
    </div>
  );
};

export default StateMaster;
