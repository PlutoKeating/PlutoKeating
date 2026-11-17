import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  CanvasImage,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { T, SAFE, SAFE_W, SAFE_H } from "../lib/theme";
import { progress, rand, easeOut } from "../lib/anim";

/** 深色底 + cyber 网格 + 暖橙光晕。所有场景的底层。 */
export const Backdrop = ({
  glowX = 76,
  glowY = 24,
  children,
  style,
}: {
  glowX?: number;
  glowY?: number;
  children?: ReactNode;
  style?: CSSProperties;
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: T.bg,
      fontFamily: T.fontSans,
      color: T.fg,
      overflow: "hidden",
      ...style,
    }}
  >
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(to right, rgb(232 228 221 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(232 228 221 / 0.035) 1px, transparent 1px), radial-gradient(circle at ${glowX}% ${glowY}%, rgb(240 163 94 / 0.10), transparent 35%)`,
        backgroundSize: "68px 68px, 68px 68px, 100% 100%",
        maskImage: "linear-gradient(#000, transparent 95%)",
      }}
    />
    {children}
  </AbsoluteFill>
);

/** 安全区容器：避开抖音顶栏、右侧按钮、底部文案。 */
export const Safe = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      left: SAFE.left,
      top: SAFE.top,
      width: SAFE_W,
      height: SAFE_H,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {children}
  </div>
);

/** `// CHAPTER 01` 这类 mono 小标签 */
export const MonoLabel = ({
  children,
  color = T.accent,
  size = 26,
  style,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      fontFamily: T.fontMono,
      fontSize: size,
      letterSpacing: "0.18em",
      color,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </div>
);

/** 切角面板（站点的 clip-panel 风格） */
export const Panel = ({
  children,
  cut = 24,
  style,
  accentBar = true,
}: {
  children?: ReactNode;
  cut?: number;
  style?: CSSProperties;
  accentBar?: boolean;
}) => (
  <div
    style={{
      position: "relative",
      background: T.surface,
      border: `1px solid ${T.borderStrong}`,
      clipPath: `polygon(0 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% 100%, 0 100%)`,
      ...style,
    }}
  >
    {accentBar ? (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 86,
          height: 3,
          background: T.accent,
          boxShadow: `0 0 16px ${T.accentGlow}`,
        }}
      />
    ) : null}
    {children}
  </div>
);

/** 大标题 */
export const Headline = ({
  children,
  size = 96,
  style,
}: {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      fontFamily: T.fontSans,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      color: T.fg,
      textShadow: "0 2px 16px rgb(0 0 0 / 0.45)",
      ...style,
    }}
  >
    {children}
  </div>
);

/** 正文短句 */
export const Body = ({
  children,
  size = 40,
  muted = false,
  style,
}: {
  children: ReactNode;
  size?: number;
  muted?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      fontFamily: T.fontSans,
      fontWeight: 450,
      fontSize: size,
      lineHeight: 1.5,
      color: muted ? T.fgMuted : T.fg,
      ...style,
    }}
  >
    {children}
  </div>
);

