import { Injectable } from '@angular/core';
import { parse } from 'acorn';
import * as generator from 'escodegen';
import { Difficulty } from '../model/difficulty.enum';
import { getRandomElementFromArr, noBetween } from '../utils/utils';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CodegenerationService {

  private generators = [this.generateDirectAssignment.bind(this), this.generateIfElseBlock.bind(this), this.generateForLoopBlock.bind(this),
                        this.generateSwapBlock.bind(this)];
  private endSetVars = ['headWear', 'tie', 'glasses', 'blue'];
  private extendedEndSetVars = [...this.endSetVars, ...this.endSetVars.map(v => `!${v}`), 'true', 'false'];
  private comparators = ['<', '<=', '===', '!==', '>', '>='];
  private varCtr = 1;

  constructor(private settings: SettingsService) { }

  private generateDirectAssignment() {
    return `${getRandomElementFromArr(this.endSetVars)} = ${getRandomElementFromArr(this.extendedEndSetVars)};`;
  }

  private generateIfElseBlock() {
    const newVarName = this.getNextVar();
    return (
`let ${newVarName} = ${noBetween(0, 20)};
if (${newVarName} ${getRandomElementFromArr(this.comparators)} ${noBetween(0, 20)}) {
  ${this.generateDirectAssignment()}
} else {
  ${this.generateDirectAssignment()}
}
`);
  }

  private generateSwapBlock() {
    const newVarName = this.getNextVar();
    const el1 = getRandomElementFromArr(this.endSetVars);
    const el2 = getRandomElementFromArr(this.endSetVars.filter(x => x !== el1));
    return (
 `
 let ${newVarName} = ${el1};
 ${el1} = ${el2};
 ${el2} = ${newVarName};
 `     
    );
  }

  private generateForLoopBlock() {
    const newVarName = this.getNextVar();
    return (
`for (let ${newVarName} = ${noBetween(0, 10)}; ${newVarName} ${Math.random() > 0.5 ? '>' : '>='} ${noBetween(11, 20)}; ${newVarName}++) {
  ${this.generateDirectAssignment()}
}
`);
  }

  private generateInitialDeclarations() {
    const beginTrueCollection: string[] = [];
    const beginFalseCollection: string[] = [];
  
    this.endSetVars.forEach(varName => (Math.random() > 0.5) ? beginTrueCollection.push(varName) : beginFalseCollection.push(varName));
    return `let ${[...beginTrueCollection.map(n => `${n} = true`), ...beginFalseCollection.map(n => `${n} = false`)].join(', ')};`;
  }

  private getNextVar(): string {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'foo', 'bar', 'buzz'][this.varCtr++];
  }

  private generateBlock() {
    return getRandomElementFromArr(this.generators)()
  }

  generateSnippet(): string {
    const ast = this.generateInitialDeclarations();
    const blocks = [];

    const noOfBlocks = this.settings.difficultyLevel === Difficulty.Easy ? noBetween(1, 2) : this.settings.difficultyLevel === Difficulty.Medium ? noBetween(3, 4) : noBetween(4, 5); 
    for (let i = 0; i < noOfBlocks; i++) {
      blocks.push(this.generateBlock());
    }

    return [ast, ...blocks].join("\n");
  }

}
