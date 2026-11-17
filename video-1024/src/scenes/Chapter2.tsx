import type { ReactNode } from "react";
import { Sequence, getStaticFiles, useCurrentFrame } from "remotion";
import {
  Backdrop,
  Safe,
  MonoLabel,
  Headline,
  Body,
  Reveal,
  Panel,
  PhoneFrame,
  ProjectTitle,
  Sfx,
  TypeText,
  T,
  SAFE_W,
  progress,
  interpolate,
  makeScene,
} from "../ui/primitives";
import { window01, easeStd } from "../lib/anim";
import { beatFrame, SCHEDULE } from "../lib/timing";

// ---------- 时间轴（场景内帧，已吸附到整拍） ----------
const START = beatFrame(SCHEDULE.ch2[0]);
const at = (sec: number) => beatFrame(SCHEDULE.ch2[0] + sec) - START;

const INTRO_END = at(2.5); // 66
const CUTS = [INTRO_END, at(12), at(21.5), at(31), at(40.5)]; // 66 360 639 917 1211

const FADE_IN = 12;
const FADE_OUT = 10;

// ---------- 截图是否存在（不存在则用 div 画界面示意） ----------
const staticFiles = getStaticFiles();
const hasShot = (p: string) => staticFiles.some((f) => f.name === p);

