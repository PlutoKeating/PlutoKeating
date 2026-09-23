# 部署到 Cloudflare Pages

这个仓库是无框架的静态站点。`README.md` 是项目资料的唯一来源；每次构建都会从其中的项目表格生成页面，并将贡献图转换为网站专用的深灰橙红配色后写入 `dist/`。

## 本地预览

需要 Node.js 20 或更新版本，以及 Python 3。

```sh
npm ci
npm run build
npm run dev
```

打开 <http://localhost:4173>。Tailwind CSS 在构建时生成静态样式，站点没有运行时 npm 依赖。

## 连接 Cloudflare Pages

在 Cloudflare 控制台的 **Workers & Pages → Create application → Pages → Import an existing Git repository** 中选择此仓库。构建设置填：

| 设置 | 值 |
| --- | --- |
| Framework preset | None |
| Production branch | 仓库的默认分支 |
| Root directory | 留空（仓库根目录） |
| Build command | `npm run build` |
| Build output directory | `dist` |

无需环境变量。推送到生产分支后，Cloudflare Pages 会重新构建并发布。仓库现有的 GitHub Actions 每日更新 README 星数和贡献图；这些提交也会触发站点更新。

项目内容请编辑 `README.md`，页面布局与样式在 `site/`。构建结果 `dist/` 已加入 `.gitignore`，无需提交。
