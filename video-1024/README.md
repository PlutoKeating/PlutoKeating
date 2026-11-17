# PlutoKeating × 2026·1024 纪念片

竖屏 1080×1920 · 30fps · 约 2 分 56 秒 · Remotion 项目。

## 常用命令

```bash
npm run dev            # 打开 Remotion Studio 预览（composition id: Pluto1024）
./render.sh            # 渲染到 out/pluto-1024.mp4
npx remotion still Pluto1024 --frame=1800 /tmp/x.png   # 单帧预览
```

## 结构

- `src/lib/theme.ts`：design system token（取自 site/design-system）与抖音安全区 `SAFE`。
- `src/lib/timing.ts`：音乐 110 BPM 节拍网格与各章节时间表 `SCHEDULE`（秒），改这里即可移动章节。
- `src/ui/primitives.tsx`：Backdrop / Safe / Panel / TypeText / PhoneFrame / Sfx 等原语。
- `src/ui/ContribWall.tsx`：贡献墙，数据来自 `src/lib/contrib.json`（由仓库根目录 contribution-light.svg 提取）。
- `src/scenes/*.tsx`：Opening → Chapter1 起点 → Wall → Chapter2 即刻体验 → Chapter3 工具与基座 → Chapter4 拆解与移植 → Outro。
- `public/audio/music.mp3`：《知识的小曲》；`public/sfx/*.wav`：合成的轻量音效；`public/shots/*.png`：各线上站点的手机截图。

## 更新截图 / 贡献墙

- 截图脚本在会话 scratchpad 中生成，重截时用 Playwright 390×844 @3x 视口，文件名 `<name>-1.png`。
- 贡献墙：从 `../contribution-light.svg` 重新提取 `data-date / data-score / x / y` 到 `src/lib/contrib.json`。
