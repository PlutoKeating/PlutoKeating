// 音乐《知识的小曲》：110 BPM，首个强拍约 0.79s。段落：0–18 intro，18–82 主歌一，82–104 间奏，104–167 主歌二，167+ 淡出。
export const BPM = 110;
export const BEAT = 60 / BPM; // 0.5454s
export const BEAT_OFFSET = 0.79 % BEAT; // 节拍网格相位
export const FPS = 30;

/** 把秒吸附到最近的节拍，返回秒 */
export const snapToBeat = (sec: number) =>
  Math.round((sec - BEAT_OFFSET) / BEAT) * BEAT + BEAT_OFFSET;

/** 秒 → 帧（已吸附到节拍） */
export const beatFrame = (sec: number) => Math.round(snapToBeat(sec) * FPS);

// 场景时间表（秒）
export const SCHEDULE = {
  opening: [0, 18],
  ch1: [18, 48],
  wall: [48, 54],
  ch2: [54, 104],
  ch3: [104, 132],
  ch4: [132, 152],
  outro: [152, 176],
} as const;

export const TOTAL_SECONDS = 176;
export const TOTAL_FRAMES = TOTAL_SECONDS * FPS;