/** 用 div 画的“界面示意”：顶部标题栏 + 几块灰色面板 */
const MockUI = ({ width, title }: { width: number; title: string }) => {
  const pad = width * 0.06;
  const blocks = [0.34, 0.22, 0.22, 0.3, 0.18];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: T.bgElevated,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: width * 0.3,
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "flex-end",
          padding: `0 ${pad}px ${pad * 0.8}px`,
          fontFamily: T.fontSans,
          fontWeight: 700,
          fontSize: width * 0.075,
          color: T.fg,
        }}
      >
        {title}
      </div>
      <div
        style={{
          padding: pad,
          display: "flex",
          flexDirection: "column",
          gap: pad * 0.8,
        }}
      >
        {blocks.map((h, i) => (
          <div
            key={i}
            style={{
              height: width * h,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: pad * 0.8,
                top: pad * 0.8,
                width: "55%",
                height: 10,
                borderRadius: 5,
                background: T.fgSubtle,
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: pad * 0.8,
                top: pad * 0.8 + 22,
                width: "35%",
                height: 8,
                borderRadius: 4,
                background: T.fgSubtle,
                opacity: 0.35,
              }}
            />
            {i === 0 ? (
              <div
                style={{
                  position: "absolute",
                  right: pad * 0.8,
                  bottom: pad * 0.8,
                  width: "32%",
                  height: width * 0.09,
                  borderRadius: 999,
                  background: T.accent,
                  opacity: 0.85,
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

/** 入场手机框：下方 60px 上移 + 淡入 + scale 0.96→1，截图缓慢向上滚动 */
const Phone = ({
  shot,
  fallbackTitle,
  width = 400,
  delay = 8,
  dur = 22,
  len,
}: {
  shot: string;
  fallbackTitle: string;
  width?: number;
  delay?: number;
  dur?: number;
  /** 子项目总帧数，用于滚动速率 */
  len: number;
}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, dur);
  const scrollY = interpolate(frame, [delay + dur, len], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeStd,
  });
  const ok = hasShot(shot);
  return (
    <div
      style={{
        opacity: p,
        translate: `0px ${(1 - p) * 60}px`,
        scale: `${0.96 + 0.04 * p}`,
        transformOrigin: "50% 100%",
      }}
    >
      {ok ? (
        <PhoneFrame src={shot} width={width} scrollY={scrollY} />
      ) : (
        <PhoneFrame width={width}>
          <MockUI width={width} title={fallbackTitle} />
        </PhoneFrame>
      )}
    </div>
  );
};

/** 右下角安全区外的极淡大号序号 */
const BgIndex = ({ n }: { n: string }) => (
  <div
    style={{
      position: "absolute",
      right: 24,
      bottom: 300,
      fontFamily: T.fontMono,
      fontSize: 460,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: "-0.06em",
      color: T.fg,
      opacity: 0.06,
    }}
  >
    {n}
  </div>
);

// ---------- 子项目公共布局 ----------
const PHONE_W = 400;
const GAP = 24;
const DEMO_W = SAFE_W - PHONE_W - GAP; // 392

const Product = ({
  index,
  label,
  name,
  tagline,
  extra,
  shot,
  fallbackTitle,
  phoneWidth = PHONE_W,
  demo,
  len,
  soft = false,
}: {
  index: number;
  label: string;
  name: string;
  tagline: string;
  extra?: string;
  shot: string;
  fallbackTitle: string;
  phoneWidth?: number;
  demo: ReactNode;
  len: number;
  soft?: boolean;
}) => {
  const frame = useCurrentFrame();
  const op = window01(frame, 0, len, FADE_IN, FADE_OUT);
  const entranceDur = soft ? 30 : 22;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <BgIndex n={`0${index}`} />
      <Safe>
        <ProjectTitle label={label} name={name} tagline={tagline} />
        {extra ? (
          <Reveal delay={16} style={{ marginTop: 10 }}>
            <Body size={28} muted style={{ color: T.fgSubtle }}>
              {extra}
            </Body>
          </Reveal>
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: GAP,
            marginTop: 30,
          }}
        >
          <Phone
            shot={shot}
            fallbackTitle={fallbackTitle}
            width={phoneWidth}
            delay={8}
            dur={entranceDur}
            len={len}
          />
          <div
            style={{
              width: SAFE_W - phoneWidth - GAP,
              position: "relative",
              paddingTop: 120,
            }}
          >
            {demo}
          </div>
        </div>
      </Safe>
      <Sfx name="whoosh" from={8} volume={soft ? 0.2 : 0.3} />
    </div>
  );
};

// ---------- 1. SayIt：波形 → 收束 → 逐字 ----------
const SayItDemo = () => {
  const frame = useCurrentFrame();
  const n = 20;
  const liveUntil = 45; // 1.5s
  const collapse = progress(frame, liveUntil, 14);
  const appear = progress(frame, 12, 12);
  const typeStart = liveUntil + 16;
  const bars = Array.from({ length: n }, (_, i) => {
    const t = frame / 30;
    const h =
      18 +
      26 * Math.abs(Math.sin(t * 7 + i * 0.9)) +
      22 * Math.abs(Math.sin(t * 3.3 + i * 0.37)) +
      14 * Math.abs(Math.sin(t * 11 + i * 1.7));
    return interpolate(collapse, [0, 1], [h, 4]);
  });
  return (
    <div style={{ opacity: appear }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 100,
          width: n * 18 - 8,
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: h,
              borderRadius: 5,
              background: T.accent,
              opacity: interpolate(collapse, [0, 1], [1, 0.45]),
              boxShadow: collapse < 0.5 ? `0 0 12px ${T.accentGlow}` : "none",
            }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: T.fontSans,
          fontSize: 32,
          lineHeight: 1.55,
          color: T.fg,
          minHeight: 100,
          whiteSpace: "pre-line",
          opacity: collapse,
        }}
      >
        <TypeText text={"先接住声音，\n再整理成文字。"} start={typeStart} cps={12} />
      </div>
      <Sfx name="spark" from={typeStart} volume={0.3} />
    </div>
  );
};

// ---------- 2. GoGoGo：地图 + 三点 + 路径 ----------
const GoGoGoDemo = () => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 12, 12);
  const W = 380;
  const H = 520;
  const pts = [
    { x: 70, y: 430 },
    { x: 215, y: 250 },
    { x: 320, y: 95 },
  ];
  const dotAt = [16, 30, 44];
  const pathStart = 52;
  const pathLen = 70;
  const d = `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y}`;
  const seg = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(b.x - a.x, b.y - a.y);
  const total = seg(pts[0], pts[1]) + seg(pts[1], pts[2]);
  const drawn = progress(frame, pathStart, pathLen, easeStd);
  const flag = progress(frame, pathStart + pathLen - 4, 10);
  const streets = [
    "M 0 120 L 380 60",
    "M 0 300 L 380 240",
    "M 0 470 L 380 410",
    "M 120 0 L 60 520",
    "M 260 0 L 200 520",
    "M 370 0 L 330 520",
  ];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ opacity: appear }}>
      {streets.map((s, i) => (
        <path key={i} d={s} stroke={T.fgSubtle} strokeOpacity={0.35} strokeWidth={2} fill="none" />
      ))}
      <path
        d={d}
        stroke={T.accent}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={total}
        strokeDashoffset={total * (1 - drawn)}
        style={{ filter: `drop-shadow(0 0 6px ${T.accentGlow})` }}
      />
      {pts.map((p, i) => {
        const s = progress(frame, dotAt[i], 8);
        return (
          <g key={i} transform={`translate(${p.x} ${p.y})`} opacity={s}>
            <circle r={18 * s} fill={T.accent} fillOpacity={0.15} />
            <circle r={7 * s} fill={i === 2 ? T.accent : T.fg} />
          </g>
        );
      })}
      {/* 终点小旗 */}
      <g transform={`translate(${pts[2].x + 10} ${pts[2].y - 10})`} opacity={flag}>
        <line x1={0} y1={0} x2={0} y2={-44 * flag} stroke={T.fg} strokeWidth={3} strokeLinecap="round" />
        <path d={`M 0 -44 L 30 -36 L 0 -26 Z`} fill={T.accent} transform={`scale(${flag})`} />
      </g>
      {dotAt.map((f, i) => (
        <Sfx key={i} name="tick" from={f} volume={0.2} />
      ))}
    </svg>
  );
};

