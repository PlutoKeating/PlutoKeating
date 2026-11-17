// PlutoKeating design system tokens（来自 site/design-system/tokens.generated.css，深色主题）
export const T = {
  bg: "#0e0f11",
  bgElevated: "#131417",
  surface: "#17181c",
  surfaceHover: "#1d1e23",
  border: "rgb(232 228 221 / 0.08)",
  borderStrong: "rgb(232 228 221 / 0.18)",
  fg: "#e8e4dd",
  fgMuted: "#a9a49c",
  fgSubtle: "#6f6b65",
  accent: "#f0a35e",
  accentHover: "#f5b67c",
  accentFg: "#1a120a",
  accentSoft: "rgb(240 163 94 / 0.12)",
  accentGlow: "rgb(240 163 94 / 0.32)",
  secondary: "#7d8f8a",
  secondaryFg: "#c2cfcb",
  success: "#7fb08f",
  warning: "#d9b96a",
  danger: "#c97c7c",
  codeBg: "#111215",
  codeFg: "#d8d4cc",
  syntaxKeyword: "#c9a7d9",
  syntaxString: "#a7c9a3",
  syntaxConstant: "#e0c48a",
  syntaxFunction: "#9fc3d6",
  syntaxComment: "#6f6b65",
  orb: "#ffb26e",
  orbRim: "#fa7600",
  fontSans: '"Inter", "Noto Sans CJK SC", "Noto Sans SC", "Source Han Sans SC", sans-serif',
  fontMono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, "Noto Sans Mono CJK SC", monospace',
} as const;

// 画布 1080×1920。抖音/视频号安全区：避开顶部导航(D)、右侧按钮栏(C)、底部文案区(B)。
export const CANVAS = { width: 1080, height: 1920 } as const;
export const SAFE = { left: 64, top: 190, right: 200, bottom: 560 } as const;
export const SAFE_W = CANVAS.width - SAFE.left - SAFE.right; // 816
export const SAFE_H = CANVAS.height - SAFE.top - SAFE.bottom; // 1170
