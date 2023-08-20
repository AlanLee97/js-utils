/**
 * 获取文件hash值
 * @env node
 * @param {string} filePath
 * @param {number} hashLength
 * @returns {string} hash
 */
export function getFileHash(filePath = '', hashLength) {
  const fs = require('fs');
  const path = require('path');
  const file = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const crypto = require('crypto');
  const hash = crypto.createHash('sha1');
  const result = hash.update(file).digest('hex');
  return hashLength ? result.substring(0, +hashLength) : result;
}
