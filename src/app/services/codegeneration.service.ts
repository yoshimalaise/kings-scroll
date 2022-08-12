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
                        this.generateSwapBlock.bind(this), this.generateDoWhileBlock.bind(this), this.generateFunctionBlock.bind(this)];
  private endSetVars = ['headWear', 'tie', 'glasses', 'blue'];
  private extendedEndSetVars = [...this.endSetVars, ...this.endSetVars.map(v => `!${v}`), 'true', 'false'];
  private comparators = ['<', '<=', '===', '!==', '>', '>='];
  private varCtr = 1;

  constructor(private settings: SettingsService) { }

  private generateDirectAssignment() {
    return `${getRandomElementFromArr(this.endSetVars)} = ${ getRandomElementFromArr(this.extendedEndSetVars)};`;
  }

  /**
   * can be used inside the body of other snippets.
   * depending on the difficulty of the gane it either generates a direct assignment or recursively calls a block to generate nested statements
   */
  private generateEmbeddableSnippet(): string {
    const threshold = this.settings.difficultyLevel === Difficulty.Easy ? 1 : this.settings.difficultyLevel === Difficulty.Medium ? 0.7 : 0.5;
    if (Math.random() > threshold) {
      return this.generateBlock();
    } else {
      return this.generateDirectAssignment();
    }
  }

  private generateIfElseBlock() {
    const newVarName = this.getNextVar();
    return (
`let ${newVarName} = ${noBetween(0, 20)};
if (${newVarName} ${getRandomElementFromArr(this.comparators)} ${noBetween(0, 20)}) {
  ${this.generateEmbeddableSnippet()}
} else {
  ${this.generateEmbeddableSnippet()}
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
`for (let ${newVarName} = ${noBetween(0, 10)}; ${newVarName} ${Math.random() > 0.5 ? '<' : '<='} ${noBetween(11, 20)}; ${newVarName}++) {
  ${this.generateEmbeddableSnippet()}
}
`);
  }

  private generateDoWhileBlock() {
    const newVarName = this.getNextVar();
    const initialValue = noBetween(0, 20);
    const thresholdValue = noBetween(0, 20);
    const comparator = getRandomElementFromArr(['<', '<=', '>', '>=', '===']);
    // this one is a bit tricky since we want to prevent infinite loops
    let incOrDec = '++';
    if ((initialValue > thresholdValue) && ['>', '>='].includes(comparator)) {
      incOrDec = '--';
    }
    return (
`let ${newVarName} = ${initialValue};
do {
  ${newVarName}${incOrDec};
  ${this.generateEmbeddableSnippet()}
} while (${newVarName} ${comparator} ${thresholdValue});
`
    );
  }

  private generateFunctionBlock() {
    const funcName = this.getNextVar();

    return (
`function ${funcName}() {
  ${this.generateEmbeddableSnippet()}
}
${this.generateEmbeddableSnippet()}
${funcName}();
`
    );
  }

  private generateInitialDeclarations() {
    const beginTrueCollection: string[] = [];
    const beginFalseCollection: string[] = [];
  
    this.endSetVars.forEach(varName => (Math.random() > 0.5) ? beginTrueCollection.push(varName) : beginFalseCollection.push(varName));
    return `${[...beginTrueCollection.map(n => `let ${n} = true;`), 
                ...beginFalseCollection.map(n => `let ${n} = false;`)].join('\n')}`;
  }

  private getNextVar(): string {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'foo', 'bar', 'buzz'][this.varCtr++];
  }

  private generateBlock() {
    return getRandomElementFromArr(this.generators)()
  }

  /**
   * Generates a nice pretty version of the code according to best practises
   * @param snippet the code to prettify
   * @returns prittified snippet
   */
  private prettify(snippet: string): string {
    return generator.generate(parse(snippet, { ecmaVersion: 9}));
  }

  generateSnippet(): string {
    const ast = this.generateInitialDeclarations();
    const blocks = [];

    const noOfBlocks = this.settings.difficultyLevel === Difficulty.Easy ? noBetween(1, 2) : this.settings.difficultyLevel === Difficulty.Medium ? noBetween(3, 4) : noBetween(4, 5); 
    for (let i = 0; i < noOfBlocks; i++) {
      blocks.push(this.generateBlock());
    }

    return this.prettify([ast, ...blocks].join("\n"));
  }

}
