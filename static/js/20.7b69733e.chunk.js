(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[20],{624:function(e,t,s){"use strict";s.d(t,"a",(function(){return i})),s.d(t,"b",(function(){return n}));var i="https://zeusservices.onrender.com/api/",n="https://zeusservices.onrender.com/"},625:function(e,t,s){},674:function(e,t){},688:function(e,t){},689:function(e,t){},838:function(e,t,s){"use strict";s.r(t);var i=s(627),n=s(1),c=s.n(n),a=s(628),d=s.n(a),r=s(630),o=s.n(r),l=s(624),m=s(20),j=s(626),h=(s(625),s(686)),x=s(12),u={placeholder:"Search here...",label:"Search:  "},b={label:"Rows:",values:[5,10,25,50,75,100]},y=[{key:"Name"},{key:"Email"},{key:"Email2"},{key:"CountryCode"},{key:"PhoneNumber"},{key:"AlterNateNumber"},{key:"Designation"},{key:"Qualification"},{key:"JoiningDate"},{key:"DateofBirth"},{key:"Region"},{key:"Gender"},{key:"password"},{key:"Ismanager"},{key:"salary"},{key:"dateofreleaving"},{key:"address1"},{key:"address2"},{key:"address3"},{key:"ZipCode"},{key:"altaddress1"},{key:"altaddress2"},{key:"altaddress3"},{key:"altZipCode"}];t.default=function(){var e=Object(m.g)(),t=Object(n.useState)([]),s=Object(i.a)(t,2),a=s[0],r=s[1],f=function(e){var t,s=h.read(e,{type:"binary"}),i=s.SheetNames[0];t=h.utils.sheet_to_row_object_array(s.Sheets[i],{defval:"-"}),console.log(t),r(t),document.getElementById("divLoading").className="hide"};return c.a.useEffect((function(){}),[]),Object(x.jsxs)("div",{children:[Object(x.jsx)("div",{id:"divLoading",children:" "}),Object(x.jsx)("h1",{id:"ccmaster",children:"Import Employees From Excel"}),Object(x.jsxs)(j.H,{style:{marginTop:"3%"},children:[Object(x.jsx)(j.j,{xs:"12",sm:"12",md:"4",lg:"4",xl:"4",className:"mb-3 mb-xl-0",children:Object(x.jsx)("div",{id:"country-master",children:Object(x.jsx)(j.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(x.jsx)(j.f,{children:Object(x.jsx)(j.H,{children:Object(x.jsx)(j.j,{children:Object(x.jsxs)(j.e,{children:[Object(x.jsx)(j.i,{style:{fontSize:"13px"},children:"Import Employees From Excel"}),Object(x.jsx)(j.f,{children:Object(x.jsx)(j.t,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:Object(x.jsx)(j.u,{row:!0,children:Object(x.jsxs)(j.j,{md:"12",children:[Object(x.jsx)(j.z,{htmlFor:"exampleInputName2",className:"pr-1",children:Object(x.jsx)("h6",{children:"Select Excel"})}),Object(x.jsx)(j.y,{type:"file",id:"Question",name:"Question",placeholder:"Enter Title",onChange:function(e){document.getElementById("divLoading").className="show";if(/^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/.test(e.target.files[0].name.toLowerCase()))if("undefined"!=typeof FileReader){var t=new FileReader;t.readAsBinaryString?(t.onload=function(e){f(e.target.result)},t.readAsBinaryString(e.target.files[0])):(t.onload=function(e){for(var t="",s=new Uint8Array(e.target.result),i=0;i<s.byteLength;i++)t+=String.fromCharCode(s[i]);f(t)},t.readAsArrayBuffer(e.target.files[0]))}else o.a.fire({title:"This browser does not support HTML5.!",icon:"info",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide";else o.a.fire({title:"Please upload a valid Excel file.!",icon:"info",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide"}})]})})})})]})})})})})})}),Object(x.jsx)(j.j,{xs:"12",sm:"12",md:"12",lg:"12",xl:"12",className:"mb-3 mb-xl-0",children:Object(x.jsx)("div",{id:"country-table",children:Object(x.jsx)(j.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(x.jsxs)(j.f,{children:[Object(x.jsx)(j.H,{children:Object(x.jsx)(j.j,{md:"12",children:Object(x.jsxs)("div",{children:[Object(x.jsx)(j.d,{size:"sm",id:"AddEmp",onClick:function(){document.getElementById("divLoading").className="show";var t={Employees:a};console.log(t),d.a.post(l.a+"importemps",t).then((function(t){console.log(t.data),!0===t.data?(o.a.fire({title:"Employee Added Successfully!",icon:"success",confirmButtonText:"OK"}),e.push("/ViewEmployees"),document.getElementById("divLoading").className="hide"):!1===t.data&&(o.a.fire({title:"Employee Failed To Add!",icon:"warning",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")})).catch((function(e){console.log(e)}))},children:"Upload Excel"}),Object(x.jsx)("br",{})]})})}),Object(x.jsx)(j.H,{children:Object(x.jsx)(j.j,{children:Object(x.jsxs)(j.e,{children:[Object(x.jsx)(j.i,{children:"Loaded Excel"}),Object(x.jsx)(j.f,{children:Object(x.jsx)(j.m,{items:a,fields:y,hover:!0,striped:!0,bordered:!0,tableFilter:u,itemsPerPageSelect:b,sorter:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{}})})]})})})]})})})})]})]})}}}]);
//# sourceMappingURL=20.7b69733e.chunk.js.map