import { Easing, interpolate } from "remotion";

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeStd = Easing.bezier(0.2, 0, 0, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

/** 0→1 的入场进度 */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing = easeOut,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** 先入后出：返回 0..1，用于在一段时间内显示 */
export const window01 = (
  frame: number,
  start: number,
  end: number,
  fadeIn = 12,
  fadeOut = 10,
) => {
  if (frame < start || frame > end) return 0;
  const a = progress(frame, start, fadeIn);
  const b = 1 - progress(frame, end - fadeOut, fadeOut, easeIn);
  return Math.min(a, b);
};

/** 简单伪随机，稳定可复现 */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};
