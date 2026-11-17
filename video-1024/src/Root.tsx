import { Composition } from "remotion";
import { Memorial } from "./Memorial";
import { TOTAL_FRAMES, FPS } from "./lib/timing";
import "./lib/fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Pluto1024"
        component={Memorial}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
