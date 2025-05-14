import React from 'react';
import { Svg, Circle, Path, Polygon } from 'react-native-svg';

interface CurvedArrowCircleProps {
  size?: number;         // Width/Height of the icon
  color?: string;        // Stroke and fill color
}

const CurvedArrowCircle: React.FC<CurvedArrowCircleProps> = ({
  size = 100,
  color = 'black',
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Outer Circle */}
    <Circle cx={50} cy={50} r={45} stroke={color} strokeWidth={4} fill="none" />

    {/* Curved Arrow Path */}
    <Path
      d="M32 68 A38 38 0 0 1 68 32"
      stroke={color}
      strokeWidth={4}
      fill="none"
    />

    {/* Triangle Arrowhead */}
    <Polygon
      points="68,32 64,28 70,26"
      fill={color}
    />
  </Svg>
);

export default CurvedArrowCircle;