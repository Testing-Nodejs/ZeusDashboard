import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CButton,
  CForm,
  CInput,
} from "@coreui/react";
import { MyApiUrl } from "src/services/service";
import "../LoginScreen.css";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const Login = () => {

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

  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const EmailChange = (event) => {
    setemail(event.target.value);
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setpassword(event.target.value);
  };

  const handleClick = () => {
    if (email === "" || email === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Email Address!",
      });
    } else if (password === "" || password === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Password!",
      });
    } else {
      axios({
        method: "GET",
        url: MyApiUrl + "AdminLogin/" + email + "/" + password,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.data === false) {
            Swal.fire({
              title: "Please Enter valid Credentials",
              icon: "error",
              confirmButtonText: "OK",
            });
            window.location.href = "/";
          } else {
            window.location.href = "/dashboard";
            localStorage.setItem("SessionID", response.data[0].SUPER_ADMIN_PKID);
            localStorage.setItem("SessionType", "admin");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <div className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <a href="/">
                <img
                  src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
                  alt=""
                />
                Return home
              </a>
            </div>
            <div className="contact">
              <CForm>
                <h3>Super Admin</h3>
                <CInput
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={EmailChange}
                  style={{ fontSize: "16px" }}
                />
                {/* <CInput
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={passwordChange}
                  style={{ fontSize: "16px" }}
                /> */}
                <Input
                  type={values.showPassword ? "text" : "password"}
                  onChange={handlePasswordChange("password")}
                  value={values.password}
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <CButton className="submit" onClick={handleClick}>LOGIN</CButton>
              </CForm>
            </div>
          </div>
          <div className="right">
            <div className="right-text">
              <h2>ZEUS</h2>
              <h5>Zeus Biotech Private Limited</h5>
            </div>
            <div className="right-inductor"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
