// import React from "react";
// import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

// const ADD_KEY_HERE = "AIzaSyBRs7NRGpboLvwqN9zqFZiuhCXqe9URYBQ";

// const containerStyle = {
//   width: "100%",
//   height: "100%"
// };

// const center = { lat: 12.9802347063322, lng: 77.5907760360903 };

// const paths = [
//   {
//     lat: 12.9802347063322,
//     lng: 77.5907760360903,
//     bearing: -20.5784744283754
//   },
//   {
//     lat: 12.9793774204024,
//     lng: 77.5910979011596,
//     bearing: 17.1118088152409
//   },
//   {
//     lat: 12.9795865148043,
//     lng: 77.5911622741734,
//     bearing: 70.6690312217414
//   },
//   {
//     lat: 12.9797746996155,
//     lng: 77.5916987159555,
//     bearing: 38.1233134168197
//   },
//   {
//     lat: 12.9801301594259,
//     lng: 77.5919776656823,
//     bearing: -45.7414247345699
//   },
//   {
//     lat: 12.9798374278543,
//     lng: 77.5922780730802,
//     bearing: 16.0994201411847
//   },
//   {
//     lat: 12.9791683258247,
//     lng: 77.5920849540387,
//     bearing: 35.6916527554558
//   },
//   {
//     lat: 12.9787501361417,
//     lng: 77.5917845466407,
//     bearing: 58.0502467067782
//   },
//   {
//     lat: 12.9784155838887,
//     lng: 77.5912481048586,
//     bearing: 64.0233912454979
//   },
//   {
//     lat: 12.9784783124705,
//     lng: 77.5913768508863,
//     bearing: 45.7412428776673
//   },
//   {
//     lat: 12.9783319457552,
//     lng: 77.5912266471873,
//     bearing: -69.926654677622
//   },
//   {
//     lat: 12.978394674358,
//     lng: 77.591054985817,
//     bearing: 16.3413468751341
//   },
//   {
//     lat: 12.9779555738058,
//     lng: 77.5909262397893,
//     bearing: 54.6749460887583
//   },
//   {
//     lat: 12.9776210204837,
//     lng: 77.5904541710211,
//     bearing: 64.0233096712307
//   },
//   {
//     lat: 12.9774746532636,
//     lng: 77.5901537636231,
//     bearing: 65.5464053454266
//   },
//   {
//     lat: 12.9761573444059,
//     lng: 77.5872569779997,
//     bearing: -66.4029340594377
//   },
//   {
//     lat: 12.9764291706147,
//     lng: 77.5866347055324,
//     bearing: -48.4630801907934
//   },
//   {
//     lat: 12.9766382674962,
//     lng: 77.5863986711483,
//     bearing: -54.992843944921
//   },
//   {
//     lat: 12.9771191896563,
//     lng: 77.5857120256672,
//     bearing: -60.0659370316888
//   }
// ];

// const lineSymbol = {
//   path: "M 0,-1 0,1",
//   strokeOpacity: 1,
//   scale: 5,
//   strokeColor: "red"
// };

// const options = {
//   strokeOpacity: 0,
//   fillOpacity: 0,
//   zIndex: 1,
//   icons: [
//     {
//       icon: lineSymbol,
//       offset: "0",
//       repeat: "20px"
//     }
//   ]
// };

// function App() {
//   return (
//     <LoadScript googleMapsApiKey={ADD_KEY_HERE}>
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
//         <Polyline path={paths} options={options} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default App;
import React, { Fragment, useCallback, useRef, useState } from "react";
import { GoogleMap, Polyline, useLoadScript, Marker } from "@react-google-maps/api";

const App = () => {
  const polylineRef = useRef(null);
  const listenersRef = useRef([]);
  const [path, setPath] = useState([
    {
      lat: 12.9802347063322,
      lng: 77.5907760360903
    },
    {
      lat: 12.9793774204024,
      lng: 77.5910979011596
    },
    {
      lat: 12.9795865148043,
      lng: 77.5911622741734
    },
    {
      lat: 12.9797746996155,
      lng: 77.5916987159555
    },
    {
      lat: 12.9801301594259,
      lng: 77.5919776656823
    },
    {
      lat: 12.9798374278543,
      lng: 77.5922780730802
    },
    {
      lat: 12.9791683258247,
      lng: 77.5920849540387
    },
    {
      lat: 12.9787501361417,
      lng: 77.5917845466407
    },
    {
      lat: 12.9784155838887,
      lng: 77.5912481048586
    },
    {
      lat: 12.9784783124705,
      lng: 77.5913768508863
    },
    {
      lat: 12.9783319457552,
      lng: 77.5912266471873
    },
    {
      lat: 12.978394674358,
      lng: 77.591054985817
    },
    {
      lat: 12.9779555738058,
      lng: 77.5909262397893
    },
    {
      lat: 12.9776210204837,
      lng: 77.5904541710211
    },
    {
      lat: 12.9774746532636,
      lng: 77.5901537636231
    },
    {
      lat: 12.9761573444059,
      lng: 77.5872569779997
    },
    {
      lat: 12.9764291706147,
      lng: 77.5866347055324
    },
    {
      lat: 12.9766382674962,
      lng: 77.5863986711483
    },
    {
      lat: 12.9771191896563,
      lng: 77.5857120256672
    }
  ]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polylineRef.current) {
      const nextPath = polylineRef.current
        .getPath()
        .getArray()
        .map((latLng) => latLng.toJSON());
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polyline and listeners
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

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polylineRef.current = null;
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "80vh"
  };

  // const showPath = () => {
  //   console.log(path); //What should be here to show the edited path if its possible to access?
  // };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ""
  });

  const centre = { lat: 12.9802347063322, lng: 77.5907760360903 };
  const Endposition = {
    lat: 12.9771191896563,
    lng: 77.5857120256672
  };
  const LoginImage = "avatars/LoginIcon.png";
  const LogoutImage = "avatars/LogoutIcon.png";

  if (loadError) return "Error loading Google Map";
  if (!isLoaded) return "Loading Maps....";

  return (
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
          // options={{ editable: true, strokeColor: "#ff0000" }}
          // Event used when manipulating and adding points
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
    </Fragment >
  );
};

export default App;