// ---------- 3. BeenHere：堆叠档案卡依次抽出翻到前面 ----------
const BeenHereDemo = () => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 12, 12);
  const events = [50, 120]; // 两次抽出
  const DUR = 22;
  const cardW = 320;
  const cardH = 200;
  // 深度：0 前 1 中 2 后；初始 card i 的深度 = i
  const depthAt = (i: number, k: number) => {
    // 经过 k 次事件后的深度
    let d = i;
    for (let e = 0; e < k; e++) d = d === 2 ? 0 : d + 1;
    return d;
  };
  const done = events.filter((e) => frame >= e + DUR).length;
  const active = events.findIndex((e) => frame >= e && frame < e + DUR);
  const cards = [0, 1, 2].map((i) => {
    const d0 = depthAt(i, done);
    let d = d0;
    let lift = 0;
    let z = 3 - d0;
    if (active >= 0) {
      const p = progress(frame, events[active], DUR, easeStd);
      const d1 = depthAt(i, done + 1);
      d = interpolate(p, [0, 1], [d0, d1]);
      if (d0 === 2) {
        lift = -90 * Math.sin(p * Math.PI);
        z = p > 0.5 ? 4 : 0;
      } else {
        z = 3 - d1;
      }
    }
    return { i, d, lift, z, label: `interview #${i + 1}` };
  });
  return (
    <div style={{ position: "relative", width: DEMO_W, height: 320, opacity: appear }}>
      {cards.map((c) => (
        <div
          key={c.i}
          style={{
            position: "absolute",
            left: c.d * 20,
            top: 60 + c.d * 28 + c.lift,
            zIndex: c.z,
            width: cardW,
            height: cardH,
            scale: `${1 - c.d * 0.04}`,
            transformOrigin: "0 0",
            opacity: 1 - c.d * 0.22,
          }}
        >
          <Panel style={{ width: cardW, height: cardH, padding: 22 }} cut={18}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <MonoLabel size={20} color={T.fgMuted}>{c.label}</MonoLabel>
              <span
                style={{
                  fontFamily: T.fontSans,
                  fontSize: 18,
                  color: T.success,
                  border: `1px solid ${T.success}`,
                  padding: "3px 10px",
                  borderRadius: 999,
                  marginRight: 10,
                }}
              >
                已认领
              </span>
            </div>
            {[0.9, 0.7, 0.8, 0.5].map((w, j) => (
              <div
                key={j}
                style={{
                  marginTop: j === 0 ? 24 : 14,
                  width: `${w * 100}%`,
                  height: 10,
                  borderRadius: 5,
                  background: T.fgSubtle,
                  opacity: 0.55,
                }}
              />
            ))}
          </Panel>
        </div>
      ))}
    </div>
  );
};

