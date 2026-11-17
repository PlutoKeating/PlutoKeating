import { Sequence, useCurrentFrame } from "remotion";
import {
  Backdrop,
  Safe,
  MonoLabel,
  Headline,
  Body,
  Panel,
  Reveal,
  TypeText,
  Sfx,
  Chip,
  ProjectTitle,
  PhoneFrame,
  makeScene,
  T,
  progress,
  interpolate,
} from "../ui/primitives";
import { window01 } from "../lib/anim";
import { BPM, FPS } from "../lib/timing";

/** 场景内第 n 拍对应的帧（场景起点本身已吸附到整拍） */
const B = (n: number) => Math.round((n * 60 * FPS) / BPM);

// 截图由另一个代理生成；最终验证前再 ls public/shots 决定是否开启
const SHOTS = { dsh: true, quetzal: true };

// 时间表（场景内帧）
const INTRO_END = B(5); // 82
const DSH_START = INTRO_END; // 82
const DSH_END = B(24); // 393
const QZ_START = DSH_END; // 393
const QZ_END = B(43); // 704
const CARDS_START = QZ_END; // 704

/** 子项目容器：铺满安全区，12 帧淡入 / 10 帧淡出 */
const Section = ({
  duration,
  center = false,
  children,
}: {
  duration: number;
  center?: boolean;
  children?: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  const o = window01(frame, 0, duration, 12, 10);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: center ? "center" : "flex-start",
        paddingBottom: center ? 120 : 0,
        opacity: o,
      }}
    >
      {children}
    </div>
  );
};

/* ---------------- 开场 ---------------- */
const Intro = () => {
  const frame = useCurrentFrame();
  const o = window01(frame, 0, INTRO_END, 6, 10);
  const punch = 1 + 0.1 * (1 - progress(frame, 4, 14));
  const bar = progress(frame, 8, 22);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 26,
        opacity: o,
      }}
    >
      <Sfx name="thump" from={5} volume={0.5} />
      <Reveal delay={0} duration={10}>
        <MonoLabel>// CHAPTER 03</MonoLabel>
      </Reveal>
      <Reveal delay={4} duration={10} offset={40}>
        <Headline
          size={120}
          style={{ transformOrigin: "left center", scale: `${punch}` }}
        >
          工具与基座
        </Headline>
      </Reveal>
      <div
        style={{
          width: 816 * bar,
          height: 4,
          background: T.accent,
          boxShadow: `0 0 24px ${T.accentGlow}`,
        }}
      />
      <Reveal delay={14} duration={14}>
        <Body size={44} muted>
          给 agent 一个住处。
        </Body>
      </Reveal>
    </div>
  );
};

/* ---------------- 1. dsh-lark-bot ---------------- */
const StreamDot = () => {
  const frame = useCurrentFrame();
  const o = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame / 5));
  return (
    <div
      style={{
        position: "absolute",
        right: 18,
        top: 18,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          fontFamily: T.fontMono,
          fontSize: 18,
          letterSpacing: "0.12em",
          color: T.fgSubtle,
        }}
      >
        streaming
      </span>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 999,
          background: T.accent,
          opacity: o,
          boxShadow: `0 0 ${10 + 8 * o}px ${T.accentGlow}`,
        }}
      />
    </div>
  );
};

const LINE1 = "读取 src/pages/login.tsx";
const LINE2 = "修改 3 处样式";
const LINE3 = "✓ 已提交 PR";
const L1 = 76;
const L2 = L1 + Math.ceil((LINE1.length / 20) * FPS) + 8; // 118
const L3 = L2 + Math.ceil((LINE2.length / 20) * FPS) + 8; // 138
const CHIP0 = 176;

