(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[72],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a}));var i="https://zeusservices.onrender.com/api/",a="https://zeusservices.onrender.com/"},625:function(e,t,n){},632:function(e,t,n){"use strict";var i=n(634),a=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=a(n(1)),c=(0,i(n(636)).default)(d.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=c},633:function(e,t,n){"use strict";var i=n(634),a=n(635);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=a(n(1)),c=(0,i(n(636)).default)(d.createElement("path",{d:"M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteSharp");t.default=c},828:function(e,t,n){"use strict";n.r(t);var i=n(25),a=n(627),d=n(626),c=n(633),s=n.n(c),l=n(632),o=n.n(l),r=n(628),m=n.n(r),u=n(1),j=n.n(u),h=n(624),b=n(630),x=n.n(b),f=(n(625),n(12)),O={placeholder:"Search here...",label:"Search:  "},A={label:"Rows:",values:[5,10,25,50,75,100]},p=[{key:"Action"},{key:"Admin Name"},{key:"Admin Email"},{key:"Admin Password"}];t.default=function(){var e=Object(u.useState)(""),t=Object(a.a)(e,2),n=t[0],c=t[1],l=Object(u.useState)(!0),r=Object(a.a)(l,2),b=r[0],g=r[1],E=Object(u.useState)(!1),v=Object(a.a)(E,2),y=v[0],N=v[1],P=Object(u.useState)(),w=Object(a.a)(P,2),S=w[0],_=w[1],I=Object(u.useState)(""),M=Object(a.a)(I,2),B=M[0],L=M[1],T=Object(u.useState)(""),z=Object(a.a)(T,2),D=z[0],k=z[1],C=x.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",x.a.stopTimer),e.addEventListener("mouseleave",x.a.resumeTimer)}}),R=function(){if(""===S||null==S)C.fire({icon:"warning",title:"Please Enter Admin Name!"});else if(""===B||null==B)C.fire({icon:"warning",title:"Please Enter Admin Email!"});else if(""===D||null==D)C.fire({icon:"warning",title:"Please Enter Admin Password!"});else{document.getElementById("divLoading").className="show";var e={AdminName:S,AdminEmail:B,AdminPassword:D};m.a.post(h.a+"ManageAdmin/",e).then((function(e){"0"===e.data?(x.a.fire({title:"Admin Already Existed!",icon:"info",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide"):"1"===e.data?(x.a.fire({title:"Admin Added Successfully!",icon:"success",confirmButtonText:"OK"}),J(),_(""),L(""),k(""),document.getElementById("divLoading").className="hide"):"2"===e.data&&(x.a.fire({title:"Admin Failed To Add!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}},U=function(){if(""===S||null==S)C.fire({icon:"warning",title:"Please Enter Admin Name!"});else if(""===B||null==B)C.fire({icon:"warning",title:"Please Enter Admin Email!"});else if(""===D||null==D)C.fire({icon:"warning",title:"Please Enter Admin Password!"});else{document.getElementById("divLoading").className="show";var e={AdminName:S,AdminEmail:B,AdminPassword:D};m.a.put(h.a+"ManageAdmin/"+n,e).then((function(e){!1===e.data?(x.a.fire({title:"Admin Already Existed!",icon:"info",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide"):!0===e.data&&(x.a.fire({title:"Admin Updated Successfully!",icon:"success",confirmButtonText:"OK"}),J(),c(""),_(""),L(""),k(""),g(!0),N(!1),document.getElementById("divLoading").className="hide")}))}},K=j.a.useState(""),H=Object(a.a)(K,2),V=H[0],F=H[1],J=j.a.useCallback((function(){document.getElementById("divLoading").className="show",m()({method:"GET",url:h.a+"ManageAdmin",headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){var t=e.data.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{"Admin Name":e.SUPER_ADMIN_NAME,"Admin Email":e.SUPER_ADMIN_EMAIL,"Admin Password":e.SUPER_ADMIN_PASSWORD})}));F(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]);j.a.useEffect((function(){J()}),[]);var W=function(){return Object(f.jsx)(d.d,{type:"button",onClick:U,size:"md",id:"Add-btn",children:"Update"})},Y=function(){return Object(f.jsx)(d.d,{type:"button",onClick:R,size:"md",id:"Add-btn",children:"Add"})};return Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{id:"divLoading",children:" "}),Object(f.jsx)("h1",{id:"ccmaster",children:"Manage Admin"}),Object(f.jsxs)(d.H,{style:{marginTop:"3%"},children:[Object(f.jsx)(d.j,{xs:"12",sm:"12",md:"4",lg:"4",xl:"4",className:"mb-3 mb-xl-0",children:Object(f.jsx)("div",{id:"country-master",children:Object(f.jsx)(d.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(f.jsx)(d.f,{children:Object(f.jsx)(d.H,{children:Object(f.jsx)(d.j,{children:Object(f.jsxs)(d.e,{children:[Object(f.jsx)(d.i,{children:"Add Admin"}),Object(f.jsx)(d.f,{children:Object(f.jsxs)(d.t,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(f.jsx)(d.u,{row:!0,children:Object(f.jsxs)(d.j,{xs:"12",md:"12",children:[Object(f.jsx)(d.z,{children:"Admin Name"}),Object(f.jsx)(d.y,{id:"text-input",name:"text-input",placeholder:"Name",value:S,onChange:function(e){_(e.target.value)}})]})}),Object(f.jsx)(d.u,{row:!0,children:Object(f.jsxs)(d.j,{xs:"12",md:"12",children:[Object(f.jsx)(d.z,{children:"Admin Email"}),Object(f.jsx)(d.y,{id:"text-input",name:"text-input",placeholder:"Email",value:B,onChange:function(e){L(e.target.value)}})]})}),Object(f.jsx)(d.u,{row:!0,children:Object(f.jsxs)(d.j,{xs:"12",md:"12",children:[Object(f.jsx)(d.z,{children:"Admin Password"}),Object(f.jsx)(d.y,{type:"password",id:"text-input",name:"text-input",placeholder:"Email",value:D,onChange:function(e){k(e.target.value)}})]})}),y&&Object(f.jsx)(W,{}),b&&Object(f.jsx)(Y,{})]})})]})})})})})})}),Object(f.jsx)(d.j,{xs:"12",sm:"12",md:"8",lg:"8",xl:"8",className:"mb-3 mb-xl-0",children:Object(f.jsx)("div",{id:"country-table",children:Object(f.jsx)(d.e,{id:"Loccard",style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(f.jsx)(d.f,{children:Object(f.jsx)(d.H,{children:Object(f.jsx)(d.j,{children:Object(f.jsxs)(d.e,{children:[Object(f.jsx)(d.i,{children:"All Admins"}),Object(f.jsx)(d.f,{children:Object(f.jsx)(d.m,{items:V,fields:p,hover:!0,striped:!0,bordered:!0,tableFilter:O,itemsPerPageSelect:A,sorter:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Action:function(e){return Object(f.jsxs)("td",{children:[Object(f.jsxs)(d.d,{onClick:function(){var t,n,i,a;t=e.SUPER_ADMIN_PKID,n=e.SUPER_ADMIN_NAME,i=e.SUPER_ADMIN_EMAIL,a=e.SUPER_ADMIN_PASSWORD,c(t),_(n),L(i),k(a),g(!1),N(!0)},size:"sm",id:"war-btn",children:[Object(f.jsx)(o.a,{}),e.COUNTRY_ACTIVE]}),Object(f.jsxs)(d.d,{size:"sm",onClick:function(){var t;t=e.SUPER_ADMIN_PKID,confirm("Are you sure you want to delete")&&(document.getElementById("divLoading").className="show",m()({method:"DELETE",url:h.a+"ManageAdmin/"+t,headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){!0===e.data?(x.a.fire({title:"Successfully Deleted!",icon:"success",confirmButtonText:"OK"}),J(),document.getElementById("divLoading").className="hide"):(x.a.fire({title:"Failed To Deleted!",icon:"success",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")})).catch((function(e){console.log(e)})))},id:"war-btn1",children:[Object(f.jsx)(s.a,{}),e.COUNTRY_ACTIVE]})]})}}})})]})})})})})})})]})]})}}}]);
//# sourceMappingURL=72.185a7fc9.chunk.js.map