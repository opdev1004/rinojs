var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function getDefaultExportFromNamespaceIfPresent(e){return e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function getDefaultExportFromNamespaceIfNotNamed(e){return e&&Object.prototype.hasOwnProperty.call(e,"default")&&1===Object.keys(e).length?e.default:e}function getAugmentedNamespace(e){if(e.__esModule)return e;var t=e.default;if("function"==typeof t){var o=function a(){if(this instanceof a){var e=[null],o;return e.push.apply(e,arguments),new(Function.bind.apply(t,e))}return t.apply(this,arguments)};o.prototype=t.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(o,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})})),o}function reqworks(){return"It works!"}var t={reqworks:reqworks},o=getDefaultExportFromCjs(t);function add(e,t){return e+t}function minus(e,t){return e-t}var n={add:add,minus:minus},r=getDefaultExportFromCjs(n),l="\n    <div>\n        This is a component test!\n        And if it is successful this should be attached to the one of div.\n    </div>\n";function addComponent(){document.getElementById("comptesting").innerHTML=document.getElementById("comptesting").innerHTML+l}function test(){document.getElementById("test").innerHTML="^ _ ^"}console.log("The component is loaded successfully!"),test(),console.log("reqworks: "+t.reqworks()),console.log("loaded"),console.log(n.add(5,10)),console.log(n.minus(5,10)),console.log("test"),console.log("a"),console.log(n.add(8,10));
