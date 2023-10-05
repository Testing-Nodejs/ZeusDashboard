/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-07 17:32:50
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-11 18:55:47
 */

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
  { key: "Village" },
];

const AreaMaster = () => {
  const [AddButton, setAddButton] = useState(true);
  const [UpdateButton, setUpdateButton] = useState(false);
  const [CountryData, setCountryData] = useState();
  const [StateData, setStateData] = useState();
  const [Country, setCountry] = useState();
  const [State, setState] = useState();
  const [District, setDistrict] = useState();
  const [CityCode, setCityCode] = useState();
  const [City, setCity] = useState();
  const [CityPkid, setCitypkid] = useState();
  const [DistrictData, setDistrictData] = useState();
  const [CityData, setCityData] = useState();
  const [AreaData, setAreaData] = useState();
  const [areapkid, setareapkid] = useState();

  const [area, setarea] = useState();

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
        GetCities();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetCities = () => {
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
          const cityOpn = response.data.map((item) => (
            <option value={item.TALUK_PKID}>{item.TALUK_NAME}</option>
          ));
          setCityData(cityOpn);
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const GetcitiesByStateId = React.useCallback((did) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getTaluksByDistrict/" + did + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const cityOpn = response.data.map((item) => (
          <option value={item.TALUK_PKID}>{item.TALUK_NAME}</option>
        ));
        setCityData(cityOpn);
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

  const GetcitiesByStateIdUpdate = React.useCallback((did, cid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getTaluksByDistrict/" + did + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const cityOpn = response.data.map((item) => (
          <option value={item.TALUK_PKID}>{item.TALUK_NAME}</option>
        ));
        setCityData(cityOpn);
        setCity(cid);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const CountryChange = (event) => {
    setCountry(event.target.value);
    GetState(event.target.value);
  };

  const StateCahange = (event) => {
    GetDistrict(event.target.value);
    setState(event.target.value);
  };

  const DistrictCahange = (event) => {
    setDistrict(event.target.value);
    GetcitiesByStateId(event.target.value);
  }

  const CityChange = (event) => {
    setCity(event.target.value);
    UpdateOtherDropdowns(event.target.value);
  };

  const areaChange = (event) => {
    setarea(event.target.value);
  };

  const reset = () => {
    setStateData([]);
    setCountry("-1");
    setState("-1");
    setCity("-1");
    setDistrict("-1");
    setDistrictData([]);
    setCityData([]);
    setarea("");
    GetAreas();
  }

  const AddVillage = () => {
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
    } else if (City === "-1" || City == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Taluk!",
      });
    } else if (area === "" || area == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Villge Name!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        "VILLAGE_COUNTRY_FKID": Country,
        "VILLAGE_STATE_FKID": State,
        "VILLAGE_DISTRICT_FKID": District,
        "VILLAGE_TALUK_FKID": City,
        "VILLAGE_NAME": area,
      };

      axios.post(MyApiUrl + "villages/", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Village Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
          reset();
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === false) {
          Swal.fire({
            title: "Village Not Added!",
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

  const EditCity = (id, countryid, stateid, districtid, cityId, area) => {
    setCountry(countryid);
    GetStateForUpdate(countryid, stateid);
    GetDistrictForUpdate(stateid, districtid);
    GetcitiesByStateIdUpdate(districtid, cityId);
    setarea(area);
    setareapkid(id);
    setAddButton(false);
    setUpdateButton(true);
  };

  const UpdateVillage = () => {
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
    } else if (City === "-1" || City == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Taluk!",
      });
    } else if (area === "" || area == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Villge Name!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        "VILLAGE_COUNTRY_FKID": Country,
        "VILLAGE_STATE_FKID": State,
        "VILLAGE_DISTRICT_FKID": District,
        "VILLAGE_TALUK_FKID": City,
        "VILLAGE_NAME": area,
      };

      axios.put(MyApiUrl + "villages/" + areapkid + "", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Village Details Updated!",
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
        url: MyApiUrl + "villages/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Selected Village Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });
            reset();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Failed To Delete Village!",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
          document.getElementById("divLoading").className = "hide";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const GetAreas = React.useCallback(() => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "villages",
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
            Village: item.VILLAGE_NAME,
          };
        });
        setAreaData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const UpdateOtherDropdowns = (pkid) => {
    document.getElementById("divLoading").className = "show";
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
            axios({
              method: "GET",
              url: MyApiUrl + "taluksByID/" + pkid + "",
              headers: {
                "content-type": "application/json",
              },
            })
              .then((response) => {
                setState(response.data[0].TALUK_STATE_FKID);
                setDistrict(response.data[0].TALUK_DISTRICT_FKID);
                setCountry(response.data[0].TALUK_COUNTRY_FKID);
                document.getElementById("divLoading").className = "hide";
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateVillage} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddVillage} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    GetCountry();
    GetAreas();
  }, []);


  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Village Master</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add Village</CCardHeader>
                    <CCardBody>
                      <CForm
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Country</CLabel>
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
                            <CLabel>State</CLabel>
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
                            <CLabel>District</CLabel>
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
                            <CLabel>Taluk / City</CLabel>
                            <CSelect
                              custom
                              name="City"
                              id="City"
                              value={City}
                              onChange={CityChange}
                            >
                              <option value="-1">Select City</option>
                              {CityData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Village</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Village"
                              value={area}
                              onChange={areaChange}
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
        <CCol sm="12" md="12" lg="8" xl="8" className="mb-3 mb-xl-0">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Added Villages</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={AreaData}
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
                                    item.VILLAGE_PKID,
                                    item.VILLAGE_COUNTRY_FKID,
                                    item.VILLAGE_STATE_FKID,
                                    item.VILLAGE_DISTRICT_FKID,
                                    item.VILLAGE_TALUK_FKID,
                                    item.VILLAGE_NAME
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
                                  DeleteCity(item.VILLAGE_PKID);
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

export default AreaMaster;
