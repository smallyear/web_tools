# 设计规范 - Web Tools 在线工具聚合站

## 技术方案（已确认）

1. ✅ **样式方案**: 纯CSS（完全自定义）
2. ✅ **图标方案**: Emoji图标（🆔 📝 📱 🔤）
3. ✅ **身份证水印参数**: 参考小程序代码
4. ✅ **技术栈**: 纯前端（无后端）
5. ✅ **配色方案**: 科技感（蓝色系）

---

## 配色方案（科技感蓝色系）

### 主色
- **主蓝色**: #1E88E5
- **深蓝色**: #1565C0
- **浅蓝色**: #64B5F6

### 辅助色
- **背景色**: #F5F7FA
- **卡片背景**: #FFFFFF
- **文字颜色**: #333333
- **辅助文字**: #666666
- **边框颜色**: #E0E0E0

### 功能色
- **成功色**: #4CAF50
- **警告色**: #FF9800
- **错误色**: #F44336
- **链接色**: #1E88E5

---

## 布局规范

### 容器宽度
- 最大宽度: 1200px
- 内容区: 960px
- 边距: 24px

### 间距
- 小间距: 8px
- 间距: 16px
- 大间距: 24px
- 超大间距: 32px

### 圆角
- 小圆角: 4px
- 中圆角: 8px
- 大圆角: 16px

### 阴影
- 卡片阴影: 0 2px 8px rgba(0, 0, 0, 0.1)
- 悬浮阴影: 0 4px 12px rgba(0, 0, 0, 0.15)

---

## 字体规范

### 字体族
- 主字体: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif
- 等宽字体: 'Monaco', 'Menlo', 'Consolas', monospace

### 字体大小
- 大标题: 32px
- 标题: 24px
- 小标题: 18px
- 正文: 14px
- 小字: 12px

---

## 图标方案（Emoji）

### 首页工具图标
- 身份证水印: 🆔
- JSON格式化: 📝
- 二维码生成: 📱
- Base64编解码: 🔤

### 功能图标
- 上传: 📤
- 下载: 📥
- 复制: 📋
- 清空: 🗑️
- 重置: 🔄

---

## 身份证水印工具设计

### 页面布局
```
┌─────────────────────────────────────┐
│         上传区域（拖拽或点击）        │
└─────────────────────────────────────┘

┌─────────────────┬───────────────────┐
│  预览区（Canvas）│   配置区          │
│                 │                   │
│                 │  模板选择         │
│                 │  自定义文字       │
│                 │  透明度           │
│                 │  字体大小         │
│                 │  旋转角度         │
│                 │  颜色选择         │
│                 │                   │
│                 │  [重置] [下载]    │
└─────────────────┴───────────────────┘
```

### 默认参数（参考小程序）
- **透明度**: 128 (50%)
- **字体大小**: 30px
- **旋转角度**: 0度
- **颜色**: #FF0000 (红色)

### 预设模板
1. 仅供办理银行卡使用
2. 仅供办理签证使用
3. 仅供租房使用
4. 仅供入职使用
5. 仅供办理证件使用
6. 仅供本人使用，他用无效

### 水印布局
- 中心大水印
- 四角小水印（20%和80%位置）
- 四周水印大小为中心的60%

---

## 响应式断点

- 移动端: < 768px
- 平板: 768px - 1024px
- 桌面: > 1024px

---

## 动画规范

### 过渡时间
- 快速: 0.2s
- 正常: 0.3s
- 慢速: 0.5s

### 缓动函数
- 标准缓动: ease
- 缓入: ease-in
- 缓出: ease-out
- 缓入缓出: ease-in-out

---

## 表单规范

### 输入框
- 高度: 40px
- 内边距: 0 12px
- 边框: 1px solid #E0E0E0
- 圆角: 4px
- 聚焦边框: #1E88E5

### 按钮
- 主要按钮: 蓝色背景 #1E88E5，白色文字
- 次要按钮: 白色背景，蓝色边框
- 高度: 40px
- 内边距: 0 24px
- 圆角: 4px
- 悬浮: 背景色加深

---

## 加载动画

使用 CSS 旋转动画，蓝色主色。

```css
.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1E88E5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 文件命名规范

- HTML: 使用小写字母和连字符 (index.html, id-watermark.html)
- CSS: 使用小写字母和连字符 (style.css)
- JS: 使用小写字母和连字符 (watermark.js)
- 图片: 使用小写字母和连字符 (logo.png, icon-qr.png)

---

## 代码注释规范

### HTML
```html
<!-- 页面标题 -->
<header>...</header>

<!-- 工具列表 -->
<div class="tools-grid">...</div>
```

### CSS
```css
/* 主按钮样式 */
.btn-primary {
  background-color: #1E88E5;
}
```

### JavaScript
```javascript
// 初始化Canvas
function initCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}
```

---

## 浏览器兼容性

### 最低支持
- Chrome: 90+
- Firefox: 88+
- Safari: 14+
- Edge: 90+

### 特性支持
- ES6+: ✅
- Canvas API: ✅
- FileReader API: ✅
- CSS Grid: ✅
- CSS Flexbox: ✅

---

## SEO 优化

### 元标签
- title: 工具名称 - Web Tools
- description: 工具简介
- keywords: 工具关键词

### 结构化数据
- 使用语义化 HTML5
- 添加 alt 属性
- 适当的 heading 层级

---

## 性能优化

1. CSS 压缩
2. JS 压缩
3. 图片压缩
4. 避免不必要的重绘
5. 使用 requestAnimationFrame 优化动画

---

## 安全规范

1. 用户输入验证（XSS 防护）
2. 文件类型验证
3. 文件大小限制
4. 不上传敏感数据到服务器
5. 使用 HTTPS

---

## 总结

所有设计规范已确认，可以开始开发。

✅ 技术方案确定
✅ 配色方案确定
✅ 布局规范确定
✅ 水印参数确定
✅ 图标方案确定
