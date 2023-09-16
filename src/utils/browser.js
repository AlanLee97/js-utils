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
 * 获取移动的坐标相关信息
 * @env browser
 * @param {object} options
 * @returns {object}
 */
export class MoveInfo {
  constructor(options = {}) {
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;

    this.initCallback(options);

    const {
      trigger = 'auto',
      ceil = 0,
      floor = 0,
    } = options;

    this.ceil = ceil;
    this.floor = window.innerHeight - floor;

    this.trigger = trigger || 'auto'; // auto-自动触发， press-按下触发
    this.triggered = trigger === 'auto';

    this.register();
  }

  initCallback = (options = {}) => {
    const noop = () => {};
    const {
      onStart = noop,
      onMove = noop,
      onEnd = noop,
    } = options;

    this.onStart = onStart;
    this.onMove = onMove;
    this.onEnd = onEnd;
  };

  on = (name = 'onMove') => {
    if (typeof this[name] === 'function') {
      const {
        x, y, moveX, moveY, startX, startY, endX, endY,
      } = this;
      this[name]({
        x, y, moveX, moveY, startX, startY, endX, endY,
      });
    }
  };

  handleStart = (e) => {
    this.triggered = this.trigger === 'press';
    let x = 0; let
      y = 0;
    if (e instanceof TouchEvent) {
      this.triggered = true; // h5自动触发
      const { clientX, clientY } = e.changedTouches[0] || {};
      x = clientX;
      y = clientY;
    }
    if (e instanceof MouseEvent) {
      const { clientX, clientY } = e || {};
      x = clientX;
      y = clientY;
    }
    this.startX = x;
    this.startY = y;

    this.on('onStart');
  };

  handleMove = (e) => {
    let mvX = 0; let
      mvY = 0;
    if (e instanceof TouchEvent) {
      const { clientX, clientY } = e.changedTouches[0] || {};
      mvX = clientX;
      mvY = clientY;
    }
    if (e instanceof MouseEvent) {
      const { clientX, clientY } = e || {};
      mvX = clientX;
      mvY = clientY;
    }

    if (mvY < this.ceil) {
      mvY = this.ceil;
    }

    if (mvY > this.floor) {
      mvY = this.floor;
    }

    this.x = mvX;
    this.y = mvY;

    this.moveX = mvX - this.startX;
    this.moveY = mvY - this.startY;

    if (this.triggered) {
      this.on();
    }
  };

  handleEnd = (e) => {
    if (this.trigger === 'press') {
      this.triggered = false;
      return;
    }
    let x = 0; let
      y = 0;
    if (e instanceof TouchEvent) {
      const { clientX, clientY } = e.changedTouches[0] || {};
      x = clientX;
      y = clientY;
    }
    if (e instanceof MouseEvent) {
      const { clientX, clientY } = e || {};
      x = clientX;
      y = clientY;
    }
    this.endX = x;
    this.endY = y;

    this.on('onEnd');
  };

  register() {
    window.addEventListener('touchstart', this.handleStart);
    window.addEventListener('touchmove', this.handleMove);
    window.addEventListener('touchend', this.handleEnd);

    window.addEventListener('mousedown', this.handleStart);
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleEnd);
  }

  destroy() {
    window.removeEventListener('touchstart', this.handleStart);
    window.removeEventListener('touchmove', this.handleMove);
    window.removeEventListener('touchend', this.handleEnd);

    window.removeEventListener('mousedown', this.handleStart);
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleEnd);
  }
}
