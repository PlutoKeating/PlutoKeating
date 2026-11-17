import type { ReactNode } from "react";
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
  TypeSfx,
  Sfx,
  ProjectTitle,
  makeScene,
  T,
  progress,
  interpolate,
} from "../ui/primitives";
import { window01 } from "../lib/anim";
import { BEAT, BEAT_OFFSET, FPS, SCHEDULE, beatFrame } from "../lib/timing";

/* ---------- 节拍换算（以场景起始帧为 0） ---------- */
const SCENE_START = beatFrame(SCHEDULE.ch1[0]);
const BEAT0 = Math.round((SCHEDULE.ch1[0] - BEAT_OFFSET) / BEAT);
/** 场景内第 n 拍所在帧 */
const localBeat = (n: number) =>
  Math.round(((BEAT0 + n) * BEAT + BEAT_OFFSET) * FPS) - SCENE_START;

const TITLE_END = localBeat(5); // ≈ 82
const P1_START = localBeat(5);
const P2_START = localBeat(22); // ≈ 360
const P3_START = localBeat(39); // ≈ 638

/* ---------- 共用：面板尺寸 ---------- */
const PANEL_H = 600;
const PANEL_PAD = 36;

/** 终端窗口外壳：Panel + 顶部三个圆点 */
const Terminal = ({
  children,
  height = PANEL_H,
}: {
  children?: ReactNode;
  height?: number;
}) => (
  <Panel
    style={{
      width: "100%",
      height,
      background: T.codeBg,
      marginTop: 40,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "20px 24px 0",
        height: 44,
        flexShrink: 0,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: i === 0 ? T.accent : T.fgSubtle,
            opacity: i === 0 ? 0.9 : 0.5,
          }}
        />
      ))}
    </div>
    <div
      style={{
        flex: 1,
        padding: `16px ${PANEL_PAD}px ${PANEL_PAD}px`,
        fontFamily: T.fontMono,
        fontSize: 28,
        lineHeight: "48px",
        color: T.codeFg,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  </Panel>
);

/** 背景大年份（安全区外、极淡） */
const YearGhost = ({ year }: { year: string }) => (
  <div
    style={{
      position: "absolute",
      right: 24,
      bottom: 110,
      fontFamily: T.fontMono,
      fontSize: 380,
      fontWeight: 700,
      letterSpacing: "-0.06em",
      lineHeight: 1,
      color: T.fg,
      opacity: 0.06,
      pointerEvents: "none",
    }}
  >
    {year}
  </div>
);

/** 子项目容器：10 帧淡出 / 12 帧淡入 */
const Sub = ({
  from,
  to,
  year,
  children,
}: {
  from: number;
  to: number;
  year: string;
  children?: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const o = window01(frame, from, to, 12, 10);
  return (
    <Sequence from={from} durationInFrames={to - from} layout="none">
      <div style={{ position: "absolute", inset: 0, opacity: o }}>
        <YearGhost year={year} />
        <Safe>{children}</Safe>
      </div>
    </Sequence>
  );
};

/* ---------- 章节标题 ---------- */
const ChapterTitle = () => {
  const frame = useCurrentFrame();
  const o = window01(frame, 0, TITLE_END, 12, 12);
  const thumpAt = localBeat(1);
  const punch = 1 + 0.03 * (1 - progress(frame, thumpAt, 14));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o }}>
      <Sfx name="thump" from={thumpAt} volume={0.5} />
      <Safe style={{ justifyContent: "center", gap: 26 }}>
        <Reveal delay={0}>
          <MonoLabel>// CHAPTER 01</MonoLabel>
        </Reveal>
        <Reveal delay={thumpAt - 8} duration={14} offset={40}>
          <Headline
            size={120}
            style={{ transformOrigin: "left center", scale: `${punch}` }}
          >
            起点
          </Headline>
        </Reveal>
        <Reveal delay={thumpAt + 8}>
          <Body size={40} muted>
            先把工具做顺手。
          </Body>
        </Reveal>
      </Safe>
    </div>
  );
};

