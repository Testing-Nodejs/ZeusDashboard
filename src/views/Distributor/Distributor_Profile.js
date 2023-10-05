/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import { CCol, CRow, CImg } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl, ViewImg } from "src/services/service";
import "../../style.css";
import "../../Profile.css";

const Distributor_Profile = () => {
  const [ResponseData, setResponseData] = useState([]);

  const DisctributorID = localStorage.getItem("DistributerID");

  const [DistributorProfile, setDistributorProfile] = useState({
    profile: "",
    name: "",
    email: "",
    pho: "",
    firm: "",
    type: "",
    Subtype: "",
  });

  // Filters

  const GetAllDistributorOrders = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getDistributerProfile/" + DisctributorID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setDistributorProfile({
          ...DistributorProfile,
          profile: response.data[0].CUSTOMER_PRFILE,
          name: response.data[0].CUSTOMER_NAME,
          email: response.data[0].CUSTOMER_EMAIL,
          pho: response.data[0].CUSTOMER_MOBILE,
          firm: response.data[0].CUSTOMER_FIRM_NAME,
          type: response.data[0].CUSTOMER_TYPE_NAME,
          Subtype: response.data[0].CUSTOMER_SUBTYPE_NAME,
        });
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    GetAllDistributorOrders();
  }, []);
  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster" style={{ color: "#fff" }}>
        Profile
      </h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <div id="main">
            <div id="photo">
              <CImg
                src={ViewImg + "/" + DistributorProfile.profile == "" || null ? "NoImage.png" : DistributorProfile.profile}
                fluid
                className="mb-2"
                style={{ width: "100%" }}
              />
            </div>
            <div id="info">
              <div id="name">
                <h2 style={{ color: "black" }}>{DistributorProfile.name}</h2>
                <p style={{ color: "black" }}>{DistributorProfile.email}</p>
                <p style={{ color: "black" }}>{DistributorProfile.pho}</p>
                <p style={{ color: "black" }}>{DistributorProfile.firm}</p>
                <p style={{ color: "black" }}>{DistributorProfile.type}</p>
                <p style={{ color: "black" }}>{DistributorProfile.Subtype}</p>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default Distributor_Profile;
