/*
 * @Author: ---- KIMO a.k.a KIMOSABE ----
 * @Date: 2022-02-12 16:16:24
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-02-12 18:23:52
 */ 

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Dropzone from "react-dropzone";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CLink,
} from "@coreui/react";

import { MyApiUrl } from "src/services/service";
import "../../../src/style.css";
import "../../style.css";
import { useHistory } from "react-router-dom";

const Employee = () => {
  let history = useHistory();
  const [EmptypeData, setEmptypeData] = useState([]);
  const [EmpSubtypeData, setEmpSubtypeData] = useState([]);
  const [EmpHQData, setEmpHQData] = useState([]);
  const [CompanyData, setCompanyData] = useState([]);
  const [CountryData, setCountryData] = useState([]);
  const [StateData, setStateData] = useState([]);
  const [CityData, setCityData] = useState([]);
  const [AreaData, setAreaData] = useState([]);
  const [EmployeeManagers, setEmployeeManagers] = useState([]);

  const [EmployeeOtherCoveredAreaCounty, setEmployeeOtherCoveredAreaCounty] =
    useState([]);
  const [EmployeeOtherCoveredAreaState, setEmployeeOtherCoveredAreaState] =
    useState([]);
  const [EmployeeOtherCoveredAreaCity, setEmployeeOtherCoveredAreaCity] =
    useState([]);
  const [EmployeeOtherCoveredAreaArea, setEmployeeOtherCoveredAreaArea] =
    useState([]);

  const [EmployeeUploadedOtherDocs, setEmployeeUploadedOtherDocs] = useState(
    []
  );

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

  const [selectedFiles, setselectedFiles] = useState();

  const [ProfilePic, setProfilePic] = useState();

  const onDrop = (files) => {
    if (files.length > 0) {
      setselectedFiles(files);
    }
  };

  const uploadFiles = () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      upload(i, selectedFiles[i]);
    }
  };

  const upload = (idx, file) => {
    var formData = new FormData();
    formData.append("file", file);
    axios.post(MyApiUrl + "upload", formData).then((response) => {
      EmployeeUploadedOtherDocs.push(response.data);
    });
  };

  const [EmployeeFeilds, setEmployeeFeilds] = useState({
    Emptype: "-1",
    EmpSubtype: "-1",
    EmpHQ: "-1",
    Company: "-1",
    Name: "",
    Email: "",
    Email2: "",
    Designation: "",
    Qualification: "",
    JoiningDate: "",
    PreviousExp: "",
    DateofBirth: "",
    PhoCode: "",
    PhoneNumber: "",
    AltPhoCode: "",
    AlterNateNumber: "",
    Region: "",
    password: "",
    Gender: "",
    ReportingTo: "",
    Profile: "",
    Ismanager: "",
    salary: "",
    dateofreleaving: "",
    address1: "",
    address2: "",
    address3: "",
    ZipCode: "",
    altaddress1: "",
    altaddress2: "",
    altaddress3: "",
    altZipCode: "",
  });

  const GetCountryCode = (id) => {
    if (id == 0 || id == "0") {

    } else {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "GET",
        url: MyApiUrl + "CountryCodeByHQ/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          setEmployeeFeilds({
            ...EmployeeFeilds,
            PhoCode: response.data[0].COUNTRY_CODE,
            AltPhoCode: response.data[0].COUNTRY_CODE,
            EmpHQ: id,
          });
          document.getElementById("divLoading").className = "hide";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const GetEmptype = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "emptypes",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.EMPLOYEE_TYPE_PKID}>
            {item.EMPLOYEE_TYPE_NAME}
          </option>
        ));
        setEmptypeData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetEmployeeSubTypeById = (id) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "empsubtypesById/" + id,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.EMPLOYEE_SUB_TYPE_PKID}>
            {item.EMPLOYEE_SUB_TYPE_NAME}
          </option>
        ));
        setEmpSubtypeData(Option);
        GetEmployeeHQ();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const GetEmployeeHQ = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "hq",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.HQ_PKID}>
            {item.HQ_NAME}
          </option>
        ));
        setEmpHQData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetAllCompanies = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "companies",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.COMPANY_PKID}>
            {item.COMPANY_NAME}
          </option>
        ));
        setCompanyData(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddEmployee = () => {
    let lastAtPos = EmployeeFeilds.Email.lastIndexOf("@");
    let lastDotPos = EmployeeFeilds.Email.lastIndexOf(".");

    let lastAtPos1 = EmployeeFeilds.Email2.lastIndexOf("@");
    let lastDotPos1 = EmployeeFeilds.Email2.lastIndexOf(".");

    if (EmployeeFeilds.Name === "" || EmployeeFeilds.Name === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Employee Name!",
      });
    } else if (EmployeeFeilds.Email === "" || EmployeeFeilds.Email === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Employee Email!",
      });
    } else if (EmployeeFeilds.EmpHQ === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select HQ!",
      });
    } else if (EmployeeFeilds.Company === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Company!",
      });
    } else if (
      EmployeeFeilds.Ismanager === "-1" ||
      EmployeeFeilds.Ismanager === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Employee Manager Type!",
      });
    } else if (EmployeeFeilds.Emptype === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Employee Type!",
      });
    } else if (EmployeeFeilds.EmpSubtype === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Sub Employee Type!",
      });
    }
    // else if (
    //   !(
    //     lastAtPos < lastDotPos &&
    //     lastAtPos > 0 &&
    //     EmployeeFeilds.Email.indexOf("@@") === -1 &&
    //     lastDotPos > 2 &&
    //     EmployeeFeilds.Email.length - lastDotPos > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Employee Email!",
    //   });
    // } else if (EmployeeFeilds.Email2 === "" || EmployeeFeilds.Email2 === null) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Alternate Employee Email!",
    //   });
    // } else if (
    //   !(
    //     lastAtPos1 < lastDotPos1 &&
    //     lastAtPos1 > 0 &&
    //     EmployeeFeilds.Email2.indexOf("@@") === -1 &&
    //     lastDotPos1 > 2 &&
    //     EmployeeFeilds.Email2.length - lastDotPos1 > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Alternate Employee Email!",
    //   });
    // } 
    else if (
      EmployeeFeilds.PhoCode === "" ||
      EmployeeFeilds.PhoCode === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Country Code Of The Number!",
      });
    } else if (
      EmployeeFeilds.PhoneNumber === "" ||
      EmployeeFeilds.PhoneNumber === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Employee Phone Number!",
      });
    } else if (EmployeeFeilds.PhoneNumber.length !== 10) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Valid Phone Number!",
      });
    } else if (
      EmployeeFeilds.AltPhoCode === "" ||
      EmployeeFeilds.AltPhoCode === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Country Code Of The Alternate Number!",
      });
     } 
    // else if (
    //   EmployeeFeilds.AlterNateNumber === "" ||
    //   EmployeeFeilds.AlterNateNumber === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee Alternate Phone Number!",
    //   });
    // } 
    else if (EmployeeFeilds.AlterNateNumber.length !== 10) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Valid Alternate Phone Number!",
      });
    }
    // else if (
    //   EmployeeFeilds.Designation === "" ||
    //   EmployeeFeilds.Designation == null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee Designation!",
    //   });
    // } else if (
    //   EmployeeFeilds.Qualification === "" ||
    //   EmployeeFeilds.Qualification === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee Qualification!",
    //   });
    // } else if (
    //   EmployeeFeilds.JoiningDate === "" ||
    //   EmployeeFeilds.JoiningDate === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee JoiningDate!",
    //   });
    // } else if (
    //   EmployeeFeilds.DateofBirth === "" ||
    //   EmployeeFeilds.DateofBirth === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee DateofBirth!",
    //   });
    // } else if (EmployeeFeilds.Region === "" || EmployeeFeilds.Region === null) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee Region!",
    //   });
    // } else if (EmployeeFeilds.Gender === "-1" || EmployeeFeilds.Gender === "") {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Select Employee Gender!",
    //   });
    // } else if (
    //   EmployeeFeilds.ReportingTo === "-1" ||
    //   EmployeeFeilds.ReportingTo === ""
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Select Employee Reporting!",
    //   });
    // } 

    else if (
      EmployeeFeilds.password === "" ||
      EmployeeFeilds.password === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Employee password!",
      });
    }
    // else if (ProfilePic === "" || ProfilePic === null) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Select Employee Profile Pic!",
    //   });
    // } 

    // else if (EmployeeFeilds.salary === "" || EmployeeFeilds.salary === null) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee Salary!",
    //   });
    // } else if (
    //   EmployeeFeilds.dateofreleaving === "" ||
    //   EmployeeFeilds.dateofreleaving === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee Releaving Date!",
    //   });
    // } else if (
    //   EmployeeFeilds.address1 === "" ||
    //   EmployeeFeilds.address1 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee address1!",
    //   });
    // } else if (
    //   EmployeeFeilds.address2 === "" ||
    //   EmployeeFeilds.address2 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee address2!",
    //   });
    // } else if (
    //   EmployeeFeilds.address3 === "" ||
    //   EmployeeFeilds.address3 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee address 3!",
    //   });
    // } else if (
    //   EmployeeFeilds.ZipCode === "" ||
    //   EmployeeFeilds.ZipCode === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee address Zipcode!",
    //   });
    // } else if (
    //   EmployeeFeilds.altaddress1 === "" ||
    //   EmployeeFeilds.altaddress1 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee alternate address1!",
    //   });
    // } else if (
    //   EmployeeFeilds.altaddress2 === "" ||
    //   EmployeeFeilds.altaddress2 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee alternate address 2!",
    //   });
    // } else if (
    //   EmployeeFeilds.altaddress3 === "" ||
    //   EmployeeFeilds.altaddress3 === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee alternate address 3!",
    //   });
    // } else if (
    //   EmployeeFeilds.altZipCode === "" ||
    //   EmployeeFeilds.altZipCode === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Employee alternate address Zipcode!",
    //   });
    // } 
    else {
      if (EmployeeOtherCoveredAreaArea.length === 0) {
        Toast.fire({
          icon: "warning",
          title: "Please Select Atleast One Covering Area!",
        });
      } else {
        document.getElementById("divLoading").className = "show";
        var obj = {
          Emptype: EmployeeFeilds.Emptype,
          EmpSubtype: EmployeeFeilds.EmpSubtype,
          EmpHQ: EmployeeFeilds.EmpHQ,
          Company: EmployeeFeilds.Company,
          Name: EmployeeFeilds.Name,
          Email: EmployeeFeilds.Email,
          Email2: EmployeeFeilds.Email2,
          Designation: EmployeeFeilds.Designation,
          Qualification: EmployeeFeilds.Qualification,
          JoiningDate: EmployeeFeilds.JoiningDate,
          PreviousExperience: EmployeeFeilds.PreviousExp,
          DateofBirth: EmployeeFeilds.DateofBirth,
          PhoCode: EmployeeFeilds.PhoCode,
          PhoneNumber: EmployeeFeilds.PhoneNumber,
          AltPhoCode: EmployeeFeilds.AltPhoCode,
          AlterNateNumber: EmployeeFeilds.AlterNateNumber,
          Region: EmployeeFeilds.Region,
          password: EmployeeFeilds.password,
          Gender: EmployeeFeilds.Gender,
          ReportingTo: EmployeeFeilds.ReportingTo,
          Ismanager: EmployeeFeilds.Ismanager,
          salary: EmployeeFeilds.salary,
          dateofreleaving: EmployeeFeilds.dateofreleaving,
          address1: EmployeeFeilds.address1,
          address2: EmployeeFeilds.address2,
          address3: EmployeeFeilds.address3,
          ZipCode: EmployeeFeilds.ZipCode,
          altaddress1: EmployeeFeilds.altaddress1,
          altaddress2: EmployeeFeilds.altaddress2,
          altaddress3: EmployeeFeilds.altaddress3,
          altZipCode: EmployeeFeilds.altZipCode,
          Profile: ProfilePic,
          OtherDocs: EmployeeUploadedOtherDocs,
          CoveredArea: EmployeeOtherCoveredAreaArea,
        };
        console.log(obj,"this is emplooye table data");
        axios.post(MyApiUrl + "emps/", obj).then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Employee Added!",
              icon: "success",
              confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
            history.push("/ViewEmployees");
          } else {
            Swal.fire({
              title: "Already Existed!",
              icon: "error",
              confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
          }
        });
      }

    }
  };

  const GetAllCountry = useCallback(() => {
    // Counter state is incremented
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
        console.log(response.data);
        setCountryData(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, [CountryData]);

  const GetState = async (event) => {
    document.getElementById("divLoading").className = "show";
    if (event.target.checked === true) {
      var x = [...EmployeeOtherCoveredAreaCounty, event.target.value];
      setEmployeeOtherCoveredAreaCounty(x);
      var obj = {
        CountryId: x,
      };
      axios.post(MyApiUrl + "statesCheckBox/", obj).then((response) => {
        setStateData(response.data);
        document.getElementById("divLoading").className = "hide";
      });
    } else {
      setEmployeeOtherCoveredAreaCounty(
        EmployeeOtherCoveredAreaCounty.filter(
          (item) => item !== event.target.value
        )
      );
      if (
        EmployeeOtherCoveredAreaCounty.filter(
          (item) => item !== event.target.value
        ).length === 0
      ) {
        setStateData([]);
      } else {
        var x = EmployeeOtherCoveredAreaCounty.filter(
          (item) => item !== event.target.value
        );
        var obj = {
          CountryId: x,
        };
        axios.post(MyApiUrl + "statesCheckBox/", obj).then((response) => {
          setStateData(response.data);
        });
      }
      document.getElementById("divLoading").className = "hide";
    }
  };

  const GetCity = (event) => {
    document.getElementById("divLoading").className = "show";
    if (event.target.checked === true) {
      var x = [...EmployeeOtherCoveredAreaState, event.target.value];
      setEmployeeOtherCoveredAreaState(x);

      var obj = {
        CountryId: EmployeeOtherCoveredAreaCounty,
        StateId: x,
      };

      axios.post(MyApiUrl + "districtsCheckbox/", obj).then((response) => {
        setCityData(response.data);
        document.getElementById("divLoading").className = "hide";
      });
    } else {
      setEmployeeOtherCoveredAreaState(
        EmployeeOtherCoveredAreaState.filter(
          (item) => item !== event.target.value
        )
      );
      if (
        EmployeeOtherCoveredAreaState.filter(
          (item) => item !== event.target.value
        ).length === 0
      ) {
        setCityData([]);
      } else {
        var x = EmployeeOtherCoveredAreaState.filter(
          (item) => item !== event.target.value
        );
        var obj = {
          CountryId: x,
        };
        axios.post(MyApiUrl + "districtsCheckbox/", obj).then((response) => {
          setCityData(response.data);
        });
      }
      document.getElementById("divLoading").className = "hide";
    }
  };

  const GetArea = (event) => {
    document.getElementById("divLoading").className = "show";
    if (event.target.checked === true) {
      var x = [...EmployeeOtherCoveredAreaCity, event.target.value];
      setEmployeeOtherCoveredAreaCity(x);
      var obj = {
        CountryId: EmployeeOtherCoveredAreaCounty,
        StateId: EmployeeOtherCoveredAreaState,
        DistrictId: x,
      };
      axios.post(MyApiUrl + "taluksCheckbox/", obj).then((response) => {
        setAreaData(response.data);
      });
      document.getElementById("divLoading").className = "hide";
    } else {
      setEmployeeOtherCoveredAreaCity(
        EmployeeOtherCoveredAreaCity.filter(
          (item) => item !== event.target.value
        )
      );
      if (
        EmployeeOtherCoveredAreaCity.filter(
          (item) => item !== event.target.value
        ).length === 0
      ) {
        setAreaData([]);
      } else {
        var x = EmployeeOtherCoveredAreaCity.filter(
          (item) => item !== event.target.value
        );
        var obj = {
          CountryId: x,
        };
        axios.post(MyApiUrl + "taluksCheckbox/", obj).then((response) => {
          setAreaData(response.data);
        });
      }
      document.getElementById("divLoading").className = "hide";
    }
  };

  const SelectedArea = (event) => {
    if (event.target.checked === true) {
      var x = [...EmployeeOtherCoveredAreaArea, event.target.value];
      setEmployeeOtherCoveredAreaArea(x);
    } else {
      setEmployeeOtherCoveredAreaArea(
        EmployeeOtherCoveredAreaArea.filter(
          (item) => item !== event.target.value
        )
      );
    }
  };

  const GetProfilePic = (event) => {
    document.getElementById("divLoading").className = "show";
    var formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios.post(MyApiUrl + "upload", formData).then((response) => {
      setProfilePic(response.data);
      document.getElementById("divLoading").className = "hide";
    });
  };

  const GetAllManagers = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getAllManagers",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.EMPLOYEE_PKID}>
            {item.EMPLOYEE_NAME}
          </option>
        ));
        setEmployeeManagers(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetEmptype();
    GetEmployeeHQ();
    GetAllCompanies();
    GetAllCountry();
    GetAllManagers();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Add Employee</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol md="1">
                  <div>
                    <CLink to="/ViewEmployees">
                      <CButton size="sm" id="AddEmp">
                        Back
                      </CButton>
                    </CLink>
                    <br />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add Employee</CCardHeader>
                    <CCardBody>
                      <CForm
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                        autoComplete="off"
                      >
                        <CFormGroup className="pr-1">
                          <div>
                            <p>
                              <b>Employee Information</b>
                            </p>
                            <CRow id="firstrow">
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Employee Name
                                </CLabel>
                                <CInput
                                  type="text"
                                  id="exampleInputName2"
                                  placeholder="Name Of The Employee"
                                  value={EmployeeFeilds.Name}
                                  onChange={(event) => {
                                    let value = event.target.value;
                                    value = value.replace(/[^A-Z a-z]/gi, "");
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Name: value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel htmlFor="nf-email">Gender</CLabel>
                                <CSelect
                                  custom
                                  name="Gender"
                                  id="Gender"
                                  value={EmployeeFeilds.Gender}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Gender: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Others">Others</option>
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Designation
                                </CLabel>
                                <CInput
                                  id="exampleInputName2"
                                  placeholder="Designation"
                                  value={EmployeeFeilds.Designation}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Designation: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Qualification
                                </CLabel>
                                <CInput
                                  id="exampleInputName2"
                                  placeholder="Qualification"
                                  value={EmployeeFeilds.Qualification}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Qualification: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Date Of Birth
                                </CLabel>
                                <CInput
                                  type="date"
                                  id="exampleInputName2"
                                  placeholder="Date Of Birth"
                                  value={EmployeeFeilds.DateofBirth}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      DateofBirth: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Email
                                </CLabel>
                                <CInput
                                  id="exampleInputName2"
                                  placeholder="Email Address"
                                  value={EmployeeFeilds.Email}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Email: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Alternate Email
                                </CLabel>
                                <CInput
                                  id="exampleInputName2"
                                  placeholder="Alternate Email"
                                  value={EmployeeFeilds.Email2}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Email2: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Headquarter
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Emptype"
                                  id="Emptype"
                                  value={EmployeeFeilds.EmpHQ}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      EmpHQ: event.target.value,
                                    });
                                    GetCountryCode(event.target.value);
                                  }}
                                >
                                  <option value="-1">Select Headquarter</option>
                                  {EmpHQData}
                                  <option value="0">---NONE---</option>
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Contact Number
                                </CLabel>
                                <CRow>
                                  <CCol md="2" style={{ paddingRight: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Code"
                                      value="+"
                                      readOnly
                                      style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                    />
                                  </CCol>
                                  <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      style={{ borderRadius: "0px", padding: "7px" }}
                                      value={EmployeeFeilds.PhoCode}
                                      maxLength="3"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setEmployeeFeilds({
                                            ...EmployeeFeilds,
                                            PhoCode: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="8" style={{ paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Contact Number"
                                      value={EmployeeFeilds.PhoneNumber}
                                      maxLength="10"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setEmployeeFeilds({
                                            ...EmployeeFeilds,
                                            PhoneNumber: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                </CRow>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Alternate Number
                                </CLabel>
                                <CRow>
                                  <CCol md="2" style={{ paddingRight: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Code"
                                      value="+"
                                      readOnly
                                      style={{ fontWeight: "600", padding: "7px", borderRadius: "4px 0px 0px 4px !important" }}
                                    />
                                  </CCol>
                                  <CCol md="2" style={{ paddingRight: "0%", paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      style={{ borderRadius: "0px", padding: "7px" }}
                                      value={EmployeeFeilds.AltPhoCode}
                                      maxLength="3"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setEmployeeFeilds({
                                            ...EmployeeFeilds,
                                            AltPhoCode: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                  <CCol md="8" style={{ paddingLeft: "0%" }}>
                                    <CInput
                                      id="text-input1"
                                      name="text-input"
                                      placeholder="Alternate Number"
                                      value={EmployeeFeilds.AlterNateNumber}
                                      maxLength="10"
                                      onChange={(event) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                          event.target.value === "" ||
                                          re.test(event.target.value)
                                        ) {
                                          setEmployeeFeilds({
                                            ...EmployeeFeilds,
                                            AlterNateNumber: event.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </CCol>
                                </CRow>
                              </CCol>

                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Company
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Country"
                                  id="Country"
                                  value={EmployeeFeilds.Company}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Company: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Select Company</option>
                                  {CompanyData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Region
                                </CLabel>
                                <CInput
                                  id="text-input1"
                                  name="text-input"
                                  placeholder="Region"
                                  value={EmployeeFeilds.Region}
                                  autocomplete="off"
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Region: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel htmlFor="nf-email">Manager / Officer / Admin</CLabel>
                                <CSelect
                                  custom
                                  name="manager"
                                  id="manager"
                                  value={EmployeeFeilds.Ismanager}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Ismanager: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Select Here</option>
                                  <option value="1">Manager</option>
                                  <option value="0">Officer</option>
                                  <option value="2">Admin</option>
                                </CSelect>
                              </CCol>
                              <CCol xs="3" md="3">
                                <CLabel>Select Emp Type</CLabel>
                                <CSelect
                                  custom
                                  name="Emptype"
                                  id="Emptype"
                                  value={EmployeeFeilds.Emptype}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      Emptype: event.target.value,
                                    });
                                    GetEmployeeSubTypeById(event.target.value);
                                  }}
                                >
                                  <option value="-1">Employee Type</option>
                                  {EmptypeData}
                                </CSelect>
                              </CCol>

                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Employee Sub-type
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Emptype"
                                  id="Emptype"
                                  value={EmployeeFeilds.EmpSubtype}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      EmpSubtype: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Employee Sub Type</option>
                                  {EmpSubtypeData}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Password
                                </CLabel>
                                <CInput
                                  type="password"
                                  id="text-input1"
                                  name="text-input"
                                  placeholder="********"
                                  value={EmployeeFeilds.password}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      password: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel htmlFor="nf-email">Salary</CLabel>
                                <CInput
                                  type="text"
                                  id="exampleInputName2"
                                  placeholder="Employee Salary"
                                  value={EmployeeFeilds.salary}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      salary: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Joining Date
                                </CLabel>
                                <CInput
                                  type="date"
                                  id="exampleInputName2"
                                  placeholder="Joint Date"
                                  value={EmployeeFeilds.JoiningDate}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      JoiningDate: event.target.value,
                                    });
                                   
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Previous Experience
                                </CLabel>
                                <CInput
                                  type="text"
                                  id="exampleInputName2"
                                  placeholder="Previous Experience"
                                  value={EmployeeFeilds.PreviousExp}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      PreviousExp: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              {/* <CCol md="3">
                                <CLabel htmlFor="nf-email">
                                  Releaving Date
                                </CLabel>
                                <CInput
                                  type="date"
                                  id="exampleInputName2"
                                  placeholder="Date Of Birth"
                                  value={EmployeeFeilds.dateofreleaving}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      dateofreleaving: event.target.value,
                                    });
                                  }}
                                />
                              </CCol> */}
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Profile
                                </CLabel>
                                <CInput
                                  type="file"
                                  id="exampleInputName2"
                                  placeholder=" "
                                  value={EmployeeFeilds.Profile}
                                  onChange={GetProfilePic}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel htmlFor="nf-email">Reporting To</CLabel>
                                <CSelect
                                  custom
                                  name="RepTo"
                                  id="RepTo"
                                  value={EmployeeFeilds.ReportingTo}
                                  onChange={(event) => {
                                    setEmployeeFeilds({
                                      ...EmployeeFeilds,
                                      ReportingTo: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Select Here</option>
                                  {EmployeeManagers}
                                  <option value="0">Self</option>
                                </CSelect>
                              </CCol>
                              <CCol md="3"></CCol>
                              <CCol md="3"></CCol>
                              <CCol md="12" style={{ paddingBottom: "0%", marginBottom: "0%", marginTop: "3%" }}>
                                <p style={{ marginBottom: "0%", fontWeight: "600" }}>Employee : {EmployeeFeilds.Name}</p>
                              </CCol>
                              <CCol
                                md="6"
                                style={{
                                  borderRight: "1px solid rgb(211, 211, 211)",
                                  borderTop: "1px solid rgb(211, 211, 211)",
                                  borderBottom: "1px solid rgb(211, 211, 211)",
                                  padding: "2%",
                                }}
                              >
                                <p
                                  htmlFor="nf-email"
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Permanent Address
                                </p>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Address 1</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.address1}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        address1: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Address 2</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.address2}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        address2: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Address 3</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.address3}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        address3: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Zip Code</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.ZipCode}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        ZipCode: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                              </CCol>

                              <CCol
                                md="6"
                                style={{
                                  borderTop: "1px solid rgb(211, 211, 211)",
                                  borderBottom: "1px solid rgb(211, 211, 211)",
                                  padding: "2%",
                                }}
                              >
                                <p
                                  htmlFor="nf-email"
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Correspondence Address
                                </p>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Address 1</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.altaddress1}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        altaddress1: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Address 2</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.altaddress2}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        altaddress2: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Address 3</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.altaddress3}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        altaddress3: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                                <CCol md="12">
                                  <CLabel htmlFor="nf-email">Zip Code</CLabel>
                                  <CInput
                                    id="exampleInputName2"
                                    placeholder=" "
                                    value={EmployeeFeilds.altZipCode}
                                    onChange={(event) => {
                                      setEmployeeFeilds({
                                        ...EmployeeFeilds,
                                        altZipCode: event.target.value,
                                      });
                                    }}
                                  />
                                </CCol>
                              </CCol>
                              <CCol
                                md="12"
                                style={{
                                  marginTop: "3%",
                                  borderBottom: "1px solid rgb(211, 211, 211)",
                                  padding: "2%",
                                }}
                              >
                                <p
                                  htmlFor="nf-email"
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Upload Documents
                                </p>
                                <div className="my-3">
                                  <Dropzone onDrop={onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                      <section>
                                        <div
                                          {...getRootProps({
                                            className: "dropzone",
                                          })}
                                        >
                                          <input {...getInputProps()} />
                                          {selectedFiles &&
                                            Array.isArray(selectedFiles) &&
                                            selectedFiles.length ? (
                                            <div className="selected-file">
                                              {selectedFiles.length > 3
                                                ? `${selectedFiles.length} files`
                                                : selectedFiles
                                                  .map((file) => file.name)
                                                  .join(", ")}
                                            </div>
                                          ) : (
                                            `Drag and drop files here, or click to select files`
                                          )}
                                        </div>
                                        <aside className="selected-file-wrapper">
                                          <button
                                            type="button"
                                            className="btn btn-success"
                                            disabled={!selectedFiles}
                                            onClick={uploadFiles}
                                          >
                                            Upload
                                          </button>
                                        </aside>
                                      </section>
                                    )}
                                  </Dropzone>
                                </div>
                              </CCol>
                              <CCol md="12" style={{ paddingBottom: "0%", marginBottom: "0%", marginTop: "3%" }}>
                                <p style={{ marginBottom: "0%", fontWeight: "600" }}>Employee : {EmployeeFeilds.Name}</p>
                              </CCol>
                              <CCol
                                md="12"
                                style={{
                                  borderBottom: "1px solid rgb(211, 211, 211)",
                                  padding: "2%",
                                }}
                              >
                                <p
                                  htmlFor="nf-email"
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    paddingBottom: "2%",
                                    borderBottom: "1px solid #ebedef",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Covered Areas
                                </p>
                                <CRow style={{ paddingTop: "1%" }}>
                                  <CCol
                                    md="3"
                                    style={{ borderRight: "1px solid #ebedef" }}
                                  >
                                    <p
                                      style={{
                                        fontWeight: "700",
                                        fontFamily: "sans-serif",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ebedef",
                                        paddingBottom: "5%",
                                      }}
                                    >
                                      Choose Country
                                    </p>
                                    {CountryData.map((i) => (
                                      <CCol md="12">
                                        <CInput
                                          type="checkbox"
                                          name="area"
                                          id="area"
                                          className="CheckBoxClass"
                                          placeholder=" "
                                          value={i.COUNTRY_PKID}
                                          onClick={GetState}
                                        />
                                        <label style={{ display: "inline-block !important" }}>{i.COUNTRY_NAME}</label>
                                      </CCol>
                                    ))}
                                  </CCol>
                                  <CCol
                                    md="3"
                                    style={{ borderRight: "1px solid #ebedef" }}
                                  >
                                    <p
                                      style={{
                                        fontWeight: "700",
                                        fontFamily: "sans-serif",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ebedef",
                                        paddingBottom: "5%",
                                      }}
                                    >
                                      Choose States
                                    </p>
                                    {StateData.map((i) => (
                                      <CCol md="12">
                                        <CInput
                                          type="checkbox"
                                          name="area"
                                          id="area"
                                          className="CheckBoxClass"
                                          placeholder=" "
                                          value={i.STATE_PKID}
                                          onClick={GetCity}
                                        />
                                        <label style={{ display: "inline-block !important" }}>{i.STATE_NAME}</label>
                                      </CCol>
                                    ))}
                                  </CCol>
                                  <CCol
                                    md="3"
                                    style={{ borderRight: "1px solid #ebedef" }}
                                  >
                                    <p
                                      style={{
                                        fontWeight: "700",
                                        fontFamily: "sans-serif",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ebedef",
                                        paddingBottom: "5%",
                                      }}
                                    >
                                      Choose District
                                    </p>
                                    {CityData.map((i) => (
                                      <CCol md="12">
                                        <CInput
                                          type="checkbox"
                                          name="area"
                                          id="area"
                                          className="CheckBoxClass"
                                          placeholder=" "
                                          value={i.DISTRICT_PKID}
                                          onClick={GetArea}
                                        />
                                        <label style={{ display: "inline-block !important" }}>{i.DISTRICT_NAME}</label>
                                      </CCol>
                                    ))}
                                  </CCol>
                                  <CCol md="3">
                                    <p
                                      style={{
                                        fontWeight: "700",
                                        fontFamily: "sans-serif",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ebedef",
                                        paddingBottom: "5%",
                                      }}
                                    >
                                      Choose Taluk / Cities
                                    </p>
                                    {AreaData.map((i) => (
                                      <CCol md="12">
                                        <CInput
                                          type="checkbox"
                                          name="area"
                                          id="area"
                                          className="CheckBoxClass"
                                          placeholder=" "
                                          value={i.TALUK_PKID}
                                          onClick={SelectedArea}
                                        />
                                        <label style={{ display: "inline-block !important" }}>{i.TALUK_NAME}</label>
                                      </CCol>
                                    ))}
                                  </CCol>
                                </CRow>
                              </CCol>
                            </CRow>
                          </div>

                          <CRow>
                            <CCol md="6" style={{ paddingBottom: "0%", marginBottom: "0%" }}>
                              <p style={{ marginBottom: "0%", fontWeight: "600" }}>Employee : {EmployeeFeilds.Name}</p>
                            </CCol>
                            <CCol md="6">
                              <div id="inline-btn">
                                <CButton
                                  type="button"
                                  onClick={AddEmployee}
                                  color="success"
                                  style={{ float: "right", fontWeight: "600" }}
                                >
                                  ADD EMPLOYEE
                                </CButton>
                              </div>
                            </CCol>
                          </CRow>
                        </CFormGroup>
                      </CForm>
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

export default Employee;
