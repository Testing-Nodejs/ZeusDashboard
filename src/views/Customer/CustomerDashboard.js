/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import "../../style.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CustomerDashboard = () => {
  const CustomerID = localStorage.getItem("CustomerID");

  const [Response, setResponse] = useState([]);

  const GetAllDetails = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getsalesGraphByCustid/" + CustomerID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponse(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Your Order Statistics",
    },
    subtitle: {
      text: "Monthly Completed and All Orders",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Order Range",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5,
      },
    },
    series: Response,
  };
  React.useEffect(() => {
    GetAllDetails();
  }, []);

  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">My Orders Statistics</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>My Orders</CCardHeader>
                    <CCardBody>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
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

export default CustomerDashboard;
