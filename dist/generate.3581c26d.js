parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"CljL":[function(require,module,exports) {
function n(n){if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=e(n))){var t=0,c=function(){};return{s:c,n:function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}},e:function(n){throw n},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o,r=!0,l=!1;return{s:function(){a=n[Symbol.iterator]()},n:function(){var n=a.next();return r=n.done,n},e:function(n){l=!0,o=n},f:function(){try{r||null==a.return||a.return()}finally{if(l)throw o}}}}function e(n,e){if(n){if("string"==typeof n)return t(n,e);var c=Object.prototype.toString.call(n).slice(8,-1);return"Object"===c&&n.constructor&&(c=n.constructor.name),"Map"===c||"Set"===c?Array.from(c):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?t(n,e):void 0}}function t(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,c=new Array(e);t<e;t++)c[t]=n[t];return c}function c(n,e){var t=n/100*e;return Math.round(100*(t+Number.EPSILON))/100}function a(n,e){colors=getColors(e);for(var t=0,c=0,a=Object.keys(n);c<a.length;c++){var i=l(a[c],n,t);i=create(i),classContainer.appendChild(i),editCSS(".".concat(alph(t),".course{background-color: ").concat(colors[t],";}")),t++}r(e),o()}function o(){var e=document.querySelectorAll(".cc");document.querySelector(".namecc.cc").addEventListener("click",function(n){n.preventDefault(),n.target.style.width="40vw"});var t,c=n(e);try{for(c.s();!(t=c.n()).done;){var a=t.value;a.addEventListener("focusout",saveMeBlur),a.addEventListener("keyup",saveMeEnter)}}catch(f){c.e(f)}finally{c.f()}var o,r=n(document.querySelectorAll("[title = 'save']"));try{for(r.s();!(o=r.n()).done;){o.value.addEventListener("click",saveCourse)}}catch(f){r.e(f)}finally{r.f()}var l,i=n(document.querySelectorAll("[title = 'delete']"));try{for(i.s();!(l=i.n()).done;){l.value.addEventListener("focusout",deleteCourse)}}catch(f){i.e(f)}finally{i.f()}var s,u=n(document.querySelectorAll(".naked.addcc"));try{for(u.s();!(s=u.n()).done;){s.value.addEventListener("click",togandPopModal)}}catch(f){u.e(f)}finally{u.f()}var d,p=n(document.querySelectorAll(".tooltip"));try{for(p.s();!(d=p.n()).done;){d.value.addEventListener("click",openTooltip)}}catch(f){p.e(f)}finally{p.f()}}function r(n){5===n?(print("numclasses 5"),editCSS("\n    .nakinput.pcc, .nakinput, .nakinput.compcc, .addcc.naked, .component{font-size: 1.5vw;}"),editCSS(".titlecc, .total{font-size: 2vw;}"),editCSS(".course-naked{font-size: .9vw;}\n        ")):n>5&&(print("numclasses greater than 5"),editCSS("\n    .nakinput.pcc, .component, .nakinput, .nakinput.compcc, .addcc.naked{font-size: .9vw;}"),editCSS(".titlecc, .total{font-size: 1vw;}"),editCSS(".course-naked{font-size: .8vw;}\n        "))}function l(n,e,t){return'\n  <div class="course '.concat(alph(t),'">\n  <div><button title="delete" class="course-naked">&#xf00d;</button></div>\n    <input spellcheck="false"\n     class = "course-title cc nakinput titlecc"\n      name = "course-title"\n       placeholder="').concat(e[n].name,'" />\n    ').concat(s(e[n]),"\n    ").concat(d(e[n]),"\n  </div>")}function i(n,e){for(var t='<span class="tooltip ar"\n  >'.concat(e,"/").concat(n.weight,'%\n  <span class="tooltiptext">\n  '),c=0,a=Object.keys(n.grad);c<a.length;c++){var o=a[c];t+='<div class="full-comp">\n  \n    <input\n      spellcheck="false"\n      class="cc nakinput weight compcc"\n      name="wcomp"\n      type="text"\n      maxlength="8"\n      placeholder="'.concat(n.grad[o].name,'"\n    />\n    <span class="weight ar">\n      <input\n        maxlength="5"\n        spellcheck="false"\n        title="Enter the score you got out of 100 (your raw score)"\n        class="cc nakinput weight pcc"\n        name="wpercent"\n        placeholder="').concat(n.grad[o].gradie,'"\n      />\n      /100%</span\n    >\n  </div>\n  ')}return t+="\n  </span>\n</span>"}function s(n){for(var e,t,a='<div class = "components">',o=0,r=Object.keys(n.weights);o<r.length;o++){var l=r[o];t=c((e=n.weights[l]).grade,e.weight),a+=e.isList?'\n      <div class = "component">\n        <div class = \'left-comp\'>\n          <i class="fas fa-list-ul"></i>\n          <input spellcheck="false"\n           class="cc nakinput compcc" \n           name="component" \n           maxlength="10"\n           type="text"\n           placeholder="'.concat(e.name,'" />\n        </div>\n        ').concat(i(e,t),"\n      </div>"):'\n      <div class = "component">\n        <div class = \'full-comp\'>\n          <i class="fas fa-check-square"></i>\n          <input spellcheck="false" \n          class="cc nakinput compcc" \n          name="component" \n          type="text"\n          maxlength="10"\n          placeholder="'.concat(e.name,'" />\n          \n          <span class="ar">\n          <input\n            maxlength="5"\n            spellcheck="false"\n            title="Enter the score you got out of 100 (your raw score)"\n            class="cc nakinput pcc"\n            name="percentage"\n            placeholder="').concat(t,'"\n          />\n          /').concat(e.weight,"%</span\n        >\n        </div>\n      </div>\n      ")}return(a+=u())+"</div>"}function u(){return'\n    <div class="add-component component">\n    <button class="addcc naked">Advanced</button>\n  </div>\n    '}function d(n){var e=calcSum(n);return'\n    <div class="total-container">\n  <hr class="linebreak" />\n  <div class="total">Total <span class="tar">'.concat(e,"/100%</span></div>\n</div>\n    ")}
},{}]},{},["CljL"], null)
//# sourceMappingURL=/generate.3581c26d.js.map