// ---------- 4. WordToFlush：竖向热度条 + 三个猜测词 ----------
const WtfDemo = () => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 12, 14);
  const barH = 560;
  const barW = 36;
  const words = [
    { w: "天空", level: 0.22, at: 24 },
    { w: "海洋", level: 0.55, at: 70 },
    { w: "水", level: 0.93, at: 116 },
  ];
  const RISE = 40;
  // 标记位置（0..1）：随每个词出现上升
  let level = 0;
  words.forEach((x, i) => {
    const prev = i === 0 ? 0 : words[i - 1].level;
    const p = progress(frame, x.at, RISE, easeStd);
    level = interpolate(p, [0, 1], [prev, x.level]) > level ? interpolate(p, [0, 1], [prev, x.level]) : level;
  });
  const hot = progress(frame, words[2].at + RISE, 14);
  const markerY = barH * (1 - level);
  return (
    <div style={{ position: "relative", width: DEMO_W, height: barH + 40, opacity: appear }}>
      {/* 热度条 */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 20,
          width: barW,
          height: barH,
          borderRadius: barW / 2,
          background: `linear-gradient(to top, ${T.secondary}, ${T.accent})`,
          border: `1px solid ${T.borderStrong}`,
          boxShadow: `0 0 ${24 * hot}px ${T.accentGlow}`,
          overflow: "hidden",
        }}
      >
        {/* 未达到的部分用深色遮住 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: markerY,
            background: T.bg,
            opacity: 0.82,
          }}
        />
      </div>
      {/* 标记线 */}
      <div
        style={{
          position: "absolute",
          right: 28,
          top: 20 + markerY - 2,
          width: barW + 24,
          height: 4,
          borderRadius: 2,
          background: T.fg,
          boxShadow: `0 0 10px rgb(232 228 221 / 0.5)`,
        }}
      />
      {/* 猜测词 */}
      {words.map((x, i) => {
        const p = progress(frame, x.at, 14);
        const isLast = i === 2;
        const color = isLast ? interpolate(hot, [0, 1], [0, 1]) : 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 20 + barH * (1 - x.level) - 24,
              opacity: p,
              translate: `${(1 - p) * -16}px 0px`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                fontFamily: T.fontSans,
                fontWeight: 700,
                fontSize: isLast ? 44 : 36,
                color: isLast && color > 0 ? T.accent : T.fg,
                textShadow: isLast ? `0 0 ${20 * color}px ${T.accentGlow}` : "none",
              }}
            >
              {x.w}
            </span>
            <span
              style={{
                display: "block",
                width: interpolate(p, [0, 1], [0, 220 - x.w.length * 0]) - (isLast ? 60 : 40),
                height: 2,
                background: T.fgSubtle,
                opacity: 0.6,
              }}
            />
          </div>
        );
      })}
      <Sfx name="spark" from={words[2].at + RISE} volume={0.35} />
    </div>
  );
};

// ---------- 5. Up2Down：两匹简笔马赛跑 ----------
const Horse = ({
  x,
  y,
  legLen,
  phase,
  running,
  color,
}: {
  x: number;
  y: number;
  legLen: number;
  phase: number;
  running: boolean;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const swing = running ? Math.sin(frame * 0.55 + phase) * 24 : 0;
  const bodyW = 64;
  const bodyH = 22;
  const legs = [-24, -12, 12, 24];
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth={3} strokeLinecap="round" fill="none">
      {/* 身体 */}
      <rect x={-bodyW / 2} y={-bodyH} width={bodyW} height={bodyH} rx={4} />
      {/* 头 */}
      <rect x={bodyW / 2 - 2} y={-bodyH - 16} width={16} height={22} rx={3} />
      {/* 腿 */}
      {legs.map((lx, i) => {
        const a = (i % 2 === 0 ? swing : -swing) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={lx}
            y1={0}
            x2={lx + Math.sin(a) * legLen}
            y2={Math.cos(a) * legLen}
          />
        );
      })}
    </g>
  );
};

