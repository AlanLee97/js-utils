/**
 * a标签下载文件（可能存在跨域问题）
 * @env browser
 * @param {string} url 
 * @param {string} fileName 
 */
export function downloadFileWithATag(url, fileName) {
  fetch(url).then(res => res.blob()).then(blob => {
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  }).catch(err => {
    console.error('下载文件失败', err);
  })
}

/**
 * 将style字符串转为对象
 * @param {string} str 
 * @returns object
 */
export function styleStrToObj(str = '') {
  let propArr = str.split(';')
  let obj = {}
  propArr.forEach(prop => {
    if (prop) {
      let arr = prop.split(':')
      let key = arr[0] || ''
      let value = arr[1] || ''
      if (key) {
        obj[key.trim()] = value.trim()
      }
    }
  })
  return obj
}