parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"rAY3":[function(require,module,exports) {
function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){return a(e)||o(e,t)||s(e,t)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(l){o=!0,a=l}finally{try{n||null==s.return||s.return()}finally{if(o)throw a}}return r}}function a(e){if(Array.isArray(e))return e}function i(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=s(e))){var t=0,r=function(){};return{s:r,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,o,a=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){i=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(i)throw o}}}}function s(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e){console.log(e)}var u=function(e){return String.fromCharCode(97+e)};function f(e){e<2&&(e=2);var n,o=[],a=i(colormap({colormap:"summer",nshades:e,format:"rgba",alpha:1}));try{for(a.s();!(n=a.n()).done;){var s=n.value,l=t(lighten(s),3);r=l[0],g=l[1],b=l[2],o.push("rgba("+r+","+g+","+b+","+s[3]+")")}}catch(c){a.e(c)}finally{a.f()}return o}function h(e){var t=document.createDocumentFragment(),r=document.createElement("div");for(r.innerHTML=e;r.firstChild;)t.appendChild(r.firstChild);return t}function y(e){var t,r=i(document.styleSheets);try{for(r.s();!(t=r.n()).done;){var n=t.value;if(n.href.includes("style.css")){var o=n;break}}}catch(a){r.e(a)}finally{r.f()}sel=document.all?"rules":"cssRules",stylingL=Object.keys(o[sel]).length,o.insertRule(e,stylingL)}var d=function(){var e=new Course("MATH4B",[10,20,70]);e.weights[0].grade={hw1:100,hw2:90,hw3:80,hw4:90},e.weights[2].grade={lab1:100,lab2:90,lab3:80,lab4:90};var t=new Course("PSTAT120A",[1,1,2,96]);t.weights[0].grade={0:1,1:2,2:3,3:4,4:5,5:6,6:7},t.weights[1].grade={a:1,b:2,c:3,d:4,e:50,f:6,g:7},t.weights[2].grade={0:1,"-1":2,"-2":30,"-3":40,"-4":5,"-5":6,"-6":70},p(e,"course"),p(t,"course"),location.reload()},m=function(){localStorage.removeItem("gc-datastore"),location.reload()};function v(){store=w();for(var e=-1,t=0,r=Object.keys(store);t<r.length;t++){var n=r[t];store[n].name.includes("untitled")&&parseInt(store[n].name.split(" ")[2])>e&&(e=parseInt(store[n].name.split(" ")[2]))}return e}function w(){var t=JSON.parse(localStorage.getItem("gc-datastore")),r={};if(null!==t){for(var n=0,o=Object.keys(t);n<o.length;n++){for(var a=o[n],i=[],s=0,l=Object.keys(t[a].weights);s<l.length;s++){var c=l[s];i.push(t[a].weights[c].weight)}r[a]=new Course(t[a].name,i);for(var u=0,f=Object.keys(t[a].weights);u<f.length;u++){var g=f[u];"object"===e(t[a].weights[g].grad)?(r[a].weights[g].grad=t[a].weights[g].grad,r[a].weights[g].isList=!0):r[a].weights[g].grade=t[a].weights[g].grad,r[a].weights[g].name=t[a].weights[g].name}}return r}return null}function p(e,t){store=w();try{var r=Object.keys(store).reduce(function(e,t){return(e=parseInt(e))>(t=parseInt(t))?e:t})}catch(o){r=-1}if(r++,"course"===t)store[r]={},store[r].name=e.name,store[r].weights=e.export(),localStorage.setItem("gc-datastore",JSON.stringify(store));else if("component"===t){var n=S(store,e.name);store[n]=e,localStorage.setItem("gc-datastore",JSON.stringify(store))}}function S(e,t){for(var r=0,n=Object.keys(e);r<n.length;r++){var o=n[r];if(e[o].name===t)return o}}function O(e){for(var t=0,r=0,n=Object.keys(e.weights);r<n.length;r++){var o=n[r];t+=calcGrad(e.weights[o].grade,e.weights[o].weight)}return Math.round(100*(t+Number.EPSILON))/100}function j(e){for(var t=0,r=0,n=Object.keys(e.weights);r<n.length;r++){var o=n[r];t+=calcGrad(e.weights[o].grade,e.weights[o].weight)}return t>=97?"A+":t>=93?"A":t>=90?"A-":t>=87?"B+":t>=83?"B":t>=80?"B-":t>=77?"C+":t>=73?"C":t>=70?"C-":t>=67?"D+":t>=63?"D":t>=60?"D-":"F"}function I(e){store=w(),delete store[e],localStorage.setItem("gc-datastore",JSON.stringify(store)),location.reload()}
},{}]},{},["rAY3"], null)
//# sourceMappingURL=/functions.dce2ca91.js.map