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
}