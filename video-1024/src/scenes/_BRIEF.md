# 场景开发约定（给所有场景作者）

- 画布 1080×1920，30fps。场景内部帧从 0 开始；组件签名 `({durationInFrames}) => JSX`，最后用 `makeScene(Inner)` 导出，例如 `export const Chapter1 = makeScene(Chapter1Inner)`。
- 所有关键内容必须放在 `<Safe>` 内（左 64 / 上 190 / 右 200 / 下 560，可用区 816×1170）。装饰性元素（光晕、网格、淡色大字）可以溢出安全区，但文字和截图不能。
- 只用 `src/ui/primitives.tsx` 与 `src/lib/*` 已有的原语和 token；颜色只用 `T.*`；不要引入新依赖，不要用 CSS transition/animation（Remotion 不支持），一切动画用 `useCurrentFrame` + `interpolate`/`progress`。
- 文案：中文为主，短句，每屏不超过两行正文；英文只出现在 mono 标签里（如 `// 2023 · SHELL`）。不要出现任何数字统计（星标数、提交数、仓库数）。
- 节拍：音乐 110 BPM，一拍 0.5454s ≈ 16.4 帧。子项目切换尽量落在整拍（用 `beatFrame`/`snapToBeat`，以场景起始秒为基准换算）。
- 音效（`<Sfx name=... from=... volume=...>`）极其克制：每个子项目入场最多一个 whoosh(0.35)；高光点一个 spark(0.4)；章节标题落地一个 thump(0.5)；列表/格子逐个出现用 tick(0.2)，间隔不少于 4 帧且总数不超过 12 个；打字用 `<TypeSfx>`（volume 0.2）。不要叠太多。
- 每个子项目的结构：`ProjectTitle`（mono 标签 + 名称 + 一句话） + 一个“示意动画”或手机截图。示意动画用 inline SVG/div 绘制，颜色用 accent/secondary/fg，线条 2–3px，风格克制、几何。
- 截图在 `public/shots/<name>-1.png`、`<name>-2.png`（390×844@3x），用 `<PhoneFrame src="shots/xxx-1.png" width=420 />`。写代码前先 `ls public/shots` 确认存在；不存在的就用示意动画顶替，不要引用不存在的文件。
- 场景结尾最后 10 帧整体淡出（可用 `window01(frame, 0, durationInFrames)` 做整体 opacity）。
- 完成后运行 `npx tsc --noEmit -p .` 确认无类型错误，并运行 `npx remotion still Pluto1024 --frame=<场景内某帧+场景起始帧> /tmp/claude-1000/-home-pluto-profile-readme/d0e39269-59e9-4655-8e74-4f546fe7efe4/scratchpad/still-<name>.png` 至少截 3 帧（起始、中段、结尾前）用 Read 看效果并修正：文字不出安全区、不重叠、不溢出。
