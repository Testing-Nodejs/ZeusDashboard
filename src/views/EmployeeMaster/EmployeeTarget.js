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
import "../../RadioButtons.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields1 = [{ key: "Action" }, { key: "Company" }, { key: "Employee" }, { key: "Amount" }, { key: "Year" }, { key: "Type" }, { key: "Month" }, { key: "Employee Type" }, { key: "Employee Sub Type" }];

const DistrictMaster = () => {

    const [TargetPKID, setTargetPKID] = useState();
    const [CompanyData, setCompanyData] = useState([]);
    const [EmployeeData, setEmployeeData] = useState([]);
    const [TargetData, setTargetData] = useState([]);
    const [SelectedCompany, setSelectedCompany] = useState("-1");
    const [SelectedEmployee, setSelectedEmployee] = useState("-1");
    const [Year, setYear] = useState();
    const [Month, setMonth] = useState(0);
    const [Amount, setAmount] = useState();
    const [AddButton, setAddButton] = useState(true);
    const [UpdateButton, setUpdateButton] = useState(false);
    const [Monthselection, setMonthselection] = useState(false);
    const [TargetEmpType, setTargetEmpType] = useState("");

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

    const CompanyChange = (event) => {
        setSelectedCompany(event.target.value);
    };

    const GetEmployee = (cid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "emps",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const StateOption = response.data.map((item) => (
                    <option value={item.EMPLOYEE_PKID}>{item.EMPLOYEE_NAME}</option>
                ));
                setEmployeeData(StateOption);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const EmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const AddTarget = () => {
        if (SelectedCompany === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select Company!",
            });
        } else if (SelectedEmployee === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select Employee!",
            });
        } else if (Amount === "" || Amount == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Target Amount!",
            });
        } else if (Year === "" || Year == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Year!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                "TARGET_COMP_FKID": SelectedCompany,
                "TARGET_EMP_FKID": SelectedEmployee,
                "TARGET_AMOUNT": Amount,
                "TARGET_YEAR": Year,
                "TARGET_MONTH_START": Month,
                "TARGET_TYPE": TargetEmpType,
            };
            axios.post(MyApiUrl + "targets", obj).then((response) => {
                if (response.data === "0") {
                    Swal.fire({
                        title: "Target Already Assigned!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === true) {
                    Swal.fire({
                        title: "Target Assigned Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    Reset();
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === false) {
                    Swal.fire({
                        title: "Failed To Assign Target!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const Reset = () => {
        GetTarget();
        setSelectedCompany("-1");
        setSelectedEmployee("-1");
        setAmount("");
        setYear("");
        setMonth("");
        setAddButton(true);
        setUpdateButton(false);
        document.getElementById("monthly").checked = false;
        document.getElementById("yearly").checked = false;
    }

    const EditTarget = (id, CompanyID, EmployeeID, Amount, type, month, Year) => {
        if (type === "Monthly") {
            document.getElementById("monthly").checked = true;
            document.getElementById("yearly").checked = false;
            setMonthselection(true);

        } else {
            document.getElementById("monthly").checked = false;
            document.getElementById("yearly").checked = true;
            setMonthselection(false);
        }
        setTargetPKID(id);
        setSelectedCompany(CompanyID);
        setSelectedEmployee(EmployeeID);
        setAmount(Amount);
        setYear(Year);
        setTargetEmpType(type);
        setMonth(month);
        setAddButton(false);
        setUpdateButton(true);
    };

    const UpdateTarget = () => {
        if (SelectedCompany === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select Company!",
            });
        } else if (SelectedEmployee === "-1") {
            Toast.fire({
                icon: "warning",
                title: "Please Select Employee!",
            });
        } else if (Amount === "" || Amount == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Target Amount!",
            });
        } else if (Year === "" || Year == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Year!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                "TARGET_COMP_FKID": SelectedCompany,
                "TARGET_EMP_FKID": SelectedEmployee,
                "TARGET_AMOUNT": Amount,
                "TARGET_YEAR": Year,
                "TARGET_MONTH_START": Month,
                "TARGET_TYPE": TargetEmpType,
            };

            axios.put(MyApiUrl + "targets/" + TargetPKID + "", obj).then((response) => {
                if (response.data === true) {
                    Swal.fire({
                        title: "Target Assigned Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    Reset();
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === false) {
                    Swal.fire({
                        title: "Failed To Assign Target!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const DeleteTarget = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "targets/" + id + "",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((response) => {
                    if (response.data === true) {
                        Swal.fire({
                            title: "Selected Target Deleted!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        GetTarget();
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Failed To Delete Target!",
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

    const GetCompany = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "companies",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const CountryOption = response.data.map((item) => (
                    <option value={item.COMPANY_PKID}>{item.COMPANY_NAME}</option>
                ));
                setCompanyData(CountryOption);
                GetEmployee();
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const GetTarget = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "targets",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const items = response.data.map((item) => {
                    return {
                        ...item,
                        Company: item.COMPANY_NAME,
                        Employee: item.EMPLOYEE_NAME,
                        Amount: item.TARGET_AMOUNT,
                        Year: item.TARGET_YEAR,
                        "Employee Type": item.EMPLOYEE_TYPE_NAME,
                        "Employee Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
                        "Type": item.TARGET_TYPE,
                        "Month": item.TARGET_MONTH_START,
                    };
                });
                setTargetData(items);
                GetCompany();
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        GetTarget();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Updatebtn = () => (
        <CButton type="button" onClick={UpdateTarget} size="md" id="Add-btn">
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddTarget} size="md" id="Add-btn">
            Add
        </CButton>
    );

    const ViewMonthOrYear = (e) => {
        let val = e.target.value;
        if (val === "monthly") {
            setMonthselection(true);
            setTargetEmpType("Monthly");
        } else {
            setMonthselection(false);
            setTargetEmpType("Regular");
            setMonth("0");
        }
    };

    const MonthSel = () => (
        <React.Fragment>
            <CFormGroup row>
                <CCol xs="12" md="12">
                    <CLabel>Month</CLabel>
                    <CInput
                        id="text-input"
                        name="text-input"
                        placeholder="Month Number"
                        value={Month}
                        onChange={(event) => {
                            const re = /^[0-9\b]+$/;
                            if (
                                event.target.value === "" ||
                                re.test(event.target.value)
                            ) {
                                setMonth(event.target.value);
                            }
                        }}
                    />
                </CCol>
            </CFormGroup>
        </React.Fragment>
    );

    return (
        <div id="state">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Target Master</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>Add Employee Target</CCardHeader>
                                        <CCardBody>
                                            <CForm
                                                action=""
                                                method="post"
                                                encType="multipart/form-data"
                                                className="form-horizontal"
                                            >
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12">
                                                        <CLabel>Select Company</CLabel>
                                                        <CSelect
                                                            custom
                                                            name="Country"
                                                            id="Country"
                                                            onChange={CompanyChange}
                                                            value={SelectedCompany}
                                                        >
                                                            <option value="-1">Select Company</option>
                                                            {CompanyData}
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12">
                                                        <CLabel>Select Employee</CLabel>
                                                        <CSelect
                                                            custom
                                                            name="Country"
                                                            id="Country"
                                                            onChange={EmployeeChange}
                                                            value={SelectedEmployee}
                                                        >
                                                            <option value="-1">Select Employee</option>
                                                            {EmployeeData}
                                                        </CSelect>
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12">
                                                        <CLabel>Target Amount</CLabel>
                                                        <CInput
                                                            id="text-input"
                                                            name="text-input"
                                                            placeholder="Amount"
                                                            value={Amount}
                                                            onChange={(event) => {
                                                                const re = /^[0-9\b]+$/;
                                                                if (
                                                                    event.target.value === "" ||
                                                                    re.test(event.target.value)
                                                                ) {
                                                                    setAmount(event.target.value);
                                                                }
                                                            }}
                                                        />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12">
                                                        <CLabel>Year</CLabel>
                                                        <CInput
                                                            id="text-input"
                                                            name="text-input"
                                                            placeholder="YYYY"
                                                            value={Year}
                                                            onChange={(event) => {
                                                                const re = /^[0-9\b]+$/;
                                                                if (
                                                                    event.target.value === "" ||
                                                                    re.test(event.target.value)
                                                                ) {
                                                                    setYear(event.target.value);
                                                                }
                                                            }}
                                                        />
                                                    </CCol>
                                                </CFormGroup>
                                                <CFormGroup row>
                                                    <CCol xs="12" md="12" style={{ marginTop: "5%", paddingBottom: "3%" }}>
                                                        <CRow>
                                                            <CCol md="6">
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="radio"
                                                                        id="yearly"
                                                                        onChange={ViewMonthOrYear}
                                                                        value="yearly"
                                                                    />
                                                                    <span>Regular</span>
                                                                </label>
                                                            </CCol>
                                                            <CCol md="6">
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="radio"
                                                                        id="monthly"
                                                                        onChange={ViewMonthOrYear}
                                                                        value="monthly"
                                                                    />
                                                                    <span>Other</span>
                                                                </label>
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                </CFormGroup>
                                                {Monthselection && <MonthSel />}
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
                                        <CCardHeader>Added Targets</CCardHeader>
                                        <CCardBody>
                                            <CDataTable
                                                items={TargetData}
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
                                                                    EditTarget(
                                                                        item.TARGET_PKID,
                                                                        item.TARGET_COMP_FKID,
                                                                        item.TARGET_EMP_FKID,
                                                                        item.TARGET_AMOUNT,
                                                                        item.TARGET_TYPE,
                                                                        item.TARGET_MONTH_START,
                                                                        item.TARGET_YEAR
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
                                                                    DeleteTarget(item.TARGET_PKID);
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
