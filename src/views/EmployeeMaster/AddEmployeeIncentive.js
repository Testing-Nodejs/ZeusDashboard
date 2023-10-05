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
import "../../RadioButtons.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [
  { key: "Action" },
  { key: "Month / Year" },
  { key: "Amount" },
  { key: "Description" },
];

const AddEmployeeIncentive = (props) => {
  const empid = props.location.state.data.EMPLOYEE_PKID;
  const [Kimo, setKimo] = useState({
    INCENTIVE_EMPLOYEE_FKID: empid,
    INCENTIVE_AMOUNT: "",
    INCENTIVE_DESCRIPTION: "",
    INCENTIVE_MONTH: "",
    INCENTIVE_PKID: "",
    INCENTIVE_TYPE: "",
    ResponseData: [],
    AddButton: true,
    UpdateButton: false,
    Monthselection: false,
    YearSelection: false,
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

  const ViewMonthOrYear = (e) => {
    let val = e.target.value;
    console.log(val);
    if (val === "monthly") {
      setKimo({
        ...Kimo,
        Monthselection: true,
        YearSelection: false,
        INCENTIVE_TYPE: val,
      });
    } else {
      setKimo({
        ...Kimo,
        Monthselection: false,
        YearSelection: true,
        INCENTIVE_TYPE: val,
      });
    }
  };

  const AddIncentive = () => {
    if (Kimo.INCENTIVE_MONTH === "" || Kimo.INCENTIVE_MONTH === null) {
      Toast.fire({
        icon: "warning",
        title: "Select Month OR Year!",
      });
    } else if (Kimo.INCENTIVE_AMOUNT === "" || Kimo.INCENTIVE_AMOUNT === null) {
      Toast.fire({
        icon: "warning",
        title: "Add Amount!",
      });
    } else if (
      Kimo.INCENTIVE_DESCRIPTION === "" ||
      Kimo.INCENTIVE_DESCRIPTION === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Add Description!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      let monthobj = "";
      if (Kimo.INCENTIVE_TYPE === "monthly") {
        monthobj = Kimo.INCENTIVE_MONTH + "-01";
      } else {
        monthobj = Kimo.INCENTIVE_MONTH;
      }
      const obj = {
        INCENTIVE_EMPLOYEE_FKID: Kimo.INCENTIVE_EMPLOYEE_FKID,
        INCENTIVE_AMOUNT: Kimo.INCENTIVE_AMOUNT,
        INCENTIVE_DESCRIPTION: Kimo.INCENTIVE_DESCRIPTION,
        INCENTIVE_MONTH: monthobj,
        INCENTIVE_TYPE: Kimo.INCENTIVE_TYPE,
      };
      axios.post(MyApiUrl + "incentives", obj).then((response) => {
        if (response.data === "0") {
          Swal.fire({
            title: "Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
          fetchData();
          setKimo({
            ...Kimo,
            INCENTIVE_EMPLOYEE_FKID: empid,
            INCENTIVE_AMOUNT: "",
            INCENTIVE_DESCRIPTION: "",
            INCENTIVE_MONTH: "",
            INCENTIVE_PKID: "",
            INCENTIVE_TYPE: "",
            AddButton: true,
            UpdateButton: false,
            Monthselection: false,
            YearSelection: false,
          });
          document.getElementById("monthly").checked = false;
          document.getElementById("yearly").checked = false;
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
          setKimo({
            ...Kimo,
            INCENTIVE_EMPLOYEE_FKID: empid,
            INCENTIVE_AMOUNT: "",
            INCENTIVE_DESCRIPTION: "",
            INCENTIVE_MONTH: "",
            INCENTIVE_PKID: "",
            INCENTIVE_TYPE: "",
            AddButton: true,
            UpdateButton: false,
            Monthselection: false,
            YearSelection: false,
          });
          document.getElementById("monthly").checked = false;
          document.getElementById("yearly").checked = false;
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === false) {
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

  const UpdateIncentive = () => {
    if (Kimo.INCENTIVE_MONTH === "" || Kimo.INCENTIVE_MONTH === null) {
      Toast.fire({
        icon: "warning",
        title: "Select Month OR Year!",
      });
    } else if (Kimo.INCENTIVE_AMOUNT === "" || Kimo.INCENTIVE_AMOUNT === null) {
      Toast.fire({
        icon: "warning",
        title: "Add Amount!",
      });
    } else if (
      Kimo.INCENTIVE_DESCRIPTION === "" ||
      Kimo.INCENTIVE_DESCRIPTION === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Add Description!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      let monthobj = "";
      if (Kimo.INCENTIVE_TYPE === "monthly") {
        monthobj = Kimo.INCENTIVE_MONTH + "-01";
      } else {
        monthobj = Kimo.INCENTIVE_MONTH;
      }
      const obj = {
        INCENTIVE_EMPLOYEE_FKID: Kimo.INCENTIVE_EMPLOYEE_FKID,
        INCENTIVE_AMOUNT: Kimo.INCENTIVE_AMOUNT,
        INCENTIVE_DESCRIPTION: Kimo.INCENTIVE_DESCRIPTION,
        INCENTIVE_MONTH: monthobj,
        INCENTIVE_TYPE: Kimo.INCENTIVE_TYPE,
      };

      axios
        .put(MyApiUrl + "incentives/" + Kimo.INCENTIVE_PKID, obj)
        .then((response) => {
          if (response.data === "0") {
            Swal.fire({
              title: "Already Exist!",
              icon: "info",
              confirmButtonText: "OK",
            });
            fetchData();
            setKimo({
              ...Kimo,
              INCENTIVE_EMPLOYEE_FKID: empid,
              INCENTIVE_AMOUNT: "",
              INCENTIVE_DESCRIPTION: "",
              INCENTIVE_MONTH: "",
              INCENTIVE_PKID: "",
              INCENTIVE_TYPE: "",
              AddButton: true,
              UpdateButton: false,
              Monthselection: false,
              YearSelection: false,
            });
            document.getElementById("monthly").checked = false;
            document.getElementById("yearly").checked = false;
            document.getElementById("divLoading").className = "hide";
          } else if (response.data === true) {
            Swal.fire({
              title: "Update Successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });
            fetchData();
            setKimo({
              ...Kimo,
              INCENTIVE_EMPLOYEE_FKID: empid,
              INCENTIVE_AMOUNT: "",
              INCENTIVE_DESCRIPTION: "",
              INCENTIVE_MONTH: "",
              INCENTIVE_PKID: "",
              INCENTIVE_TYPE: "",
              AddButton: true,
              UpdateButton: false,
              Monthselection: false,
              YearSelection: false,
            });
            document.getElementById("monthly").checked = false;
            document.getElementById("yearly").checked = false;
            document.getElementById("divLoading").className = "hide";
          } else if (response.data === false) {
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

  const EditIncentive = (id, empid2, amt, desc, month, type) => {
    document.getElementById("divLoading").className = "show";
    if (type === "monthly") {
      document.getElementById("monthly").checked = true;
      document.getElementById("yearly").checked = false;
      const date = month.split("-");
      setKimo({
        ...Kimo,
        INCENTIVE_EMPLOYEE_FKID: empid2,
        INCENTIVE_AMOUNT: amt,
        INCENTIVE_DESCRIPTION: desc,
        INCENTIVE_MONTH: date[0] + "-" + date[1],
        INCENTIVE_PKID: id,
        INCENTIVE_TYPE: type,
        AddButton: false,
        UpdateButton: true,
        Monthselection: true,
        YearSelection: false,
      });
      document.getElementById("divLoading").className = "hide";
    } else {
      document.getElementById("monthly").checked = false;
      document.getElementById("yearly").checked = true;
      setKimo({
        ...Kimo,
        INCENTIVE_EMPLOYEE_FKID: empid2,
        INCENTIVE_AMOUNT: amt,
        INCENTIVE_DESCRIPTION: desc,
        INCENTIVE_MONTH: month,
        INCENTIVE_PKID: id,
        INCENTIVE_TYPE: type,
        AddButton: false,
        UpdateButton: true,
        Monthselection: false,
        YearSelection: true,
      });
      document.getElementById("divLoading").className = "hide";
    }
  };

  const DeleteIncenitve = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios
        .put(MyApiUrl + "deleteincentives/" + id)
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            fetchData();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Failed To Deleted!",
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
      url: MyApiUrl + "incentives",
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
            "Month / Year": item.Month,
            Amount: item.INCENTIVE_AMOUNT,
            Description: item.INCENTIVE_DESCRIPTION,
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
    <CButton type="button" onClick={UpdateIncentive} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddIncentive} size="md" id="Add-btn">
      Add
    </CButton>
  );

  const Month = () => (
    <React.Fragment>
      <CLabel>Month</CLabel>
      <CInput
        id="text-input1"
        type="month"
        name="text-input"
        placeholder="Employee Month"
        value={Kimo.INCENTIVE_MONTH}
        onChange={(e) => {
          setKimo({
            ...Kimo,
            INCENTIVE_MONTH: e.target.value,
          });
        }}
      />
    </React.Fragment>
  );

  const Year = () => (
    <React.Fragment>
      <CLabel>Year</CLabel>
      <CInput
        id="text-input1"
        type="text"
        name="text-input"
        placeholder="YYYY"
        value={Kimo.INCENTIVE_MONTH}
        onChange={(e) => {
          setKimo({
            ...Kimo,
            INCENTIVE_MONTH: e.target.value,
          });
        }}
      />
    </React.Fragment>
  );

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Employee Incentive</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Employee Incentive</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CRow>
                                <CCol md="6">
                                  <label>
                                    <input
                                      type="radio"
                                      name="radio"
                                      id="monthly"
                                      onChange={ViewMonthOrYear}
                                      value="monthly"
                                    />
                                    <span>Monthly</span>
                                  </label>
                                </CCol>
                                <CCol md="6">
                                  <label>
                                    <input
                                      type="radio"
                                      name="radio"
                                      id="yearly"
                                      onChange={ViewMonthOrYear}
                                      value="yearly"
                                    />
                                    <span>Yearly</span>
                                  </label>
                                </CCol>
                              </CRow>
                            </CCol>
                            <CCol xs="12" md="12">
                              {Kimo.Monthselection && <Month />}
                              {Kimo.YearSelection && <Year />}
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Amount</CLabel>
                              <CInput
                                id="text-input1"
                                type="text"
                                name="text-input"
                                placeholder="Incentive Amount"
                                value={Kimo.INCENTIVE_AMOUNT}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    INCENTIVE_AMOUNT: e.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel>Description</CLabel>
                              <CInput
                                id="text-input1"
                                type="text"
                                name="text-input"
                                placeholder="Description"
                                value={Kimo.INCENTIVE_DESCRIPTION}
                                onChange={(e) => {
                                  setKimo({
                                    ...Kimo,
                                    INCENTIVE_DESCRIPTION: e.target.value,
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
                      <CCardHeader>Added Employee Incentive</CCardHeader>
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
                                    EditIncentive(
                                      item.INCENTIVE_PKID,
                                      item.INCENTIVE_EMPLOYEE_FKID,
                                      item.INCENTIVE_AMOUNT,
                                      item.INCENTIVE_DESCRIPTION,
                                      item.INCENTIVE_MONTH,
                                      item.INCENTIVE_TYPE
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
                                    DeleteIncenitve(item.INCENTIVE_PKID);
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

export default AddEmployeeIncentive;
