/* eslint-disable react-hooks/exhaustive-deps */
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
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Country" },
  { key: "State" },
  { key: "District" },
  { key: "Taluk" },
];

const CityMaster = () => {
  const [AddButton, setAddButton] = useState(true);
  const [UpdateButton, setUpdateButton] = useState(false);
  const [CountryData, setCountryData] = useState([]);
  const [StateData, setStateData] = useState([]);
  const [DistrictData, setDistrictData] = useState([]);
  const [Country, setCountry] = useState("-1");
  const [State, setState] = useState("-1");
  const [District, setDistrict] = useState("-1");
  const [City, setCity] = useState();
  const [CityPkid, setCitypkid] = useState();
  const [CityData, setCityData] = useState([]);

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

  React.useEffect(() => {
    GetCountry();
    GetCities();
  }, []);

  const GetCountry = React.useCallback(() => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "countries",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const CountryOption = response.data.map((item) => (
          <option value={item.COUNTRY_PKID}>{item.COUNTRY_NAME}</option>
        ));
        setCountryData(CountryOption);
        document.getElementById("divLoading").className = "hide";
        GetAllDistricts();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetState = React.useCallback((Countrypkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getStateByCountryId/" + Countrypkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateData(StateOption);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetDistrict = React.useCallback((StateID) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getDistrictsByCountryAndState/" + StateID + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const districtoption = response.data.map((item) => (
          <option value={item.DISTRICT_PKID}>{item.DISTRICT_NAME}</option>
        ));
        setDistrictData(districtoption);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetStateForUpdate = React.useCallback((Countrypkid, stateid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getStateByCountryId/" + Countrypkid + "",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateData(StateOption);
        setState(stateid);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const GetDistrictForUpdate = React.useCallback((stateid, district) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getDistrictsByCountryAndState/" + stateid + "",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const disOption = response.data.map((item) => (
          <option value={item.DISTRICT_PKID}>{item.DISTRICT_NAME}</option>
        ));
        setDistrictData(disOption);
        setDistrict(district);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetAllDistricts = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "districts",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const districtoption = response.data.map((item) => (
          <option value={item.DISTRICT_PKID}>{item.DISTRICT_NAME}</option>
        ));
        setDistrictData(districtoption);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const CountryChange = (event) => {
    setCountry(event.target.value);
    GetState(event.target.value);
  };

  const StateCahange = (event) => {
    setState(event.target.value);
    GetDistrict(event.target.value);
  };

  const DistrictCahange = (event) => {
    setDistrict(event.target.value);
    UpdateOtherDropdowns(event.target.value)
  }

  const CityChange = (event) => {
    setCity(event.target.value);
  };

  const UpdateOtherDropdowns = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "states",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateData(StateOption);
        console.log(pkid);
        axios({
          method: "GET",
          url: MyApiUrl + "districtsByID/" + pkid + "",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => {
            console.log(response.data);
            setState(response.data[0].DISTRICT_STATE_FKID);
            setCountry(response.data[0].DISTRICT_COUNTRY_FKID);
            document.getElementById("divLoading").className = "hide";
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const reset = () => {
    setCountry("-1");
    setState("-1");
    setDistrict("-1");
    setCity("");
    GetCities();
  }

  const AddCity = () => {
    if (Country === "-1" || Country == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (State === "-1" || State == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select State!",
      });
    } else if (District === "-1" || District == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select District!",
      });
    } else if (City === "" || City == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Taluk Name!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        "TALUK_COUNTRY_FKID": Country,
        "TALUK_STATE_FKID": State,
        "TALUK_DISTRICT_FKID": District,
        "TALUK_NAME": City,
      };

      axios.post(MyApiUrl + "taluks/", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Taluk Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
          reset();
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === false) {
          Swal.fire({
            title: "Taluk Not Added!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const EditCity = (id, countryid, stateid, cityCode, city) => {
    setCitypkid(id);
    setCountry(countryid);
    GetStateForUpdate(countryid, stateid);
    GetDistrictForUpdate(stateid, cityCode);
    setCity(city);
    setAddButton(false);
    setUpdateButton(true);
  };

  const UpdateCity = () => {
    if (Country === "-1" || Country == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (State === "-1" || State == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select State!",
      });
    } else if (District === "-1" || District == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select District!",
      });
    } else if (City === "" || City == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Taluk Name!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        "TALUK_COUNTRY_FKID": Country,
        "TALUK_STATE_FKID": State,
        "TALUK_DISTRICT_FKID": District,
        "TALUK_NAME": City,
      };

      axios.put(MyApiUrl + "taluks/" + CityPkid + "", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Taluk Details Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });
          reset();
          document.getElementById("divLoading").className = "hide";
        } else {
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

  const DeleteCity = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "taluks/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Selected Taluk Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });
            reset();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Failed To Delete Taluk!",
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

  const GetCities = React.useCallback(() => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "taluks",
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
            District: item.DISTRICT_NAME,
            Taluk: item.TALUK_NAME,
          };
        });
        setCityData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateCity} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddCity} size="md" id="Add-btn">
      Add
    </CButton>
  );

  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Taluk / City Master</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add Taluk / City </CCardHeader>
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
                              value={Country}
                              onChange={CountryChange}
                            >
                              <option value="-1">Select Country</option>
                              {CountryData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select State</CLabel>
                            <CSelect
                              custom
                              name="Province"
                              id="Province"
                              value={State}
                              onChange={StateCahange}
                            >
                              <option value="-1">Select State</option>
                              {StateData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select District</CLabel>
                            <CSelect
                              custom
                              name="Province"
                              id="Province"
                              value={District}
                              onChange={DistrictCahange}
                            >
                              <option value="-1">Select District</option>
                              {DistrictData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel> City</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="City"
                              value={City}
                              onChange={CityChange}
                            />
                          </CCol>
                        </CFormGroup>
                        {UpdateButton && <Updatebtn />}
                        {AddButton && <Addbtn />}
                      </CForm>
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
                    <CCardHeader>Added Taluk / Cities</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={CityData}
                        fields={fields2}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        itemsPerPageSelect={items}
                        columnFilterSlot
                        size="sm"
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          Action: (item) => (
                            <td>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  EditCity(
                                    item.TALUK_PKID,
                                    item.TALUK_COUNTRY_FKID,
                                    item.TALUK_STATE_FKID,
                                    item.TALUK_DISTRICT_FKID,
                                    item.TALUK_NAME
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
                                  DeleteCity(item.TALUK_PKID);
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

export default CityMaster;
