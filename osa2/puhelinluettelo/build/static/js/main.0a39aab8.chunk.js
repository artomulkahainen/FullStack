(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){e.exports=t(41)},41:function(e,n,t){"use strict";t.r(n);var a=t(19),r=t(2),o=t(0),u=t.n(o),l=t(18),c=t.n(l),i=function(e){var n=e.formSend,t=e.text;return u.a.createElement("button",{onClick:n},t)},m=function(e){var n=e.valueChange;return u.a.createElement("input",{onChange:n})},f=function(e){var n=e.type,t=e.nameChangeHandler,a=e.numberChangeHandler,r=e.filterHandler,o=e.formSend,l=null;return l="phonebook"===n?u.a.createElement("form",{onSubmit:o},u.a.createElement("div",null,"name: ",u.a.createElement(m,{valueChange:t})),u.a.createElement("div",null,"number: ",u.a.createElement(m,{valueChange:a})),u.a.createElement(i,{formSend:o,text:"SEND"})):u.a.createElement("form",{onSubmit:o},u.a.createElement("div",null,"filter shown with: ",u.a.createElement(m,{valueChange:r}))),u.a.createElement("div",null,"phonebook"===n?u.a.createElement("h2",null,"Add a new number"):u.a.createElement("h2",null,"Phonebook"),l)},s=t(6),d=t.n(s),h=function(e){var n=e.persons,t=e.personRemove;return u.a.createElement("div",null,u.a.createElement("h2",null,"Numbers"),n.map((function(e){return u.a.createElement("p",{key:d()(),onClick:function(){return t(e)},style:{width:"250px"}},e.name," ",e.number)})))},b=t(4),v=t.n(b),p="/api/persons",E=function(){return v.a.get(p).then((function(e){return e.data}))},g=function(e){return v.a.post(p,e).then((function(e){return e.data}))},w=function(e,n){return v.a.put(p+"/"+n,e)},j=function(e){return v.a.delete(p+"/"+e.id)},C=t(7),O=t.n(C),S=function(e){var n=e.message,t=e.type;return u.a.createElement("div",{className:"error"===t?O.a.error:O.a.notification},n)},y=function(){var e=Object(o.useState)([]),n=Object(r.a)(e,2),t=n[0],l=n[1],c=Object(o.useState)(""),i=Object(r.a)(c,2),m=i[0],s=i[1],b=Object(o.useState)(""),v=Object(r.a)(b,2),p=v[0],C=v[1],O=Object(o.useState)(""),y=Object(r.a)(O,2),k=y[0],H=y[1],N=Object(o.useState)(null),P=Object(r.a)(N,2),_=P[0],x=P[1],D=Object(o.useState)(null),R=Object(r.a)(D,2),T=R[0],J=R[1],L=function(e){C(e.target.value)},M=function(e){g(e).then((function(e){return l(t.concat(e))}))},A=function(e,n){var r=Object(a.a)(t);r.find((function(n){return n.id===e.id?n.number=e.number:console.log()})),l(r),w(e,n).catch((function(n){J("Person ".concat(e.name," was already removed from the server")),setTimeout((function(){J(null)}),5e3)}))};return Object(o.useEffect)((function(){E().then((function(e){return l(e)}))}),[]),u.a.createElement("div",null,_?u.a.createElement(S,{message:_,type:"notification"}):null,T?u.a.createElement(S,{message:T,type:"error"}):null,u.a.createElement(f,{type:"filter",filterHandler:L}),u.a.createElement(f,{type:"phonebook",nameChangeHandler:function(e){s(e.target.value)},numberChangeHandler:function(e){H(e.target.value)},filterHandler:L,formSend:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===m}));if(0===n.length&&10===k.length){var a={name:m,number:k,id:d()()};M(a),l(t.concat(a)),x("Person ".concat(a.name," was added")),setTimeout((function(){x(null)}),5e3)}else if(1===n.length){var r={name:n[0].name,number:k,id:n[0].id},o=window.confirm(m+" is already on the list, do you want to update the number?");10!==k.length?o=!1:console.log(),10!==k.length?alert("Phone number must be 10 characters long!"):console.log(),o?A(r,n[0].id):console.log()}else alert("Phone number must be 10 characters long!")}}),u.a.createElement(h,{persons:function(e,n){return""===n?e:e.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}))}(t,p),personRemove:function(e){window.confirm("Delete "+e.name+"?")&&j(e).then((function(){var n=t.filter((function(n){return n.id!==e.id}));l(n)})).catch((function(n){J("Person ".concat(e.name," was already removed from the server")),setTimeout((function(){J(null)}),5e3)}))}}))};n.default=y;c.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(y,null)),document.getElementById("root"))},7:function(e,n,t){e.exports={error:"Notification_error__1RsiN",notification:"Notification_notification__1C7Ma"}}},[[20,1,2]]]);
//# sourceMappingURL=main.0a39aab8.chunk.js.map