import { Audio } from "@remotion/media";
import { AbsoluteFill, Track, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SCHEDULE, beatFrame } from "./lib/timing";
import { Opening } from "./scenes/Opening";
import { Chapter1 } from "./scenes/Chapter1";
import { Wall } from "./scenes/Wall";
import { Chapter2 } from "./scenes/Chapter2";
import { Chapter3 } from "./scenes/Chapter3";
import { Chapter4 } from "./scenes/Chapter4";
import { Outro } from "./scenes/Outro";
import { T } from "./lib/theme";

const Music = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <Audio
      name="知识的小曲"
      src={staticFile("audio/music.mp3")}
      volume={interpolate(
        frame,
        [0, fps, durationInFrames - 6 * fps, durationInFrames - 1],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )}
    />
  );
};

const S = (key: keyof typeof SCHEDULE) => {
  const [a, b] = SCHEDULE[key];
  const from = beatFrame(a);
  return { from, durationInFrames: beatFrame(b) - from };
};

export const Memorial = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: T.bg }}>
      <Track name="Scenes">
        <Opening name="Opening" from={0} durationInFrames={beatFrame(SCHEDULE.opening[1])} />
        <Chapter1 name="Ch1 起点" {...S("ch1")} />
        <Wall name="贡献墙" {...S("wall")} />
        <Chapter2 name="Ch2 即刻体验" {...S("ch2")} />
        <Chapter3 name="Ch3 工具与基座" {...S("ch3")} />
        <Chapter4 name="Ch4 拆解与移植" {...S("ch4")} />
        <Outro name="Outro" {...S("outro")} />
      </Track>
      <Track name="Music">
        <Music />
      </Track>
    </AbsoluteFill>
  );
};
