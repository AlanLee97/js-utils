!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).JSUtils={})}(this,(function(t){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t){return t?+t<10?"0".concat(t):"".concat(t):t}function o(t){var e=t;e||(e=new Date);var n=e.getFullYear(),o=e.getMonth()+1,i=e.getDate(),r=e.getDay();return{year:n,month:o,day:i,hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds(),ms:e.getMilliseconds(),weekday:r,timestamp:e.getTime()}}t.checkElementInWindowArea=function(t){if(!(t&&t instanceof HTMLElement))return!1;var e=t.getBoundingClientRect(),n=window,o=n.innerHeight,i=n.innerWidth,r=e.top>0&&e.top<o,c=e.bottom>0&&e.bottom<o,a=e.left>0&&e.left<i,l=e.right>0&&e.right<i;return(r||c)&&(a||l)},t.dateFormat=function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})||{},i=e.dateSeparator,r=void 0===i?"-":i,c=e.timeSeparator,a=void 0===c?":":c,l=e.paddingZero,d=void 0===l||l;if(!t)return"";var u=o(new Date(t)),f=u.year,m=u.month,s=u.day,h=u.hour,y=u.minute,b=u.second;return d&&(m=n(m),s=n(s),h=n(h),y=n(y),b=n(b)),"".concat(f).concat(r).concat(m).concat(r).concat(s," ").concat(h).concat(a).concat(y).concat(a).concat(b)},t.downloadFileInExtractFile=function(t,e){var n=document.createElement("a");n.href=t,n.rel="noreferrer noopener",n.download=e,n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)},t.downloadFileWithATag=function(t,e){window.fetch(t).then((function(t){return t.blob()})).then((function(t){var n=window.URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.download=e,o.click(),window.URL.revokeObjectURL(n)})).catch((function(t){console.error("下载文件失败",t)}))},t.filterEmptyProp=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={};return Object.keys(t).forEach((function(n){["",null,void 0].includes(t[n])||(e[n]=t[n])})),e},t.getDateObjectValue=o,t.hello=function(){console.log("Hello, wellcome to use JSUtils.")},t.mergeObj=function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys().forEach((function(i){"object"===e(n[i])&&t(n[i],o[i]),void 0!==o[i]&&("object"===e(o[i])?t(n[i],o[i]):n[i]=o[i])})),n},t.numberPaddingZero=n,t.styleStrToObj=function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").split(";"),e={};return t.forEach((function(t){if(t){var n=t.split(":"),o=n[0]||"",i=n[1]||"";o&&(e[o.trim()]=i.trim())}})),e}}));
