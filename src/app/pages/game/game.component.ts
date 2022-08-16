import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AwardPointsCoopDialogComponent } from 'src/app/dialogs/co-op/award-points-coop-dialog/award-points-coop-dialog.component';
import { GameOverCoopDialogComponent } from 'src/app/dialogs/co-op/game-over-coop-dialog/game-over-coop-dialog.component';
import { SetupCoopDialogComponent } from 'src/app/dialogs/co-op/setup-coop-dialog/setup-coop-dialog.component';
import { AwardPointsSinglePlayerDialogComponent } from 'src/app/dialogs/single-player/award-points-single-player-dialog/award-points-single-player-dialog.component';
import { GameOverSinglePlayerDialogComponent } from 'src/app/dialogs/single-player/game-over-single-player-dialog/game-over-single-player-dialog.component';
import { SetupSinglePlayerDialogComponent } from 'src/app/dialogs/single-player/setup-single-player-dialog/setup-single-player-dialog.component';
import { Character } from 'src/app/model/character.interface';
import { GameMode } from 'src/app/model/game-modes.enum';
import { CoopSession, GameSession, SinglePlayerSession } from 'src/app/model/game-session.interface';
import { Level } from 'src/app/model/level.interface';
import { GameOverVMAction } from 'src/app/model/view-models/game-over-action-vm.enum';
import { LevelGeneratorService } from 'src/app/services/level-generator.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ShepherdService } from 'angular-shepherd';
import { sheperdRequiredElements, steps } from './tour.sheperd';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  currLevel?: Level;
  session?: GameSession = undefined;

  constructor(private levelGeneratorService: LevelGeneratorService, private settings: SettingsService, 
    public dialog: MatDialog, private router: Router, private shepherdService: ShepherdService) {
    this.session = {
      isSinglePlayer: this.settings.gameMode === GameMode.SINGLE_PLAYER,
      isFinished: false,
      targetGoal: 1,
      playerName: '',
      score: 0,
      participants: []
    } as any;

    if (!this.settings.showTutorial) {
      const dialogRef = this.dialog.open(this.settings.gameMode === GameMode.SINGLE_PLAYER ? SetupSinglePlayerDialogComponent as any: SetupCoopDialogComponent, {
        data: this.session as any,
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.session = result;
        this.currLevel = this.levelGeneratorService.generateLevel();
      });
    } else {
      (this.session  as SinglePlayerSession).playerName = 'Tutorial';
      this.currLevel = this.levelGeneratorService.generateLevel();
    }
  }
  ngAfterViewInit(): void {
    if (this.settings.showTutorial) {
      setTimeout(() => this.showIntro(), 500);
    }
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

    const dialogRef = this.dialog.open(this.settings.gameMode === GameMode.SINGLE_PLAYER ? AwardPointsSinglePlayerDialogComponent as any : AwardPointsCoopDialogComponent, {
      data: {  session: this.session, correctChoice: isCorrect},
      disableClose: true,
      width: '500px'
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
    const dialogRef = this.dialog.open(this.settings.gameMode === GameMode.SINGLE_PLAYER ? GameOverSinglePlayerDialogComponent as any : GameOverCoopDialogComponent, {
      data: this.session,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === GameOverVMAction.playAgain) {
        if (!this.session) return;

        this.session.isFinished = false;
        (this.session as SinglePlayerSession).score = 0;
        (this.session as CoopSession).participants.forEach(p => p.score = 0);
        this.loadNextLevel();
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  private showIntro() {
    this.shepherdService.defaultStepOptions = {
      scrollTo: true,
      cancelIcon: {
        enabled: false
      },
    };
    this.shepherdService.modal = true;
    this.shepherdService.requiredElements = sheperdRequiredElements;
    this.shepherdService.addSteps(steps as any);
    this.shepherdService.start();
  }

}
