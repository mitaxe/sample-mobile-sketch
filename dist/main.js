!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=new fabric.Canvas("sketch"),o=540,l=300,i=20,c={bl:!1,br:!1,mb:!1,ml:!1,mr:!1,mt:!1,tl:!1,tr:!1},s=e=>{const t=e%i,n=10*Math.round(e/10);return t>i/2?n%i==0?n:n+i/2:e-t};function a(e,t){return{x:e,y:t}}var d=new class{constructor(){this.wall=[],this.circles=[]}draw(e,t){const n=s(e),o=s(t),l=new fabric.Circle({left:n-4,top:o-4,radius:4,strokeWidth:2,fill:"#ffc220"});this.circles.push(l),r.add(l),this.wall.push(new a(n,o)),2===this.wall.length&&this.build()}build(){const e=new fabric.Line([this.wall[0].x,this.wall[0].y,this.wall[1].x,this.wall[1].y],{stroke:"#262626"});e.setControlsVisibility(c),r.add(e),setTimeout(()=>this.circles.forEach(e=>r.remove(e)),500),this.wall=[]}clear(){this.wall=[],this.circles.forEach(e=>r.remove(e)),this.circles=[]}};const u=document.getElementById("wall"),f=document.getElementById("hand"),h=document.getElementById("undo"),b=document.getElementById("redo");r.setWidth(o),r.setHeight(l);let p=!1,w=[];const m={hand:!1,wall:!0,door:!1};function y(){Object.keys(m).forEach(e=>{m[e]=!1})}u.addEventListener("click",function(){y(),m.wall=!0}),f.addEventListener("click",function(){y(),d.clear(),m.hand=!0}),r.on("mouse:down",function(e){const{pointer:{x:t,y:n}}=e;m.wall&&d.draw(t,n)}),r.on("object:added",function(){p||(w=[]),p=!1}),h.addEventListener("click",()=>{d.clear(),r._objects.length>1&&(w.push(r._objects.pop()),r.renderAll())}),b.addEventListener("click",()=>{d.clear(),w.length>0&&(p=!0,r.add(w.pop()))}),function(){let e=[],t=[];for(let t=i;t<l;t+=i)e.push(new fabric.Line([0,t,o,t],{stroke:"#d3d3d3"}));for(let e=i;e<o;e+=i)t.push(new fabric.Line([e,l,e,0],{stroke:"#d3d3d3"}));const n=new fabric.Group([...e,...t],{selectable:!1});r.add(n)}()}]);