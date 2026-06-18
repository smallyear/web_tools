# 域名部署全流程 - Web Tools

> 从零到国内可访问，全程约 7~20 天（备案时间不可压缩）

---

## 第一步：购买域名（当天，~30 分钟）

### 操作

1. 打开 [阿里云域名注册](https://wanwang.aliyun.com/domain/) → 搜索可用域名
2. 推荐：`web-tools.cn`（~30 元/年）或 `web-tools.com`（~60 元/年）
3. 点击「加入清单」→「结算」→ 完成支付

### 实名认证

1. 支付完成 → 进入 [域名控制台](https://domain.console.aliyun.com/)
2. 找到新建域名 → 点击「实名认证」
3. 选择 **个人认证** → 上传身份证正反面 → 人脸验证
4. 审核约 1~24 小时

✅ **完成标志**：控制台域名状态显示为「正常」

---

## 第二步：ICP 备案（7~20 天，唯一耗时步骤）

> 等域名实名认证通过后再提交，两者并行亦可

### 操作

1. 域名控制台 → 找到域名 → 点击 **ICP 备案**
2. 跳转到 [阿里云备案系统](https://beian.aliyun.com/) → 点「开始备案」
3. 填写信息：

| 字段 | 填写内容 |
|------|---------|
| 主体类型 | 个人 |
| 真实姓名 | 你的姓名 |
| 证件类型 | 身份证 |
| 证件号码 | 你的身份证号 |
| 域名 | 勾选刚买的域名 |
| 网站名称 | Web Tools 在线工具 |
| 网站方向 | 工具类 |
| 服务内容 | 自助建站/工具类 |
| 备案备注 | 纯前端静态站点，无后台，无数据库 |

4. 上传证件照片 → 人脸核身 → 提交

### 审核流程

```
你提交 → 阿里云初审 (1~3天) → 管局短信核验 → 管局终审 (7~20天) → 备案通过
```

- **阿里云初审**：1~3 天，有问题阿里云会打电话确认，保持手机畅通
- **管理局短信核验**：初审通过后工信部会发短信验证码，在备案系统填写
- **管局终审**：最长 20 天，通常 7~15 天

### 备案通过后

1. 拿到备案号，格式：`京ICP备XXXXXXXX号`（根据你所在省份）
2. 更新网站页脚备案号（见第五步）

> ⚠️ 备案期间域名可以正常使用，不影响 GitHub Pages 访问。

---

## 第三步：Cloudflare 配置（备案同步进行，当天，~30 分钟）

阿里云实名通过后即可操作，不依赖备案。

### 3.1 注册 Cloudflare

1. 打开 [dash.cloudflare.com](https://dash.cloudflare.com) → Sign up → 邮箱注册
2. 验证邮箱 → 登录

### 3.2 添加站点

1. 点击 **Add a site** → 输入你的域名（如 `web-tools.cn`）
2. → **Add site** → 选 **Free** plan（免费）→ **Continue**
3. Cloudflare 自动分配两个 nameserver，**复制保存**：
   ```
   lola.ns.cloudflare.com
   wolf.ns.cloudflare.com
   ```
   （实际名称以 Cloudflare 分配为准，两个不同）

### 3.3 修改阿里云 DNS 服务器

1. 回到阿里云 [域名控制台](https://domain.console.aliyun.com/)
2. 找到域名 → **修改DNS服务器** / **DNS修改**
3. 删除阿里云默认的两个 DNS → 粘贴 Cloudflare 分配的两个 nameserver
4. 保存 → **生效时间** 5分钟~24小时，通常 30 分钟内

### 3.4 添加 DNS 记录

Cloudflare 控制台 → 你的域名 → **DNS** → **Records** → **Add record**：

| 类型 | 名称 (Name) | 内容 (Content) | 代理状态 |
|------|------------|---------------|---------|
| CNAME | `www` | `smallyear.github.io` | 🟠 **Proxied（橙色云朵）** |
| CNAME | `@` | `smallyear.github.io` | 🟠 **Proxied（橙色云朵）** |

> **重要**：代理状态选 **橙色云朵（Proxied）**，Cloudflare 会代理解 HTTPS 证书。
> 之前说灰色是错误方向，橙色才是 Cloudflare CDN 加速的生效条件。

### 3.5 SSL/TLS 配置

Cloudflare → **SSL/TLS**：
- **加密模式** → **Full**
- **开启** → Always Use HTTPS
- **开启** → HTTP Strict Transport Security (HSTS)

→ 完成。现在访问 `https://your-domain.cn` 应该能看到 Cloudflare 的证书锁标志。

---

## 第四步：GitHub Pages 绑定自定义域名

1. GitHub → `smallyear/web_tools` 仓库 → **Settings** → **Pages**
2. **Custom domain** → 输入你的域名（如 `web-tools.cn`）
3. → **Save** ✅
4. GitHub 会在仓库根目录自动写入 `CNAME` 文件（无需手动创建）

---

## 第五步：验证 + 页面备案号公示

### 验证清单

| 检查项 | 操作 |
|--------|------|
| DNS解析 | `ping web-tools.cn` → 应返回 Cloudflare IP（非 GitHub IP）|
| HTTPS | 浏览器访问应显示 🔒 锁标志 |
| 国内速度 | 用 [站长工具](https://tool.chinaz.com/speedtest/) 测试 |
| Cloudflare 分析 | Cloudflare 后台 → Analytics 应有请求记录 |

### 页脚备案号

打开 `index.html`，修改 footer：

```html
<footer class="footer">
  <div class="footer-container">
    <p>&copy; 2026 Web Tools - 纯前端工具，数据安全</p>
    <p style="margin-top: 8px; font-size: 12px; opacity: 0.7;">
      京ICP备XXXXXXXX号
    </p>
  </div>
</footer>
```

> 将 `京ICP备XXXXXXXX号` 替换为实际备案号，位置放在首页页脚。

---

## 时间线

```
现在          → 阿里云买域名 + 实名认证          (~1天)
↓ 并行以上两项
同时          → Cloudflare 配置 + DNS切换          (~30分钟)
备案提交后    → 管局终审                           (7~20天)
备案通过后    → GitHub Pages 绑定域名 + 页脚挂备案号  (~1天)
```

域名 + Cloudflare 可以先配置好跑起来，备案通过后再挂备案号即可。

---

## 常见问题

**Q: 备案期间网站能访问吗？**
A: 可以。备案审核期间域名解析不受影响，GitHub Pages + Cloudflare 可以正常访问。

**Q: Cloudflare 橙色云朵（Proxied）和灰色云朵（DNS Only）的区别？**
A: 橙色 = Cloudflare CDN 加速 + 代理解 HTTPS 证书（推荐）；灰色 = 只做 DNS 解析，不加速。

**Q: 备案号挂错了能改吗？**
A: 可以，随时修改网站内容，不影响备案有效性。

**Q: GitHub Pages 私有仓库不能用 Pages，这个项目要私有吗？**
A: 不建议。Pages 免费额度只有公开仓库才有，私有需要升级团队计划（$4/月）。
