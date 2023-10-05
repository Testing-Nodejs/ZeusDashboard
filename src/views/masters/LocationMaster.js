/* eslint-disable react-hooks/exhaustive-deps */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CRow,
} from "@coreui/react";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useState } from "react";
import { MyApiUrl } from "src/services/service";
import Swal from "sweetalert2";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [{ key: "Action" }, { key: "Country Code" }, { key: "Country" }];

const fields1 = [{ key: "Action" }, { key: "Country" }, { key: "State" }];

const fields2 = [
  { key: "Action" },
  { key: "Country" },
  { key: "State" },
  { key: "City Code" },
  { key: "City" },
];

const fields3 = [
  { key: "Action" },
  { key: "Country" },
  { key: "State" },
  { key: "City" },
  { key: "Area" },
  { key: "Zip Code" },
];

const LocationMaster = () => {
  const [countryPkid, setCountryPkid] = useState("");
  const [AddButton, setAddButton] = useState(true);
  const [UpdateButton, setUpdateButton] = useState(false);

  const [country, setCountry] = useState();
  const [countryCode, setCountryCode] = useState();
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

  const countryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const AddCountry = () => {
    if (countryCode === "" || countryCode == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Country Code!",
      });
    } else if (country === "" || country == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Country Name!",
      });
    } else {
      const obj = {
        CountryCode: countryCode,
        CountryName: country,
      };

      axios.post(MyApiUrl + "countries/", obj).then((response) => {
        console.log(response);
        if (response.data === "0") {
          Swal.fire({
            title: "Country Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
        } else if (response.data === "1") {
          Swal.fire({
            title: "Country Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
          GetCountry();
          GetCountryForCity();
          GetCountryForArea();
          setCountry("");
          setCountryCode("");
          GetCountry();
        } else if (response.data === "2") {
          Swal.fire({
            title: "Country Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const UpdateCountry = () => {
    if (country === "" || country == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Country Name!",
      });
    } else {
      const obj = {
        countryId: countryPkid,
        CountryCode: countryCode,
        CountryName: country,
      };

      axios.put(MyApiUrl + "countries/" + countryPkid, obj).then((response) => {
        console.log();
        if (response.data === true) {
          Swal.fire({
            title: "Country Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountry();
          fetchData();
          setCountryPkid("");
          setCountry("");
          setCountryCode("");
          setAddButton(true);
          setUpdateButton(false);
        } else {
          Swal.fire({
            title: "Failed",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const EditContry = (id, country, countryCode) => {
    setCountryPkid(id);
    setCountry(country);
    setCountryCode(countryCode);
    setAddButton(false);
    setUpdateButton(true);
  };

  const DeleteCountry = (id) => {
    axios({
      method: "DELETE",
      url: MyApiUrl + "countries/" + id + "",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Selected Country Deleted!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Failed To Delete Country!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [responseData, setResponseData] = React.useState([]);

  const fetchData = React.useCallback(() => {
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
        const items = response.data.map((item) => {
          return {
            ...item,
            "Country Code": item.COUNTRY_CODE,
            Country: item.COUNTRY_NAME,
          };
        });
        setResponseData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
    GetCountry();
    GetState();
    GetCountryForCity();
    GetCities();
    GetCountryForArea();
    GetAreas();
  }, []);

  const Updatebtn = () => (
    <CButton type="button" onClick={UpdateCountry} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddCountry} size="md" id="Add-btn">
      Add
    </CButton>
  );

  // State Master

  const [StatePkid, setStatePkid] = useState();
  const [CountryData, setCountryData] = useState();
  const [StateData, setStateData] = useState([]);
  const [CountryForState, setCountryForState] = useState("-1");
  const [StateForState, setStateForState] = useState();
  const [AddButtonForState, setAddButtonForState] = useState(true);
  const [UpdateButtonForState, setUpdateButtonForState] = useState(false);

  const CountryChangeForState = (event) => {
    setCountryForState(event.target.value);
  };

  const AddState = () => {
    if (CountryForState === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForState === "" || StateForState == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter State Name!",
      });
    } else {
      const obj = {
        CountryId: CountryForState,
        StateName: StateForState,
      };
      axios.post(MyApiUrl + "states", obj).then((response) => {
        if (response.data === "Already Existed!") {
          Swal.fire({
            title: "State Already Exist!",
            icon: "info",
            confirmButtonText: "OK",
          });
        } else if (response.data === true) {
          Swal.fire({
            title: "State Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountry();
          GetState();
          setStateForState("");
          setCountry("-1");
        } else if (response.data === false) {
          Swal.fire({
            title: "Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const EditState = (id, countryid, state) => {
    setStatePkid(id);
    setCountryForState(countryid);
    setStateForState(state);
    setAddButtonForState(false);
    setUpdateButtonForState(true);
  };

  const UpdateState = () => {
    if (CountryForState === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForState === "" || StateForState == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter State Name!",
      });
    } else {
      const obj = {
        CountryId: CountryForState,
        StateName: StateForState,
        stateId: StatePkid,
      };
      axios.put(MyApiUrl + "states/" + StatePkid, obj).then((response) => {
        console.log("response.data :>> ", response.data);
        if (response.data === false) {
          Swal.fire({
            title: "Failed To Update!",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (response.data === true) {
          Swal.fire({
            title: "State Details Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountry();
          GetState();
          setStateForState("");
          setCountryForState("-1");
          setAddButtonForState(true);
          setUpdateButtonForState(false);
        }
      });
    }
  };

  const DeleteState = (id) => {
    axios({
      method: "DELETE",
      url: MyApiUrl + "states/" + id + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Selected State Deleted!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetState();
        } else {
          Swal.fire({
            title: "Failed To Delete State!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetCountry = React.useCallback(() => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetState = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "states",
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
          };
        });
        setStateData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdatebtnForState = () => (
    <CButton type="button" onClick={UpdateState} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const AddbtnForState = () => (
    <CButton type="button" onClick={AddState} size="md" id="Add-btn">
      Add
    </CButton>
  );

  //   City Master

  const [AddButtonForCity, setAddButtonForCity] = useState(true);
  const [UpdateButtonForCity, setUpdateButtonForCity] = useState(false);
  const [CountryDataForCity, setCountryDataForCity] = useState();
  const [StateDataForCity, setStateDataForCity] = useState();
  const [CountryForCity, setCountryForCity] = useState();
  const [StateForCity, setStateForCity] = useState();
  const [CityCode, setCityCode] = useState();
  const [City, setCity] = useState();
  const [CityPkid, setCitypkid] = useState();
  const [CityData, setCityData] = useState([]);

  const GetCountryForCity = React.useCallback(() => {
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
        const CountryOption = response.data.map((item) => (
          <option value={item.COUNTRY_PKID}>{item.COUNTRY_NAME}</option>
        ));
        setCountryDataForCity(CountryOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetStateForCity = React.useCallback((Countrypkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "getStateByCountryId/" + Countrypkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateDataForCity(StateOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetStateForUpdateForCity = React.useCallback((Countrypkid, stateid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "getStateByCountryId/" + Countrypkid + "",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateDataForCity(StateOption);
        setStateForCity(stateid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const CountryChangeForCity = (event) => {
    setCountryForCity(event.target.value);
    GetStateForCity(event.target.value);
  };

  const StateCahangeForCity = (event) => {
    setStateForCity(event.target.value);
  };

  const CityCodeChange = (event) => {
    setCityCode(event.target.value);
  };

  const AddCity = () => {
    if (CountryForCity === "-1" || CountryForCity == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForCity === "-1" || StateForCity == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select State!",
      });
    } else if (CityCode === "" || CityCode == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter City Code!",
      });
    } else if (City === "" || City == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter City Name!",
      });
    } else {
      const obj = {
        CountryId: CountryForCity,
        StateId: StateForCity,
        CityCode: CityCode,
        CityName: City,
      };
      console.log(obj);
      axios.post(MyApiUrl + "cities/", obj).then((response) => {
        console.log("object :>> ", response.data);
        if (response.data === true) {
          Swal.fire({
            title: "City Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else if (response.data === false) {
          Swal.fire({
            title: "City Not Added!",
            icon: "error",
            confirmButtonText: "OK",
          });
          GetCountryForCity();
          setCountryForCity("-1");
          setStateDataForCity(null);
          setStateForCity("-1");
          setCity("");
          setCityCode("");
          GetCities();
        } else {
          Swal.fire({
            title: "Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const EditCity = (id, countryid, stateid, cityCode, city) => {
    setCitypkid(id);
    setCountryForCity(countryid);
    GetStateForUpdateForCity(countryid, stateid);
    setCityCode(cityCode);
    setCity(city);
    setAddButtonForCity(false);
    setUpdateButtonForCity(true);
  };

  const UpdateCity = () => {
    if (CountryForCity === "" || CountryForCity == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForCity === "-1") {
      Toast.fire({
        icon: "warning",
        title: "Please Select State!",
      });
    } else if (CityCode === "" || CityCode == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter City Code!",
      });
      alert("Please Enter City Code");
    } else if (City === "" || City == null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter City Name!",
      });
    } else {
      const obj = {
        CountryId: CountryForCity,
        StateId: StateForCity,
        CityCode: CityCode,
        CityName: City,
        CityPkid: CityPkid,
      };

      axios.put(MyApiUrl + "cities/" + CityPkid, obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "City Details Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCities();
          GetCountryForCity();
          setCountryForCity("-1");
          setStateForCity("-1");
          setCity("");
          setCityCode("");
          setAddButtonForCity(true);
          setUpdateButtonForCity(false);
        } else if (response.data === false) {
          Swal.fire({
            title: "City Details Not Updated!",
            icon: "error",
            confirmButtonText: "OK",
          });
          GetCities();
          GetCountryForCity();
          setCountryForCity("-1");
          setStateForCity("-1");
          setCity("");
          setCityCode("");
          setAddButtonForCity(true);
          setUpdateButtonForCity(false);
        } else {
          Swal.fire({
            title: "City Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
          GetCities();
          GetCountryForCity();
          setCountryForCity("-1");
          setStateForCity("-1");
          setCity("");
          setCityCode("");
          setAddButtonForCity(true);
          setUpdateButtonForCity(false);
        }
      });
    }
  };

  const DeleteCity = (id) => {
    axios({
      method: "DELETE",
      url: MyApiUrl + "cities/" + id + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Selected City Deleted!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCities();
          GetCountryForCity();
          setCountryForCity("-1");
          setStateForCity("-1");
          setCity("");
        } else {
          Swal.fire({
            title: "Failed To Delete City!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetCities = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "cities",
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
            City: item.CITY_NAME,
            "City Code": item.CITY_CODE,
          };
        });
        setCityData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdatebtnForCity = () => (
    <CButton type="button" onClick={UpdateCity} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const AddbtnForCity = () => (
    <CButton type="button" onClick={AddCity} size="md" id="Add-btn">
      Add
    </CButton>
  );

  //   Area Master

  const [AddButtonForArea, setAddButtonForArea] = useState(true);
  const [UpdateButtonForArea, setUpdateButtonForArea] = useState(false);

  const [CountryDataForArea, setCountryDataForArea] = useState();
  const [StateDataForArea, setStateDataForArea] = useState();
  const [CityDataForArea, setCityDataForArea] = useState();

  const [CountryForArea, setCountryForArea] = useState();
  const [StateForArea, setStateForArea] = useState();
  const [CityForArea, setCityForArea] = useState();
  const [area, setarea] = useState();
  const [zip, setzip] = useState();

  const [AreaData, setAreaData] = useState([]);
  const [areapkid, setareapkid] = useState();

  const GetCountryForArea = React.useCallback(() => {
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
        const CountryOption = response.data.map((item) => (
          <option value={item.COUNTRY_PKID}>{item.COUNTRY_NAME}</option>
        ));
        setCountryDataForArea(CountryOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetStateForArea = React.useCallback((Countrypkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "getStateByCountryId/" + Countrypkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateDataForArea(StateOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetcitiesByStateIdForArea = React.useCallback((stateid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "citiesByStateId/" + stateid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const cityOpn = response.data.map((item) => (
          <option value={item.CITY_PKID}>{item.CITY_NAME}</option>
        ));
        setCityDataForArea(cityOpn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetStateForUpdateForArea = React.useCallback((Countrypkid, stateid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "getStateByCountryId/" + Countrypkid + "",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const StateOption = response.data.map((item) => (
          <option value={item.STATE_PKID}>{item.STATE_NAME}</option>
        ));
        setStateDataForArea(StateOption);
        setStateForArea(stateid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetcitiesByStateIdUpdateForArea = React.useCallback((stateid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "citiesByStateId/" + stateid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const cityOpn = response.data.map((item) => (
          <option value={item.CITY_PKID}>{item.CITY_NAME}</option>
        ));
        setCityDataForArea(cityOpn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const CountryChangeForArea = (event) => {
    setCountryForArea(event.target.value);
    GetStateForArea(event.target.value);
  };

  const StateCahangeForArea = (event) => {
    GetcitiesByStateIdForArea(event.target.value);
    setStateForArea(event.target.value);
  };

  const CityChangeForArea = (event) => {
    setCityForArea(event.target.value);
  };

  const AddArea = () => {
    if (CountryForArea === "-1" || CountryForArea === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForArea === "-1" || StateForArea === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select State!",
      });
    } else if (CityForArea === "-1" || CityForArea === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select City!",
      });
    } else if (area === "" || area === null || area === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Area Name!",
      });
    } else if (zip === "" || zip === null || zip === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Area Zip Code!",
      });
    } else {
      const obj = {
        CountryId: CountryForArea,
        StateId: StateForArea,
        CityId: CityForArea,
        AreaName: area,
        AREA_ZIP_CODE: zip,
      };
      console.log("obj: ", obj);

      axios.post(MyApiUrl + "areas", obj).then((response) => {
        console.log("object :>> ", response.data);
        if (response.data === true) {
          Swal.fire({
            title: "Area Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountryForArea();
          setStateDataForArea(null);
          setCityDataForArea(null);
          setCountryForArea("-1");
          setStateForArea("-1");
          setCityForArea("-1");
          setarea("");
          setzip("");
          GetAreas();
        } else if (response.data === false) {
          Swal.fire({
            title: "Area Not Added!",
            icon: "error",
            confirmButtonText: "OK",
          });
          GetCountryForArea();
          setStateDataForArea(null);
          setCityDataForArea(null);
          setCountryForArea("-1");
          setStateForArea("-1");
          setCityForArea("-1");
          setarea("");
          setzip("");
          GetAreas();
        } else {
          Swal.fire({
            title: "Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const EditArea = (id, countryid, stateid, cityId, area, zip) => {
    setCountryForArea(countryid);
    GetStateForUpdateForArea(countryid, stateid);
    GetcitiesByStateIdUpdateForArea(stateid);
    setCityForArea(cityId);
    setareapkid(id);
    setarea(area);
    setzip(zip);
    setAddButtonForArea(false);
    setUpdateButtonForArea(true);
  };

  const UpdateArea = () => {
    if (CountryForArea === "-1" || CountryForArea === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Country!",
      });
    } else if (StateForArea === "-1" || StateForArea === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select State!",
      });
    } else if (CityForArea === "-1" || CityForArea === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select City!",
      });
    } else if (area === "" || area === null || area === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Area Name!",
      });
    } else if (zip === "" || zip === null || zip === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Area Zip Code!",
      });
    } else {
      const obj = {
        CountryId: CountryForArea,
        StateId: StateForArea,
        CityId: CityForArea,
        AreaName: area,
        AreaId: areapkid,
        AREA_ZIP_CODE: zip,
      };

      axios.put(MyApiUrl + "areas/" + areapkid, obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Area Details Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetCountryForArea();
          setStateDataForArea(null);
          setCityDataForArea(null);
          setCountryForArea("-1");
          setStateForArea("-1");
          setCityForArea("-1");
          setarea("");
          setzip("");
          GetAreas();
          setAddButtonForArea(true);
          setUpdateButtonForArea(false);
        } else if (response.data === false) {
          Swal.fire({
            title: "Area Details Not Updated!",
            icon: "error",
            confirmButtonText: "OK",
          });
          GetCountryForArea();
          setStateDataForArea(null);
          setCityDataForArea(null);
          setCountryForArea("-1");
          setStateForArea("-1");
          setCityForArea("-1");
          setarea("");
          setzip("");
          GetAreas();
          setAddButtonForArea(true);
          setUpdateButtonForArea(false);
        } else {
          Swal.fire({
            title: "Area Already Existed!",
            icon: "info",
            confirmButtonText: "OK",
          });
          GetCountryForArea();
          setStateDataForArea(null);
          setCityDataForArea(null);
          setCountryForArea("-1");
          setStateForArea("-1");
          setCityForArea("-1");
          setarea("");
          setzip("");
          GetAreas();
          setAddButtonForArea(true);
          setUpdateButtonForArea(false);
        }
      });
    }
  };

  const DeleteArea = (id) => {
    axios({
      method: "DELETE",
      url: MyApiUrl + "areas/" + id + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Selected Area Deleted!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetAreas();
        } else {
          Swal.fire({
            title: "Failed To Delete Area!",
            icon: "error",
            confirmButtonText: "OK",
          });
          alert("Failed To Delete Area");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetAreas = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "areas",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            City: item.CITY_NAME,
            Area: item.AREA_NAME,
            Country: item.COUNTRY_NAME,
            State: item.STATE_NAME,
            "Zip Code": item.AREA_ZIP_CODE,
          };
        });
        setAreaData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdatebtnForArea = () => (
    <CButton type="button" onClick={UpdateArea} size="md" id="Add-btn">
      Update
    </CButton>
  );

  const AddbtnForArea = () => (
    <CButton type="button" onClick={AddArea} size="md" id="Add-btn">
      Add
    </CButton>
  );

  return (
    <div>
      <h1 id="ccmaster">Country Master</h1>
      <br />
      <br />
      <CRow>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Country</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>Country-Code</CLabel>
                              <CInput
                                id="text-input1"
                                name="text-input"
                                placeholder="Code"
                                type="text"
                                value={countryCode}
                                onChange={countryCodeChange}
                              />
                            </CCol>
                          </CFormGroup>

                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel>Country</CLabel>
                              <CInput
                                id="text-input"
                                name="text-input"
                                placeholder="Country"
                                value={country}
                                onChange={(event) => {
                                  let value = event.target.value;
                                  value = value.replace(/[^A-Z a-z]/gi, "");
                                  setCountry(value);
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
          </div>
        </CCol>

        <CCol xs="12" sm="12" md="8" lg="8" xl="8" className="mb-3 mb-xl-0">
          <div id="country-table">
            <CCard id="Loccard">
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Added Country</CCardHeader>
                      <CCardBody>
                        <CDataTable
                          items={responseData}
                          fields={fields}
                          hover
                          striped
                          bordered
                          tableFilter={table}
                          sorter
                          size="sm"
                          itemsPerPage={4}
                          pagination
                          scopedSlots={{
                            Action: (item) => (
                              <td>
                                <CButton
                                  onClick={() => {
                                    EditContry(
                                      item.COUNTRY_PKID,
                                      item.COUNTRY_NAME,
                                      item.COUNTRY_CODE
                                    );
                                  }}
                                  size="sm"
                                  id="war-btn"
                                >
                                  <EditIcon />
                                  {item.COUNTRY_ACTIVE}
                                </CButton>
                                <CButton
                                  onClick={() => {
                                    DeleteCountry(item.COUNTRY_PKID);
                                  }}
                                  size="sm"
                                  id="war-btn1"
                                >
                                  <DeleteSharpIcon />
                                  {item.COUNTRY_ACTIVE}
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
          </div>
        </CCol>
      </CRow>
      <h1 id="ccmaster" style={{ paddingBottom: "2%", paddingTop: "2%" }}>
        State Master
      </h1>
      <CRow>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add State</CCardHeader>
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
                              onChange={CountryChangeForState}
                              value={CountryForState}
                            >
                              <option value="-1">Select Country</option>
                              {CountryData}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>State</CLabel>
                            <CInput
                              id="text-input"
                              name="text-input"
                              placeholder="State"
                              value={StateForState}
                              onChange={(event) => {
                                let value = event.target.value;
                                value = value.replace(/[^A-Z a-z]/gi, "");
                                setStateForState(value);
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                      </CForm>
                      {UpdateButtonForState && <UpdatebtnForState />}
                      {AddButtonForState && <AddbtnForState />}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol col="10">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Added States</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={StateData}
                        fields={fields1}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        size="sm"
                        itemsPerPage={4}
                        pagination
                        scopedSlots={{
                          Action: (item) => (
                            <td>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  EditState(
                                    item.STATE_PKID,
                                    item.STATE_COUNTRY_FKID,
                                    item.STATE_NAME
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
                                  DeleteState(item.STATE_PKID);
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
      <h1 id="ccmaster" style={{ paddingBottom: "2%", paddingTop: "2%" }}>
        City Master
      </h1>
      <CRow>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard id="city-master">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add City</CCardHeader>
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
                              value={CountryForCity}
                              onChange={CountryChangeForCity}
                            >
                              <option value="-1">Select Country</option>
                              {CountryDataForCity}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select State</CLabel>
                            <CSelect
                              custom
                              name="Province"
                              id="Province"
                              value={StateForCity}
                              onChange={StateCahangeForCity}
                            >
                              <option value="-1">Select State</option>
                              {StateDataForCity}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel> City Code</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="City Code"
                              value={CityCode}
                              onChange={CityCodeChange}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel> City</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="City"
                              value={City}
                              onChange={(event) => {
                                let value = event.target.value;
                                value = value.replace(/[^A-Z a-z]/gi, "");
                                setCity(value);
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        {UpdateButtonForCity && <UpdatebtnForCity />}
                        {AddButtonForCity && <AddbtnForCity />}
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol col="10">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Added Cities</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={CityData}
                        fields={fields2}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        size="sm"
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          Action: (item) => (
                            <td>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  EditCity(
                                    item.CITY_PKID,
                                    item.COUNTRY_PKID,
                                    item.STATE_PKID,
                                    item.CITY_CODE,
                                    item.CITY_NAME
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
                                  DeleteCity(item.CITY_PKID);
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
      <h1 id="ccmaster" style={{ paddingBottom: "2%", paddingTop: "2%" }}>
        Area Master
      </h1>
      <CRow>
        <CCol sm="12" md="12" lg="4" xl="4" className="mb-3 mb-xl-0">
          <CCard id="city-master">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Add Area</CCardHeader>
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
                              value={CountryForArea}
                              onChange={CountryChangeForArea}
                            >
                              <option value="-1">Select Country</option>
                              {CountryDataForArea}
                            </CSelect>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select State</CLabel>
                            <CSelect
                              custom
                              name="Province"
                              id="Province"
                              value={StateForArea}
                              onChange={StateCahangeForArea}
                            >
                              <option value="-1">Select State</option>
                              {StateDataForArea}
                            </CSelect>
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Select City</CLabel>
                            <CSelect
                              custom
                              name="City"
                              id="City"
                              value={CityForArea}
                              onChange={CityChangeForArea}
                            >
                              <option value="-1">Select City</option>
                              {CityDataForArea}
                            </CSelect>
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Area</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Area"
                              value={area}
                              onChange={(event) => {
                                let value = event.target.value;
                                value = value.replace(/[^A-Z a-z]/gi, "");
                                setarea(value);
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol xs="12" md="12">
                            <CLabel>Zip Code</CLabel>
                            <CInput
                              id="text-input1"
                              name="text-input"
                              placeholder="Zip Code"
                              value={zip}
                              onChange={(event) => {
                                const re = /^[0-9\b]+$/;
                                if (
                                  event.target.value === "" ||
                                  re.test(event.target.value)
                                ) {
                                  setzip(event.target.value);
                                }
                              }}
                            />
                          </CCol>
                        </CFormGroup>
                        {UpdateButtonForArea && <UpdatebtnForArea />}
                        {AddButtonForArea && <AddbtnForArea />}
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol col="10">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Added Areas</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={AreaData}
                        fields={fields3}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        size="sm"
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          Action: (item) => (
                            <td>
                              <CButton
                                size="sm"
                                onClick={() => {
                                  EditArea(
                                    item.AREA_PKID,
                                    item.AREA_COUNTRY_FKID,
                                    item.AREA_STATE_FKID,
                                    item.AREA_CITY_FKID,
                                    item.AREA_NAME,
                                    item.AREA_ZIP_CODE
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
                                  DeleteArea(item.CITY_PKID);
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

export default LocationMaster;
