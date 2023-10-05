/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-12-01 13:48:09
 * @modify date 2021-12-02 13:49:39
 * @desc [description]
 */

 import React, { useState } from "react";
 import axios from "axios";
 import {
   CButton,
   CCard,
   CCardBody,
   CCardHeader,
   CCol,
   CImg,
   CLink,
   CRow,
   CDataTable,
   CModal,
   CModalHeader,
   CModalBody,
   CModalTitle,
   CModalFooter,
 } from "@coreui/react";
 import { useHistory } from "react-router-dom";
 import { MyApiUrl, ViewImg } from "src/services/service";
 import EditIcon from "@material-ui/icons/Edit";
 import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
 import "../../style.css";
 const table = { placeholder: "Search here...", label: "Search:  " };
 const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
 const fields2 = [
   { key: "Sl No" },
   { key: "Company" },
   { key: "Species" },
   { key: "Product Name" },
   { key: "Code" },
   { key: "Bar Code" },
   { key: "Product Image" },
   { key: "Packages" },
   { key: "Catalogue" },
 ];
 const fields = [
   { key: "Sl No" },
   { key: "Wholesale Price" },
   { key: "Dealer Price" },
   { key: "Product MRP" },
   { key: "Unit" },
   { key: "UoM" },
 ];
 
 const CustomerViewProducts = () => {
   let history = useHistory();
 
   const [ResponseData, setResponseData] = useState([]);
   const [ProductPackages, setProductPackages] = useState([]);
   const [block, setblock] = useState(false);
 
   const GetAllProducts = () => {
    document.getElementById("divLoading").className = "show";
     axios({
       method: "GET",
       url: MyApiUrl + "prod",
       headers: {
         "content-type": "application/json",
       },
     })
       .then((response) => {
         const items = response.data.map((item, index) => {
           return {
             ...item,
             "Sl No": index + 1,
             Company: item.COMPANY_NAME,
             Species: item.PRODUCT_SPECIES_NAME,
             "Product Name": item.PRODUCT_NAME,
             Code: item.PRODUCT_CODE,
             "Bar Code": item.PRODUCT_BAR_CODE,
           };
         });
         setResponseData(items);
         document.getElementById("divLoading").className = "hide";
       })
       .catch((error) => {
         console.log(error);
       });
   };
 
   const ViewProductPackages = (pkid) => {
    document.getElementById("divLoading").className = "show";
     axios({
       method: "GET",
       url: MyApiUrl + "getDistributerProductPackagesbyProdId/" + pkid + "",
       headers: {
         "content-type": "application/json",
       },
     })
       .then((response) => {
         const items = response.data.map((item, index) => {
           return {
             ...item,
             "Sl No": index + 1,
             "Wholesale Price": item.PRD_PACKAGE_WHOLESALE_PRICE,
             "Dealer Price": item.PRD_PACKAGE_DEALER_PRICE,
             "Product MRP": item.PRD_PACKAGE_MRP,
             Unit: item.PRD_PACKAGE_UNIT,
             UoM: item.UNIT_OF_MEASUREMENT_SHORT_KEY,
           };
         });
         setProductPackages(items);
         document.getElementById("divLoading").className = "hide";
       })
       .catch((error) => {
         console.log(error);
       });
     setblock(!block);
   };
 
   React.useEffect(() => {
     GetAllProducts();
   }, []);
 
   return (
     <div id="city">
      <div id="divLoading"> </div>
       <h1 id="ccmaster" style={{ color: "#fff" }}>
         View Products
       </h1>
       <CRow style={{ marginTop: "3%" }}>
         <CCol col="12">
         <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
             <CCardBody>
               <CRow>
                 <CCol>
                   <CCard>
                     <CCardHeader>View Products</CCardHeader>
                     <CCardBody>
                       <CDataTable
                         items={ResponseData}
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
                           Packages: (item) => (
                             <td>
                               <CRow>
                                 <CCol md="10">
                                   <CButton
                                     color="primary"
                                     size="sm"
                                     onClick={() => {
                                       ViewProductPackages(item.PRODUCT_PKID);
                                     }}
                                   >
                                     View
                                   </CButton>
                                 </CCol>
                               </CRow>
                             </td>
                           ),
                           "Product Image": (i) => {
                             let profile = "";
                             if (
                               i.PRODUCT_IMAGE === "" ||
                               i.PRODUCT_IMAGE === null
                             ) {
                               profile = "NoImage.png";
                             } else {
                               profile = i.PRODUCT_IMAGE;
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
                           Catalogue: (i) => (
                             <React.Fragment>
                               <td>
                                 <CLink
                                   href={ViewImg + "/" + i.PRODUCT_CATALOGUE}
                                   target="_blank"
                                 >
                                   <CButton
                                     color="primary"
                                     size="sm"
                                     id="AddEmp"
                                   >
                                     View
                                   </CButton>
                                 </CLink>
                               </td>
                             </React.Fragment>
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
       <CModal show={block} onClose={() => setblock(!block)} color="dark">
         <CModalHeader closeButton>
           <CModalTitle>Product Packages</CModalTitle>
         </CModalHeader>
         <CModalBody>
           <CRow>
             <CDataTable
               items={ProductPackages}
               fields={fields}
               hover
               striped
               bordered
               tableFilter={table}
               itemsPerPageSelect={items}
               sorter
               size="sm"
               itemsPerPage={4}
               pagination
             />
           </CRow>
         </CModalBody>
         <CModalFooter>
           <CButton color="secondary" onClick={() => setblock(!block)}>
             Close
           </CButton>
         </CModalFooter>
       </CModal>
     </div>
   );
 };
 
 export default CustomerViewProducts;
 