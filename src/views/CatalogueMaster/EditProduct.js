/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 16:54:16
 * @modify date 2021-12-06 15:17:06
 * @desc [description]
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CImg,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CLink,
} from "@coreui/react";
import "../../../src/style.css";
import { MyApiUrl, ViewImg } from "src/services/service";
import "../../style.css";

const Products = (props) => {
  const {
    PRODUCT_COMPANY_FKID,
    PRODUCT_SPECIES_FKID,
    PRODUCT_NAME,
    PRODUCT_CODE,
    PRODUCT_BAR_CODE,
    PRODUCT_HSM,
    PRODUCT_IMAGE,
    PRODUCT_CATALOGUE,
    PRODUCT_PKID,
  } = props.location.state.data;
  const history = useHistory();
  const [CompanyData, setCompanyData] = useState([]);
  const [ProductSpecies, setProductSpecies] = useState([]);
  const [ProductsFeilds, setProductsFeilds] = useState({
    Company: PRODUCT_COMPANY_FKID,
    Species: PRODUCT_SPECIES_FKID,
    Name: PRODUCT_NAME,
    Code: PRODUCT_CODE,
    BarCode: PRODUCT_BAR_CODE,
    HSMCode: PRODUCT_HSM,
    ProductImage: PRODUCT_IMAGE,
    Catalogue: PRODUCT_CATALOGUE,
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

  const GetAllCompanies = () => {
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
        GetAllSpecies();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetAllSpecies = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "prodspecies",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.PRODUCT_SPECIES_PKID}>
            {item.PRODUCT_SPECIES_NAME}
          </option>
        ));
        setProductSpecies(Option);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddProduct = () => {
    if (ProductsFeilds.Name === "" || ProductsFeilds.Name === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Product Name",
      });
    } else if (
      ProductsFeilds.Species === "-1" ||
      ProductsFeilds.Species === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Product Species",
      });
    } else if (ProductsFeilds.Company === "-1" || ProductsFeilds.Company === "") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Company",
      });
    } else {
      var obj = {
        PRODUCT_COMPANY_FKID: ProductsFeilds.Company,
        PRODUCT_SPECIES_FKID: ProductsFeilds.Species,
        PRODUCT_NAME: ProductsFeilds.Name,
        PRODUCT_CODE: ProductsFeilds.Code,
        PRODUCT_BAR_CODE: ProductsFeilds.BarCode,
        PRODUCT_HSM: ProductsFeilds.HSMCode,
        PRODUCT_IMAGE: ProductsFeilds.ProductImage,
        PRODUCT_CATALOGUE: ProductsFeilds.Catalogue,
      };
      console.log(obj);
      axios
        .put(MyApiUrl + "prod/" + PRODUCT_PKID, obj)
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Product Updated!",
              icon: "success",
              confirmButtonText: "OK",
            });
            history.push("/ViewProducts");
          } else {
            Swal.fire({
              title: "Failed To Update!",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
    }
  };

  React.useEffect(() => {
    GetAllCompanies();
  }, []);

  return (
    <div>
      <h1 id="ccmaster">Update Product</h1>
      <CRow id="firstrow">
        <CCol md="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
              <CCol md="1">
                <div>
                  <CLink to="/ViewProducts">
                    <CButton size="sm" id="AddEmp">
                      Back
                    </CButton>
                  </CLink>
                  <br />
                </div>
              </CCol>
            </CRow>
            <CRow id="firstrow">
              <CCol>
                <CCard>
                  <CCardHeader>Update Product</CCardHeader>
                  <CCardBody>
                    <CForm
                      method="post"
                      encType="multipart/form-data"
                      className="form-horizontal"
                    >
                      <CFormGroup className="pr-1">
                        <div>
                          <p>
                            <b>Product Information</b>
                          </p>
                          <CRow id="firstrow">
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Product Name
                              </CLabel>
                              <CInput
                                type="text"
                                id="Name"
                                placeholder="Product Name"
                                required
                                value={ProductsFeilds.Name}
                                onChange={(event) => {
                                  setProductsFeilds({
                                    ...ProductsFeilds,
                                    Name: event.target.value,
                                  });
                                }}
                              />
                            </CCol>

                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Select Product Species
                              </CLabel>
                              <CSelect
                                custom
                                name="Species"
                                id="Species"
                                value={ProductsFeilds.Species}
                                onChange={(event) => {
                                  setProductsFeilds({
                                    ...ProductsFeilds,
                                    Species: event.target.value,
                                  });
                                }}
                              >
                                <option value="-1">Select Species</option>
                                {ProductSpecies}
                              </CSelect>
                            </CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Select Company
                              </CLabel>
                              <CSelect
                                custom
                                name="Company"
                                id="Company"
                                value={ProductsFeilds.Company}
                                onChange={(event) => {
                                  setProductsFeilds({
                                    ...ProductsFeilds,
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
                                Product Code
                              </CLabel>
                              <CInput
                                type="text"
                                id="Code"
                                placeholder="Product Code"
                                required
                                value={ProductsFeilds.Code}
                                onChange={(event) => {
                                  setProductsFeilds({
                                    ...ProductsFeilds,
                                    Code: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Bar Code
                              </CLabel>
                              <CInput
                                type="text"
                                id="BarCode"
                                placeholder="Product Bar Code"
                                required
                                value={ProductsFeilds.BarCode}
                                onChange={(event) => {
                                  setProductsFeilds({
                                    ...ProductsFeilds,
                                    BarCode: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                HSN Code
                              </CLabel>
                              <CInput
                                type="text"
                                id="BarCode"
                                placeholder="Product HSN Code"
                                required
                                value={ProductsFeilds.HSMCode}
                                onChange={(event) => {
                                  setProductsFeilds({
                                    ...ProductsFeilds,
                                    HSMCode: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Product Image
                              </CLabel>
                              <CInput
                                type="file"
                                id="file"
                                placeholder=" "
                                onChange={(event) => {
                                  var formData = new FormData();
                                  formData.append(
                                    "file",
                                    event.target.files[0]
                                  );
                                  axios
                                    .post(MyApiUrl + "upload", formData)
                                    .then((response) => {
                                      setProductsFeilds({
                                        ...ProductsFeilds,
                                        ProductImage: response.data,
                                      });
                                    });
                                }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Product Catalogue
                              </CLabel>
                              <CInput
                                type="file"
                                id="Catalogue"
                                placeholder=" "
                                onChange={(event) => {
                                  var formData = new FormData();
                                  formData.append(
                                    "file",
                                    event.target.files[0]
                                  );
                                  axios
                                    .post(MyApiUrl + "upload", formData)
                                    .then((response) => {
                                      setProductsFeilds({
                                        ...ProductsFeilds,
                                        Catalogue: response.data,
                                      });
                                    });
                                }}
                              />
                            </CCol>
                            <CCol md="3"></CCol>
                            <CCol md="3"></CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Selected Image
                              </CLabel>
                              <CImg
                                src={
                                  ViewImg + "/" + ProductsFeilds.ProductImage
                                }
                                fluid
                                className="mb-2"
                                style={{ width: "100%" }}
                              />
                            </CCol>
                            <CCol md="3">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Selected Catalogue
                              </CLabel>
                              <CLink
                                href={
                                  ViewImg + "/" + ProductsFeilds.Catalogue
                                }
                                target="_blank"
                              >
                                {ProductsFeilds.Catalogue}
                              </CLink>
                            </CCol>
                          </CRow>
                        </div>

                        <CRow id="firstrow">
                          <CCol md="4">
                            <div id="inline-btn">
                              <CButton
                                type="button"
                                onClick={AddProduct}
                                size="md"
                                id="Add-btn"
                              >
                                Update
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
    </div >
  );
};

export default Products;