const Up2DownDemo = () => {
  const frame = useCurrentFrame();
  const appear = progress(frame, 12, 14);
  const W = 380;
  const H = 420;
  const go = 30;
  const x0 = 50;
  const finish = 280;
  const longLen = 40;
  const shortLen = 20;
  const lanes = [
    { y: 150, len: longLen, speed: 3.2, phase: 0 },
    { y: 330, len: shortLen, speed: 0.85, phase: 1.3 },
  ];
  const flagP = progress(frame, 4, 10);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ opacity: appear }}>
      {lanes.map((l, i) => {
        const dist = Math.max(0, frame - go) * l.speed;
        const x = Math.min(x0 + dist, finish);
        const arrived = x0 + dist >= finish;
        // 地面线
        return (
          <g key={i}>
            <line
              x1={10}
              y1={l.y + l.len + 2}
              x2={W - 10}
              y2={l.y + l.len + 2}
              stroke={T.fgSubtle}
              strokeOpacity={0.5}
              strokeWidth={2}
              strokeDasharray="6 10"
            />
            <Horse
              x={x}
              y={l.y}
              legLen={l.len}
              phase={l.phase}
              running={frame >= go && !arrived}
              color={i === 0 ? T.accent : T.secondaryFg}
            />
          </g>
        );
      })}
      {/* 终点旗 */}
      <g transform={`translate(${finish + 64} ${lanes[0].y - 60})`} opacity={flagP}>
        <line x1={0} y1={0} x2={0} y2={lanes[1].y + shortLen + 62 - lanes[0].y} stroke={T.fg} strokeWidth={3} strokeLinecap="round" />
        <path d="M 0 0 L 28 8 L 0 16 Z" fill={T.accent} />
      </g>
      <Sfx name="tick" from={go} volume={0.2} />
    </svg>
  );
};

// ---------- 场景 ----------
const Chapter2Inner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const global = window01(frame, 0, durationInFrames, 12, 10);
  const introOp = window01(frame, 0, INTRO_END, 10, 12);
  const bounds = [...CUTS, durationInFrames];

  const products = [
    {
      label: "// LIVE · FLUTTER",
      name: "你讲 · SayIt",
      tagline: "闭眼即说，绝不丢话。",
      shot: "shots/sayit-1.png",
      fallbackTitle: "你讲",
      demo: <SayItDemo />,
    },
    {
      label: "// LIVE · VUE",
      name: "GoGoGo · 走不走",
      tagline: "说出场景和偏好，拿到能走的计划。",
      shot: "shots/gogogo-1.png",
      fallbackTitle: "走不走",
      demo: <GoGoGoDemo />,
    },
    {
      label: "// LIVE · TYPESCRIPT",
      name: "BeenHere · 来过",
      tagline: "普通人的真实采访，被认真保存。",
      shot: "shots/beenhere-1.png",
      fallbackTitle: "来过",
      demo: <BeenHereDemo />,
    },
    {
      label: "// LIVE · GAME",
      name: "WordToFlush",
      tagline: "越接近答案，越热。",
      shot: "shots/wtf-1.png",
      fallbackTitle: "WordToFlush",
      demo: <WtfDemo />,
      soft: true,
    },
    {
      label: "// LIVE · THREE.JS · 共创",
      name: "Up2Down · 奔跑即故障",
      tagline: "画一匹腿长不一的马，看谁先到。",
      extra: "与合作者共同开发",
      shot: "shots/up2down-1.png",
      fallbackTitle: "Up2Down",
      demo: <Up2DownDemo />,
      soft: true,
      phoneWidth: 380,
    },
  ];

  return (
    <Backdrop glowX={70} glowY={30}>
      <div style={{ position: "absolute", inset: 0, opacity: global }}>
        {/* 开场标题 */}
        {frame < INTRO_END ? (
          <div style={{ position: "absolute", inset: 0, opacity: introOp }}>
            <Safe style={{ justifyContent: "center", gap: 22 }}>
              <Reveal delay={0}>
                <MonoLabel>// CHAPTER 02</MonoLabel>
              </Reveal>
              <Reveal delay={6}>
                <Headline size={120}>即刻体验</Headline>
              </Reveal>
              <Reveal delay={14}>
                <Body size={40} muted>
                  打开就能用的东西。
                </Body>
              </Reveal>
            </Safe>
            <Sfx name="thump" from={8} volume={0.5} />
          </div>
        ) : null}

        {/* 五个产品 */}
        {products.map((p, i) => {
          const from = bounds[i];
          const len = bounds[i + 1] - from;
          return (
            <Sequence key={p.name} name={p.name} from={from} durationInFrames={len} layout="none">
              <Product
                index={i + 1}
                label={p.label}
                name={p.name}
                tagline={p.tagline}
                extra={p.extra}
                shot={p.shot}
                fallbackTitle={p.fallbackTitle}
                phoneWidth={p.phoneWidth}
                demo={p.demo}
                len={len}
                soft={p.soft}
              />
            </Sequence>
          );
        })}
      </div>
    </Backdrop>
  );
};

export const Chapter2 = makeScene(Chapter2Inner);
