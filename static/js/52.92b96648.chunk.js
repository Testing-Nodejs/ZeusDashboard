(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[52],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return d}));var i="https://zeusservices.onrender.com/api/",d="https://zeusservices.onrender.com/"},625:function(e,t,n){},632:function(e,t,n){"use strict";var i=n(634),d=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=d(n(1)),s=(0,i(n(636)).default)(c.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=s},633:function(e,t,n){"use strict";var i=n(634),d=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=d(n(1)),s=(0,i(n(636)).default)(c.createElement("path",{d:"M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteSharp");t.default=s},897:function(e,t,n){"use strict";n.r(t);var i=n(25),d=n(627),c=n(1),s=n.n(c),o=n(628),a=n.n(o),r=n(630),l=n.n(r),u=n(626),p=n(624),m=n(632),j=n.n(m),b=n(633),h=n.n(b),O=(n(625),n(12)),x={placeholder:"Search here...",label:"Search:  "},f={label:"Rows:",values:[5,10,25,50,75,100]},y=[{key:"Action"},{key:"Species"}];t.default=function(){var e=Object(c.useState)({typePkid:"",CustomerType:"",ResponseData:[],AddButton:!0,UpdateButton:!1}),t=Object(d.a)(e,2),n=t[0],o=t[1],r=l.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",l.a.stopTimer),e.addEventListener("mouseleave",l.a.resumeTimer)}}),m=function(){if(""==n.CustomerType||null==n.CustomerType)r.fire({icon:"warning",title:"Enter Speices Title!"});else{document.getElementById("divLoading").className="show";var e={PRODUCT_SPECIES_NAME:n.CustomerType};a.a.post(p.a+"prodspecies",e).then((function(e){"Already Existed!"==e.data?(l.a.fire({title:"Speices Already Exist!",icon:"info",confirmButtonText:"OK"}),v(),o(Object(i.a)(Object(i.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):1==e.data?(l.a.fire({title:"Speices Added Successfully!",icon:"success",confirmButtonText:"OK"}),v(),o(Object(i.a)(Object(i.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):0==e.data&&(l.a.fire({title:"Speices Failed To Add!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}},b=function(){if(""==n.CustomerType||null==n.CustomerType)r.fire({icon:"warning",title:"Enter Speices Title!"});else{document.getElementById("divLoading").className="show";var e={PRODUCT_SPECIES_NAME:n.CustomerType};a.a.put(p.a+"prodspecies/"+n.typePkid,e).then((function(e){!1===e.data?(l.a.fire({title:"Speices Not Updated!",icon:"warning",confirmButtonText:"OK"}),v(),o(Object(i.a)(Object(i.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):(l.a.fire({title:"Speices Updated!",icon:"success",confirmButtonText:"OK"}),o(Object(i.a)(Object(i.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),v(),document.getElementById("divLoading").className="hide")}))}},v=function(){document.getElementById("divLoading").className="show",a()({method:"GET",url:p.a+"prodspecies",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{Species:e.PRODUCT_SPECIES_NAME})}));o(Object(i.a)(Object(i.a)({},n),{},{ResponseData:t,typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},T=function(){return Object(O.jsx)(u.d,{type:"button",onClick:b,size:"md",id:"Add-btn",children:"Update"})},g=function(){return Object(O.jsx)(u.d,{type:"button",onClick:m,size:"md",id:"Add-btn",children:"Add"})};return s.a.useEffect((function(){v()}),[]),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{id:"divLoading",children:" "}),Object(O.jsx)("h1",{id:"ccmaster",children:"Product Species"}),Object(O.jsxs)(u.H,{style:{marginTop:"3%"},children:[Object(O.jsx)(u.j,{xs:"12",sm:"12",md:"4",lg:"4",xl:"4",className:"mb-3 mb-xl-0",children:Object(O.jsx)("div",{id:"country-master",children:Object(O.jsx)(u.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(O.jsx)(u.f,{children:Object(O.jsx)(u.H,{children:Object(O.jsx)(u.j,{children:Object(O.jsxs)(u.e,{children:[Object(O.jsx)(u.i,{children:"Add Product Species"}),Object(O.jsx)(u.f,{children:Object(O.jsxs)(u.t,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(O.jsx)(u.u,{row:!0,children:Object(O.jsxs)(u.j,{xs:"12",md:"12",children:[Object(O.jsx)(u.z,{children:"Species Title"}),Object(O.jsx)(u.y,{id:"text-input1",name:"text-input",placeholder:"Species Title",type:"text",value:n.CustomerType,onChange:function(e){o(Object(i.a)(Object(i.a)({},n),{},{CustomerType:e.target.value}))}})]})}),n.UpdateButton&&Object(O.jsx)(T,{}),n.AddButton&&Object(O.jsx)(g,{})]})})]})})})})})})}),Object(O.jsx)(u.j,{xs:"12",sm:"12",md:"8",lg:"8",xl:"8",className:"mb-3 mb-xl-0",children:Object(O.jsx)("div",{id:"country-table",children:Object(O.jsx)(u.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(O.jsx)(u.f,{children:Object(O.jsx)(u.H,{children:Object(O.jsx)(u.j,{children:Object(O.jsxs)(u.e,{children:[Object(O.jsx)(u.i,{children:"Added Species"}),Object(O.jsx)(u.f,{children:Object(O.jsx)(u.m,{items:n.ResponseData,fields:y,hover:!0,striped:!0,bordered:!0,tableFilter:x,itemsPerPageSelect:f,sorter:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Action:function(e){return Object(O.jsxs)("td",{children:[Object(O.jsxs)(u.d,{onClick:function(){var t,d;t=e.PRODUCT_SPECIES_PKID,d=e.PRODUCT_SPECIES_NAME,o(Object(i.a)(Object(i.a)({},n),{},{typePkid:t,CustomerType:d,AddButton:!1,UpdateButton:!0}))},size:"sm",id:"war-btn",children:[Object(O.jsx)(j.a,{}),e.status]}),Object(O.jsxs)(u.d,{size:"sm",onClick:function(){var t;t=e.PRODUCT_SPECIES_PKID,confirm("Are you sure you want to delete")&&(document.getElementById("divLoading").className="show",a.a.put(p.a+"deleteprodspecies/"+t).then((function(e){1==e.data?(l.a.fire({title:"Speices Deleted!",icon:"warning",confirmButtonText:"OK"}),v(),o(Object(i.a)(Object(i.a)({},n),{},{typePkid:"",CustomerType:"",AddButton:!0,UpdateButton:!1})),document.getElementById("divLoading").className="hide"):(l.a.fire({title:"Failed To Speices!",icon:"info",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")})))},id:"war-btn1",children:[Object(O.jsx)(h.a,{}),e.status]})]})}}})})]})})})})})})})]})]})}}}]);
//# sourceMappingURL=52.92b96648.chunk.js.map