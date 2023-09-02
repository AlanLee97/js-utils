"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t){return t?+t<10?"0".concat(t):"".concat(t):t}function o(t){var e=t;e||(e=new Date);var o=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),c=e.getDay();return{year:o,month:n,day:r,hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds(),ms:e.getMilliseconds(),weekday:c,timestamp:e.getTime()}}exports.checkElementInWindowArea=function(t){if(!(t&&t instanceof HTMLElement))return!1;var e=t.getBoundingClientRect(),o=window,n=o.innerHeight,r=o.innerWidth,c=e.top>0&&e.top<n,i=e.bottom>0&&e.bottom<n,a=e.left>0&&e.left<r,l=e.right>0&&e.right<r;return(c||i)&&(a||l)},exports.dateFormat=function(t){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})||{},r=n.dateSeparator,c=void 0===r?"-":r,i=n.timeSeparator,a=void 0===i?":":i,l=n.paddingZero,u=void 0===l||l;if(!t)return"";var d=o(new Date(t)),f=d.year,s=d.month,m=d.day,p=d.hour,h=d.minute,y=d.second;return u&&(s=e(s),m=e(m),p=e(p),h=e(h),y=e(y)),"".concat(f).concat(c).concat(s).concat(c).concat(m," ").concat(p).concat(a).concat(h).concat(a).concat(y)},exports.downloadFileInExtractFile=function(t,e){var o=document.createElement("a");o.href=t,o.rel="noreferrer noopener",o.download=e,o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)},exports.downloadFileWithATag=function(t,e){window.fetch(t).then((function(t){return t.blob()})).then((function(t){var o=window.URL.createObjectURL(t),n=document.createElement("a");n.href=o,n.download=e,n.click(),window.URL.revokeObjectURL(o)})).catch((function(t){console.error("下载文件失败",t)}))},exports.filterEmptyProp=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={};return Object.keys(t).forEach((function(o){["",null,void 0].includes(t[o])||(e[o]=t[o])})),e},exports.getDateObjectValue=o,exports.hello=function(){console.log("Hello, wellcome to use JSUtils.")},exports.mergeObj=function e(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys().forEach((function(r){"object"===t(o[r])&&e(o[r],n[r]),void 0!==n[r]&&("object"===t(n[r])?e(o[r],n[r]):o[r]=n[r])})),o},exports.numberPaddingZero=e,exports.styleStrToObj=function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").split(";"),e={};return t.forEach((function(t){if(t){var o=t.split(":"),n=o[0]||"",r=o[1]||"";n&&(e[n.trim()]=r.trim())}})),e};
