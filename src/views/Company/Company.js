import React, { useState } from "react";
import { MyApiUrl, ViewImg } from "src/services/service";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import Swal from "sweetalert2";
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
  CDataTable,
  CLink,
  CImg,
} from "@coreui/react";
import "../../../src/style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Head Office" },
  { key: "CompanyName" },
  { key: "Short Code" },
  { key: "Company Email" },
  { key: "Company Phone" },
  { key: "Company Address" },
  { key: "Company Image" },
];
const Company = () => {
  const [AddButton, setAddButton] = useState(true);
  const [UpdateButton, setUpdateButton] = useState(false);

  const [HQData, setHQData] = useState([]);
  const [CompanyData, setCompanyData] = useState([]);
  const [CompanyFeilds, setCompanyFeilds] = useState({
    HQID: "-1",
    CompanyName: "",
    CompanyKey: "",
    CompanyEmail: "",
    CompanyPhone: "",
    CompanyAddress: "",
    CompanyPkid: "",
    CompanyImage: "",
    CompanyColor: "",
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

  const GetAllHQ = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "HOs",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        const HQOptions = response.data.map((item) => (
          <option value={item.HEAD_OFFICE_PKID}>{item.HEAD_OFFICE_NAME}</option>
        ));
        setHQData(HQOptions);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    GetAllHQ();
    GetAllCompanies();
  }, []);

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
        const items = response.data.map((item) => {
          return {
            ...item,
            CompanyName: item.COMPANY_NAME,
            HQ: item.HQ_NAME,
            "Short Code": item.COMPANY_SHORT_KEY,
            "Company Email": item.COMPANY_EMAIL,
            "Company Phone": item.COMPANY_PHONE,
            "Company Address": item.COMPANY_ADDRESS,
            "Head Office": item.HEAD_OFFICE_NAME,
          };
        });
        setCompanyData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddCompany = () => {
    let lastAtPos = CompanyFeilds.CompanyEmail.lastIndexOf("@");
    let lastDotPos = CompanyFeilds.CompanyEmail.lastIndexOf(".");

    if (CompanyFeilds.HQID === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Company Head Office!",
      });
    } else if (
      CompanyFeilds.CompanyName === "" ||
      CompanyFeilds.CompanyName === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Company Name!",
      });
    } else if (
      CompanyFeilds.CompanyKey === "" ||
      CompanyFeilds.CompanyKey === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Company Short Code!",
      });
    }
    // else if (
    //   CompanyFeilds.CompanyEmail === "" ||
    //   CompanyFeilds.CompanyEmail === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Company Email!",
    //   });
    // } else if (
    //   !(
    //     lastAtPos < lastDotPos &&
    //     lastAtPos > 0 &&
    //     CompanyFeilds.CompanyEmail.indexOf("@@") === -1 &&
    //     lastDotPos > 2 &&
    //     CompanyFeilds.CompanyEmail.length - lastDotPos > 2
    //   )
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Valid Company Email!",
    //   });
    // } 
    else if (
      CompanyFeilds.CompanyPhone === "" ||
      CompanyFeilds.CompanyPhone === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Company Contact Number!",
      });
    } else if (
      CompanyFeilds.CompanyPhone.length !== 10
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Valid Company Contact Number!",
      });
    }
    // else if (
    //   CompanyFeilds.CompanyAddress === "" ||
    //   CompanyFeilds.CompanyAddress === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Company Address!",
    //   });
    // }
    else {
      document.getElementById("divLoading").className = "show";
      var obj = {
        COMPANY_HQ_FKID: CompanyFeilds.HQID,
        COMPANY_NAME: CompanyFeilds.CompanyName,
        COMPANY_SHORT_KEY: CompanyFeilds.CompanyKey,
        COMPANY_EMAIL: CompanyFeilds.CompanyEmail,
        COMPANY_PHONE: CompanyFeilds.CompanyPhone,
        COMPANY_ADDRESS: CompanyFeilds.CompanyAddress,
        COMPANY_IMAGE: CompanyFeilds.CompanyImage,
        COMPANY_COLOR: CompanyFeilds.CompanyColor,
      };

      axios.post(MyApiUrl + "companies", obj).then((response) => {
        if (response.data === "0") {
          Swal.fire({
            title: "Company Already Exist!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data === true) {
          Swal.fire({
            title: "Company Details Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setCompanyFeilds({
            HQID: "-1",
            CompanyName: "",
            CompanyKey: "",
            CompanyEmail: "",
            CompanyPhone: "",
            CompanyAddress: "",
            CompanyPkid: "",
          });
          GetAllCompanies();
          document.getElementById("divLoading").className = "hide";
          window.location.reload();
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

  const EditCompany = (id, hq, name, scode, email, pho, address, img, color) => {
    setCompanyFeilds({
      HQID: hq,
      CompanyName: name,
      CompanyKey: scode,
      CompanyEmail: email,
      CompanyPhone: pho,
      CompanyAddress: address,
      CompanyImage: img,
      CompanyColor: color,
      CompanyPkid: id,
    });
    setAddButton(false);
    setUpdateButton(true);
  };

  const UpdateCompany = () => {
    if (CompanyFeilds.HQID === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Company Head Office!",
      });
    } else if (
      CompanyFeilds.CompanyName === "" ||
      CompanyFeilds.CompanyName === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Company Name!",
      });
    } else if (
      CompanyFeilds.CompanyKey === "" ||
      CompanyFeilds.CompanyKey === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Company Short Code!",
      });
    }
    //  else if (
    //   CompanyFeilds.CompanyEmail === "" ||
    //   CompanyFeilds.CompanyEmail === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Company Email!",
    //   });
    else if (
      CompanyFeilds.CompanyPhone === "" ||
      CompanyFeilds.CompanyPhone === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Company Contact Number!",
      });
    } else if (
      CompanyFeilds.CompanyPhone.length !== 10
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Valid Company Contact Number!",
      });
    }
    // } else if (
    //   CompanyFeilds.CompanyAddress === "" ||
    //   CompanyFeilds.CompanyAddress === null
    // ) {
    //   Toast.fire({
    //     icon: "warning",
    //     title: "Please Enter Company Address!",
    //   });
    // } 
    else {
      document.getElementById("divLoading").className = "show";
      var obj = {
        COMPANY_HQ_FKID: CompanyFeilds.HQID,
        COMPANY_NAME: CompanyFeilds.CompanyName,
        COMPANY_SHORT_KEY: CompanyFeilds.CompanyKey,
        COMPANY_EMAIL: CompanyFeilds.CompanyEmail,
        COMPANY_PHONE: CompanyFeilds.CompanyPhone,
        COMPANY_ADDRESS: CompanyFeilds.CompanyAddress,
        COMPANY_PKID: CompanyFeilds.CompanyPkid,
        COMPANY_IMAGE: CompanyFeilds.CompanyImage,
        COMPANY_COLOR: CompanyFeilds.CompanyColor,
      };

      axios
        .put(MyApiUrl + "companies/" + CompanyFeilds.CompanyPkid, obj)
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Company Details Updated!",
              icon: "success",
              confirmButtonText: "OK",
            });
            setCompanyFeilds({
              HQID: "-1",
              CompanyName: "",
              CompanyKey: "",
              CompanyEmail: "",
              CompanyPhone: "",
              CompanyAddress: "",
              CompanyPkid: "",
            });
            GetAllCompanies();
            setAddButton(true);
            setUpdateButton(false);
            document.getElementById("divLoading").className = "hide";
            window.location.reload();
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

  const DeleteCompany = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "companies/" + id + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Selected Company Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });
            GetAllCompanies();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Failed To Delete Company!",
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

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateCompany} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddCompany} size="md" id="Add-btn">
      Add
    </CButton>
  );

  const ToExcel = () => {
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Head Office","Company Name","Short Code","Company Email","Company Phone","Company Addess"'
    );
    let Status = "";
    CompanyData.map((item) => {
      return (
        cnt++,
        csvData.push(
          '"' +
          cnt +
          '","' +
          item.HEAD_OFFICE_NAME +
          '","' +
          item.COMPANY_NAME +
          '","' +
          item.COMPANY_SHORT_KEY +
          '","' +
          item.COMPANY_EMAIL +
          '","' +
          item.COMPANY_PHONE +
          '","' +
          item.COMPANY_ADDRESS +
          '"'
        )
      );
    });

    const fileName = "All Companies.csv";
    const buffer = csvData.join("\n");
    const blob = new Blob([buffer], {
      type: "text/csv;charset=utf8;",
    });

    //IN IE
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", fileName);
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
    }
  }

  const GetCompanyImage = (event) => {
    document.getElementById("divLoading").className = "show";
    var formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios.post(MyApiUrl + "upload", formData).then((response) => {
      console.log(response.data);
      setCompanyFeilds({
        ...CompanyFeilds,
        CompanyImage: response.data,
      });
      document.getElementById("divLoading").className = "hide";
    });
  };

  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Company Master</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Manage Company</CCardHeader>
                    <CCardBody>
                      <CForm
                        action=""
                        method="post"
                        className="form-horizontal"
                      >
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select Head Office</CLabel>
                            <CSelect
                              custom
                              name="Country"
                              id="Country"
                              value={CompanyFeilds.HQID}
                              onChange={(event) => {
                                setCompanyFeilds({
                                  ...CompanyFeilds,
                                  HQID: event.target.value,
                                });
                              }}
                            >
                              <option value="-1">Select Head Office</option>
                              {HQData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Company Name</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Company Name"
                              value={CompanyFeilds.CompanyName}
                              onChange={(event) => {
                                let value = event.target.value;
                                value = value.replace(/[^A-Z a-z]/gi, "");
                                setCompanyFeilds({
                                  ...CompanyFeilds,
                                  CompanyName: value,
                                });
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Company Short Code</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Company Short Code"
                              value={CompanyFeilds.CompanyKey}
                              onChange={(event) => {
                                let value = event.target.value;
                                value = value.replace(/[^A-Z a-z]/gi, "");
                                setCompanyFeilds({
                                  ...CompanyFeilds,
                                  CompanyKey: value,
                                });
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Company Email</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Company Email"
                              value={CompanyFeilds.CompanyEmail}
                              onChange={(event) => {
                                setCompanyFeilds({
                                  ...CompanyFeilds,
                                  CompanyEmail: event.target.value,
                                });
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Company Contact Number</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Company Contact Number"
                              value={CompanyFeilds.CompanyPhone}
                              maxLength="10"
                              onChange={(event) => {
                                const re = /^[0-9\b]+$/;
                                if (
                                  event.target.value === "" ||
                                  re.test(event.target.value)
                                ) {
                                  setCompanyFeilds({
                                    ...CompanyFeilds,
                                    CompanyPhone: event.target.value,
                                  });
                                }
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Company Address</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Company Address"
                              value={CompanyFeilds.CompanyAddress}
                              onChange={(event) => {
                                setCompanyFeilds({
                                  ...CompanyFeilds,
                                  CompanyAddress: event.target.value,
                                });
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel
                              htmlFor="exampleInputName2"
                              className="pr-1"
                            >
                              Company Image
                            </CLabel>
                            <CInput
                              type="file"
                              id="exampleInputName2"
                              placeholder=" "
                              onChange={GetCompanyImage}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Company Color</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              type="color"
                              placeholder="Company Address"
                              value={CompanyFeilds.CompanyColor}
                              onChange={(event) => {
                                setCompanyFeilds({
                                  ...CompanyFeilds,
                                  CompanyColor: event.target.value,
                                });
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
                    <CCardHeader>
                      <CRow>
                        <CCol md="8">
                          Added Companies
                        </CCol>
                        <CCol md="4">
                          <CButton
                            size="sm"
                            color="primary"
                            onClick={ToExcel}
                            style={{ float: "right" }}
                          >
                            Export To Excel
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={CompanyData}
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
                                  EditCompany(
                                    item.COMPANY_PKID,
                                    item.COMPANY_HQ_FKID,
                                    item.COMPANY_NAME,
                                    item.COMPANY_SHORT_KEY,
                                    item.COMPANY_EMAIL,
                                    item.COMPANY_PHONE,
                                    item.COMPANY_ADDRESS,
                                    item.COMPANY_IMAGE
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
                                  DeleteCompany(item.COMPANY_PKID);
                                }}
                                id="war-btn1"
                              >
                                <DeleteSharpIcon />
                                {item.status}
                              </CButton>
                            </td>
                          ),
                          "Company Image": (i) => {
                            let profile = "";
                            if (
                              i.COMPANY_IMAGE === "" ||
                              i.COMPANY_IMAGE === null
                            ) {
                              profile = "NoImage.png";
                            } else {
                              profile = i.COMPANY_IMAGE;
                            }
                            return (
                              <React.Fragment>
                                <td>
                                  <CLink
                                    href={ViewImg + "/" + profile}
                                    target="_blank"
                                  >
                                    <CImg
                                      src={ViewImg + "/" + profile}
                                      fluid
                                      className="mb-2"
                                      style={{ width: "100%" }}
                                    />
                                  </CLink>
                                </td>
                              </React.Fragment>
                            );
                          },
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

export default Company;