/* ---------- 1. quickToMyEnv ---------- */
const CMDS = [
  { cmd: "./01_setup_essential-tools.sh", ok: "neofetch · python3 · build-essential" },
  { cmd: "./02_setup_zsh.sh", ok: "oh-my-zsh + myZshrc" },
  { cmd: "./03_setup_vim.sh", ok: "vim bundles ready" },
];
const CPS = 24;
/** 每条命令的时间点：打字开始 / ✓ 出现 */
const cmdTimes = (() => {
  let t = 34;
  return CMDS.map((c) => {
    const typeFrames = Math.ceil((c.cmd.length / CPS) * FPS);
    const start = t;
    const okAt = start + typeFrames + 9;
    t = okAt + 14;
    return { start, okAt };
  });
})();
const P1_LABEL_AT = cmdTimes[2].okAt + 20;

const QuickToMyEnv = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <ProjectTitle
        label="// 2023 · SHELL"
        name="quickToMyEnv"
        tagline="把熟悉的 Linux 环境带去任何一台新电脑。"
      />
      <Reveal delay={16}>
        <Terminal>
          {CMDS.map((c, i) => {
            const { start, okAt } = cmdTimes[i];
            if (frame < start) return null;
            return (
              <div key={i}>
                <div style={{ whiteSpace: "pre" }}>
                  <span style={{ color: T.accent }}>$ </span>
                  <TypeText text={c.cmd} start={start} cps={CPS} cursor={frame < okAt} />
                </div>
                <TypeSfx start={start} chars={c.cmd.length} cps={CPS} volume={0.2} />
                {frame >= okAt ? (
                  <Reveal delay={okAt} duration={6} offset={0}>
                    <div style={{ whiteSpace: "pre" }}>
                      <span style={{ color: T.success }}>✓ </span>
                      <span style={{ color: T.fgMuted }}>{c.ok}</span>
                    </div>
                  </Reveal>
                ) : null}
                {frame >= okAt ? <Sfx name="tick" from={okAt} volume={0.2} /> : null}
              </div>
            );
          })}
          <Reveal delay={P1_LABEL_AT} duration={16} offset={16}>
            <div
              style={{
                marginTop: 28,
                display: "inline-block",
                fontFamily: T.fontSans,
                fontSize: 30,
                lineHeight: "48px",
                padding: "0 22px",
                color: T.accent,
                background: T.accentSoft,
                border: `1px solid ${T.accent}`,
                clipPath:
                  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
              }}
            >
              新机器，五分钟就位
            </div>
          </Reveal>
        </Terminal>
      </Reveal>
    </>
  );
};

/* ---------- 2. Project.LightsUP ---------- */
const VB_W = 816 - 2 * PANEL_PAD; // 744
const VB_H = PANEL_H - 56 - PANEL_PAD; // 508
const CHIP = { x: 242, y: 40, w: 220, h: 150 };
const PB0 = { x: 280, y: CHIP.y + CHIP.h };
const PB1 = { x: 424, y: CHIP.y + CHIP.h };
const BUZZ = { x: 150, y: 430, r: 30 };
const LED_Y = 430;
const LED_X = [0, 1, 2, 3, 4, 5].map((i) => PB1.x + i * 56);
// 线路（折线）与长度
const W0 = `M${PB0.x},${PB0.y} L${PB0.x},300 L${BUZZ.x},300 L${BUZZ.x},${BUZZ.y - BUZZ.r}`;
const W0_LEN = 300 - PB0.y + (PB0.x - BUZZ.x) + (BUZZ.y - BUZZ.r - 300);
const W1 = `M${PB1.x},${PB1.y} L${PB1.x},${LED_Y}`;
const W1_LEN = LED_Y - PB1.y;
const WC = `M${LED_X[0]},${LED_Y} L${LED_X[5]},${LED_Y}`;
const WC_LEN = LED_X[5] - LED_X[0];

const Wire = ({ d, len, p }: { d: string; len: number; p: number }) => (
  <>
    <path d={d} fill="none" stroke={T.fgSubtle} strokeWidth={3} strokeOpacity={0.5} />
    <path
      d={d}
      fill="none"
      stroke={T.accent}
      strokeWidth={3}
      strokeDasharray={len}
      strokeDashoffset={len * (1 - p)}
      strokeLinecap="round"
    />
  </>
);

const arcPath = (cx: number, cy: number, r: number) => {
  // 以蜂鸣器为中心、朝左的 100° 弧
  const a0 = (130 * Math.PI) / 180;
  const a1 = (230 * Math.PI) / 180;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy - r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy - r * Math.sin(a1);
  return `M${x0},${y0} A${r},${r} 0 0 0 ${x1},${y1}`;
};

