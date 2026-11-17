import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  Backdrop,
  Safe,
  MonoLabel,
  Body,
  GlitchText,
  TypeText,
  TypeSfx,
  Reveal,
  Sfx,
  makeScene,
  T,
} from "../ui/primitives";
import { progress, window01, easeStd } from "../lib/anim";

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

const Timeline = ({ start }: { start: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = 816;
  const p = progress(frame, start, 3 * fps, easeStd); // 线条生长
  const x = (i: number) => (i / (YEARS.length - 1)) * w;
  // 早期三个点：2023/2024/2025，在线扫过后亮
  const early = [3, 4, 5];
  return (
    <div style={{ position: "relative", width: w, height: 170 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 70,
          height: 2,
          width: w * p,
          background: `linear-gradient(90deg, ${T.fgSubtle}, ${T.accent})`,
        }}
      />
      {YEARS.map((y, i) => {
        const reached = p * w >= x(i) - 1;
        const isEarly = early.includes(i);
        const isLast = i === YEARS.length - 1;
        return (
          <div
            key={y}
            style={{
              position: "absolute",
              left: x(i),
              top: 0,
              translate: i === 0 ? "-10% 0" : isLast ? "-90% 0" : "-50% 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              opacity: reached ? 1 : 0.25,
            }}
          >
            <MonoLabel size={22} color={isLast ? T.accent : T.fgMuted}>
              {y}
            </MonoLabel>
            <div
              style={{
                width: isLast ? 22 : isEarly ? 14 : 8,
                height: isLast ? 22 : isEarly ? 14 : 8,
                borderRadius: 999,
                marginTop: isLast ? 10 : isEarly ? 14 : 17,
                background: isLast ? T.accent : isEarly ? T.accentHover : T.fgSubtle,
                boxShadow:
                  (isLast || isEarly) && reached
                    ? `0 0 ${isLast ? 28 : 14}px ${T.accentGlow}`
                    : "none",
                scale: isLast ? String(0.6 + 0.4 * progress(frame, start + 3 * fps, 10)) : "1",
              }}
            />
          </div>
        );
      })}
      <Reveal delay={start + 10}>
        <div style={{ position: "absolute", left: 0, top: 118 }}>
          <MonoLabel size={22} color={T.fgMuted}>
            2020.03 · 注册
          </MonoLabel>
        </div>
      </Reveal>
      <Reveal delay={start + 3 * fps + 6}>
        <div style={{ position: "absolute", right: 0, top: 118, textAlign: "right" }}>
          <MonoLabel size={22}>2026 · 今天</MonoLabel>
        </div>
      </Reveal>
    </div>
  );
};

const OpeningInner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tTitle = 2 * fps; // 大标题
  const tSlogan = 6.5 * fps;
  const tLine = 11 * fps; // 时间线
  const slogan = "That is to make positive impacts on the world  :)";
  const fade = window01(frame, 0, durationInFrames, 20, 12);
  return (
    <Backdrop style={{ opacity: fade }} glowX={70} glowY={30}>
      <Safe style={{ justifyContent: "flex-start", gap: 0 }}>
        {/* 顶部日期标签 */}
        <div style={{ height: 60 }}>
          <MonoLabel size={28}>
            <TypeText text="// 1024 · 2026" start={6} cps={16} />
          </MonoLabel>
        </div>

        {/* 你好，世界 */}
        <Reveal delay={tTitle - 14} duration={16} style={{ marginTop: 120 }}>
          <Body size={36} muted style={{ letterSpacing: "0.14em" }}>
            你好，世界。我是
          </Body>
        </Reveal>

        {/* 大标题 */}
        <Reveal delay={tTitle} duration={14} offset={30} style={{ marginTop: 26 }}>
          <GlitchText size={196} color={T.fg} glitchFrames={[tTitle + 6, tTitle + 40]}>
            PLUTO
          </GlitchText>
        </Reveal>
        <Reveal delay={tTitle + 6} duration={14} offset={30} style={{ marginTop: 18 }}>
          <GlitchText
            size={196}
            color={T.accent}
            glitchFrames={[tTitle + 12, tTitle + 46, tTitle + 110]}
          >
            KEATING
          </GlitchText>
        </Reveal>

        {/* 标语 */}
        <div style={{ marginTop: 70, minHeight: 130 }}>
          <Body size={40} style={{ fontFamily: T.fontMono, letterSpacing: "0.02em" }}>
            {frame >= tSlogan ? (
              <TypeText text={slogan} start={tSlogan} cps={22} />
            ) : null}
          </Body>
          <Reveal delay={tSlogan + 2.6 * fps}>
            <Body size={32} muted style={{ marginTop: 18 }}>
              在代码、硬件与 AI 的交界处持续探索。
            </Body>
          </Reveal>
        </div>

        {/* 时间线 */}
        <div style={{ marginTop: "auto", marginBottom: 20 }}>
          <Reveal delay={tLine - 6}>
            <MonoLabel size={22} color={T.fgMuted} style={{ marginBottom: 26 }}>
              // TIMELINE
            </MonoLabel>
          </Reveal>
          {frame >= tLine - 6 ? <Timeline start={tLine} /> : null}
        </div>
      </Safe>

      {/* 音效 */}
      <Sfx name="glitch" from={tTitle + 6} volume={0.35} />
      <Sfx name="thump" from={tTitle + 6} volume={0.45} />
      <Sfx name="glitch" from={tTitle + 46} volume={0.25} />
      <TypeSfx start={tSlogan} chars={slogan.length} cps={22} every={4} volume={0.15} />
      <Sfx name="tick" from={tLine + Math.round(1.5 * fps)} volume={0.2} />
      <Sfx name="tick" from={tLine + Math.round(2.0 * fps)} volume={0.2} />
      <Sfx name="tick" from={tLine + Math.round(2.5 * fps)} volume={0.2} />
      <Sfx name="riser" from={durationInFrames - 2 * fps} volume={0.35} />
    </Backdrop>
  );
};

export const Opening = makeScene(OpeningInner);