const Dsh = () => {
  const dur = DSH_END - DSH_START;
  return (
    <Section duration={dur}>
      <Sfx name="whoosh" from={0} volume={0.35} />
      <Sfx name="spark" from={L3} volume={0.3} />
      <Sfx name="tick" from={CHIP0} volume={0.2} />
      <Sfx name="tick" from={CHIP0 + 6} volume={0.2} />
      <Sfx name="tick" from={CHIP0 + 12} volume={0.2} />
      <ProjectTitle
        label="// OPEN SOURCE · TYPESCRIPT"
        name="dsh-lark-bot"
        tagline="在飞书里直接使唤本地的编程 agent。"
      />
      <Reveal delay={14} style={{ marginTop: 44 }}>
        <Panel style={{ width: 816, height: 620 }}>
          {/* 顶部条 */}
          <div
            style={{
              height: 58,
              display: "flex",
              alignItems: "center",
              padding: "0 26px",
              borderBottom: `1px solid ${T.border}`,
              fontFamily: T.fontMono,
              fontSize: 22,
              letterSpacing: "0.1em",
              color: T.fgMuted,
              gap: 14,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: T.success,
              }}
            />
            Feishu · dsh
          </div>

          <div
            style={{
              padding: "28px 28px 0",
              width: SHOTS.dsh ? 500 : 816,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* 用户气泡（右） */}
            <Reveal delay={36} offset={16} style={{ alignSelf: "flex-end" }}>
              <div
                style={{
                  background: T.accentSoft,
                  border: `1px solid ${T.accentGlow}`,
                  borderRadius: "22px 22px 6px 22px",
                  padding: "18px 28px",
                  fontFamily: T.fontSans,
                  fontSize: 30,
                  color: T.fg,
                  maxWidth: SHOTS.dsh ? 444 : 600,
                }}
              >
                帮我修一下登录页的样式
              </div>
            </Reveal>

            {/* bot 卡片（左） */}
            <Reveal delay={66} offset={16} style={{ alignSelf: "flex-start" }}>
              <div
                style={{
                  position: "relative",
                  width: SHOTS.dsh ? 444 : 640,
                  background: T.surfaceHover,
                  borderLeft: `3px solid ${T.accent}`,
                  borderRadius: "6px 22px 22px 22px",
                  padding: "54px 30px 24px",
                  fontFamily: T.fontMono,
                  fontSize: 26,
                  lineHeight: 1.75,
                  color: T.codeFg,
                  minHeight: 190,
                }}
              >
                <StreamDot />
                <div style={{ color: T.fgMuted }}>
                  <TypeText text={LINE1} start={L1} cps={20} cursor={false} />
                </div>
                <div style={{ color: T.fgMuted }}>
                  <TypeText text={LINE2} start={L2} cps={20} cursor={false} />
                </div>
                <div style={{ color: T.success }}>
                  <TypeText text={LINE3} start={L3} cps={20} cursor />
                </div>
              </div>
            </Reveal>

            {/* 三个小 Chip */}
            <div style={{ display: "flex", gap: 14, marginTop: 6, flexWrap: "wrap", rowGap: 14 }}>
              {["并行任务", "多角色 Agent", "安全网守护"].map((c, i) => (
                <Reveal key={c} delay={CHIP0 + i * 6} offset={10}>
                  <Chip>{c}</Chip>
                </Reveal>
              ))}
            </div>
          </div>

          {SHOTS.dsh ? (
            <Reveal
              delay={110}
              offset={40}
              style={{ position: "absolute", right: 28, top: 96 }}
            >
              <PhoneFrame src="shots/dsh-1.png" width={260} />
            </Reveal>
          ) : null}
        </Panel>
      </Reveal>
    </Section>
  );
};

/* ---------------- 2. Quetzal ---------------- */
const QZ_SVG_IN = 14;
const QZ_HAND_PERIOD = 300; // 一圈 10s
const QZ_TOP_FRAME = QZ_SVG_IN + QZ_HAND_PERIOD / 2; // 指针转到正上方

const Quetzal = () => {
  const frame = useCurrentFrame();
  const dur = QZ_END - QZ_START;
  const t = Math.max(0, frame - QZ_SVG_IN);
  // 指针从正下方出发顺时针转，t=150 时指向正上方
  const handDeg = 180 + (360 * t) / QZ_HAND_PERIOD;
  const glow = 0.2 + 0.15 * (0.5 + 0.5 * Math.sin(frame / 14));
  // 小方块在同步线上往返
  const tri = 1 - Math.abs(((t / 110) % 2) - 1);
  const X0 = 95;
  const X1 = 720;
  const sq = X0 + (X1 - X0) * tri;
  const draw = progress(frame, QZ_SVG_IN, 30);
  const CX = 408;
  const CY = 300;
  const R = 118;
  const ticks = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  const hx = CX + Math.sin((handDeg * Math.PI) / 180) * (R - 26);
  const hy = CY - Math.cos((handDeg * Math.PI) / 180) * (R - 26);
  const spark = interpolate(frame, [QZ_TOP_FRAME, QZ_TOP_FRAME + 14], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Section duration={dur}>
      <Sfx name="whoosh" from={0} volume={0.35} />
      <Sfx name="spark" from={QZ_TOP_FRAME} volume={0.3} />
      <ProjectTitle
        label="// OPEN SOURCE · AGENT RUNTIME"
        name="Quetzal"
        tagline="让 agent 像生命一样活着。"
      />
      <Reveal delay={QZ_SVG_IN} style={{ marginTop: 40 }}>
        <svg
          width={816}
          height={640}
          viewBox="0 0 816 640"
          style={{ display: "block" }}
        >
          <defs>
            <radialGradient id="qzGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={T.orb} stopOpacity={0.9} />
              <stop offset="60%" stopColor={T.orbRim} stopOpacity={0.35} />
              <stop offset="100%" stopColor={T.orbRim} stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* 光晕 */}
          <circle cx={CX} cy={CY} r={R + 60} fill="url(#qzGlow)" opacity={glow} />
          {frame >= QZ_TOP_FRAME ? (
            <circle
              cx={CX}
              cy={CY}
              r={R + 10 + (1 - spark) * 40}
              fill="none"
              stroke={T.accent}
              strokeWidth={2}
              opacity={spark * 0.8}
            />
          ) : null}

          {/* 旧手机 */}
          <g stroke={T.fg} strokeWidth={3} fill="none" opacity={draw}>
            <rect x={30} y={190} width={130} height={240} rx={22} />
            <rect x={44} y={222} width={102} height={170} rx={6} stroke={T.secondary} />
            <line x1={78} y1={206} x2={112} y2={206} stroke={T.secondary} />
            <circle cx={95} cy={412} r={7} stroke={T.secondary} />
          </g>

          {/* 笔记本 */}
          <g stroke={T.fg} strokeWidth={3} fill="none" opacity={draw}>
            <rect x={640} y={232} width={160} height={108} rx={10} />
            <rect x={652} y={244} width={136} height={84} rx={4} stroke={T.secondary} />
            <path d="M 618 340 L 822 340 L 810 360 L 630 360 Z" />
          </g>

          {/* 生物钟表盘 */}
          <g>
            <circle cx={CX} cy={CY} r={R} fill={T.surface} stroke={T.fg} strokeWidth={3} />
            <circle cx={CX} cy={CY} r={R - 10} fill="none" stroke={T.border} strokeWidth={1} />
            {ticks.map((a, i) => {
              const rad = (a * Math.PI) / 180;
              const major = i % 3 === 0;
              const r1 = R - (major ? 24 : 16);
              const r2 = R - 8;
              return (
                <line
                  key={a}
                  x1={CX + Math.sin(rad) * r1}
                  y1={CY - Math.cos(rad) * r1}
                  x2={CX + Math.sin(rad) * r2}
                  y2={CY - Math.cos(rad) * r2}
                  stroke={major ? T.accent : T.fgSubtle}
                  strokeWidth={major ? 3 : 2}
                  strokeLinecap="round"
                />
              );
            })}
            {/* 指针 */}
            <line
              x1={CX}
              y1={CY}
              x2={hx}
              y2={hy}
              stroke={T.accent}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle cx={CX} cy={CY} r={7} fill={T.accent} />
            <text
              x={CX}
              y={CY + R + 44}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={22}
              letterSpacing="0.14em"
              fill={T.fgMuted}
            >
              body clock
            </text>
          </g>

          {/* 同步线 */}
          <g opacity={draw}>
            <line x1={95} y1={430} x2={95} y2={540} stroke={T.fgSubtle} strokeWidth={2} strokeDasharray="6 8" />
            <line x1={720} y1={360} x2={720} y2={540} stroke={T.fgSubtle} strokeWidth={2} strokeDasharray="6 8" />
            <line x1={X0} y1={540} x2={X1} y2={540} stroke={T.fgSubtle} strokeWidth={2} strokeDasharray="6 8" />
            <rect
              x={sq - 10}
              y={530}
              width={20}
              height={20}
              fill={T.accent}
              style={{ filter: `drop-shadow(0 0 8px ${T.accentGlow})` }}
            />
            <text
              x={CX}
              y={592}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={22}
              letterSpacing="0.14em"
              fill={T.fgMuted}
            >
              git sync
            </text>
          </g>
        </svg>
      </Reveal>
      {SHOTS.quetzal ? (
        <Reveal
          delay={40}
          offset={40}
          style={{
            alignSelf: "center",
            marginTop: 6,
            height: 250,
            overflow: "hidden",
            maskImage: "linear-gradient(#000 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(#000 55%, transparent 100%)",
          }}
        >
          <PhoneFrame src="shots/quetzal-1.png" width={260} />
        </Reveal>
      ) : null}
    </Section>
  );
};

