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