const LIGHT_AT = 140;
const LightsUP = () => {
  const frame = useCurrentFrame();
  const p0 = progress(frame, 34, 50);
  const p1 = progress(frame, 46, 44);
  const pc = progress(frame, 92, 40);
  const chipOn = progress(frame, 26, 16);
  const buzzOn = p0 >= 1;
  return (
    <>
      <ProjectTitle
        label="// 2024 · STM32 · C"
        name="Project.LightsUP"
        tagline="第一次让硬件发光、发声。"
      />
      <Reveal delay={16}>
        <Panel
          style={{
            width: "100%",
            height: PANEL_H,
            marginTop: 40,
            padding: `56px ${PANEL_PAD}px ${PANEL_PAD}px`,
          }}
        >
          <Sfx name="spark" from={LIGHT_AT} volume={0.35} />
          <svg
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* 芯片 */}
            <rect
              x={CHIP.x}
              y={CHIP.y}
              width={CHIP.w}
              height={CHIP.h}
              fill={T.bgElevated}
              stroke={interpolate(chipOn, [0, 1], [0, 1]) > 0.5 ? T.accent : T.borderStrong}
              strokeWidth={2.5}
              opacity={chipOn}
            />
            {/* 芯片侧面引脚 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} opacity={chipOn}>
                <line
                  x1={CHIP.x - 16}
                  x2={CHIP.x}
                  y1={CHIP.y + 24 + i * 26}
                  y2={CHIP.y + 24 + i * 26}
                  stroke={T.fgSubtle}
                  strokeWidth={2.5}
                />
                <line
                  x1={CHIP.x + CHIP.w}
                  x2={CHIP.x + CHIP.w + 16}
                  y1={CHIP.y + 24 + i * 26}
                  y2={CHIP.y + 24 + i * 26}
                  stroke={T.fgSubtle}
                  strokeWidth={2.5}
                />
              </g>
            ))}
            <text
              x={CHIP.x + CHIP.w / 2}
              y={CHIP.y + 76}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={30}
              fill={T.fg}
              opacity={chipOn}
            >
              STM32F103
            </text>
            <text
              x={PB0.x}
              y={PB0.y - 16}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={20}
              fill={p0 > 0 ? T.accent : T.fgMuted}
              opacity={chipOn}
            >
              PB0
            </text>
            <text
              x={PB1.x}
              y={PB1.y - 16}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={20}
              fill={p1 > 0 ? T.accent : T.fgMuted}
              opacity={chipOn}
            >
              PB1
            </text>

            {/* 线路通电 */}
            <Wire d={W0} len={W0_LEN} p={p0} />
            <Wire d={W1} len={W1_LEN} p={p1} />
            <Wire d={WC} len={WC_LEN} p={pc} />

            {/* 蜂鸣器 */}
            <circle
              cx={BUZZ.x}
              cy={BUZZ.y}
              r={BUZZ.r}
              fill={T.bgElevated}
              stroke={buzzOn ? T.accent : T.fgSubtle}
              strokeWidth={3}
            />
            <circle cx={BUZZ.x} cy={BUZZ.y} r={6} fill={buzzOn ? T.accent : T.fgSubtle} />
            {[48, 66, 84].map((r, i) => {
              const t = Math.max(0, frame - LIGHT_AT - i * 6);
              const breathe = buzzOn ? 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t / 7 - i)) : 0;
              return (
                <path
                  key={r}
                  d={arcPath(BUZZ.x, BUZZ.y, r)}
                  fill="none"
                  stroke={T.secondaryFg}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  opacity={frame >= LIGHT_AT ? breathe : 0}
                />
              );
            })}
            <text
              x={BUZZ.x}
              y={BUZZ.y + BUZZ.r + 40}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={20}
              fill={T.fgMuted}
              letterSpacing="0.12em"
            >
              BUZZER
            </text>

            {/* WS2812B 灯珠 */}
            {LED_X.map((x, i) => {
              const onAt = LIGHT_AT + i * 7;
              const on = progress(frame, onAt, 8);
              const h = (frame * 3 + i * 60) % 360;
              const col = `hsl(${h} 48% 60%)`;
              return (
                <g key={i}>
                  <circle cx={x} cy={LED_Y} r={30} fill={col} opacity={0.22 * on} />
                  <circle
                    cx={x}
                    cy={LED_Y}
                    r={15}
                    fill={on > 0 ? col : T.bgElevated}
                    stroke={on > 0 ? col : T.fgSubtle}
                    strokeWidth={2.5}
                    opacity={pc > 0 || on > 0 ? 1 : 0.7}
                  />
                </g>
              );
            })}
            <text
              x={(LED_X[0] + LED_X[5]) / 2}
              y={LED_Y + 70}
              textAnchor="middle"
              fontFamily={T.fontMono}
              fontSize={20}
              fill={T.fgMuted}
              letterSpacing="0.12em"
            >
              WS2812B × 6
            </text>
          </svg>
        </Panel>
      </Reveal>
    </>
  );
};

