import{r as s}from"./react-BZZGMMFc.js";import{s as f}from"./react-style-singleton-4PaDvyjz.js";var d="right-scroll-bar-position",g="width-before-scroll-bar",p="with-scroll-bars-hidden",h="--removed-body-scroll-bar-size",m={left:0,top:0,right:0,gap:0},l=function(n){return parseInt(n||"",10)||0},b=function(n){var r=window.getComputedStyle(document.body),o=r[n==="padding"?"paddingLeft":"marginLeft"],t=r[n==="padding"?"paddingTop":"marginTop"],e=r[n==="padding"?"paddingRight":"marginRight"];return[l(o),l(t),l(e)]},y=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return m;var r=b(n),o=document.documentElement.clientWidth,t=window.innerWidth;return{left:r[0],top:r[1],right:r[2],gap:Math.max(0,t-o+r[2]-r[0])}},w=f(),c="data-scroll-locked",x=function(n,r,o,t){var e=n.left,i=n.top,v=n.right,a=n.gap;return o===void 0&&(o="margin"),`
  .`.concat(p,` {
   overflow: hidden `).concat(t,`;
   padding-right: `).concat(a,"px ").concat(t,`;
  }
  body[`).concat(c,`] {
    overflow: hidden `).concat(t,`;
    overscroll-behavior: contain;
    `).concat([r&&"position: relative ".concat(t,";"),o==="margin"&&`
    padding-left: `.concat(e,`px;
    padding-top: `).concat(i,`px;
    padding-right: `).concat(v,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a,"px ").concat(t,`;
    `),o==="padding"&&"padding-right: ".concat(a,"px ").concat(t,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(d,` {
    right: `).concat(a,"px ").concat(t,`;
  }
  
  .`).concat(g,` {
    margin-right: `).concat(a,"px ").concat(t,`;
  }
  
  .`).concat(d," .").concat(d,` {
    right: 0 `).concat(t,`;
  }
  
  .`).concat(g," .").concat(g,` {
    margin-right: 0 `).concat(t,`;
  }
  
  body[`).concat(c,`] {
    `).concat(h,": ").concat(a,`px;
  }
`)},u=function(){var n=parseInt(document.body.getAttribute(c)||"0",10);return isFinite(n)?n:0},S=function(){s.useEffect(function(){return document.body.setAttribute(c,(u()+1).toString()),function(){var n=u()-1;n<=0?document.body.removeAttribute(c):document.body.setAttribute(c,n.toString())}},[])},A=function(n){var r=n.noRelative,o=n.noImportant,t=n.gapMode,e=t===void 0?"margin":t;S();var i=s.useMemo(function(){return y(e)},[e]);return s.createElement(w,{styles:x(i,!r,e,o?"":"!important")})};export{A as R,g as f,d as z};
