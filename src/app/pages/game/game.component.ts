import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Character } from 'src/app/model/character.interface';
import { Level } from 'src/app/model/level.interface';
import { LevelGeneratorService } from 'src/app/services/level-generator.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currLevel: Level;

  constructor(private levelGeneratorService: LevelGeneratorService, private _snackBar: MatSnackBar) {
    this.currLevel = this.levelGeneratorService.generateLevel()
  }

  ngOnInit(): void {
  }

  loadNextLevel() {
    this.currLevel = this.levelGeneratorService.generateLevel();
  }

  handleCharSelection(char: Character) {
    const s = this.currLevel.solution;
    const p = char.properties;
    const isCorrect = (s.blue === p.blue && s.glasses === p.glasses && s.headWear === p.headWear && s.tie === p.tie);
    let snackBarRef = this._snackBar.open(isCorrect ? 'Correct!' : 'Wrong!', 'OK');
    snackBarRef.onAction().pipe(take(1)).subscribe(() => this.loadNextLevel());
  }

}
