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
  ProjectTitle,
  PhoneFrame,
  makeScene,
  T,
  progress,
} from "../ui/primitives";
import { window01 } from "../lib/anim";
import { BPM, FPS } from "../lib/timing";

/** 场景内第 n 拍对应的帧（场景起点本身已吸附到整拍） */
const B = (n: number) => Math.round((n * 60 * FPS) / BPM);

// 截图由另一个代理生成；最终验证前再 ls public/shots 决定是否开启
const SHOTS = { plusone: false };

// 时间表（场景内帧）
const INTRO_END = B(4); // 65
const CUT_LEN = B(8); // 131 ≈ 4.36s
const CUT1 = INTRO_END; // 65
const CUT2 = CUT1 + CUT_LEN; // 196
const CUT3 = CUT2 + CUT_LEN; // 327
const GRID_START = CUT3 + CUT_LEN; // 458

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
  const punch = 1 + 0.08 * (1 - progress(frame, 4, 14));
  const bar = progress(frame, 8, 20);
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
        <MonoLabel>// CHAPTER 04</MonoLabel>
      </Reveal>
      <Reveal delay={4} duration={10} offset={40}>
        <Headline
          size={120}
          style={{ transformOrigin: "left center", scale: `${punch}` }}
        >
          拆解与移植
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
      <Reveal delay={12} duration={14}>
        <Body size={44} muted>
          退役设备，第二次生命。
        </Body>
      </Reveal>
    </div>
  );
};

/* ---------------- 三连快切 ---------------- */
type DeviceKind = "robot" | "tablet" | "phone";

const Device = ({ kind, opacity }: { kind: DeviceKind; opacity: number }) => {
  const stroke = { stroke: T.fg, strokeWidth: 3, fill: "none" } as const;
  const sub = { stroke: T.secondary, strokeWidth: 2.5, fill: "none" } as const;
  return (
    <svg width={260} height={320} viewBox="0 0 260 320" style={{ opacity }}>
      {kind === "robot" ? (
        <g>
          {/* 俯视扫地机：圆 + 两个小轮 + 前方传感器弧线 */}
          <circle cx={130} cy={170} r={96} {...stroke} />
          <circle cx={130} cy={170} r={28} {...sub} />
          <circle cx={130} cy={170} r={5} fill={T.accent} />
          <rect x={44} y={150} width={14} height={40} rx={4} {...sub} />
          <rect x={202} y={150} width={14} height={40} rx={4} {...sub} />
          <path d="M 80 62 A 110 110 0 0 1 180 62" stroke={T.accent} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M 98 44 A 110 110 0 0 1 162 44" stroke={T.accent} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.5} />
          <line x1={130} y1={74} x2={130} y2={92} {...sub} />
        </g>
      ) : null}
      {kind === "tablet" ? (
        <g>
          {/* 平板：圆角矩形 + 居中 home 键 */}
          <rect x={28} y={20} width={204} height={280} rx={20} {...stroke} />
          <rect x={46} y={46} width={168} height={210} rx={6} {...sub} />
          <circle cx={130} cy={278} r={11} {...sub} />
          <circle cx={130} cy={33} r={3} fill={T.fgSubtle} />
        </g>
      ) : null}
      {kind === "phone" ? (
        <g>
          {/* 老手机：窄圆角矩形 + 底部实体键 */}
          <rect x={58} y={16} width={144} height={288} rx={22} {...stroke} />
          <rect x={72} y={48} width={116} height={196} rx={6} {...sub} />
          <line x1={110} y1={32} x2={150} y2={32} {...sub} />
          <rect x={106} y={262} width={48} height={16} rx={6} {...sub} />
          <rect x={76} y={266} width={14} height={8} rx={3} fill={T.fgSubtle} />
          <rect x={170} y={266} width={14} height={8} rx={3} fill={T.fgSubtle} />
        </g>
      ) : null}
    </svg>
  );
};

const Arrow = ({ p }: { p: number }) => {
  const len = 160;
  const headO = progress(p, 0.85, 0.15);
  return (
    <svg width={200} height={320} viewBox="0 0 200 320">
      <line
        x1={16}
        y1={160}
        x2={16 + len}
        y2={160}
        stroke={T.accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)}
      />
      <polyline
        points="150,136 178,160 150,184"
        fill="none"
        stroke={T.accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={headO}
      />
    </svg>
  );
};

const CMD = "$ uname -a";
const TYPE_START = 44;
const TYPE_DONE = TYPE_START + Math.ceil((CMD.length / 18) * FPS); // 61

