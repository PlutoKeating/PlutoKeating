#!/usr/bin/env bash
# 渲染 1080×1920 成片；用法：./render.sh [输出路径]
set -e
OUT=${1:-out/pluto-1024.mp4}
mkdir -p "$(dirname "$OUT")"
npx remotion render Pluto1024 "$OUT" --codec=h264 --crf=18 --audio-bitrate=192k --concurrency=4 --log=error
echo "rendered: $OUT"
