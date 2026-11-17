import { useCurrentFrame } from "remotion";
import cells from "../lib/contrib.json";
import { T } from "../lib/theme";
import { progress, rand } from "../lib/anim";

const LEVEL = [
  "rgb(232 228 221 / 0.06)",
  "rgb(240 163 94 / 0.32)",
  "rgb(240 163 94 / 0.58)",
  "rgb(240 163 94 / 0.82)",
  "#f5b67c",
];

/**
 * 贡献墙：53 列 × 7 行。
 * ignite: 点亮进度 0..1（按列从左到右扫过）；breath: 是否呼吸。
 */
export const ContribWall = ({
  width = 816,
  ignite = 1,
  breath = true,
  gap = 4,
  wrap = 2,
}: {
  width?: number;
  ignite?: number;
  breath?: boolean;
  gap?: number;
  /** 把 53 列折成几段上下堆叠（竖屏下更易读） */
  wrap?: number;
}) => {
  const frame = useCurrentFrame();
  const cols = 53;
  const per = Math.ceil(cols / wrap);
  const cell = (width - gap * (per - 1)) / per;
  const bandH = cell * 7 + gap * 6;
  const bandGap = cell * 1.6;
  const height = bandH * wrap + bandGap * (wrap - 1);
  return (
    <div style={{ position: "relative", width, height }}>
      {cells.map((c, i) => {
        const col01 = c.c / (cols - 1);
        // 每列在 ignite 扫到时点亮，带一点随机提前/延后
        const lit = progress(ignite, col01 - 0.02 + rand(i) * 0.03, 0.06);
        const b =
          breath && c.s > 0
            ? 0.85 + 0.15 * Math.sin((frame + i * 7) / 18)
            : 1;
        const base = LEVEL[0];
        const on = LEVEL[c.s];
        return (
          <div
            key={c.d}
            style={{
              position: "absolute",
              left: (c.c % per) * (cell + gap),
              top: Math.floor(c.c / per) * (bandH + bandGap) + c.r * (cell + gap),
              width: cell,
              height: cell,
              borderRadius: 2,
              background: lit > 0 && c.s > 0 ? on : base,
              opacity: c.s > 0 ? (lit > 0 ? b * (0.4 + 0.6 * lit) : 1) : 1,
              scale: c.s > 0 ? String(0.7 + 0.3 * lit) : "1",
              boxShadow:
                c.s >= 3 && lit > 0.5
                  ? `0 0 ${8 * lit}px ${T.accentGlow}`
                  : "none",
            }}
          />
        );
      })}
    </div>
  );
};