/* ---------------- 3. 收尾两张小卡 ---------------- */
const Card = ({
  name,
  label,
  line,
  delay,
}: {
  name: string;
  label: string;
  line: string;
  delay: number;
}) => (
  <Reveal delay={delay} offset={28}>
    <Panel style={{ width: 390, height: 300, padding: "40px 28px" }}>
      <MonoLabel size={22}>{label}</MonoLabel>
      <Headline size={52} style={{ marginTop: 22 }}>
        {name}
      </Headline>
      <Body size={28} muted style={{ marginTop: 20, whiteSpace: "nowrap" }}>
        {line}
      </Body>
    </Panel>
  </Reveal>
);

const Cards = ({ duration }: { duration: number }) => (
  <Section duration={duration} center>
    <Sfx name="whoosh" from={0} volume={0.3} />
    <Sfx name="tick" from={10} volume={0.2} />
    <Sfx name="tick" from={16} volume={0.2} />
    <Reveal delay={0}>
      <MonoLabel>// AND ALSO</MonoLabel>
    </Reveal>
    <div style={{ display: "flex", gap: 36, marginTop: 40 }}>
      <Card
        delay={10}
        name="Milano Library"
        label="// PYTHON"
        line="无数据库的视频资料库。"
      />
      <Card
        delay={16}
        name="PlutoWiFi"
        label="// ZEROTIER"
        line="私有网络的管理看板。"
      />
    </div>
  </Section>
);

