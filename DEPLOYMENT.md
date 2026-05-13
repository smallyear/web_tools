# 部署方案 - Web Tools 在线工具聚合站

## 一、国内访问说明

### 域名备案要求
- **国内服务器**（阿里云/腾讯云）：必须备案域名
- **海外服务**（GitHub/Vercel/Netlify）：不需要备案，但国内访问可能较慢或偶尔被墙
- **CDN加速**：使用Cloudflare等海外CDN可改善访问速度，但仍可能被干扰

### 推荐方案
1. **GitHub Pages** - 免费，国内可访问但不稳定
2. **Vercel** - 免费，国内访问较慢
3. **Cloudflare Pages** - 免费，国内访问改善
4. **阿里云** - 收费，国内稳定但需备案

---

## 二、方案A：GitHub Pages（推荐，最简单）

### 优点
- ✅ 完全免费
- ✅ 部署简单（推送代码即可）
- ✅ GitHub账号即可，无需额外注册
- ✅ 支持自定义域名
- ✅ HTTPS自动配置

### 缺点
- ⚠️ 国内访问速度较慢
- ⚠️ 偶尔不稳定
- ⚠️ 域名不备案，某些企业网络可能屏蔽

### 部署步骤

#### 1. 创建GitHub仓库
```bash
cd /Users/grape/workspace/web_tools
git init
git add .
git commit -m "Initial commit"
```

然后在GitHub创建新仓库：`web-tools`

#### 2. 推送代码
```bash
git remote add origin https://github.com/YOUR_USERNAME/web-tools.git
git push -u origin main
```

#### 3. 启用GitHub Pages
1. 打开仓库 → Settings → Pages
2. Source选择 `main` 分支
3. Folder选择 `/ (root)`
4. 保存

#### 4. 访问网站
- 免费域名: `https://YOUR_USERNAME.github.io/web-tools/`
- 访问速度：国内一般，可能需要几秒

---

## 三、方案B：Vercel（推荐，免费+CDN）

### 优点
- ✅ 完全免费
- ✅ 自动部署，开发体验好
- ✅ 全球CDN（国内访问比GitHub Pages稍好）
- ✅ HTTPS自动配置

### 缺点
- ⚠️ 国内访问速度一般
- ⚠️ 偶尔被墙

### 部署步骤

#### 1. 注册Vercel
访问 https://vercel.com，使用GitHub账号登录

#### 2. 导入项目
1. Dashboard → New Project
2. 选择 GitHub 仓库
3. 框架选择 `Other`（纯静态站点）
4. Root Directory: `./`
5. 点击 `Deploy`

#### 3. 部署完成
- 免费域名: `https://web-tools-YOURNAME.vercel.app`
- 每次推送代码到main分支，自动重新部署

---

## 四、方案C：Cloudflare Pages（推荐，国内友好）

### 优点
- ✅ 完全免费
- ✅ Cloudflare CDN（国内访问相对较好）
- ✅ HTTPS自动配置
- ✅ 支持自定义域名

### 缺点
- ⚠️ 部署略复杂
- ⚠️ 需要注册Cloudflare账号

### 部署步骤

#### 1. 注册Cloudflare
访问 https://pages.cloudflare.com

#### 2. 连接GitHub仓库
1. 创建新项目
2. 选择 GitHub 仓库
3. 配置构建：
   - Build command: 空
   - Output directory: `.`
4. 点击 `Deploy`

#### 3. 访问
- 免费域名: `https://YOURNAME.pages.dev`
- 国内访问相对较好

---

## 五、方案D：阿里云（国内最佳）

### 优点
- ✅ 国内访问速度最快
- ✅ 稳定
- ✅ 备案后可用国内CDN

### 缺点
- ❌ 需要备案域名（约1-2周）
- ❌ 服务器收费（最低约50元/月）
- ❌ 需要手动配置

### 部署步骤

#### 1. 购买域名
1. 访问 https://wanwang.aliyun.com
2. 搜索并购买域名（如: web-tools.com）
3. 完成实名认证

#### 2. 备案域名
1. 登录阿里云控制台
2. ICP备案 → 填写信息
3. 等待审核（1-2周）
4. 备案通过后，域名才能解析到国内服务器

#### 3. 购买服务器（可选）
- 选择：阿里云ECS（轻量应用服务器最便宜）
- 或选择OSS静态网站托管

#### 4. 配置域名解析
1. 在DNS中添加A记录指向服务器IP
2. 或使用OSS Bucket域名

#### 5. 部署代码
```bash
# 如果使用OSS
# 1. 上传所有文件到OSS Bucket
# 2. 开启静态网站托管
# 3. 绑定自定义域名
```

---

## 六、推荐方案

### 初期（现在）
**GitHub Pages + Cloudflare CDN**
1. 用GitHub Pages部署（免费）
2. 用Cloudflare加速（改善国内访问）
3. 不需要备案

### 中期（稳定使用后）
**购买域名 + Vercel/Cloudflare Pages**
1. 购买域名（阿里云/腾讯云）
2. 无需备案，使用海外服务商
3. DNS解析指向Vercel/Cloudflare Pages

### 后期（如果国内用户多）
**阿里云备案 + OSS/服务器**
1. 备案域名（确保国内稳定访问）
2. 使用OSS静态托管（成本低）
3. 配置CDN加速

---

## 七、快速开始（推荐）

### 步骤1：部署到GitHub Pages（5分钟）
```bash
cd /Users/grape/workspace/web_tools
git init
git add -A
git commit -m "Initial commit"
# 在GitHub创建仓库后
git remote add origin https://github.com/smallyear/web-tools.git
git push -u origin main
```

### 步骤2：启用GitHub Pages
1. GitHub仓库 → Settings → Pages
2. Source: main 分支
3. 保存，等待1-2分钟

### 步骤3：访问
`https://smallyear.github.io/web-tools/`

### 步骤4（可选）：购买域名
1. 阿里云购买域名（如: smallyear-tools.com）
2. DNS添加C记录指向 `smallyear.github.io`
3. GitHub Pages绑定域名
4. 等待DNS生效（几小时）

---

## 八、注意事项

### 国内访问
- GitHub Pages + Cloudflare 通常可用，但偶尔被干扰
- 如果需要稳定国内访问，必须备案域名 + 国内服务器
- 纯前端工具不涉及后端，备案后即可部署

### HTTPS
- GitHub/Vercel/Cloudflare 都自动提供HTTPS
- 自定义域名需要配置SSL证书

### 更新部署
- GitHub Pages: 推送代码到main分支，自动部署
- Vercel: 推送代码到main分支，自动部署
- 阿里云: 需要手动上传或使用CI/CD

---

## 九、费用估算

### 方案A/B/C（免费）
- 域名: 0元（使用免费域名）
- 托管: 0元
- CDN: 0元（使用免费额度）
- **总计: 0元**

### 方案D（阿里云）
- 域名: 约50元/年
- 服务器: 约50元/月（最低配置）
- 备案: 0元（免费）
- **总计: 约650元/年**

---

## 十、建议

1. **先用GitHub Pages免费部署**，测试功能
2. **如果需要稳定国内访问**，购买域名 + 使用Cloudflare Pages
3. **如果后期考虑商业化**，再备案域名 + 阿里云部署

**当前推荐：方案A（GitHub Pages）+ 可选Cloudflare加速**