/** 淡入 + 上移入场。delay/duration 单位帧。 */
export const Reveal = ({
  children,
  delay = 0,
  duration = 18,
  offset = 24,
  style,
  exitAt,
  exitDuration = 10,
}: {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  offset?: number;
  style?: CSSProperties;
  /** 可选：在该帧开始淡出 */
  exitAt?: number;
  exitDuration?: number;
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, duration);
  const out =
    exitAt === undefined ? 1 : 1 - progress(frame, exitAt, exitDuration);
  return (
    <div
      style={{
        opacity: p * out,
        translate: `0px ${(1 - p) * offset}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** 打字机文本。start 帧开始，cps 每秒字符数。 */
export const TypeText = ({
  text,
  start = 0,
  cps = 18,
  cursor = true,
  style,
}: {
  text: string;
  start?: number;
  cps?: number;
  cursor?: boolean;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = Math.max(0, Math.floor(((frame - start) / fps) * cps));
  const shown = text.slice(0, chars);
  const done = chars >= text.length;
  const blink = Math.floor(frame / 16) % 2 === 0;
  return (
    <span style={style}>
      {shown}
      {cursor && (!done || blink) ? (
        <span style={{ color: T.accent }}>▍</span>
      ) : null}
    </span>
  );
};

/** 打字机的触键音：在打字期间每隔 n 帧播放一次 type.wav */
export const TypeSfx = ({
  start,
  chars,
  cps = 18,
  every = 3,
  volume = 0.25,
}: {
  start: number;
  chars: number;
  cps?: number;
  every?: number;
  volume?: number;
}) => {
  const { fps } = useVideoConfig();
  const total = Math.ceil((chars / cps) * fps);
  const hits: number[] = [];
  for (let f = 0; f < total; f += every) hits.push(start + f);
  return (
    <>
      {hits.map((f) => (
        <Audio
          key={f}
          src={staticFile("sfx/type.wav")}
          from={f}
          volume={volume}
        />
      ))}
    </>
  );
};

/** 单次音效 */
export const Sfx = ({
  name,
  from = 0,
  volume = 0.5,
}: {
  name: "tick" | "type" | "whoosh" | "spark" | "riser" | "glitch" | "thump";
  from?: number;
  volume?: number;
}) => (
  <Audio src={staticFile(`sfx/${name}.wav`)} from={from} volume={volume} />
);

/** 带 glitch 抖动的标题（站点 glitch-text 风格） */
export const GlitchText = ({
  children,
  size = 150,
  color = T.accent,
  glitchFrames = [] as number[],
  style,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  /** 在这些帧附近出现错位残影 */
  glitchFrames?: number[];
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const active = glitchFrames.some((g) => frame >= g && frame < g + 4);
  const dx = active ? (rand(frame) - 0.5) * 18 : 0;
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          fontFamily: T.fontSans,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 0.85,
          letterSpacing: "-0.08em",
          color,
          textShadow: `0 0 38px rgb(240 163 94 / 0.23)`,
        }}
      >
        {children}
      </div>
      {active ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            fontFamily: T.fontSans,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 0.85,
            letterSpacing: "-0.08em",
            color: T.fg,
            opacity: 0.6,
            translate: `${dx}px 0px`,
            clipPath: `inset(${30 + rand(frame + 1) * 30}% 0 ${20 + rand(frame + 2) * 30}% 0)`,
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

/** 手机外框，内嵌截图（public/shots/*.png，390×844@3x）。 */
export const PhoneFrame = ({
  src,
  width = 420,
  style,
  scrollY = 0,
  children,
}: {
  src?: string;
  width?: number;
  style?: CSSProperties;
  /** 截图在框内向上偏移的像素（按框宽比例缩放后的像素） */
  scrollY?: number;
  children?: ReactNode;
}) => {
  const height = (width * 844) / 390;
  const r = width * 0.11;
  const statusBar = Math.round(width * 0.13); // 给刘海留出的状态栏高度
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: r,
        background: "#0a0a0c",
        border: `2px solid ${T.borderStrong}`,
        boxShadow: `0 0 0 1px ${T.accentSoft}, 0 24px 60px -24px rgb(0 0 0 / 0.7), 0 0 48px -8px ${T.accentGlow}`,
        overflow: "hidden",
        ...style,
      }}
    >
      {src ? (
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            left: 0,
            top: statusBar - scrollY,
            width,
            display: "block",
          }}
        />
      ) : null}
      {children}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          translate: "-50% 0",
          width: width * 0.28,
          height: width * 0.07,
          borderRadius: 999,
          background: "#000",
        }}
      />
    </div>
  );
};

/** 技术栈小标签 */
export const Chip = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontFamily: T.fontMono,
      fontSize: 22,
      letterSpacing: "0.08em",
      color: T.fgMuted,
      border: `1px solid ${T.borderStrong}`,
      padding: "8px 16px",
      clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%)",
    }}
  >
    {children}
  </span>
);

/** 项目标题块：mono 年份/类别 + 名称 + 一句话 */
export const ProjectTitle = ({
  label,
  name,
  tagline,
  delay = 0,
  nameSize = 84,
}: {
  label: string;
  name: string;
  tagline: string;
  delay?: number;
  nameSize?: number;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    <Reveal delay={delay}>
      <MonoLabel>{label}</MonoLabel>
    </Reveal>
    <Reveal delay={delay + 4}>
      <Headline size={nameSize}>{name}</Headline>
    </Reveal>
    <Reveal delay={delay + 10}>
      <Body size={38} muted>
        {tagline}
      </Body>
    </Reveal>
  </div>
);

export { T, SAFE, SAFE_W, SAFE_H, progress, rand, easeOut, interpolate, CanvasImage };

/** 把一个场景组件包成可放进 Track 的时间轴条目（内部帧从 0 开始）。 */
import { Sequence } from "remotion";
export type SceneProps = { name: string; from: number; durationInFrames: number };
export const makeScene =
  (Component: React.FC<{ durationInFrames: number }>) =>
  ({ name, from, durationInFrames }: SceneProps) => (
    <Sequence name={name} from={from} durationInFrames={durationInFrames}>
      <Component durationInFrames={durationInFrames} />
    </Sequence>
  );
