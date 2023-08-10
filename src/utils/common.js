
/**
 * 合并对象
 * @param {object} target 
 * @param {object} obj 
 * @returns 
 */
function mergeObj(target = {}, obj = {}) {
  for(const key in target) {
    if(typeof target[key] === 'object') {
      mergeObj(target[key], obj[key])
    }
    if(obj[key] !== undefined) {
      if(typeof obj[key] === 'object') {
        mergeObj(target[key], obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}