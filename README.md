# Web Tools - 在线工具聚合站

## 项目概述

一个在线工具聚合站，提供多种实用工具，包含核心特色工具"身份证水印生成器"。

## 技术栈

- **前端**: 纯静态 HTML + CSS + JavaScript
- **样式**: 原生 CSS 或 Bootstrap (待定)
- **部署**: GitHub Pages / Vercel (待定)
- **无后端**: 所有工具在前端运行

## 工具列表

### 第一批 (优先完成)
1. **身份证水印生成器** ⭐ - 核心特色工具
   - 上传身份证图片
   - 添加用途说明
   - 一键生成水印图片

2. **JSON格式化工具** - 开发者必备
   - JSON格式化/压缩
   - 语法高亮
   - 错误提示

3. **二维码生成器** - 实用工具
   - 文本/链接生成二维码
   - 自定义大小、颜色
   - 一键下载

4. **Base64编解码工具** - 调试工具
   - 文字编解码
   - 图片转Base64
   - Base64转图片

### 后续扩展
5. 汇率计算器
6. 日期计算器
7. 密码生成器
8. IP地址查询
9. ...

## 项目结构

```
web_tools/
├── index.html              # 首页 - 工具列表
├── assets/
│   ├── css/
│   │   └── style.css        # 全局样式
│   ├── js/
│   │   └── common.js        # 公共脚本
│   └── images/
├── tools/
│   ├── id-watermark/        # 身份证水印工具
│   │   └── index.html
│   ├── json-formatter/      # JSON格式化工具
│   │   └── index.html
│   ├── qrcode-generator/    # 二维码生成器
│   │   └── index.html
│   └── base64-converter/    # Base64编解码工具
│       └── index.html
├── README.md                # 项目说明
├── REQUIREMENTS.md          # 需求文档
└── CHECKLIST.md             # 开发清单
```

## 部署计划

1. 开发完成后推送到 GitHub
2. 使用 GitHub Pages 部署
3. 绑定自定义域名（可选）

## 开发状态

- [ ] 第一批工具开发完成
- [ ] 部署上线
- [ ] 后续工具扩展
