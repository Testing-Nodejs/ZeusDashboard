(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[106],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return r}));var n="https://zeusservices.onrender.com/api/",r="https://zeusservices.onrender.com/"},625:function(e,t,c){},629:function(e,t,c){"use strict";function n(e){var t=e.date,c=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(c.getDate().toString().padStart(2,"0"),"-").concat((c.getMonth()+1).toString().padStart(2,"0"),"-").concat(c.getFullYear())}c.d(t,"a",(function(){return n}))},809:function(e,t,c){"use strict";c.r(t);var n=c(25),r=c(627),i=c(1),s=c.n(i),o=c(628),d=c.n(o),j=c(626),l=c(624),a=c(20),O=c(629),b=(c(625),c(12)),E={placeholder:"Search here...",label:"Search:  "},h={label:"Rows:",values:[5,10,25,50,75,100]},u=[{key:"Report"},{key:"Leave"},{key:"Tour Plan"},{key:"Employee Type"},{key:"Sub Type"},{key:"HQ"},{key:"Company"},{key:"Name"},{key:"Email"},{key:"Alt Email"},{key:"Contact Number"},{key:"Alternate Number"},{key:"Designation"},{key:"Qualification"},{key:"Joining Date"},{key:"Date Of Birth"},{key:"Region"},{key:"Gender"},{key:"Reporting To"},{key:"Password"},{key:"Profile"},{key:"Is Manager"},{key:"Salary"},{key:"Releaving Date"},{key:"Address"},{key:"Uploaded Docs"},{key:"Covered Area"},{key:"Other Covered Area"}],x=[{key:"Country"},{key:"State"},{key:"City"},{key:"Area"}];t.default=function(e){var t=e.location.state.data.CompanyID,c=e.location.state.data.CompanyName,o=Object(i.useState)([]),m=Object(r.a)(o,2),p=m[0],y=m[1],f=Object(i.useState)([]),A=Object(r.a)(f,2),P=A[0],_=A[1],C=Object(i.useState)([]),k=Object(r.a)(C,2),S=k[0],g=k[1],L=Object(i.useState)([]),M=Object(r.a)(L,2),D=M[0],Y=M[1],T=Object(i.useState)([]),N=Object(r.a)(T,2),v=N[0],R=N[1],I=Object(i.useState)(!1),w=Object(r.a)(I,2),F=w[0],B=w[1],H=Object(i.useState)(!1),G=Object(r.a)(H,2),z=G[0],V=G[1],U=Object(i.useState)(!1),Q=Object(r.a)(U,2),J=Q[0],K=Q[1],W=Object(i.useState)(!1),Z=Object(r.a)(W,2),q=Z[0],X=Z[1];s.a.useEffect((function(){d()({method:"GET",url:l.a+"getAllEmpsByCompId/"+t,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(n.a)(Object(n.a)({},e),{},{"Employee Type":e.EMPLOYEE_TYPE_NAME,"Sub Type":e.EMPLOYEE_SUB_TYPE_NAME,HQ:e.HQ_NAME,Company:e.COMPANY_NAME,Name:e.EMPLOYEE_NAME,Email:e.EMPLOYEE_EMAIL,"Alt Email":e.EMPLOYEE_ALT_EMAIL,"Contact Number":e.EMPLOYEE_CONTACT,"Alternate Number":e.EMPLOYEE_ALT_CONTACT,Designation:e.EMPLOYEE_DESIGNATION,Qualification:e.EMPLOYEE_QUALIFICATION,Region:e.EMPLOYEE_REGION,Gender:e.EMPLOYEE_GENDER,"Reporting To":e.ReportingManager,Password:e.EMPLOYEE_PASSWORD,"Is Manager":e.ManagerType,Salary:e.EMPLOYEE_SALARY})}));y(t)})).catch((function(e){console.log(e)}))}),[]);var $=Object(a.g)();return Object(b.jsxs)("div",{id:"city",children:[Object(b.jsxs)("h1",{id:"ccmaster",children:["Employees From ",c]}),Object(b.jsx)("br",{}),Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{col:"12",children:Object(b.jsx)(j.e,{id:"city-table",children:Object(b.jsxs)(j.f,{children:[Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"1",children:Object(b.jsx)(j.d,{color:"danger",size:"sm",onClick:function(){return $.goBack()},children:"Back"})})}),Object(b.jsx)("br",{}),Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{children:Object(b.jsxs)(j.e,{children:[Object(b.jsx)(j.i,{children:"Employees List"}),Object(b.jsx)(j.f,{children:Object(b.jsx)(j.m,{items:p,fields:u,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:E,itemsPerPageSelect:h,columnFilterSlot:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Leave:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.d,{onClick:function(){return $.push("/EmployeeAllLeaves",{data:e})},children:e.LeaveCount})})},Profile:function(e){var t="";return t=""===e.EMPLOYEE_PROFILE||null===e.EMPLOYEE_PROFILE?"NoImage.png":e.EMPLOYEE_PROFILE,Object(b.jsx)(s.a.Fragment,{children:Object(b.jsx)("td",{children:Object(b.jsx)(j.A,{href:l.b+"/"+t,target:"_blank",children:Object(b.jsx)(j.x,{src:l.b+"/"+t,fluid:!0,className:"mb-2",style:{width:"100%"}})})})})},"Date Of Birth":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(O.a,{date:e.EMPLOYEE_DOB})})},"Joining Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(O.a,{date:e.EMPLOYEE_DOJ})})},"Releaving Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(O.a,{date:e.EMPLOYEE_DOR})})},Address:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"10",children:Object(b.jsx)(j.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.EMPLOYEE_PKID,console.log(t),d()({method:"GET",url:l.a+"GetEmployeeAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){R(e.data)})).catch((function(e){console.log(e)})),V(!z)},children:"View"})})})})},"Uploaded Docs":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"10",children:Object(b.jsx)(j.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.EMPLOYEE_PKID,d()({method:"GET",url:l.a+"GetEmployeeOtherDocs/"+t,headers:{"content-type":"application/json"}}).then((function(e){Y(e.data)})).catch((function(e){console.log(e)})),X(!q)},children:"View"})})})})},"Covered Area":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"10",children:Object(b.jsx)(j.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.EMPLOYEE_PKID,d()({method:"GET",url:l.a+"GetEmployeeCoveredAreas/"+t,headers:{"content-type":"application/json"}}).then((function(e){_(e.data)})).catch((function(e){console.log(e)})),K(!J)},children:"View"})})})})},"Other Covered Area":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"10",children:Object(b.jsx)(j.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.EMPLOYEE_PKID,d()({method:"GET",url:l.a+"GetEmployeeOtherCoveredAreas/"+t,headers:{"content-type":"application/json"}}).then((function(e){g(e.data)})).catch((function(e){console.log(e)})),B(!F)},children:"View"})})})})},Report:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"10",children:Object(b.jsx)("button",{type:"button",class:"btn btn-dark rounded-pill",style:{marginLeft:"25px"},onClick:function(){$.push("/ViewEmployeeAttendance",{data:e})},children:"View"})})})})},"Tour Plan":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"10",children:Object(b.jsx)("button",{type:"button",class:"btn btn-dark rounded-pill",style:{marginLeft:"25px"},onClick:function(){$.push("/ViewEmployeeTourPlan",{data:e})},children:"View"})})})})}}})})]})})})]})})})}),Object(b.jsxs)(j.B,{show:z,onClose:function(){return V(!z)},color:"dark",children:[Object(b.jsx)(j.E,{closeButton:!0,children:Object(b.jsx)(j.F,{children:"Employee Address"})}),Object(b.jsx)(j.C,{children:Object(b.jsx)(j.H,{children:v.map((function(e){return Object(b.jsxs)(s.a.Fragment,{children:[Object(b.jsxs)(j.j,{md:"6",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Permanent Address"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ADDRESS1})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ADDRESS2})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ADDRESS3})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ADDRESS_ZIP})})]})]}),Object(b.jsxs)(j.j,{md:"6",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Correspondence Address"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ALT_ADDRESS1})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ALT_ADDRESS2})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ALT_ADDRESS3})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.EMPLOYEE_ALT_ADDRESS_ZIP})})]})]})]})}))})}),Object(b.jsx)(j.D,{children:Object(b.jsx)(j.d,{color:"secondary",onClick:function(){return V(!z)},children:"Close"})})]}),Object(b.jsxs)(j.B,{show:J,onClose:function(){return K(!J)},color:"dark",children:[Object(b.jsx)(j.E,{closeButton:!0,children:Object(b.jsx)(j.F,{children:"Employee Covered Areas"})}),Object(b.jsx)(j.C,{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"12",children:Object(b.jsx)(j.m,{items:P,fields:x,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:E,itemsPerPageSelect:h,columnFilterSlot:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Country:function(e){return Object(b.jsx)("td",{children:e.COUNTRY_NAME})},State:function(e){return Object(b.jsx)("td",{children:e.STATE_NAME})},City:function(e){return Object(b.jsx)("td",{children:e.CITY_NAME})},Area:function(e){return Object(b.jsx)("td",{children:e.AREA_NAME})}}})})})}),Object(b.jsx)(j.D,{children:Object(b.jsx)(j.d,{color:"secondary",onClick:function(){return K(!J)},children:"Close"})})]}),Object(b.jsxs)(j.B,{show:F,onClose:function(){return B(!F)},color:"dark",children:[Object(b.jsx)(j.E,{closeButton:!0,children:Object(b.jsx)(j.F,{children:"Employee Other Covered Areas"})}),Object(b.jsx)(j.C,{children:Object(b.jsx)(j.H,{children:Object(b.jsx)(j.j,{md:"12",children:Object(b.jsx)(j.m,{items:S,fields:x,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:E,itemsPerPageSelect:h,columnFilterSlot:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Country:function(e){return Object(b.jsx)("td",{children:e.COUNTRY_NAME})},State:function(e){return Object(b.jsx)("td",{children:e.STATE_NAME})},City:function(e){return Object(b.jsx)("td",{children:e.CITY_NAME})},Area:function(e){return Object(b.jsx)("td",{children:e.AREA_NAME})}}})})})}),Object(b.jsx)(j.D,{children:Object(b.jsx)(j.d,{color:"secondary",onClick:function(){return B(!F)},children:"Close"})})]}),Object(b.jsxs)(j.B,{show:q,onClose:function(){return X(!q)},color:"dark",children:[Object(b.jsx)(j.E,{closeButton:!0,children:Object(b.jsx)(j.F,{children:"Other Uploaded Documents"})}),Object(b.jsx)(j.C,{children:Object(b.jsx)(j.H,{children:D.map((function(e){return Object(b.jsx)(j.j,{md:"3",children:Object(b.jsx)(j.x,{src:l.b+"/"+e.EMPLOYEE_DOCS_FILE,fluid:!0,className:"mb-2",style:{width:"100%"}})})}))})}),Object(b.jsx)(j.D,{children:Object(b.jsx)(j.d,{color:"secondary",onClick:function(){return X(!q)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=106.2f2ca48c.chunk.js.map