/* ---------------- 场景 ---------------- */
const Chapter3Inner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const fade = 1 - progress(frame, durationInFrames - 10, 10);
  return (
    <Backdrop glowX={70} glowY={30} style={{ opacity: fade }}>
      {/* 右下角安全区外的装饰字 */}
      <div
        style={{
          position: "absolute",
          right: -20,
          bottom: 40,
          fontFamily: T.fontMono,
          fontSize: 220,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: T.fg,
          opacity: 0.06,
          lineHeight: 1,
        }}
      >
        CH.03
      </div>
      <Safe>
        <Sequence from={0} durationInFrames={INTRO_END} layout="none" name="intro">
          <Intro />
        </Sequence>
        <Sequence
          from={DSH_START}
          durationInFrames={DSH_END - DSH_START}
          layout="none"
          name="dsh-lark-bot"
        >
          <Dsh />
        </Sequence>
        <Sequence
          from={QZ_START}
          durationInFrames={QZ_END - QZ_START}
          layout="none"
          name="Quetzal"
        >
          <Quetzal />
        </Sequence>
        <Sequence
          from={CARDS_START}
          durationInFrames={durationInFrames - CARDS_START}
          layout="none"
          name="cards"
        >
          <Cards duration={durationInFrames - CARDS_START} />
        </Sequence>
      </Safe>
    </Backdrop>
  );
};

export const Chapter3 = makeScene(Chapter3Inner);
