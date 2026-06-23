# 域名配置方案

## 方案：Cloudflare 购买域名 + DNS 映射（不备案）

### 步骤

1. 在 Cloudflare 注册购买域名（推荐 `.com` 或 `.app`，~$10/年）
2. Cloudflare DNS 添加 CNAME 记录：
   - 名称：`www`（或 `@`）
   - 目标：`smallyear.github.io`
   - 代理状态：DNS only（灰色云朵，不走 Cloudflare 代理）
3. GitHub 仓库 Settings → Pages → Custom domain，填入购买的域名
4. 等 DNS 生效（几分钟到几小时）
5. 勾选 GitHub 的 Enforce HTTPS
7. 更新首页页脚备案号文本（移除占位符）

### 注意事项

- 不走 ICP 备案，无法使用 `.cn` 域名
- GitHub Pages 自带 CDN 和 HTTPS，无需 Cloudflare 代理
- Cloudflare 代理（橙色云朵）可能导致 GitHub Pages 冲突，保持 DNS only
- 域名生效后站点路径从 `smallyear.github.io/web_tools/` 变为根路径
- 内部链接都是相对路径，无需修改代码

### 不做的事

- ICP 备案（需国内服务器，本方案不需要）
- Cloudflare CDN 代理（GitHub Pages 自带）
- 国内服务器购买
