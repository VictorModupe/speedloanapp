import * as React from "react";
import Svg, {
  Rect,
  Ellipse,
  Circle,
  Defs,
  Stop,
  Path,
  G,
  ClipPath,
} from "react-native-svg";

const EmailSvg = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <G clipPath="url(#clip0_301_503)">
      <Path
        d="M2.17508 5.00058V5.00016C2.17508 4.35637 2.69615 3.8335 3.33341 3.8335H16.6667C17.3073 3.8335 17.8334 4.35964 17.8334 5.00016V15.0002C17.8334 15.6407 17.3073 16.1668 16.6667 16.1668H3.33341C2.69295 16.1668 2.16685 15.6408 2.16675 15.0003C2.16675 15.0003 2.16675 15.0002 2.16675 15.0002L2.17508 5.00058ZM16.9317 7.09083L17.1667 6.94395V6.66683V5.00016V4.09804L16.4017 4.57616L10.0001 8.57721L3.59841 4.57616L2.83341 4.09804V5.00016V6.66683V6.94395L3.06842 7.09083L9.73508 11.2575L10.0001 11.4231L10.2651 11.2575L16.9317 7.09083Z"
        fill="black"
        stroke="#F1F1F1"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_301_503">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EmailSvg;
