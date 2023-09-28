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

  register = () => {
    window.addEventListener('touchstart', this.handleStart);
    window.addEventListener('touchmove', this.handleMove);
    window.addEventListener('touchend', this.handleEnd);

    window.addEventListener('mousedown', this.handleStart);
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleEnd);
  };

  destroy = () => {
    window.removeEventListener('touchstart', this.handleStart);
    window.removeEventListener('touchmove', this.handleMove);
    window.removeEventListener('touchend', this.handleEnd);

    window.removeEventListener('mousedown', this.handleStart);
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleEnd);
  };
}
