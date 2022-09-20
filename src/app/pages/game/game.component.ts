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
import { sheperdRequiredElements, generateSteps, successMessageTour, failureMessageTour } from './tour.sheperd';
import { generateMobileSteps, sheperdMobileRequiredElements } from './tour.mobile.sheperd';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  currLevel?: Level;
  session?: GameSession = undefined;
  currTab = 0;

  constructor(private levelGeneratorService: LevelGeneratorService, public settings: SettingsService, 
    public dialog: MatDialog, private router: Router, private shepherdService: ShepherdService) {
    this.session = {
      isSinglePlayer: this.settings.gameMode === GameMode.SINGLE_PLAYER,
      isFinished: false,
      targetGoal: 1,
      playerName: '',
      score: 0,
      participants: []
    } as any;

    this.currLevel = this.levelGeneratorService.generateLevel();
    this.setUpSheperd();
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
    this.switchToTab(0);
  }

  backToHomeScreen() {
    this.router.navigateByUrl('/');
  }

  private setUpSheperd() {
    this.shepherdService.defaultStepOptions = {
      scrollTo: true,
      cancelIcon: {
        enabled: false
      },
    };
    this.shepherdService.modal = true;
    if (this.shepherdService.tourObject) {
      this.shepherdService.tourObject.steps = [];
    }
    this.shepherdService.onTourFinish = () => {};
  }

  handleCharSelection(char: Character) {
    const s = this.currLevel?.solution;
    const p = char.properties;
    this.setUpSheperd();
    const isCorrect = (s?.cape === p.cape && s.sword === p.sword && s.helmet === p.helmet && s.shield === p.shield);
    this.shepherdService.onTourFinish = () => isCorrect ? this.loadNextLevel() : '';
    const sess = (this.session as SinglePlayerSession);
    if (isCorrect) {
      sess.score++ 
      this.shepherdService.addSteps(successMessageTour);
    } else {
      sess.score = Math.max(0, sess.score--);
      this.shepherdService.addSteps(failureMessageTour);
    }
    this.shepherdService.start();
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

  private switchToTab(idx: number) {
    this.currTab = idx;
  }

  private showIntro() {
    this.setUpSheperd();
    this.shepherdService.onTourFinish = () => { 
      this.router.navigateByUrl('/settings');
    };
    this.shepherdService.requiredElements = this.settings.isMobile ? sheperdMobileRequiredElements : sheperdRequiredElements;
    const stepGeneratorFunction = this.settings.isMobile ? generateMobileSteps : generateSteps;
    this.shepherdService.addSteps(stepGeneratorFunction(this.currLevel?.solution as any, 
                                    this.currLevel?.characters.find(c => c.isCorrect)?.name as any, 
                                    (idx) => this.switchToTab(idx)) as any);
    this.shepherdService.start();
  }

}
