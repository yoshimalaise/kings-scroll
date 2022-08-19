import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Difficulty } from '../model/difficulty.enum';
import { GameMode } from '../model/game-modes.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  gameMode: GameMode = GameMode.SINGLE_PLAYER;
  showTutorial = false;
  noOfProps: 4 | 5 = 4;

  // configurable from settings menu
  difficultyLevel: Difficulty = Difficulty.Easy;
  language: 'javascript' | 'python' = 'javascript';
  allowFor = true;
  allowIf = true;
  allowIfElse = true;
  allowWhile = true;
  allowFunctions = true;

  isMobile = false;

  reset() {
    this.gameMode = GameMode.SINGLE_PLAYER;
    this.showTutorial = false;
  }

  constructor(private deviceService: DeviceDetectorService) { 
    this.isMobile = deviceService.isMobile();
  }
}
