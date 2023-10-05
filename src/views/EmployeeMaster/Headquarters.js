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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from "@coreui/react";
import { MyApiUrl } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import Swal from "sweetalert2";
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
    { key: "Action" },
    { key: "Country" },
    { key: "State" },
    { key: "District" },
    { key: "Taluk" },
    { key: "Headquarter" },
    { key: "Employees" },
];

const fields = [
    { key: "SL No" },
    { key: "Employee" },
    { key: "Type" },
    { key: "Sub Type" },
];

const Headquarters = () => {
    const [AddButton, setAddButton] = useState(true);
    const [UpdateButton, setUpdateButton] = useState(false);

    const [CountryData, setCountryData] = useState();
    const [StateData, setStateData] = useState();
    const [DistrictData, setDistrictData] = useState();
    const [CityData, setCityData] = useState();

    const [Country, setCountry] = useState("-1");
    const [State, setState] = useState("-1");
    const [District, setDistrict] = useState("-1");
    const [City, setCity] = useState("-1");
    const [hq, sethq] = useState();

    const [HqData, setHqData] = useState([]);
    const [pkid, setpkid] = useState();

    const [EmpList, setEmpList] = useState('');
    const [EmployeeData, setEmployeeData] = useState([]);

    const [block, setBlock] = useState(false);
    const [EmployeeSelected, setEmployeeSelected] = useState([]);

    const GetSelectedEmp = (val) => {
        setEmpList(val)
    }

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
                GetEmployees();
                GetCities();
                document.getElementById("divLoading").className = "hide";
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

    const GetEmployees = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "supervisors",
            headers: {
                "content-type": "application/json",
            },
            params: {
                language_code: "en",
            },
        })
            .then((response) => {
                setEmployeeData(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

    const AddHQ = () => {
        if (Country === "-1" || Country === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select Country!",
            });
        } else if (State === "-1" || State === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select State!",
            });
        } else if (District === "-1" || District === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select District!",
            });
        } else if (City === "-1" || City === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select City!",
            });
        } else if (hq === "" || hq === null || hq === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Headquarter!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                "HQ_COUNTRY_FKID": Country,
                "HQ_STATE_FKID": State,
                "HQ_DISTRICT_FKID": District,
                "HQ_TALUK_FKID": City,
                "HQ_NAME": hq,
                "EMP": EmpList,
            };
            axios.post(MyApiUrl + "hq", obj).then((response) => {
                if (response.data === true) {
                    Swal.fire({
                        title: "Headquarter Added!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    GetCountry();
                    setStateData(null);
                    setCityData(null);
                    setCountry("-1");
                    setState("-1");
                    setDistrict("-1");
                    setCity("-1");
                    sethq("");
                    setEmpList("");
                    GetAllHQ();
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === false) {
                    Swal.fire({
                        title: "Headquarter Failed To Add!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    GetCountry();
                    setStateData(null);
                    setCityData(null);
                    setCountry("-1");
                    setState("-1");
                    setDistrict("-1");
                    setCity("-1");
                    sethq("");
                    setEmpList("");
                    GetAllHQ();
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

    const EditHq = (id, countryid, stateid, districtid, cityId, hq, EMPList) => {
        setEmpList('' + EMPList + '');
        setCountry(countryid);
        GetStateForUpdate(countryid, stateid);
        GetDistrictForUpdate(stateid, districtid);
        GetcitiesByStateIdUpdate(districtid, cityId);
        setCity(cityId);
        setpkid(id);
        sethq(hq);
        setAddButton(false);
        setUpdateButton(true);
    };

    const UpdateHQ = () => {
        if (Country === "-1" || Country === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select Country!",
            });
        } else if (State === "-1" || State === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select State!",
            });
        } else if (District === "-1" || District === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select District!",
            });
        } else if (City === "-1" || City === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Select City!",
            });
        } else if (hq === "" || hq === null || hq === undefined) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Headquarter!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                "HQ_COUNTRY_FKID": Country,
                "HQ_STATE_FKID": State,
                "HQ_DISTRICT_FKID": District,
                "HQ_TALUK_FKID": City,
                "HQ_NAME": hq,
                "EMP": EmpList,
            };
            axios.put(MyApiUrl + "hq/" + pkid + "", obj).then((response) => {
                if (response.data === true) {
                    Swal.fire({
                        title: "Headquarter Details Updated!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    GetCountry();
                    setStateData(null);
                    setCityData(null);
                    setCountry("-1");
                    setState("-1");
                    setDistrict("-1");
                    setCity("-1");
                    sethq("");
                    setEmpList("");
                    GetAllHQ();
                    document.getElementById("divLoading").className = "hide";
                } else {
                    Swal.fire({
                        title: "Failed To Update!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    GetCountry();
                    setStateData(null);
                    setCityData(null);
                    setCountry("-1");
                    setState("-1");
                    setDistrict("-1");
                    setCity("-1");
                    sethq("");
                    setEmpList("");
                    GetAllHQ();
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const DeleteHQ = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "hq/" + id + "",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((response) => {
                    if (response.data === true) {
                        Swal.fire({
                            title: "Selected Headquarter Deleted!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        GetAllHQ();
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Failed To Delete Headquarter!",
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

    const GetAllHQ = React.useCallback(() => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "hq",
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
                        Headquarter: item.HQ_NAME,
                    };
                });
                setHqData(items);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const Updatebtn = () => (
        <CButton type="button" onClick={UpdateHQ} size="md" id="Add-btn">
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddHQ} size="md" id="Add-btn">
            Add
        </CButton>
    );

    const AllEmployees = (pkid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "hqemps/" + pkid + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                var cnt = 0;
                const items = response.data.map((item) => {
                    cnt++;
                    return {
                        ...item,
                        "SL No": cnt,
                        Employee: item.EMPLOYEE_NAME,
                        Type: item.EMPLOYEE_TYPE_NAME,
                        "Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
                    };
                });
                setEmployeeSelected(items);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
        setBlock(!block);
    }

    React.useEffect(() => {
        GetCountry();
        GetAllHQ();
    }, [EmpList]);

    return (
        <div id="city">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Headquarter Master</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>Manage Headquarters</CCardHeader>
                                        <CCardBody>
                                            <CForm
                                                action=""
                                                method="post"
                                                encType="multipart/form-data"
                                                className="form-horizontal"
                                            >
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12">
                                                        <CLabel>Select Manager / Superior</CLabel>
                                                        <MultiSelect
                                                            defaultValue={EmpList}
                                                            width={400}
                                                            onChange={GetSelectedEmp}
                                                            options={EmployeeData}
                                                        />
                                                    </CCol>
                                                </CFormGroup>
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
                                                        <CLabel>Select Taluk</CLabel>
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
                                                        <CLabel>HQ Name</CLabel>
                                                        <CInput
                                                            id="text-input1"
                                                            name="text-input"
                                                            placeholder="Headquarter"
                                                            value={hq}
                                                            onChange={(event) => {
                                                                let value = event.target.value;
                                                                value = value.replace(/[^A-Z a-z]/gi, "");
                                                                sethq(value);
                                                            }}
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
                                        <CCardHeader>Added Headquarters</CCardHeader>
                                        <CCardBody>
                                            <CDataTable
                                                items={HqData}
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
                                                                    EditHq(
                                                                        item.HQ_PKID,
                                                                        item.HQ_COUNTRY_FKID,
                                                                        item.HQ_STATE_FKID,
                                                                        item.HQ_DISTRICT_FKID,
                                                                        item.HQ_TALUK_FKID,
                                                                        item.HQ_NAME,
                                                                        item.EMPList,
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
                                                                    DeleteHQ(item.HQ_PKID);
                                                                }}
                                                                id="war-btn1"
                                                            >
                                                                <DeleteSharpIcon />
                                                                {item.status}
                                                            </CButton>
                                                        </td>
                                                    ),
                                                    "Employees": (i) => (
                                                        <td>
                                                            <CRow>
                                                                <CCol md="8">
                                                                    <CButton
                                                                        color="primary"
                                                                        size="sm"
                                                                        id="AddEmp"
                                                                        onClick={() => {
                                                                            AllEmployees(i.HQ_PKID);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
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
            <CModal show={block} onClose={() => setBlock(!block)} color="dark">
                <CModalHeader closeButton>
                    <CModalTitle>Employees Under This HQ</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol md="12">
                            <CDataTable
                                items={EmployeeSelected}
                                fields={fields}
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
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setBlock(!block)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default Headquarters;
