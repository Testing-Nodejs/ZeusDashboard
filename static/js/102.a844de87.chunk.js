(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[102],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return i}));var n="https://zeusservices.onrender.com/api/",i="https://zeusservices.onrender.com/"},625:function(e,t,c){},629:function(e,t,c){"use strict";function n(e){var t=e.date,c=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(c.getDate().toString().padStart(2,"0"),"-").concat((c.getMonth()+1).toString().padStart(2,"0"),"-").concat(c.getFullYear())}c.d(t,"a",(function(){return n}))},884:function(e,t,c){"use strict";c.r(t);var n=c(627),i=c(1),s=c.n(i),d=c(628),r=c.n(d),a=c(626),o=c(20),j=c(624),l=c(629),h=(c(625),c(630)),b=c.n(h),O=c(12);t.default=function(e){var t=e.location.state.data.EMPLOYEE_TYPE_NAME,c=e.location.state.data.EMPLOYEE_SUB_TYPE_NAME,d=e.location.state.data.HQ_NAME,h=e.location.state.data.COMPANY_NAME,x=e.location.state.data.EMPLOYEE_NAME,u=e.location.state.data.EMPLOYEE_EMAIL,m=e.location.state.data.EMPLOYEE_CONTACT,p=e.location.state.data.EMPLOYEE_DOJ,g=e.location.state.data.EMPLOYEE_PKID,L=e.location.state.data,E=Object(i.useState)([]),y=Object(n.a)(E,2),v=y[0],f=y[1],T=Object(i.useState)(),S=Object(n.a)(T,2),A=S[0],D=S[1],w=Object(i.useState)(),C=Object(n.a)(w,2),N=C[0],M=C[1],k=Object(i.useState)(),_=Object(n.a)(k,2),P=_[0],B=_[1],Y=b.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",b.a.stopTimer),e.addEventListener("mouseleave",b.a.resumeTimer)}});s.a.useEffect((function(){!function(){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"getAllEmployeeAttendence/"+g,headers:{"content-type":"application/json"}}).then((function(e){f(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}));var e=new Date;B(["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]+" "+e.getFullYear())}()}),[]);var I=Object(o.g)();return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{id:"divLoading",children:" "}),Object(O.jsx)("h1",{id:"ccmaster",children:"Employee Attendance"}),Object(O.jsxs)(a.H,{style:{marginTop:"3%"},children:[Object(O.jsx)(a.j,{md:"2"}),Object(O.jsx)(a.j,{md:"12",children:Object(O.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(O.jsxs)(a.f,{children:[Object(O.jsx)(a.H,{children:Object(O.jsx)(a.j,{md:"1",children:Object(O.jsx)(a.d,{color:"danger",size:"sm",onClick:function(){return I.goBack()},children:"Back"})})}),Object(O.jsx)("br",{}),Object(O.jsx)(a.H,{children:Object(O.jsxs)(a.j,{children:[Object(O.jsxs)(a.e,{children:[Object(O.jsx)(a.i,{children:Object(O.jsxs)(a.H,{children:[Object(O.jsx)(a.j,{col:"6",children:"Employee Details"}),Object(O.jsx)(a.j,{col:"6",children:Object(O.jsx)(a.d,{onClick:function(){document.getElementById("divLoading").className="show";var e=0,n=new Array;n.push('"Sl No","Employee Type","Employee Sub Type","HQ","Company","Employee Name","Employee Email","Contact Number","Date","Week Name","Attendance","Login Time","Login Latitude","Login Longitude","Total Orders","Visited Customers","Logout Time","Logout Latitude","Logout Longitude"');var i="";v.map((function(s){"0"===s.AttStatus?i="Absent":"1"===s.AttStatus?i="Present":"2"===s.AttStatus&&(i="Leave");var r=new Date(new Date(s.MDate).toISOString().split("T")[0]),a="".concat(r.getDate().toString().padStart(2,"0"),"-").concat((r.getMonth()+1).toString().padStart(2,"0"),"-").concat(r.getFullYear());return e++,n.push('"'+e+'","'+t+'","'+c+'","'+d+'","'+h+'","'+x+'","'+u+'","'+m+'","'+a+'","'+s.WeekName+'","'+i+'","'+s.LoginTime+'","'+s.LoginLat+'","'+s.LoginLong+'","'+s.TotalOrders+'","'+s.VisitedCustomer+'","'+s.LogoutTime+'","'+s.LogoutLat+'","'+s.LogoutLong+'"')}));var s="Employee Attendance List ( "+P+" ).csv",r=n.join("\n"),a=new Blob([r],{type:"text/csv;charset=utf8;"}),o=document.createElement("a");void 0!==o.download?(o.setAttribute("href",window.URL.createObjectURL(a)),o.setAttribute("download",s),o.style="visibility:hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)):navigator.msSaveBlob&&navigator.msSaveBlob(a,s),document.getElementById("divLoading").className="hide"},color:"primary",style:{marginTop:"0%"},size:"sm",id:"AddEmp",children:"Export To Excel"})})]})}),Object(O.jsx)(a.f,{children:Object(O.jsx)(a.H,{children:Object(O.jsx)(a.j,{md:"12",children:Object(O.jsx)("table",{id:"customerDetails",style:{width:"100%"},children:Object(O.jsxs)("tr",{children:[Object(O.jsxs)("td",{style:{borderRight:"1px solid #7e0103"},children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Employee Type :"})}),Object(O.jsx)("td",{children:t})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Employee Sub Type :"})}),Object(O.jsx)("td",{children:c})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"HQ :"})}),Object(O.jsx)("td",{children:d})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Company :"})}),Object(O.jsx)("td",{children:h})]})]}),Object(O.jsxs)("td",{style:{borderRight:"1px solid #7e0103"},children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Employee Name :"})}),Object(O.jsx)("td",{children:x})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Email Address :"})}),Object(O.jsx)("td",{children:u})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Contact Number :"})}),Object(O.jsx)("td",{children:m})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("b",{children:"Joining Date :"})}),Object(O.jsx)("td",{children:p})]})]})]})})})})})]}),Object(O.jsxs)(a.e,{children:[Object(O.jsx)(a.i,{children:Object(O.jsxs)(a.H,{children:[Object(O.jsxs)(a.j,{md:"6",children:["Attendance List ( ",P," )"]}),Object(O.jsx)(a.j,{md:"2",children:Object(O.jsx)(a.y,{type:"date",onChange:function(e){D(e.target.value)},value:A})}),Object(O.jsx)(a.j,{md:"2",children:Object(O.jsx)(a.y,{type:"date",onChange:function(e){M(e.target.value)},value:N})}),Object(O.jsx)(a.j,{md:"2",children:Object(O.jsx)(a.d,{size:"sm",color:"info",style:{width:"100%"},onClick:function(){if(""===A||null===A||void 0===A)Y.fire({icon:"warning",title:"Please Select From Date!"});else if(""===N||null===N||void 0===N)Y.fire({icon:"warning",title:"Please Select To Date!"});else{document.getElementById("divLoading").className="show",B(A+" TO "+N);var e={fromDate:A,toDate:N,EmployeeID:g};console.log(e),r.a.put(j.a+"GetEmployeeAttendenceBydate",e).then((function(e){f(e.data),document.getElementById("divLoading").className="hide"}))}},children:"GET"})})]})}),Object(O.jsx)(a.f,{children:Object(O.jsx)(a.H,{children:Object(O.jsx)(a.j,{md:"12",children:Object(O.jsx)("div",{style:{overflow:"auto"},children:Object(O.jsxs)("table",{id:"Attendence",children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:"Sl"}),Object(O.jsx)("th",{children:"Date"}),Object(O.jsx)("th",{children:"Week Name"}),Object(O.jsx)("th",{children:"Attendance"}),Object(O.jsx)("th",{children:"Login Time"}),Object(O.jsx)("th",{children:"Login Lat"}),Object(O.jsx)("th",{children:"Login Long"}),Object(O.jsx)("th",{children:"Total Orders"}),Object(O.jsx)("th",{children:"Visited Customers"}),Object(O.jsx)("th",{children:"Logout Time"}),Object(O.jsx)("th",{children:"Logout Lat"}),Object(O.jsx)("th",{children:"Logout Long"}),Object(O.jsx)("th",{children:"Track"})]})}),Object(O.jsx)("tbody",{children:v.map((function(e,t){var c="";return"0"===e.AttStatus?c='<p class="absent">Absent</p>':"1"===e.AttStatus?c='<p class="present">Present</p>':"2"===e.AttStatus&&(c='<p class="leave">Leave</p>'),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:t+1}),Object(O.jsx)("td",{children:Object(O.jsx)(l.a,{date:e.MDate})}),Object(O.jsx)("td",{children:e.WeekName}),Object(O.jsx)("td",{children:Object(O.jsx)("div",{dangerouslySetInnerHTML:{__html:c}})}),Object(O.jsx)("td",{children:e.LoginTime}),Object(O.jsx)("td",{children:e.LoginLat}),Object(O.jsx)("td",{children:e.LoginLong}),Object(O.jsx)("td",{children:Object(O.jsx)(a.d,{onClick:function(){I.push("/EmployeeOrders",{data:{i:e,propsData:L}})},children:e.TotalOrders})}),Object(O.jsx)("td",{children:Object(O.jsx)(a.d,{onClick:function(){I.push("/VisitedCustomers",{data:{i:e,propsData:L}})},children:e.VisitedCustomer})}),Object(O.jsx)("td",{children:e.LogoutTime}),Object(O.jsx)("td",{children:e.LogoutLat}),Object(O.jsx)("td",{children:e.LogoutLong}),Object(O.jsx)("td",{children:Object(O.jsx)(a.d,{onClick:function(){I.push("/TrackEmployee",{data:{i:e,propsData:L}})},color:"primary",children:"Track"})})]})}))})]})})})})})]})]})})]})})}),Object(O.jsx)(a.j,{md:"2"})]})]})}}}]);
//# sourceMappingURL=102.a844de87.chunk.js.map