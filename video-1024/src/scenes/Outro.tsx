import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  Backdrop,
  Safe,
  MonoLabel,
  Headline,
  Body,
  GlitchText,
  TypeText,
  Reveal,
  Sfx,
  makeScene,
  T,
} from "../ui/primitives";
import { ContribWall } from "../ui/ContribWall";
import { progress, window01 } from "../lib/anim";

const OutroInner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = 0; // 墙 + 1024
  const t2 = 8 * fps; // 标语
  const t3 = 15 * fps; // 署名
  const fade = window01(frame, 0, durationInFrames, 14, 40);
  const wallOut = 1 - progress(frame, t3 - 10, 14);
  return (
    <Backdrop style={{ opacity: fade }} glowX={50} glowY={40}>
      <Safe style={{ justifyContent: "center", gap: 40 }}>
        {/* 第一段：节日标题 + 墙 */}
        <div style={{ opacity: wallOut }}>
          <Reveal delay={t1 + 2}>
            <MonoLabel>// HAPPY 1024</MonoLabel>
          </Reveal>
          <Reveal delay={t1 + 8} offset={30} style={{ marginTop: 20 }}>
            <Headline size={112}>程序员节快乐。</Headline>
          </Reveal>
          <div style={{ marginTop: 56 }}>
            <ContribWall ignite={progress(frame, t1 + 20, 2 * fps)} />
          </div>
          {/* 标语 */}
          <div style={{ marginTop: 64, minHeight: 150 }}>
            {frame >= t2 ? (
              <Body size={40} style={{ fontFamily: T.fontMono }}>
                <TypeText
                  text="That is to make positive impacts on the world  :)"
                  start={t2}
                  cps={22}
                />
              </Body>
            ) : null}
            <Reveal delay={t2 + 3 * fps}>
              <Body size={34} muted style={{ marginTop: 16 }}>
                下一年，继续做有用的东西。
              </Body>
            </Reveal>
          </div>
        </div>

        {/* 第二段：署名 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            translate: "0 -50%",
            opacity: progress(frame, t3, 16),
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <GlitchText size={150} color={T.fg} glitchFrames={[t3 + 8]}>
            PLUTO
          </GlitchText>
          <GlitchText size={150} color={T.accent} glitchFrames={[t3 + 12]}>
            KEATING
          </GlitchText>
          <Reveal delay={t3 + 24} style={{ marginTop: 30 }}>
            <MonoLabel size={30} color={T.fg} style={{ textTransform: "none" }}>
              plutokeating.beer
            </MonoLabel>
          </Reveal>
          <Reveal delay={t3 + 34}>
            <MonoLabel size={26} color={T.fgMuted} style={{ textTransform: "none" }}>
              github.com/PlutoKeating
            </MonoLabel>
          </Reveal>
          <Reveal delay={t3 + 60}>
            <MonoLabel size={22} color={T.fgSubtle} style={{ marginTop: 40 }}>
              // 2026 · 10 · 24
            </MonoLabel>
          </Reveal>
        </div>
      </Safe>
      <Sfx name="thump" from={t1 + 8} volume={0.5} />
      <Sfx name="spark" from={t1 + 20 + 2 * fps} volume={0.35} />
      <Sfx name="spark" from={t3 + 12} volume={0.3} />
      <Sfx name="glitch" from={t3 + 8} volume={0.25} />
    </Backdrop>
  );
};

export const Outro = makeScene(OutroInner);
