import React, { useState } from "react";
import axios from "axios";
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
import Swal from "sweetalert2";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields1 = [{ key: "Action" }, { key: "Country" }, { key: "State" }];

const StateMaster = () => {
  const [StatePkid, setStatePkid] = useState();
  const [CountryData, setCountryData] = useState();
  const [StateData, setStateData] = useState([]);
  const [CountryForState, setCountryForState] = useState("-1");
  const [StateForState, setStateForState] = useState();
  const [AddButtonForState, setAddButtonForState] = useState(true);
  const [UpdateButtonForState, setUpdateButtonForState] = useState(false);

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

  const CountryChangeForState = (event) => {
    setCountryForState(event.target.value);
  };

  const AddState = () => {
    if (CountryForState === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForState === "" || StateForState == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter State Name!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        CountryId: CountryForState,
        StateName: StateForState,
      };
      axios.post(MyApiUrl + "states", obj).then((response) => {
        if (response.data === "Already Existed!") {
          Swal.fire({
            title: "State Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "State Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountry();
          GetState();
          setStateForState("");
          setCountryForState("-1");
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

  const EditState = (id, countryid, state) => {
    setStatePkid(id);
    setCountryForState(countryid);
    setStateForState(state);
    setAddButtonForState(false);
    setUpdateButtonForState(true);
  };

  const UpdateState = () => {
    if (CountryForState === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForState === "" || StateForState == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter State Name!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        CountryId: CountryForState,
        StateName: StateForState,
        stateId: StatePkid,
      };
      axios.put(MyApiUrl + "states/" + StatePkid, obj).then((response) => {
        console.log("response.data :>> ", response.data);
        if (response.data === false) {
          Swal.fire({
            title: "Failed To Update!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "State Details Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountry();
          GetState();
          setStateForState("");
          setCountryForState("-1");
          setAddButtonForState(true);
          setUpdateButtonForState(false);
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const DeleteState = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "states/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Selected State Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });
            GetState();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Failed To Delete State!",
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

  const GetCountry = React.useCallback(() => {
    axios({
      method: "GET",
      url: MyApiUrl + "countries",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const CountryOption = response.data.map((item) => (
          <option value={item.COUNTRY_PKID}>{item.COUNTRY_NAME}</option>
        ));
        setCountryData(CountryOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetState = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "states",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            Country: item.COUNTRY_NAME,
            State: item.STATE_NAME,
          };
        });
        setStateData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    GetCountry();
    GetState();
  }, []);

  const UpdatebtnForState = () => (
    <CButton type="button" onClick={UpdateState} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const AddbtnForState = () => (
    <CButton type="button" onClick={AddState} size="md" id="Add-btn">
      Add
    </CButton>
  );

  return (
    <div id="state">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">State Master</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add State</CCardHeader>
                    <CCardBody>
                      <CForm
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select Country</CLabel>
                            <CSelect
                              custom
                              name="Country"
                              id="Country"
                              onChange={CountryChangeForState}
                              value={CountryForState}
                            >
                              <option value="-1">Select Country</option>
                              {CountryData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>State</CLabel>
                            <CInput
                              id="text-input"
                              name="text-input"
                              placeholder="State"
                              value={StateForState}
                              onChange={(event) => {
                                let value = event.target.value;
                                value = value.replace(/[^A-Z a-z]/gi, "");
                                setStateForState(value);
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                      </CForm>
                      {UpdateButtonForState && <UpdatebtnForState />}
                      {AddButtonForState && <AddbtnForState />}
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
                    <CCardHeader>Added States</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={StateData}
                        fields={fields1}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        size="sm"
                        itemsPerPageSelect={items}
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          Action: (item) => (
                            <td>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  EditState(
                                    item.STATE_PKID,
                                    item.STATE_COUNTRY_FKID,
                                    item.STATE_NAME
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
                                  DeleteState(item.STATE_PKID);
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
