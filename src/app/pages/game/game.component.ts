import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { AwardPointsCoopDialogComponent } from 'src/app/dialogs/co-op/award-points-coop-dialog/award-points-coop-dialog.component';
import { GameOverCoopDialogComponent } from 'src/app/dialogs/co-op/game-over-coop-dialog/game-over-coop-dialog.component';
import { SetupCoopDialogComponent } from 'src/app/dialogs/co-op/setup-coop-dialog/setup-coop-dialog.component';
import { AwardPointsSinglePlayerDialogComponent } from 'src/app/dialogs/single-player/award-points-single-player-dialog/award-points-single-player-dialog.component';
import { GameOverSinglePlayerDialogComponent } from 'src/app/dialogs/single-player/game-over-single-player-dialog/game-over-single-player-dialog.component';
import { SetupSinglePlayerDialogComponent } from 'src/app/dialogs/single-player/setup-single-player-dialog/setup-single-player-dialog.component';
import { Character } from 'src/app/model/character.interface';
import { GameMode } from 'src/app/model/game-modes.enum';
import { GameSession } from 'src/app/model/game-session.interface';
import { Level } from 'src/app/model/level.interface';
import { LevelGeneratorService } from 'src/app/services/level-generator.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currLevel?: Level;
  session?: GameSession = undefined;

  constructor(private levelGeneratorService: LevelGeneratorService, private settings: SettingsService, public dialog: MatDialog) {
    this.session = {
      isSinglePlayer: this.settings.gameMode === GameMode.SINGLE_PLAYER,
      isFinished: false,
      targetGoal: 3,
      playerName: '',
      score: 0,
      participants: []
    } as any

    const dialogRef = this.dialog.open(this.settings.gameMode === GameMode.SINGLE_PLAYER ? SetupSinglePlayerDialogComponent as any: SetupCoopDialogComponent, {
      data: this.session as any,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.session = result;
      this.currLevel = this.levelGeneratorService.generateLevel();
    });
    
  }

  ngOnInit(): void {
  }

  loadNextLevel() {
    this.currLevel = this.levelGeneratorService.generateLevel();
  }

  handleCharSelection(char: Character) {
    const s = this.currLevel?.solution;
    const p = char.properties;
    const isCorrect = (s?.blue === p.blue && s.glasses === p.glasses && s.headWear === p.headWear && s.tie === p.tie);

    const dialogRef = this.dialog.open(this.settings.gameMode === GameMode.SINGLE_PLAYER ? AwardPointsSinglePlayerDialogComponent : AwardPointsCoopDialogComponent, {
      data: this.session,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isFinished) {
        this.showGameOverScreen();
      } else {
        this.loadNextLevel();
      }
    });
    
  }

  private showGameOverScreen() {
    const dialogRef = this.dialog.open(this.settings.gameMode === GameMode.SINGLE_PLAYER ? GameOverSinglePlayerDialogComponent : GameOverCoopDialogComponent, {
      data: this.session,
    });
  }

}
