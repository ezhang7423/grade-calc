parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Yazq":[function(require,module,exports) {
function n(n){var e='<div class="modal-content">\n<span onclick="toggleModal()" class="mc">&#xf00d;</span>',c=store[searchObj(store,n)];e+='<div class = "mcn-wrapper">\n  <h1 class = "modalcoursename" >'.concat(n,": ").concat(calcSum(c),"% <span class=").concat(calcSum(c)<93?"bad":"good",">").concat(letterGrade(c),'</span></h1>\n  </div>\n  <div class="mgrid">\n  ').concat(t(n),"\n  ");var r=a(n);return e+='\n\n  <div style =     "display: flex;\n    flex-direction: column;\n    align-items: center;">\n  <button name = "l" class="naked madd '.concat(8==r?"disabled":"",' ">\n  <i class="fas fa-list-ul"></i>\n  \n  </button>\n  <button name = "t" class="naked madd ').concat(8==r?"disabled":"",' ">\n  <i style="margin-right: 0;" class="fas fa-check-square"></i>\n  </button>\n  </div>\n  </div>\n  \n  <div class="ri">\n  <span class=\'unsaved hidden\'>unsaved &nbsp;</span>\n  <span class = "modal-save">save</span>\n  \n  </div> \n  </div>'),r<=5?editCSS(".mgrid { grid-template-columns: ".concat(Array(r+1).join("1fr "),"0.1fr")):editCSS(".mgrid { grid-template-columns: ".concat(Array(5).join("1fr ")," 0.1fr ").concat(Array(r-5).join("1 fr "))),e}function a(n){var a=store[searchObj(store,n)];return Object.keys(a.weights).length}function t(n){compString="";for(var a=store[searchObj(store,n)],t=0,e=Object.keys(a.weights);t<e.length;t++){var r=e[t];compString+=c(a.weights[r])}return compString}function e(n,a){var t=n*a;return String(t).replace(".","").length>4&&(t=Math.round(t)),Math.round(100*t)/1e4}function c(n){if(n.isList){for(var a=Math.round(100*(n.grade+Number.EPSILON))/100,t=e(a,n.weight),c='\n    <div class="bb"><input class="cc nakinput ric mheader"\n    title="Enter your grade. Example: If you got 89% enter 89"\n    name = "mtitle"\n    placeholder="'.concat(n.name,'" />\n    <div class="del-com">&#xd7;</div>\n    <h4 class="nomargin">\n      <div class = "full-comp">\n      Weight: \n      <input class="cc nakinput ric b"\n      name = \'mweight\'\n      title="Enter your grade. Example: If you got 89% enter 89"\n        placeholder="').concat(n.weight,'%" />\n      </div>\n    </h4>'),r=0,s=Object.keys(n.grad);r<s.length;r++){var i=s[r];c+='<div class = "full-comp">\n      <input class="cc nakinput lic"\n      name="mcomp-gradename"\n        title="Enter your grade. Example: If you got 89% enter 89"\n        placeholder="'.concat(n.grad[i].name,'" />\n      <input class="cc nakinput ric"\n      name="mcomp-grade"\n        title="Enter your grade. Example: If you got 89% enter 89"\n        placeholder="').concat(n.grad[i].gradie,'%" />\n      </div>')}return c+='<button class="addmcc naked nomargin">\n      <i class="fas fa-plus-square"></i>\n    </button>\n    <div class="mup">\n    <div class = "full-comp">\n    <strong>Total:</strong>\n    <span style="font-weight: bold; margin-left: auto">\n      '.concat(a,'%\n     </span>\n  </div>\n  \n    <div class = "full-comp">\n    <strong title="Contribution" >Contrib. </strong>\n    <span style="font-weight: bold; margin-left: auto">\n      ').concat(t,"%\n     </span>\n    </div>\n    </div>\n  </div>")}var o=Math.round(100*(n.grade+Number.EPSILON))/100,l=e(o,n.weight);return'\n    <div class="bb"> <input class="cc nakinput ric mheader"\n    title="Enter your grade. Example: If you got 89% enter 89"\n    name = "mtitle"\n    placeholder="'.concat(n.name,'" />\n    <div class="del-com">&#xd7;</div>\n    <h4 class="nomargin">\n    \n    <div class = "full-comp">\n    Weight: \n    <input class="cc nakinput ric b"\n      name = \'mweight\'\n      title="Enter your grade. Example: If you got 89% enter 89"\n      placeholder="').concat(n.weight,'%" />\n    </div>\n\n    <div class = "full-comp">\n    <strong>Score:</strong>\n    <input class="cc nakinput ric b"\n    name="mscore"\n      title="Enter your grade. Example: If you got 89% enter 89"\n      placeholder="').concat(o,'%" />\n    </div>\n  \n    <div class = "full-comp">\n    <strong title="Contribution" >Contrib. </strong>\n    <span style="margin-left: auto">\n      ').concat(l,"%\n     </span>\n    </div>\n    </h4>\n  </div>")}
},{}]},{},["Yazq"], null)
//# sourceMappingURL=/generatemodal.6dcb5bb6.js.map