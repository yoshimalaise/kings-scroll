import { PropertyCombination } from "./property-combination.interface";

export interface Character {
  name: string;
  properties: PropertyCombination;
  visualProps: VisualProp[];
  isCorrect?: boolean;
  isMale: boolean;
}

export interface VisualProp {
  x: number;
  y: number;
  width: number,
  height: number,
  path: string;
  layer: Layer;
}

export enum Layer {
  CAPE_BACKGROUND = 1,
  FACE,
  ARMOR,
  CAPE_FOREGROUND,
  FACE_OVERLAY,
  WEARABLE,
}