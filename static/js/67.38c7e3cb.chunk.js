(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[67],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return i}));var d="https://zeusservices.onrender.com/api/",i="https://zeusservices.onrender.com/"},625:function(e,t,n){},632:function(e,t,n){"use strict";var d=n(634),i=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=i(n(1)),r=(0,d(n(636)).default)(c.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=r},633:function(e,t,n){"use strict";var d=n(634),i=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=i(n(1)),r=(0,d(n(636)).default)(c.createElement("path",{d:"M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteSharp");t.default=r},860:function(e,t,n){"use strict";n.r(t);var d=n(25),i=n(627),c=n(1),r=n.n(c),s=n(628),a=n.n(s),o=n(630),l=n.n(o),u=n(626),m=n(624),p=n(632),j=n.n(p),O=n(633),h=n.n(O),b=(n(625),n(12)),y={placeholder:"Search here...",label:"Search:  "},x={label:"Rows:",values:[5,10,25,50,75,100]},f=[{key:"Action"},{key:"Order Type"}];t.default=function(){var e=Object(c.useState)({typePkid:"",CustomerType:"",ResponseData:[],AddButton:!0,UpdateButton:!1}),t=Object(i.a)(e,2),n=t[0],s=t[1],o=l.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",l.a.stopTimer),e.addEventListener("mouseleave",l.a.resumeTimer)}}),p=function(){if(""==n.CustomerType||null==n.CustomerType)o.fire({icon:"warning",title:"Enter Order Type!"});else{document.getElementById("divLoading").className="show";var e={ORDER_TYPE_NAME:n.CustomerType};a.a.post(m.a+"OrderTypes",e).then((function(e){"Already Existed!"==e.data?(l.a.fire({title:"Order Type Already Exist!",icon:"info",confirmButtonText:"OK"}),T(),s(Object(d.a)(Object(d.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):1==e.data?(l.a.fire({title:"Order Type Added Successfully!",icon:"success",confirmButtonText:"OK"}),T(),s(Object(d.a)(Object(d.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):0==e.data&&(l.a.fire({title:"Order Type Failed To Add!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}},O=function(){if(""==n.CustomerType||null==n.CustomerType)o.fire({icon:"warning",title:"Enter Order Type!"});else{document.getElementById("divLoading").className="show";var e={ORDER_TYPE_NAME:n.CustomerType};a.a.put(m.a+"OrderTypes/"+n.typePkid,e).then((function(e){!1===e.data?(l.a.fire({title:"Order Type Not Updated!",icon:"warning",confirmButtonText:"OK"}),T(),s(Object(d.a)(Object(d.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):(l.a.fire({title:"Order Type Updated!",icon:"success",confirmButtonText:"OK"}),s(Object(d.a)(Object(d.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),T(),document.getElementById("divLoading").className="hide")}))}},T=function(){document.getElementById("divLoading").className="show",a()({method:"GET",url:m.a+"OrderTypes",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e){return Object(d.a)(Object(d.a)({},e),{},{"Order Type":e.ORDER_TYPE_NAME})}));s(Object(d.a)(Object(d.a)({},n),{},{ResponseData:t,typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},v=function(){return Object(b.jsx)(u.d,{type:"button",onClick:O,size:"md",id:"Add-btn",children:"Update"})},E=function(){return Object(b.jsx)(u.d,{type:"button",onClick:p,size:"md",id:"Add-btn",children:"Add"})};return r.a.useEffect((function(){T()}),[]),Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{id:"divLoading",children:" "}),Object(b.jsx)("h1",{id:"ccmaster",children:"Order Type"}),Object(b.jsxs)(u.H,{style:{marginTop:"3%"},children:[Object(b.jsx)(u.j,{xs:"12",sm:"12",md:"4",lg:"4",xl:"4",className:"mb-3 mb-xl-0",children:Object(b.jsx)("div",{id:"country-master",children:Object(b.jsx)(u.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(b.jsx)(u.f,{children:Object(b.jsx)(u.H,{children:Object(b.jsx)(u.j,{children:Object(b.jsxs)(u.e,{children:[Object(b.jsx)(u.i,{children:"Add Order Type"}),Object(b.jsx)(u.f,{children:Object(b.jsxs)(u.t,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(b.jsx)(u.u,{row:!0,children:Object(b.jsxs)(u.j,{xs:"12",md:"12",children:[Object(b.jsx)(u.z,{children:"Order Type"}),Object(b.jsx)(u.y,{id:"text-input1",name:"text-input",placeholder:"Order Type",type:"text",value:n.CustomerType,onChange:function(e){s(Object(d.a)(Object(d.a)({},n),{},{CustomerType:e.target.value}))}})]})}),n.UpdateButton&&Object(b.jsx)(v,{}),n.AddButton&&Object(b.jsx)(E,{})]})})]})})})})})})}),Object(b.jsx)(u.j,{xs:"12",sm:"12",md:"8",lg:"8",xl:"8",className:"mb-3 mb-xl-0",children:Object(b.jsx)("div",{id:"country-table",children:Object(b.jsx)(u.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(b.jsx)(u.f,{children:Object(b.jsx)(u.H,{children:Object(b.jsx)(u.j,{children:Object(b.jsxs)(u.e,{children:[Object(b.jsx)(u.i,{children:"Added Order Type"}),Object(b.jsx)(u.f,{children:Object(b.jsx)(u.m,{items:n.ResponseData,fields:f,hover:!0,striped:!0,bordered:!0,tableFilter:y,itemsPerPageSelect:x,sorter:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Action:function(e){return Object(b.jsxs)("td",{children:[Object(b.jsxs)(u.d,{onClick:function(){var t,i;t=e.ORDER_TYPE_PKID,i=e.ORDER_TYPE_NAME,s(Object(d.a)(Object(d.a)({},n),{},{typePkid:t,CustomerType:i,AddButton:!1,UpdateButton:!0}))},size:"sm",id:"war-btn",children:[Object(b.jsx)(j.a,{}),e.status]}),Object(b.jsxs)(u.d,{size:"sm",onClick:function(){var t;t=e.ORDER_TYPE_PKID,confirm("Are you sure you want to delete")&&(document.getElementById("divLoading").className="show",a()({method:"DELETE",url:m.a+"OrderTypes/"+t,headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){!0===e.data?(l.a.fire({title:"Order Type Type Deleted!",icon:"success",confirmButtonText:"OK"}),T(),document.getElementById("divLoading").className="hide"):(l.a.fire({title:"Order Type Failed To Deleted!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")})).catch((function(e){console.log(e)})))},id:"war-btn1",children:[Object(b.jsx)(h.a,{}),e.status]})]})}}})})]})})})})})})})]})]})}}}]);
//# sourceMappingURL=67.38c7e3cb.chunk.js.map