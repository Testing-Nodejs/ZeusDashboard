(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[137],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return i}));var n="https://zeusservices.onrender.com/api/",i="https://zeusservices.onrender.com/"},625:function(e,t,c){},883:function(e,t,c){"use strict";c.r(t);var n=c(25),i=c(627),s=c(1),r=c.n(s),o=c(628),a=c.n(o),d=c(626),l=c(624),j=c(20),m=(c(625),c(12)),u={placeholder:"Search here...",label:"Search:  "},p={label:"Rows:",values:[5,10,25,50,75,100]},h=[{key:"Employee Type"},{key:"Sub Type"},{key:"HQ"},{key:"Company"},{key:"Name"},{key:"Email"},{key:"Contact Number"},{key:"Attendance"}];t.default=function(){var e=Object(s.useState)([]),t=Object(i.a)(e,2),c=t[0],o=t[1];r.a.useEffect((function(){document.getElementById("divLoading").className="show",a()({method:"GET",url:l.a+"emps",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(n.a)(Object(n.a)({},e),{},{"Employee Type":e.EMPLOYEE_TYPE_NAME,"Sub Type":e.EMPLOYEE_SUB_TYPE_NAME,HQ:e.HQ_NAME,Company:e.COMPANY_NAME,Name:e.EMPLOYEE_NAME,Email:e.EMPLOYEE_EMAIL,"Contact Number":e.EMPLOYEE_CONTACT})}));o(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]);var E=Object(j.g)();return Object(m.jsxs)("div",{id:"city",children:[Object(m.jsx)("div",{id:"divLoading",children:" "}),Object(m.jsx)("h1",{id:"ccmaster",children:"View Employees"}),Object(m.jsx)(d.H,{style:{marginTop:"3%"},children:Object(m.jsx)(d.j,{col:"12",children:Object(m.jsx)(d.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(m.jsx)(d.f,{children:Object(m.jsx)(d.H,{children:Object(m.jsx)(d.j,{children:Object(m.jsxs)(d.e,{children:[Object(m.jsx)(d.i,{children:"All Employees"}),Object(m.jsx)(d.f,{children:Object(m.jsx)(d.m,{items:c,fields:h,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:u,itemsPerPageSelect:p,columnFilterSlot:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Attendance:function(e){return Object(m.jsx)("td",{children:Object(m.jsx)(d.H,{children:Object(m.jsx)(d.j,{md:"8",children:Object(m.jsx)(d.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){E.push("/ViewEmployeeAttendance",{data:e})},children:"View"})})})})}}})})]})})})})})})})]})}}}]);
//# sourceMappingURL=137.e64fb513.chunk.js.map