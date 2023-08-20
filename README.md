# 简介
收集一些我自己常用到的工具函数。（持续更新中...）
# 函数列表

- hello: 测试函数
- dateFormat: 日期格式化
- downloadFileWithATag: a标签下载文件
- getDateObjectValue: 获取日期对象
- getFileHash: 获取文件hash
- mergeObj: 合并对象
- numberPaddingZero: 数字填充0
- styleStrToObj: 样式字符串转对象

# 用法
CommonJS规范用法：
```javascript
const { hello } = require('@alanlee97/utils');
hello();
```

ES Module规范用法：
```javascript
// You should add `"type": "module"` to package.json.
import { hello } from '@alanlee97/utils';
hello();
```

script type=module
```html
<!-- You should run html file with server. -->
<script type="module">
    import { hello } from './dist/index.esm.js';
    hello();
</script>
```

UMD规范用法：
```javascript
const JSUtils = require('@alanlee97/utils');
JSUtils.hello();
```
