# 部署说明 - Web Tools

## 当前部署方案

**GitHub Pages + Cloudflare CDN**

- 代码仓库：https://github.com/smallyear/web_tools
- 在线访问：https://web-tools.cn（自定义域名，备案中）
- GitHub Pages：https://smallyear.github.io/web_tools/
- CDN 加速：Cloudflare（免费 Free Plan）

---

## 环境要求

- 无后端，纯静态站点
- 零依赖，零构建步骤
- 所有工具在前端浏览器中运行

---

## 本地预览

```bash
cd /Users/grape/workspace/web_tools
python3 -m http.server 8080
# 打开 http://localhost:8080
```

---

## GitHub Pages 部署

### 前提：已推送到 GitHub

```bash
cd /Users/grape/workspace/web_tools
git push origin main
```

### 启用 Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Source**：选择 `main` 分支，文件夹选 `/ (root)` → **Save**
3. 等待 1~2 分钟 → 访问 `https://smallyear.github.io/web_tools/`

### 自定义域名

在 Pages 设置页 → **Custom domain** → 输入你的域名 → **Save**

---

## Cloudflare 配置详情

详见 [DOMAIN_SETUP.md](DOMAIN_SETUP.md)

---

## 新增工具开发

每个工具在 `tools/<name>/` 下单独目录：

```
tools/
├── id-watermark/index.html   # 工具HTML + JS + CSS
├── image-cropper/index.html
└── ...
```

需要新增工具时：
1. 创建 `tools/<name>/index.html`
2. 在 `assets/css/style.css` 加独立样式（不分离也行，直接 `<style>` 也行）
3. 在 `index.html` 首页加一张 `<a class="tool-card">` 卡片

---

## 注意事项

- **可公开**：本项目纯前端，无密钥、无后端密钥、无任何敏感信息
- **不需要备案也能用**：GitHub Pages + Cloudflare 可直接访问
- **备案优势**：国内访问更稳定，适合国内用户较多的场景
- **更新部署**：推送到 GitHub 即自动部署 Page
