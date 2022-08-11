import { Injectable } from '@angular/core';
import { GameMode } from '../model/game-modes.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  gameMode: GameMode = GameMode.SINGLE_PLAYER;
  showTutorial = false;
  noOfProps: 4 | 5 = 4;

  reset() {
    this.gameMode = GameMode.SINGLE_PLAYER;
    this.showTutorial = false;
  }

  constructor() { }
}
