(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[59],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return o}));var s="https://zeusservices.onrender.com/api/",o="https://zeusservices.onrender.com/"},625:function(e,t,n){},632:function(e,t,n){"use strict";var s=n(634),o=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(n(1)),i=(0,s(n(636)).default)(c.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=i},633:function(e,t,n){"use strict";var s=n(634),o=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=o(n(1)),i=(0,s(n(636)).default)(c.createElement("path",{d:"M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteSharp");t.default=i},849:function(e,t,n){"use strict";n.r(t);var s=n(25),o=n(627),c=n(1),i=n.n(c),d=n(628),a=n.n(d),u=n(630),r=n.n(u),l=n(626),m=n(624),p=n(632),b=n.n(p),j=n(633),y=n.n(j),h=(n(625),n(12)),T={placeholder:"Search here...",label:"Search:  "},O={label:"Rows:",values:[5,10,25,50,75,100]},f=[{key:"Action"},{key:"CustomerType"},{key:"CustomerSubType"}];t.default=function(){var e=Object(c.useState)({typePkid:"",CustomerType:"-1",ResponseData:[],AddButton:!0,UpdateButton:!1}),t=Object(o.a)(e,2),n=t[0],d=t[1],u=Object(c.useState)([]),p=Object(o.a)(u,2),j=p[0],x=p[1],C=r.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",r.a.stopTimer),e.addEventListener("mouseleave",r.a.resumeTimer)}}),S=i.a.useCallback((function(){document.getElementById("divLoading").className="show",a()({method:"GET",url:m.a+"custtype",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(h.jsx)("option",{value:e.CUSTOMER_TYPE_PKID,children:e.CUSTOMER_TYPE_NAME},t)}));x(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]),g=function(){if("-1"===n.CustomerType)C.fire({icon:"warning",title:"Select Customer Type!"});else if(""==n.CustomerSubType||null==n.CustomerSubType)C.fire({icon:"warning",title:"Enter Customer Sub Type!"});else{document.getElementById("divLoading").className="show";var e={CustType:n.CustomerType,CustSubType:n.CustomerSubType};a.a.post(m.a+"custsubtype",e).then((function(e){"Already Existed!"===e.data?(r.a.fire({title:"Customer Sub Type Already Exist!",icon:"info",confirmButtonText:"OK"}),E(),d(Object(s.a)(Object(s.a)({},n),{},{typePkid:"",CustomerType:"",CustomerSubType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):!0===e.data?(r.a.fire({title:"Customer Sub Type Added Successfully!",icon:"success",confirmButtonText:"OK"}),E(),d(Object(s.a)(Object(s.a)({},n),{},{typePkid:"",CustomerType:"",CustomerSubType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):!1===e.data&&(r.a.fire({title:"Customer Sub Type Failed To Add!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}},v=function(){if("-1"===n.CustomerType)C.fire({icon:"warning",title:"Select Customer Type!"});else if(""==n.CustomerSubType||null==n.CustomerSubType)C.fire({icon:"warning",title:"Enter Customer Sub Type!"});else{document.getElementById("divLoading").className="show";var e={CustType:n.CustomerType,CustSubType:n.CustomerSubType};a.a.put(m.a+"custsubtype/"+n.typeSubPkid,e).then((function(e){0==e.data?(r.a.fire({title:"Customer Sub Type Not Updated!",icon:"warning",confirmButtonText:"OK"}),E(),d(Object(s.a)(Object(s.a)({},n),{},{typePkid:"",CustomerType:"",CustomerSubType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):"1"==e.data?(r.a.fire({title:"Customer Sub Type Updated!",icon:"success",confirmButtonText:"OK"}),E(),d(Object(s.a)(Object(s.a)({},n),{},{typePkid:"",CustomerType:"",CustomerSubType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):(r.a.fire({title:"Customer Sub Type Already Existed!",icon:"info",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}},E=i.a.useCallback((function(){document.getElementById("divLoading").className="show",a()({method:"GET",url:m.a+"custsubtype",headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){var t=e.data.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{CustomerType:e.CUSTOMER_TYPE_NAME,CustomerSubType:e.CUSTOMER_SUBTYPE_NAME})}));d(Object(s.a)(Object(s.a)({},n),{},{ResponseData:t})),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]),B=function(){return Object(h.jsx)(l.d,{type:"button",onClick:v,size:"md",id:"Add-btn",children:"Update"})},_=function(){return Object(h.jsx)(l.d,{type:"button",onClick:g,size:"md",id:"Add-btn",children:"Add"})};return i.a.useEffect((function(){E(),S()}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{id:"divLoading",children:" "}),Object(h.jsx)("h1",{id:"ccmaster",children:"Customer Sub Type"}),Object(h.jsxs)(l.H,{style:{marginTop:"3%"},children:[Object(h.jsx)(l.j,{xs:"12",sm:"12",md:"4",lg:"4",xl:"4",className:"mb-3 mb-xl-0",children:Object(h.jsx)("div",{id:"country-master",children:Object(h.jsx)(l.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(h.jsx)(l.f,{children:Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{children:Object(h.jsxs)(l.e,{children:[Object(h.jsx)(l.i,{children:"Add Customer Sub Type"}),Object(h.jsx)(l.f,{children:Object(h.jsxs)(l.t,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(h.jsx)(l.u,{row:!0,children:Object(h.jsxs)(l.j,{xs:"12",md:"12",children:[Object(h.jsx)(l.z,{children:"Customer Type"}),Object(h.jsxs)(l.I,{custom:!0,name:"CustType",id:"CustType",value:n.CustomerType,onChange:function(e){d(Object(s.a)(Object(s.a)({},n),{},{CustomerType:e.target.value}))},children:[Object(h.jsx)("option",{value:"-1",children:"Select Customer Type"}),j]})]})}),Object(h.jsx)(l.u,{row:!0,children:Object(h.jsxs)(l.j,{xs:"12",md:"12",children:[Object(h.jsx)(l.z,{children:"Customer Sub Type"}),Object(h.jsx)(l.y,{id:"text-input1",name:"text-input",placeholder:"Customer Sub Type",type:"text",value:n.CustomerSubType,onChange:function(e){d(Object(s.a)(Object(s.a)({},n),{},{CustomerSubType:e.target.value}))}})]})}),n.UpdateButton&&Object(h.jsx)(B,{}),n.AddButton&&Object(h.jsx)(_,{})]})})]})})})})})})}),Object(h.jsx)(l.j,{xs:"12",sm:"12",md:"8",lg:"8",xl:"8",className:"mb-3 mb-xl-0",children:Object(h.jsx)("div",{id:"country-table",children:Object(h.jsx)(l.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(h.jsx)(l.f,{children:Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{children:Object(h.jsxs)(l.e,{children:[Object(h.jsx)(l.i,{children:"Added Customer Sub Type"}),Object(h.jsx)(l.f,{children:Object(h.jsx)(l.m,{items:n.ResponseData,fields:f,hover:!0,striped:!0,bordered:!0,tableFilter:T,itemsPerPageSelect:O,sorter:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Action:function(e){return Object(h.jsxs)("td",{children:[Object(h.jsxs)(l.d,{onClick:function(){var t,o,c;t=e.CUSTOMER_SUBTYPE_PKID,o=e.CUSTOMER_SUBTYPE_NAME,c=e.CUSTOMER_SUBTYPE_TYPE_FKID,console.log(t,o,c),d(Object(s.a)(Object(s.a)({},n),{},{typeSubPkid:t,CustomerType:c,CustomerSubType:o,AddButton:!1,UpdateButton:!0}))},size:"sm",id:"war-btn",children:[Object(h.jsx)(b.a,{}),e.status]}),Object(h.jsxs)(l.d,{size:"sm",onClick:function(){var t;t=e.CUSTOMER_SUBTYPE_PKID,confirm("Are you sure you want to delete")&&(document.getElementById("divLoading").className="show",a()({method:"DELETE",url:m.a+"custsubtype/"+t,headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){1==e.data?(r.a.fire({title:"Customer Sub Type Deleted!",icon:"success",confirmButtonText:"OK"}),E(),document.getElementById("divLoading").className="hide"):(r.a.fire({title:"Customer Sub Type Failed To Deleted!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")})).catch((function(e){console.log(e)})))},id:"war-btn1",children:[Object(h.jsx)(y.a,{}),e.status]})]})}}})})]})})})})})})})]})]})}}}]);
//# sourceMappingURL=59.e8754842.chunk.js.map