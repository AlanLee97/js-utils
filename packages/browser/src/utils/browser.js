import { ScrollInfoApi } from '../api/ScrollInfoApi';

/**
 * a标签下载文件（可能存在跨域问题）
 * @env browser
 * @param {string} url
 * @param {string} fileName
 */
export function downloadFileWithATag(url, fileName) {
  window.fetch(url).then((res) => res.blob()).then((blob) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  }).catch((err) => {
    console.error('下载文件失败', err);
  });
}

// 下载文件，用于下载有精确的文件后缀，如http://domain.com/aaa.xlsx，可跨域
export function downloadFileInExtractFile(url, fileName) {
  const a = document.createElement('a');
  a.href = url;
  a.rel = 'noreferrer noopener';
  a.download = fileName;
  a.style.visibility = 'hidden';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 检查元素是否出现在屏幕区域
 * @param {HTMLElement} el
 * @returns
 */
export function checkElementInWindowArea(el) {
  if (!el || !(el instanceof HTMLElement)) return false;
  const bounding = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  const topAppear = bounding.top > 0 && bounding.top < innerHeight;
  const bottomAppear = bounding.bottom > 0 && bounding.bottom < innerHeight;
  const leftAppear = bounding.left > 0 && bounding.left < innerWidth;
  const rightAppear = bounding.right > 0 && bounding.right < innerWidth;
  return (topAppear || bottomAppear) && (leftAppear || rightAppear);
}

/**
 * 拼接class类名
 * @env browser
 * @param {string|array} args
 * @returns {string}
 */
export function className(...args) {
  const names = [...args];
  let res = '';
  names.forEach((name) => {
    if (Array.isArray(name)) {
      res += Array.from(new Set(name)).join(' ').trim();
    } else {
      res += `${name} `;
    }
  });

  return res.trim();
}

/**
 * 转成烤串字符串
 * @param {*} string
 */
export function toKebabString(str = '') {
  const testA2Z = (s = '') => /[A-Z]/.test(s);
  let res = '';
  str.split('').forEach((s, i) => {
    if (testA2Z(s)) {
      // eslint-disable-next-line no-nested-ternary
      res += `${i === 0 ? '' : str[i - 1] === '-' ? '' : '-'}${s.toLowerCase()}`;
    } else {
      res += s;
    }
  });
  return res;
}

/**
 * 下一个微任务的循环
 * @param {*} cb
 * @returns
 */
export function nextTick(fn = () => {}) {
  return Promise.resolve().then(() => {
    if (typeof fn === 'function') {
      fn();
    }
  });
}

/**
 * 滚动相关信息
 */
export class ScrollInfo extends ScrollInfoApi {
  constructor(options = {}) {
    super();
    this.target = options.target || window;
    this.scrollCallback = options.onScroll || this.scrollCallback;
    this.scrollX = 0;
    this.scrollY = 0;
    this.scrollHeight = 0;
    this.scrollPercent = 0;
    this.atTop = true;
    this.atBottom = false;
    this.isValidTarget = this.target && (this.target instanceof HTMLElement || this.target === window);
    this.instance = this;

    this.init();
  }

  init() {
    this.target.addEventListener('scroll', this.onScroll);
  }

  // eslint-disable-next-line class-methods-use-this
  scrollCallback = () => {};

  onScroll = (e) => {
    const { scrollTop, scrollHeight } = e.target || {};
    this.scrollHeight = scrollHeight;
    this.scrollY = scrollTop;
    const original = scrollTop / scrollHeight;
    // eslint-disable-next-line no-mixed-operators
    this.scrollPercent = Math.floor((original - 0) / (0.54 - 0) * 100);
    this.atTop = scrollTop === 0;
    this.atBottom = Math.floor(this.target.clientHeight + scrollTop) === scrollHeight;
    this.event = e;
    this.scrollCallback(this);
  };

  scrollToTop = () => {
    if (this.isValidTarget) {
      this.target.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  scrollToBottom = () => {
    if (this.isValidTarget) {
      this.target.scrollTo({
        top: this.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  destroy = () => {
    this.target.removeEventListener('scroll', this.onScroll);
  };
}
