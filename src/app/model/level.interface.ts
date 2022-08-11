import { Character } from './character.interface';
import { PropertyCombination } from './property-combination.interface';

export interface Level {
  codeSnippet: string;
  solution: PropertyCombination;
  characters: Character[];
}