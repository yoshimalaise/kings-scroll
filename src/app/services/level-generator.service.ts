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
    const snippet = this.codeGen.generateSnippet();

    const solution = this.evalService.evaluateCode(snippet);

    return {
      characters: this.charGen.generateCharacterSet(),
      codeSnippet: snippet,
      solution
    }
  }
}
