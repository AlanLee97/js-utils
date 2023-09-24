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
