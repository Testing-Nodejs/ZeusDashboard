(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[63],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return s}));var n="https://zeusservices.onrender.com/api/",s="https://zeusservices.onrender.com/"},625:function(e,t,c){},632:function(e,t,c){"use strict";var n=c(634),s=c(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=s(c(1)),i=(0,n(c(636)).default)(r.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=i},633:function(e,t,c){"use strict";var n=c(634),s=c(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=s(c(1)),i=(0,n(c(636)).default)(r.createElement("path",{d:"M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteSharp");t.default=i},852:function(e,t,c){"use strict";c.r(t);var n=c(25),s=c(627),r=c(1),i=c.n(r),d=c(628),O=c.n(d),l=c(626),o=c(630),j=c.n(o),a=c(624),C=c(20),E=c(632),u=c.n(E),h=c(633),b=c.n(h),m=(c(625),c(12)),T={placeholder:"Search here...",label:"Search:  "},_={label:"Rows:",values:[5,10,25,50,75,100]},S=[{key:"Action"},{key:"Customer Name"},{key:"Customer Number"},{key:"GST No"},{key:"Customer Category"},{key:"Customer Type"},{key:"Customer Sub Type"},{key:"Email"},{key:"Alternate Email"},{key:"Contact Number"},{key:"Alternate Number"},{key:"Capacity"},{key:"Unit"},{key:"Superior"},{key:"Country"},{key:"State"},{key:"District"},{key:"Taluk"},{key:"Profile"},{key:"Password"},{key:"Address"},{key:"Documents"},{key:"Contact Persons"}];t.default=function(){var e=Object(r.useState)([]),t=Object(s.a)(e,2),c=t[0],d=t[1],o=Object(r.useState)([]),E=Object(s.a)(o,2),h=E[0],x=E[1],M=Object(r.useState)([]),N=Object(s.a)(M,2),R=N[0],A=N[1],U=Object(r.useState)(!1),y=Object(s.a)(U,2),f=y[0],p=y[1],P=Object(r.useState)(!1),g=Object(s.a)(P,2),v=g[0],L=g[1],I=(j.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",j.a.stopTimer),e.addEventListener("mouseleave",j.a.resumeTimer)}}),function(){document.getElementById("divLoading").className="show",O()({method:"GET",url:a.a+"customer",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e){return Object(n.a)(Object(n.a)({},e),{},{Country:e.COUNTRY_NAME,State:e.STATE_NAME,District:e.DISTRICT_NAME,Taluk:e.TALUK_NAME,"Customer Category":e.CUSTOMER_CATEGORY_NAME,"Customer Type":e.CUSTOMER_TYPE_NAME,"Customer Sub Type":e.CUSTOMER_SUBTYPE_NAME,"Customer Name":e.CUSTOMER_NAME,Email:e.CUSTOMER_EMAIL,"Alternate Email":e.CUSTOMER_EMAIL2,"Contact Number":""==e.CUSTOMER_MOBILE||null==e.CUSTOMER_MOBILE?e.CUSTOMER_MOBILE:"+"+e.CUSTOMER_MOBILE_CODE+" "+e.CUSTOMER_MOBILE,"Alternate Number":null==e.CUSTOMER_ALT_MOBILE||""==e.CUSTOMER_ALT_MOBILE?e.CUSTOMER_ALT_MOBILE:"+"+e.CUSTOMER_ALT_MOBILE_CODE+" "+e.CUSTOMER_ALT_MOBILE,"Customer Number":e.CUSTOMER_NUMBER,Capacity:e.CUSTOMER_CAPACITY,Unit:e.UNIT_NAME,Superior:e.EMPLOYEE_NAME,Password:e.CUSTOMER_PASSWORD,"GST No":e.CUSTOMER_GST_NO})}));d(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))});i.a.useEffect((function(){I()}),[]);var k=Object(C.g)();return Object(m.jsxs)("div",{id:"city",children:[Object(m.jsx)("div",{id:"divLoading",children:" "}),Object(m.jsx)("h1",{id:"ccmaster",children:"View Customers"}),Object(m.jsx)(l.H,{style:{marginTop:"3%"},children:Object(m.jsx)(l.j,{col:"12",children:Object(m.jsx)(l.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(m.jsx)(l.f,{children:Object(m.jsx)(l.H,{children:Object(m.jsx)(l.j,{children:Object(m.jsxs)(l.e,{children:[Object(m.jsx)(l.i,{children:Object(m.jsxs)(l.H,{children:[Object(m.jsx)(l.j,{md:"8",children:"All Customers"}),Object(m.jsx)(l.j,{md:"2",children:Object(m.jsx)(l.d,{size:"sm",color:"primary",onClick:function(){document.getElementById("divLoading").className="show";var e=0,t=new Array;t.push('"Sl No","Customer Name","Customer Number","GST No","Customer Category","Customer Type","Customer Sub Type","Email","Alternate Email","Contact Number","Alternate Number","Capacity","Unit","Superior","Country","State","District","Taluk","Password"');c.map((function(c){return e++,t.push('"'+e+'","'+c.CUSTOMER_NAME+'","'+c.CUSTOMER_NUMBER+'","'+c.CUSTOMER_GST_NO+'","'+c.CUSTOMER_CATEGORY_NAME+'","'+c.CUSTOMER_TYPE_NAME+'","'+c.CUSTOMER_SUBTYPE_NAME+'","'+c.CUSTOMER_EMAIL+'","'+c.CUSTOMER_EMAIL2+'","'+c.CUSTOMER_MOBILE+'","'+c.CUSTOMER_ALT_MOBILE+'","'+c.CUSTOMER_CAPACITY+'","'+c.UNIT_NAME+'","'+c.EMPLOYEE_NAME+'","'+c.COUNTRY_NAME+'","'+c.STATE_NAME+'","'+c.DISTRICT_NAME+'","'+c.TALUK_NAME+'","'+c.CUSTOMER_PASSWORD+'"')}));var n="All Customers.csv",s=t.join("\n"),r=new Blob([s],{type:"text/csv;charset=utf8;"}),i=document.createElement("a");void 0!==i.download?(i.setAttribute("href",window.URL.createObjectURL(r)),i.setAttribute("download",n),i.style="visibility:hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)):navigator.msSaveBlob&&navigator.msSaveBlob(r,n),document.getElementById("divLoading").className="hide"},style:{float:"right"},children:"Export To Excel"})}),Object(m.jsx)(l.j,{md:"2",children:Object(m.jsx)(l.d,{size:"sm",color:"success",onClick:function(){k.push("/Customer")},children:"Add Customer"})})]})}),Object(m.jsx)(l.f,{children:Object(m.jsx)(l.m,{items:c,fields:S,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:T,itemsPerPageSelect:_,columnFilterSlot:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Profile:function(e){var t="";return t=""===e.CUSTOMER_PRFILE||null===e.CUSTOMER_PRFILE?"NoImage.png":e.CUSTOMER_PRFILE,Object(m.jsx)(i.a.Fragment,{children:Object(m.jsx)("td",{children:Object(m.jsx)(l.A,{href:a.b+"/"+t,target:"_blank",children:Object(m.jsx)(l.x,{src:a.b+"/"+t,fluid:!0,className:"mb-2",style:{width:"30%"}})})})})},Documents:function(e){return Object(m.jsx)("td",{children:Object(m.jsx)(l.H,{children:Object(m.jsx)(l.j,{md:"10",children:Object(m.jsx)(l.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.CUSTOMER_PKID,document.getElementById("divLoading").className="show",O()({method:"GET",url:a.a+"customerdocs/"+t,headers:{"content-type":"application/json"}}).then((function(e){x(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),L(!v)},children:"View"})})})})},"Contact Persons":function(e){return Object(m.jsx)("td",{children:Object(m.jsx)(l.H,{children:Object(m.jsx)(l.j,{md:"10",children:Object(m.jsx)(l.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.CUSTOMER_PKID,document.getElementById("divLoading").className="show",O()({method:"GET",url:a.a+"customercontactpersons/"+t,headers:{"content-type":"application/json"}}).then((function(e){A(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),p(!f)},children:"View"})})})})},Action:function(e){return Object(m.jsxs)("td",{children:[Object(m.jsxs)(l.d,{onClick:function(){return k.push("/EditCustomer",{data:e})},size:"sm",id:"war-btn",children:[Object(m.jsx)(u.a,{}),e.status]}),Object(m.jsxs)(l.d,{onClick:function(){var t;t=e.CUSTOMER_PKID,confirm("Are you sure you want to delete")&&(document.getElementById("divLoading").className="show",O.a.put(a.a+"customer/"+t).then((function(e){!0===e.data?(j.a.fire({title:"Customer Deleted Successfully!",icon:"success",confirmButtonText:"OK"}),I(),document.getElementById("divLoading").className="hide"):(j.a.fire({title:"Failed To Delete Customer!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")})))},size:"sm",id:"war-btn1",children:[Object(m.jsx)(b.a,{}),e.status]})]})},Address:function(e){return Object(m.jsx)("td",{children:Object(m.jsx)(l.H,{children:Object(m.jsx)(l.j,{md:"10",children:Object(m.jsx)(l.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){return k.push("/AddCustomerAddress",{data:e})},children:"Manage"})})})})}}})})]})})})})})})}),Object(m.jsxs)(l.B,{show:f,onClose:function(){return p(!f)},color:"dark",children:[Object(m.jsx)(l.E,{closeButton:!0,children:Object(m.jsx)(l.F,{children:"Contact Persons Info"})}),Object(m.jsx)(l.C,{children:Object(m.jsx)(l.H,{children:R.map((function(e){return Object(m.jsxs)(i.a.Fragment,{children:[Object(m.jsxs)(l.j,{md:"12",children:[Object(m.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"First Contact People"}),Object(m.jsxs)("table",{id:"ModelTable",children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Name"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:e.CUSTOMER_CONTACT_PERSON_NAME})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Email"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:e.CUSTOMER_CONTACT_PERSON_EMAIL})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Alternate Email"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:e.CUSTOMER_CONTACT_PERSON_EMAIL2})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Contact Number"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:""==e.CUSTOMER_CONTACT_PERSON_PHO||null==e.CUSTOMER_CONTACT_PERSON_PHO?e.CUSTOMER_CONTACT_PERSON_PHO:"+"+e.CUSTOMER_CONTACT_PERSON_PHO_CODE+" "+e.CUSTOMER_CONTACT_PERSON_PHO})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Alternate Number"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:null==e.CUSTOMER_CONTACT_PERSON_PHO2||""==e.CUSTOMER_CONTACT_PERSON_PHO2?e.CUSTOMER_CONTACT_PERSON_PHO2:"+"+e.CUSTOMER_CONTACT_PERSON_PHO2_CODE+" "+e.CUSTOMER_CONTACT_PERSON_PHO2})]})]})]}),Object(m.jsxs)(l.j,{md:"12",style:{marginTop:"5%"},children:[Object(m.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Second Contact People"}),Object(m.jsxs)("table",{id:"ModelTable",children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Name"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:e.CUSTOMER_CONTACT_SEC_PERSON_NAME})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Email"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:e.CUSTOMER_CONTACT_SEC_PERSON_EMAIL})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Alternate Email"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:e.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Contact Number"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:null==e.CUSTOMER_CONTACT_SEC_PERSON_PHO||""==e.CUSTOMER_CONTACT_SEC_PERSON_PHO?e.CUSTOMER_CONTACT_SEC_PERSON_PHO:"+"+e.CUSTOMER_CONTACT_SEC_PERSON_PHO_CODE+" "+e.CUSTOMER_CONTACT_SEC_PERSON_PHO})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("th",{children:"Alternate Number"}),Object(m.jsx)("th",{children:":"}),Object(m.jsx)("td",{children:null==e.CUSTOMER_CONTACT_SEC_PERSON_PHO2||""==e.CUSTOMER_CONTACT_SEC_PERSON_PHO2?e.CUSTOMER_CONTACT_SEC_PERSON_PHO2:"+"+e.CUSTOMER_CONTACT_SEC_PERSON_PHO2_CODE+" "+e.CUSTOMER_CONTACT_SEC_PERSON_PHO2})]})]})]})]})}))})}),Object(m.jsx)(l.D,{children:Object(m.jsx)(l.d,{color:"secondary",onClick:function(){return p(!f)},children:"Close"})})]}),Object(m.jsxs)(l.B,{show:v,onClose:function(){return L(!v)},color:"dark",children:[Object(m.jsx)(l.E,{closeButton:!0,children:Object(m.jsx)(l.F,{children:"Uploaded Documents"})}),Object(m.jsx)(l.C,{children:Object(m.jsx)(l.H,{children:h.map((function(e){return Object(m.jsxs)(i.a.Fragment,{children:[Object(m.jsx)(l.j,{md:"3",children:Object(m.jsx)(l.x,{src:a.b+"/"+e.CUSTOMER_DOC1,fluid:!0,className:"mb-2",style:{width:"100%"}})}),Object(m.jsx)(l.j,{md:"3",children:Object(m.jsx)(l.x,{src:a.b+"/"+e.CUSTOMER_DOC2,fluid:!0,className:"mb-2",style:{width:"100%"}})}),Object(m.jsx)(l.j,{md:"3",children:Object(m.jsx)(l.x,{src:a.b+"/"+e.CUSTOMER_DOC3,fluid:!0,className:"mb-2",style:{width:"100%"}})}),Object(m.jsx)(l.j,{md:"3",children:Object(m.jsx)(l.x,{src:a.b+"/"+e.CUSTOMER_DOC4,fluid:!0,className:"mb-2",style:{width:"100%"}})}),Object(m.jsx)(l.j,{md:"3",children:Object(m.jsx)(l.x,{src:a.b+"/"+e.CUSTOMER_DOC5,fluid:!0,className:"mb-2",style:{width:"100%"}})}),Object(m.jsx)(l.j,{md:"3",children:Object(m.jsx)(l.x,{src:a.b+"/"+e.CUSTOMER_DOC6,fluid:!0,className:"mb-2",style:{width:"100%"}})})]})}))})}),Object(m.jsx)(l.D,{children:Object(m.jsx)(l.d,{color:"secondary",onClick:function(){return L(!v)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=63.ae3c5c87.chunk.js.map