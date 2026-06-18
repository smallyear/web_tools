# Web Tools - 在线工具聚合站

**💻 纯前端在线工具集合，数据不出浏览器，保护隐私**
**🌐 访问地址：[https://smallyear.github.io/web_tools/](https://smallyear.github.io/web_tools/)**

---

## 工具列表

|| 工具 | 描述 | 状态 |
||------|------|------|
|| 🆔 **身份证水印生成器** | 上传身份证，一键添加防伪水印 | ✅ |
|| 📝 **JSON格式化工具** | JSON格式化、压缩、语法校验、高亮 | ✅ |
|| 📱 **二维码生成器** | 文本/链接生成二维码，自定义颜色 | ✅ |
|| 🔤 **Base64编解码** | 文字编解码、图片转Base64 | ✅ |
|| ✏️ **Markdown编辑器** | 实时预览，导出HTML/PDF | ✅ |
|| 🗜️ **图片压缩工具** | JPG/PNG压缩，降低文件大小 | ✅ |
|| ✂️ **图片裁剪工具** | 证件照尺寸裁剪，自由拖动 | ✅ |
|| 🎨 **证件照背景更换** | 更换证件照背景，支持蓝/白/红底 | ✅ |
|| 🔐 **密码生成器** | 高强度随机密码，自定义规则 | ✅ |
|| 📅 **日期计算器** | 日期差/加减/工作日计算 | ✅ |
|| 💱 **汇率计算器** | 实时汇率查询和货币转换 | ✅ |

---

## 项目结构

```
web_tools/
├── index.html              # 首页 - 工具导航卡片
├── CNAME                   # 自定义域名 (Web Tools 在线工具)
├── assets/
│   ├── css/style.css       # 全局样式
│   └── js/common.js        # 公共函数 (拖拽上传、消息提示等)
├── tools/
│   ├── id-watermark/       # 身份证水印生成器
│   ├── json-formatter/     # JSON格式化工具
│   ├── qrcode-generator/   # 二维码生成器
│   ├── base64-converter/   # Base64编解码
│   ├── markdown-editor/    # Markdown编辑器
│   ├── image-compressor/   # 图片压缩工具
│   ├── image-cropper/      # 图片裁剪工具
│   ├── photo-background-changer/  # 证件照背景更换
│   ├── password-generator/ # 密码生成器
│   ├── date-calculator/    # 日期计算器
│   └── currency-converter/ # 汇率计算器
├── README.md               # 本文件
├── DEPLOYMENT.md           # 部署说明
├── DOMAIN_SETUP.md         # 域名+备案+CDN全流程
└── CHECKLIST.md            # 开发清单
```

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 前端 | HTML5 + CSS3 + Vanilla JavaScript |
| 样式 | 原生 CSS，CSS Variables 主题系统 |
| 部署 | GitHub Pages + Cloudflare CDN |
| 后端 | 无（所有工具纯前端运行）|
| 依赖 | 无外部依赖，零构建步骤 |

---

## 本地预览

```bash
cd /Users/grape/workspace/web_tools
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 在线访问

GitHub Pages 自动部署：https://smallyear.github.io/web_tools/

---

## 开发状态

- [x] 第一批工具（10个）全部完成
- [x] GitHub Pages 部署
- [ ] 自定义域名配置（见 `DOMAIN_SETUP.md`）
- [ ] ICP 备案
- [ ] Cloudflare CDN 配置

---

## 贡献

本项目纯前端，各工具模块互相独立，每个工具在 `tools/<name>/index.html` 下单独目录开发。新增工具按现有结构添加卡片即可。

---

&copy; 2026 Web Tools - 纯前端工具，数据安全
