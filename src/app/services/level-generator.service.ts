import { Injectable } from '@angular/core';
import { Level } from '../model/level.interface';
import { CharacterGeneratorService } from './character-generator.service';
import { CodeEvaluatorService } from './code-evaluator.service';
import { CodegenerationService } from './codegeneration.service';

@Injectable({
  providedIn: 'root'
})
export class LevelGeneratorService {

  constructor(private codeGen: CodegenerationService, private charGen: CharacterGeneratorService, private evalService: CodeEvaluatorService) { }

  generateLevel(): Level {
    const { snippet, vars } = this.codeGen.generateSnippet();

    const solution = this.evalService.evaluateCode(snippet);
    
    const chars = this.charGen.generateCharacterSet();
    chars.forEach(c => c.isCorrect = c.properties.blue === solution.blue && c.properties.tie === solution.tie 
                          && c.properties.headWear === solution.headWear && c.properties.glasses === solution.glasses);


    console.log('the solution', chars.find(c => c.isCorrect)?.name);
    return {
      characters: chars,
      codeSnippet: snippet,
      solution,
      declaredVars: vars
    }
  }
}
