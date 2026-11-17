import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontsReady = loadFont({
  family: "Inter",
  url: staticFile("fonts/InterVariable.woff2"),
  weight: "100 900",
});