/* ---------- 3. autoTmux ---------- */
const SPLIT_AT = 62;
const AutoTmux = () => {
  const frame = useCurrentFrame();
  const split = progress(frame, SPLIT_AT, 22);
  const barH = 48 * split;
  const paneW = 50 * split; // 百分比
  const leftType = SPLIT_AT + 34;
  const rightType = leftType + 16;
  const logs = ["listening on :8080", "GET /  200  3ms"];
  return (
    <>
      <ProjectTitle label="// 2025 · SHELL" name="autoTmux" tagline="登录即就位。" />
      <Reveal delay={16}>
        <Terminal>
          <Sfx name="whoosh" from={SPLIT_AT} volume={0.3} />
          <div
            style={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 登录行：分裂后淡出 */}
            <div
              style={{
                whiteSpace: "pre",
                opacity: 1 - progress(frame, SPLIT_AT, 8),
                height: 48 * (1 - split),
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <span style={{ color: T.fgMuted }}>login: </span>
              <TypeText text="pluto" start={22} cps={CPS} cursor={frame < SPLIT_AT} />
              <TypeSfx start={22} chars={5} cps={CPS} volume={0.2} />
            </div>

            {/* 状态条 */}
            <div
              style={{
                height: barH,
                overflow: "hidden",
                background: T.success,
                color: T.accentFg,
                fontSize: 26,
                lineHeight: "48px",
                padding: "0 18px",
                whiteSpace: "pre",
                marginBottom: 14 * split,
                flexShrink: 0,
              }}
            >
              [0] 0:zsh* 1:vim 2:logs
            </div>

            {/* 左右 pane */}
            <div style={{ flex: 1, display: "flex", gap: 14 * split, minHeight: 0 }}>
              {[0, 1].map((side) => (
                <div
                  key={side}
                  style={{
                    width: `calc(${paneW}% - ${7 * split}px)`,
                    border: `1.5px solid ${T.borderStrong}`,
                    opacity: split,
                    padding: "12px 18px",
                    overflow: "hidden",
                    whiteSpace: "pre",
                  }}
                >
                  {side === 0 ? (
                    frame >= leftType ? (
                      <div>
                        <span style={{ color: T.accent }}>$ </span>
                        <TypeText text="vim main.c" start={leftType} cps={CPS} />
                        <TypeSfx start={leftType} chars={10} cps={CPS} volume={0.2} />
                      </div>
                    ) : null
                  ) : frame >= rightType ? (
                    <div>
                      <span style={{ color: T.accent }}>$ </span>
                      <TypeText text="tail -f app.log" start={rightType} cps={CPS} cursor={false} />
                      <TypeSfx start={rightType} chars={15} cps={CPS} volume={0.2} />
                      {logs.map((l, i) => (
                        <Reveal key={i} delay={rightType + 30 + i * 18} duration={6} offset={0}>
                          <div style={{ color: T.fgSubtle, fontSize: 24 }}>{l}</div>
                        </Reveal>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Terminal>
      </Reveal>
    </>
  );
};

/* ---------- 场景 ---------- */
const Chapter1Inner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const sceneOut = 1 - progress(frame, durationInFrames - 10, 10);
  return (
    <Backdrop glowX={70} glowY={30}>
      <div style={{ position: "absolute", inset: 0, opacity: sceneOut }}>
        <ChapterTitle />
        <Sub from={P1_START} to={P2_START} year="2023">
          <QuickToMyEnv />
        </Sub>
        <Sub from={P2_START} to={P3_START} year="2024">
          <LightsUP />
        </Sub>
        <Sub from={P3_START} to={durationInFrames} year="2025">
          <AutoTmux />
        </Sub>
      </div>
    </Backdrop>
  );
};

export const Chapter1 = makeScene(Chapter1Inner);
