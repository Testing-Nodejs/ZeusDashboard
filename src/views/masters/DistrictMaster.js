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
const fields1 = [{ key: "Action" }, { key: "Country" }, { key: "State" }, { key: "District" }];

const DistrictMaster = () => {

    const [DistrictPkid, setDistrictPkid] = useState();
    const [CountryData, setCountryData] = useState([]);
    const [StateData, setStateData] = useState([]);
    const [DistrictData, setDistrictData] = useState([]);
    const [SelectedCountry, setSelectedCountry] = useState("-1");
    const [SelectedState, setSelectedState] = useState("-1");
    const [DistrictName, setDistrictName] = useState();
    const [AddButton, setAddButton] = useState(true);
    const [UpdateButton, setUpdateButton] = useState(false);

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

    const CountryChange = (event) => {
        setSelectedCountry(event.target.value);
        GetState(event.target.value);
    };

    const GetState = (cid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "getStateByCountryId/" + cid + "",
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
    }

    const StateChange = (event) => {
        setSelectedState(event.target.value);
        axios({
            method: "GET",
            url: MyApiUrl + "states/" + event.target.value + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                console.log(response.data)
                console.log(response.data.STATE_COUNTRY_FKID)
                setSelectedCountry(response.data.STATE_COUNTRY_FKID);
            })
            .catch((error) => {
                console.log(error); 
            });
    };

    const AddDistrict = () => {
        if (SelectedCountry === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select Country!",
            });
        } else if (SelectedState === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select State!",
            });
        } else if (DistrictName === "" || DistrictName == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter District Name!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                "DISTRICT_COUNTRY_FKID": SelectedCountry,
                "DISTRICT_STATE_FKID": SelectedState,
                "DISTRICT_NAME": DistrictName
            };
            axios.post(MyApiUrl + "districts", obj).then((response) => {
                if (response.data === "0") {
                    Swal.fire({
                        title: "District Already Exist!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === true) {
                    Swal.fire({
                        title: "District Added Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    Reset();
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

    const Reset = () => {
        GetDistrict();
        GetCountry();
        setSelectedCountry("-1");
        setSelectedState("-1");
        setDistrictName("");
        setAddButton(true);
        setUpdateButton(false);
    }

    const EditDistrict = (id, countryid, stateid, district) => {
        setDistrictPkid(id);
        setSelectedCountry(countryid);
        setSelectedState(stateid);
        setDistrictName(district);
        setAddButton(false);
        setUpdateButton(true);
    };

    const UpdateDistrict = () => {
        if (SelectedCountry === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select Country!",
            });
        } else if (SelectedState === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select State!",
            });
        } else if (DistrictName === "" || DistrictName == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter District Name!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                "DISTRICT_COUNTRY_FKID": SelectedCountry,
                "DISTRICT_STATE_FKID": SelectedState,
                "DISTRICT_NAME": DistrictName,
                "DISTRICT_PKID": DistrictPkid
            };
            axios.put(MyApiUrl + "districts/" + DistrictPkid, obj).then((response) => {
                if (response.data === true) {
                    Swal.fire({
                        title: "District Details Updated Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    Reset();
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

    const DeleteDistrict = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "districts/" + id + "",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((response) => {
                    if (response.data === true) {
                        Swal.fire({
                            title: "Selected District Deleted!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        GetDistrict();
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Failed To Delete District!",
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
        document.getElementById("divLoading").className = "show";
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
                GetAllStates();
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const GetAllStates = () => {
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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const GetDistrict = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "districts",
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
                    };
                });
                setDistrictData(items);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        GetCountry();
        GetDistrict();
    }, []);

    const Updatebtn = () => (
        <CButton type="button" onClick={UpdateDistrict} size="md" id="Add-btn">
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddDistrict} size="md" id="Add-btn">
            Add
        </CButton>
    );

    return (
        <div id="state">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">
                District Master
            </h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>Add District</CCardHeader>
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
                                                            onChange={CountryChange}
                                                            value={SelectedCountry}
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
                                                            name="Country"
                                                            id="Country"
                                                            onChange={StateChange}
                                                            value={SelectedState}
                                                        >
                                                            <option value="-1">Select State</option>
                                                            {StateData}
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12">
                                                        <CLabel>District</CLabel>
                                                        <CInput
                                                            id="text-input"
                                                            name="text-input"
                                                            placeholder="District"
                                                            value={DistrictName}
                                                            onChange={(event) => {
                                                                let value = event.target.value;
                                                                value = value.replace(/[^A-Z a-z]/gi, "");
                                                                setDistrictName(value);
                                                            }}
                                                        />
                                                    </CCol>
                                                </CFormGroup>
                                            </CForm>
                                            {AddButton && <Addbtn />}
                                            {UpdateButton && <Updatebtn />}
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
                                        <CCardHeader>Added District</CCardHeader>
                                        <CCardBody>
                                            <CDataTable
                                                items={DistrictData}
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
                                                                    EditDistrict(
                                                                        item.DISTRICT_PKID,
                                                                        item.DISTRICT_COUNTRY_FKID,
                                                                        item.DISTRICT_STATE_FKID,
                                                                        item.DISTRICT_NAME
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
                                                                    DeleteDistrict(item.DISTRICT_PKID);
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

export default DistrictMaster;
