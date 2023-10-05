/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { Fragment, useCallback, useRef, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { GoogleMap, Polyline, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { MyApiUrl } from "src/services/service";
import "../../style.css";
import { FormatColorResetOutlined } from "@material-ui/icons";


const TrackEmployee = (props) => {
  const EmpID = props.location.state.data.i.EmpID;
  const MDate = props.location.state.data.i.MDate;

  const LoginImage = "avatars/LoginIcon.png";
  const LogoutImage = "avatars/LogoutIcon.png";

  const [path, setPath] = useState();
  const [centre, setcentre] = useState({});
  const [Endposition, setEndposition] = useState({});
  const [displaygrp, setdisplaygrp] = useState(false);

  React.useEffect(() => {
    GetEmployeeLocation();
  }, []);

  let history = useHistory();

  const GetEmployeeLocation = () => {
    let splitval = MDate.split("T");
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeLocationsByDate/" + EmpID + "/" + splitval[0],
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          setdisplaygrp(false);
        } else {
          setdisplaygrp(true);
          setPath(response.data);
          setcentre(response.data[0]);
          setEndposition(response.data[(parseInt(response.data.length) - 1)]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const polylineRef = useRef(null);
  const listenersRef = useRef([]);

  const onEdit = useCallback(() => {
    if (polylineRef.current) {
      const nextPath = polylineRef.current
        .getPath()
        .getArray()
        .map((latLng) => latLng.toJSON());
      setPath(nextPath);
    }
  }, [setPath]);

  const onLoad = useCallback(
    (polyline) => {
      polylineRef.current = polyline;
      const path = polyline.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polylineRef.current = null;
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "80vh"
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ""
  });

  if (loadError) return "Error loading Google Map";
  if (!isLoaded) return "Loading Maps....";



  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Track Employee</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="2" />
        <CCol md="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol md="1">
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </CButton>
                </CCol>
              </CRow>
              <br />
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Track Employee</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          {displaygrp === true ?
                            <Fragment>
                              <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={18}
                                center={centre}
                              >
                                <Polyline
                                  ref={polylineRef}
                                  path={path}
                                  options={{ strokeColor: "#ff0000" }}
                                  onMouseUp={onEdit}
                                  onLoad={onLoad}
                                  onUnmount={onUnmount}
                                />
                                <Marker
                                  position={centre}
                                  title={"Login..! Work Started From Here."}
                                  label={"Login"}
                                  icon={LoginImage}
                                />
                                <Marker
                                  position={Endposition}
                                  title={"Logout..! Work Ended Here."}
                                  icon={LogoutImage}
                                />

                              </GoogleMap>
                            </Fragment > :
                            <Fragment>
                              <p style={{fontSize: "20px",fontWeight: "900",textAlign: "center"}}>No Data To Display ...!</p></Fragment>
                          }

                        </CCol>
                      </CRow>

                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="2" />
      </CRow>
    </div>
  );
};

export default TrackEmployee;
