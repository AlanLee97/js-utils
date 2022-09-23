

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
 * 获取文件hash值
 * @env node
 * @param {string} filePath 
 * @returns 
 */
export function getFileHash(filePath = '') {
  const fs = require('fs');
  const file =  fs.readFileSync(__dirname + filePath, 'utf-8');
  const crypto = require('crypto');
  const hash = crypto.createHash('sha1');
  const result = hash.update(file).digest('hex');
  return result;
}