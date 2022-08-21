import { PropertyCombination } from "./property-combination.interface";

export interface Character {
  name: string;
  properties: PropertyCombination;
  visualProps: VisualProp[];
  isCorrect?: boolean;
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
  ARMOR,
  CAPE_FOREGROUND,
  FACE,
  FACE_OVERLAY,
  WEARABLE,
}