import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  Backdrop,
  Safe,
  MonoLabel,
  Headline,
  Reveal,
  Sfx,
  makeScene,
  T,
} from "../ui/primitives";
import { ContribWall } from "../ui/ContribWall";
import { progress, window01, easeStd } from "../lib/anim";

const WallInner = ({ durationInFrames }: { durationInFrames: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ignite = progress(frame, 10, 3 * fps, easeStd);
  const fade = window01(frame, 0, durationInFrames, 6, 10);
  const ticks = Array.from({ length: 10 }, (_, i) => 10 + Math.round((i / 10) * 3 * fps));
  return (
    <Backdrop style={{ opacity: fade }} glowX={50} glowY={55}>
      {/* 背景大字 */}
      <div
        style={{
          position: "absolute",
          right: -20,
          bottom: 420,
          fontFamily: T.fontMono,
          fontSize: 420,
          fontWeight: 700,
          color: T.fg,
          opacity: 0.05 * ignite,
          letterSpacing: "-0.06em",
          lineHeight: 1,
        }}
      >
        2026
      </div>
      <Safe style={{ justifyContent: "center", gap: 48 }}>
        <Reveal delay={0} duration={12}>
          <MonoLabel>// 2026</MonoLabel>
        </Reveal>
        <Reveal delay={4} duration={14} offset={30}>
          <Headline size={104}>然后，一切加速。</Headline>
        </Reveal>
        <div style={{ marginTop: 30 }}>
          <ContribWall ignite={ignite} />
        </div>
        <Reveal delay={3 * fps + 14}>
          <MonoLabel size={22} color={T.fgMuted}>
            // 过去一年的公开提交
          </MonoLabel>
        </Reveal>
      </Safe>
      <Sfx name="thump" from={4} volume={0.55} />
      {ticks.map((f) => (
        <Sfx key={f} name="tick" from={f} volume={0.18} />
      ))}
      <Sfx name="spark" from={3 * fps + 10} volume={0.35} />
    </Backdrop>
  );
};

export const Wall = makeScene(WallInner);
