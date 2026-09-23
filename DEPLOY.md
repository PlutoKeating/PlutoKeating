# 部署到 Cloudflare Pages

这个仓库是使用 Tailwind CSS 构建的静态站点。`README.md` 是项目资料来源；构建脚本从项目表格生成页面，将贡献图转换为网站配色，并把可部署文件写入 `dist/`。

## 1. 连接 GitHub 仓库

在 Cloudflare 控制台进入 **Workers & Pages → Create application → Pages → Connect to Git / Import an existing Git repository**，选择 `PlutoKeating/PlutoKeating`，然后点击 **Begin setup**。选择 **Pages** 项目，不需要创建 Worker。

## 2. 填写构建设置

| 控制台字段 | 填写内容 |
| --- | --- |
| Project name | 建议 `plutokeating-profile`；若已被占用，可换名。这决定 `<项目名>.pages.dev` 地址。 |
| Production branch | `main` |
| Framework preset | `None` / 无框架 |
| Build command | `npm run build` |
| Build output directory | `dist`，不要加开头的 `/` |
| Root directory / Path | 留空，使用仓库根目录 |
| Environment variables | 留空 |

新建 Pages 项目默认使用 **v3 构建系统和 Node.js 22**，满足本项目要求。如果控制台出现构建系统版本选项，选择 v3。依赖会依据根目录的 `package.json` 和 `package-lock.json` 自动安装；若界面额外要求填写安装命令，使用 `npm ci`。不要设置 `NODE_ENV=production` 或 `SKIP_DEPENDENCY_INSTALL`，因为 Tailwind CLI 是构建依赖。

然后点击 **Save and Deploy**。

## 3. 首次部署后检查

在 **Deployments** 中确认生产部署为 **Success**，并打开分配的 `<项目名>.pages.dev`。检查首页、项目搜索、头像、贡献墙和下面几个静态资源：

- `/style.css`
- `/app.js`
- `/pluto-portrait.jpg`
- `/contribution-site.svg`

仓库已经把 `_headers` 复制到部署目录，安全响应头会自动生效。无需配置 Pages Functions、绑定、兼容日期、路由或额外缓存规则。

## 4. 自动部署与预览

在项目的 **Settings → Builds & deployments** 中，保持 **Production branch = main** 和 **automatic production deployments** 开启。构建监视路径保持默认的“所有文件”；这样每日更新 README 与贡献图的 GitHub Actions 提交也应触发构建。

非 `main` 分支可保持默认的预览部署设置，这样分支或 PR 会得到独立预览地址。预览部署默认公开；如有访问限制需求，可在 Pages 的预览设置中启用 Cloudflare Access。

## 5. 自定义域名（可选）

项目部署成功后进入 **Custom domains → Set up a domain**，先在 Pages 项目中添加要使用的域名。

- **子域名**，如 `profile.example.com`：若域名 DNS 由 Cloudflare 管理，确认后通常会自动创建对应记录；若 DNS 在别处管理，按页面提示创建指向 `<项目名>.pages.dev` 的 CNAME。
- **根域名**，如 `example.com`：域名必须接入同一个 Cloudflare 账户，并使用 Cloudflare 提供的名称服务器。

不要只添加 DNS 记录而跳过 Pages 项目里的 **Custom domains** 绑定。域名激活后，Cloudflare 会处理其证书；若还想把 `pages.dev` 地址统一跳转到自定义域名，可以另外配置 Bulk Redirect。

## 常见问题

- **首页 404**：确认输出目录为 `dist`，并在部署日志里确认构建成功生成 `dist/index.html`。
- **`tailwindcss: command not found`**：检查依赖安装日志、构建系统是否为 v3，以及是否设置了 `NODE_ENV=production` 或 `SKIP_DEPENDENCY_INSTALL`。
- **推送后未自动部署**：检查 `main` 分支自动部署、构建监视路径、Cloudflare GitHub App 的仓库访问权限。
- **更新后看到旧样式**：先确认新部署为 Success；本项目使用 Pages 默认的静态资源缓存，不需要额外的 Cache Rule。

本地预览需要 Node.js 20 或更新版本以及 Python 3：先运行 `npm ci`、`npm run build`，再运行 `npm run dev`，打开 <http://localhost:4173>。

项目内容请编辑 `README.md`，页面布局与样式在 `site/`。构建结果 `dist/` 已加入 `.gitignore`，无需提交。

参考：[Git 集成](https://developers.cloudflare.com/pages/get-started/git-integration/) · [构建镜像](https://developers.cloudflare.com/pages/configuration/build-image/) · [自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/) · [预览部署](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
