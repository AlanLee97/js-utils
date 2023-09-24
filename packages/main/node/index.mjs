/**
 * 获取文件hash值
 * @env node
 * @param {string} filePath
 * @param {number} hashLength
 * @returns {string} hash
 */
function getFileHash(filePath = '', hashLength) {
  const fs = require('fs');
  const path = require('path');
  const file = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const crypto = require('crypto');
  const hash = crypto.createHash('sha1');
  const result = hash.update(file).digest('hex');
  return hashLength ? result.substring(0, +hashLength) : result;
}

/**
 * 合并对象
 * @param {object} target
 * @param {object} obj
 * @returns
 */
function mergeObj(target = {}, obj = {}) {
  Object.keys().forEach(key => {
    if (typeof target[key] === 'object') {
      mergeObj(target[key], obj[key]);
    }
    if (obj[key] !== undefined) {
      if (typeof obj[key] === 'object') {
        mergeObj(target[key], obj[key]);
      } else {
        target[key] = obj[key];
      }
    }
  });
  return target;
}

/**
 * 将style字符串转为对象
 * @param {string} str
 * @returns object
 */
function styleStrToObj(str = '') {
  const propArr = str.split(';');
  const obj = {};
  propArr.forEach(prop => {
    if (prop) {
      const arr = prop.split(':');
      const key = arr[0] || '';
      const value = arr[1] || '';
      if (key) {
        obj[key.trim()] = value.trim();
      }
    }
  });
  return obj;
}

/**
 * 数字填充0
 * @param {string | number} n
 * @returns
 */
function numberPaddingZero(n) {
  if (!n) return n;
  return +n < 10 ? `0${n}` : `${n}`;
}

/**
 * 获取日期对象值
 * @param {Date} date
 * @returns {object}
 * {
 *   year,
 *   month,
 *   day,
 *   hour,
 *   minute,
 *   second,
 *   ms,
 *   weekday,
 *   timestamp,
 * }
 */
function getDateObjectValue(date) {
  let newDate = date;
  if (!newDate) {
    newDate = new Date();
  }
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const weekday = newDate.getDay();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const second = newDate.getSeconds();
  const ms = newDate.getMilliseconds();
  const timestamp = newDate.getTime();
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    ms,
    weekday,
    timestamp
  };
}

/**
 *
 * @param {Date | string} date
 * @param {object} format dateSeparator日期分隔符（默认为-）；timeSeparator时间分隔符（默认为:）；paddingZero数字是否填充0（默认为true）
 * @returns {string}
 */
function dateFormat(date, format = {}) {
  const {
    dateSeparator = '-',
    timeSeparator = ':',
    paddingZero = true
  } = format || {};
  if (!date) return '';
  const newDate = new Date(date);
  let {
    year,
    month,
    day,
    hour,
    minute,
    second
  } = getDateObjectValue(newDate);
  if (paddingZero) {
    month = numberPaddingZero(month);
    day = numberPaddingZero(day);
    hour = numberPaddingZero(hour);
    minute = numberPaddingZero(minute);
    second = numberPaddingZero(second);
  }
  return `${year}${dateSeparator}${month}${dateSeparator}${day} ${hour}${timeSeparator}${minute}${timeSeparator}${second}`;
}

// 过滤掉对象的空属性
function filterEmptyProp(target = {}) {
  const obj = {};
  Object.keys(target).forEach(key => {
    if (!['', null, undefined].includes(target[key])) {
      obj[key] = target[key];
    }
  });
  return obj;
}

export { dateFormat, filterEmptyProp, getDateObjectValue, getFileHash, mergeObj, numberPaddingZero, styleStrToObj };