const Terminal = ({ host }: { host: string }) => {
  const frame = useCurrentFrame();
  const outO = progress(frame, TYPE_DONE + 2, 8);
  return (
    <Panel style={{ width: 284, height: 196 }} cut={18}>
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 18px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {[T.danger, T.warning, T.success].map((c) => (
          <span
            key={c}
            style={{ width: 10, height: 10, borderRadius: 999, background: c, opacity: 0.8 }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "18px 18px 0",
          fontFamily: T.fontMono,
          fontSize: 22,
          lineHeight: 1.7,
          color: T.codeFg,
        }}
      >
        <div>
          <TypeText text={CMD} start={TYPE_START} cps={18} cursor />
        </div>
        <div style={{ color: T.fgMuted, opacity: outO, fontSize: 20 }}>
          Linux {host} armv7l
        </div>
      </div>
    </Panel>
  );
};

const Cut = ({
  label,
  name,
  tagline,
  kind,
  host,
}: {
  label: string;
  name: string;
  tagline: string;
  kind: DeviceKind;
  host: string;
}) => {
  const frame = useCurrentFrame();
  const devO = progress(frame, 14, 16);
  const arrowP = progress(frame, 24, 26);
  return (
    <Section duration={CUT_LEN}>
      <Sfx name="whoosh" from={0} volume={0.25} />
      <Sfx name="tick" from={TYPE_DONE + 2} volume={0.2} />
      <ProjectTitle label={label} name={name} tagline={tagline} nameSize={68} />
      <div
        style={{
          marginTop: 150,
          display: "flex",
          alignItems: "center",
          gap: 36,
        }}
      >
        <Device kind={kind} opacity={devO} />
        <Arrow p={arrowP} />
        <Reveal delay={34} offset={16}>
          <Terminal host={host} />
        </Reveal>
      </div>
    </Section>
  );
};

/* ---------------- 收尾 2×2 ---------------- */
const COURSES = [
  { name: "plusOne", sub: "AI 应用开发路线图" },
  { name: "Insight", sub: "文献解读 Wiki" },
  { name: "Calculus II", sub: "高数交互备考" },
  { name: "Computer Network", sub: "计网速览与测验" },
];
const GRID0 = 14;

const Grid = ({ duration }: { duration: number }) => (
  <Section duration={duration} center>
    <Sfx name="whoosh" from={0} volume={0.25} />
    {COURSES.map((_, i) => (
      <Sfx key={i} name="tick" from={GRID0 + i * 5} volume={0.2} />
    ))}
    <Reveal delay={0}>
      <MonoLabel>// 顺便把课也讲明白</MonoLabel>
    </Reveal>
    <div
      style={{
        marginTop: 40,
        display: "grid",
        gridTemplateColumns: "390px 390px",
        gap: 36,
      }}
    >
      {COURSES.map((c, i) => (
        <Reveal key={c.name} delay={GRID0 + i * 5} offset={24}>
          {i === 0 && SHOTS.plusone ? (
            <Panel style={{ width: 390, height: 250, padding: "40px 32px" }}>
              <div style={{ width: 215 }}>
                <Headline size={44}>{c.name}</Headline>
                <MonoLabel
                  size={20}
                  color={T.fgMuted}
                  style={{ marginTop: 18, textTransform: "none", whiteSpace: "nowrap" }}
                >
                  {c.sub}
                </MonoLabel>
              </div>
              <PhoneFrame
                src="shots/plusone-1.png"
                width={120}
                style={{ position: "absolute", right: 16, top: 52 }}
              />
            </Panel>
          ) : (
            <Panel style={{ width: 390, height: 250, padding: "40px 32px" }}>
              <Headline size={44}>{c.name}</Headline>
              <MonoLabel
                size={20}
                color={T.fgMuted}
                style={{ marginTop: 18, textTransform: "none" }}
              >
                {c.sub}
              </MonoLabel>
            </Panel>
          )}
        </Reveal>
      ))}
    </div>
  </Section>
);

/* ---------------- 场景 ---------------- */
const Chapter4Inner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const fade = 1 - progress(frame, durationInFrames - 10, 10);
  return (
    <Backdrop glowX={30} glowY={28} style={{ opacity: fade }}>
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
        CH.04
      </div>
      <Safe>
        <Sequence from={0} durationInFrames={INTRO_END} layout="none" name="intro">
          <Intro />
        </Sequence>
        <Sequence from={CUT1} durationInFrames={CUT_LEN} layout="none" name="Villy">
          <Cut
            label="// ROBOT · C"
            name="Project.Villy"
            tagline="把扫地机器人改成 Linux 底盘。"
            kind="robot"
            host="villy"
          />
        </Sequence>
        <Sequence from={CUT2} durationInFrames={CUT_LEN} layout="none" name="MiPad2Xubuntu">
          <Cut
            label="// TABLET · SHELL"
            name="Project.MiPad2Xubuntu"
            tagline="老平板装上 Xubuntu。"
            kind="tablet"
            host="mipad"
          />
        </Sequence>
        <Sequence from={CUT3} durationInFrames={CUT_LEN} layout="none" name="GT">
          <Cut
            label="// PHONE · SHELL"
            name="Project.GT"
            tagline="老手机跑起 Debian。"
            kind="phone"
            host="gt"
          />
        </Sequence>
        <Sequence
          from={GRID_START}
          durationInFrames={durationInFrames - GRID_START}
          layout="none"
          name="courses"
        >
          <Grid duration={durationInFrames - GRID_START} />
        </Sequence>
      </Safe>
    </Backdrop>
  );
};

export const Chapter4 = makeScene(Chapter4Inner);
