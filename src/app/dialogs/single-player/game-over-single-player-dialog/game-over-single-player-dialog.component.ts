import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSession, SinglePlayerSession } from 'src/app/model/game-session.interface';
import { GameOverVMAction } from 'src/app/model/view-models/game-over-action-vm.enum';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-game-over-single-player-dialog',
  templateUrl: './game-over-single-player-dialog.component.html',
  styleUrls: ['./game-over-single-player-dialog.component.scss']
})
export class GameOverSinglePlayerDialogComponent implements OnInit {

  session: SinglePlayerSession;
  constructor(public dialogRef: MatDialogRef<GameOverSinglePlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GameSession, public settings: SettingsService) {
                this.session = data as SinglePlayerSession;
               }

  ngOnInit(): void {
  }

  playAgain() {
    this.dialogRef.close(GameOverVMAction.playAgain);
  }

  backToMain() {
    this.dialogRef.close(GameOverVMAction.mainMenu);
  }

}
