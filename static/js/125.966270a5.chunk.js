(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[125],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return s})),c.d(t,"b",(function(){return n}));var s="https://zeusservices.onrender.com/api/",n="https://zeusservices.onrender.com/"},625:function(e,t,c){},841:function(e,t,c){"use strict";c.r(t);var s=c(25),n=c(627),j=c(1),i=c.n(j),r=c(628),a=c.n(r),l=c(626),d=c(20),o=c(624),O=c(630),h=c.n(O),E=(c(625),c(12)),x={placeholder:"Search here...",label:"Search:  "},b={label:"Rows:",values:[5,10,25,50,75,100]},p=[{key:"Sl No"},{key:"Name"},{key:"Document"}];t.default=function(e){var t=e.location.state.data.EMPLOYEE_EXPENSES_DATE,c=e.location.state.data.EMPLOYEE_EXPENSES_TRAVEL_FROM,r=e.location.state.data.EMPLOYEE_EXPENSES_TRAVEL_TO,O=e.location.state.data.COMPANY_NAME,m=e.location.state.data.EMPLOYEE_NAME,u=e.location.state.data.EMPLOYEE_CONTACT,N=e.location.state.data.EMPLOYEE_EXPENSES_DISTANCE,_=e.location.state.data.EMPLOYEE_EXPENSES_MODE,f=e.location.state.data.EMPLOYEE_EXPENSES_DAILY_ALLOWANCE,S=e.location.state.data.EMPLOYEE_EXPENSES_TOTAL,P=e.location.state.data.EMPLOYEE_EXPENSES_PKID,T=e.location.state.data.EMPLOYEE_EXPENSES_STATUS,L=Object(j.useState)([]),M=Object(n.a)(L,2),A=M[0],D=M[1],y=(h.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",h.a.stopTimer),e.addEventListener("mouseleave",h.a.resumeTimer)}}),function(){a.a.put(o.a+"AcceptEmpExpenses/"+P).then((function(e){!0===e.data?(h.a.fire({title:"Employee Expenses Accepted!",icon:"success",confirmButtonText:"OK"}),v.push("/EmployeeExpenses")):(h.a.fire({title:"Failed To Confirm Employee Expenses!",icon:"error",confirmButtonText:"OK"}),v.push("/EmployeeExpenses"))}))}),Y=function(){a.a.put(o.a+"RejectEmpExpenses/"+P).then((function(e){!0===e.data?h.a.fire({title:"Employee Expenses Denied!",icon:"success",confirmButtonText:"OK"}):h.a.fire({title:"Failed To Deny Employee Expenses!",icon:"error",confirmButtonText:"OK"})}))};i.a.useEffect((function(){a()({method:"GET",url:o.a+"GetExpensesDocument/"+P,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(s.a)(Object(s.a)({},e),{},{Name:e.EMPLOYEE_EXPENSES_DOC_NAME,"Sl No":t+1})}));D(t)})).catch((function(e){console.log(e)}))}),[]);var v=Object(d.g)();return Object(E.jsxs)("div",{children:[Object(E.jsx)("h1",{id:"ccmaster",children:"Expenses Documents"}),Object(E.jsxs)(l.H,{style:{marginTop:"3%"},children:[Object(E.jsx)(l.j,{md:"2"}),Object(E.jsx)(l.j,{md:"12",children:Object(E.jsx)(l.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(E.jsxs)(l.f,{children:[Object(E.jsx)(l.H,{children:Object(E.jsx)(l.j,{md:"1",children:Object(E.jsx)(l.d,{color:"danger",size:"sm",onClick:function(){return v.goBack()},children:"Back"})})}),Object(E.jsx)("br",{}),Object(E.jsx)(l.H,{children:Object(E.jsx)(l.j,{children:Object(E.jsxs)(l.e,{children:[Object(E.jsx)(l.i,{children:Object(E.jsxs)(l.H,{children:[Object(E.jsx)(l.j,{md:"10",children:"Expenses Details"}),"0"===T||0===T?Object(E.jsxs)(i.a.Fragment,{children:[Object(E.jsx)(l.j,{md:"1",children:Object(E.jsx)(l.d,{color:"primary",size:"sm",onClick:function(){y()},children:"Accept"})}),Object(E.jsx)(l.j,{md:"1",children:Object(E.jsx)(l.d,{color:"danger",size:"sm",onClick:function(){Y()},children:"Deny"})})]}):Object(E.jsx)(l.j,{md:"2"})]})}),Object(E.jsxs)(l.f,{children:[Object(E.jsx)(l.H,{children:Object(E.jsx)(l.j,{md:"12",children:Object(E.jsx)("table",{style:{width:"100%"},id:"customerDetails",children:Object(E.jsxs)("tr",{children:[Object(E.jsxs)("td",{children:[Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Employee Company :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:O})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Employee Name :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:m})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Contact Number :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:u})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Date :"})}),Object(E.jsx)("td",{children:Object(E.jsxs)("p",{className:"p2",children:[" ",t]})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Travel From :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:c})})]})]}),Object(E.jsxs)("td",{children:[Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Travel To :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:r})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Distance :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:N})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Mode :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:_})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Daily Allowance :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:f})})]}),Object(E.jsxs)("tr",{children:[Object(E.jsx)("th",{children:Object(E.jsx)("p",{className:"p1",children:"Total Amount :"})}),Object(E.jsx)("td",{children:Object(E.jsx)("p",{className:"p2",children:S})})]})]})]})})})}),Object(E.jsx)("hr",{}),Object(E.jsx)(l.H,{children:Object(E.jsx)(l.j,{md:"4",children:Object(E.jsx)("h4",{className:"p1",children:"Expenses Documents"})})}),Object(E.jsx)("br",{}),Object(E.jsx)(l.m,{items:A,fields:p,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:x,itemsPerPage:10,pagination:!0,size:"sm",itemsPerPageSelect:b,scopedSlots:{Document:function(e){return Object(E.jsx)("td",{children:Object(E.jsx)(l.A,{href:o.b+"/"+e.EMPLOYEE_EXPENSES_DOC_FILENAME,target:"_blank",children:e.EMPLOYEE_EXPENSES_DOC_FILENAME})})}}})]})]})})})]})})}),Object(E.jsx)(l.j,{md:"2"})]})]})}}}]);
//# sourceMappingURL=125.966270a5.chunk.js.map