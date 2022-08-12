import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoopSession, GameSession, Participant } from 'src/app/model/game-session.interface';
import { GameOverVMAction } from 'src/app/model/view-models/game-over-action-vm.enum';

@Component({
  selector: 'app-game-over-coop-dialog',
  templateUrl: './game-over-coop-dialog.component.html',
  styleUrls: ['./game-over-coop-dialog.component.scss']
})
export class GameOverCoopDialogComponent implements OnInit {

  session: CoopSession;
  winner?: Participant;
  constructor(public dialogRef: MatDialogRef<GameOverCoopDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GameSession,) {
                this.session = data as CoopSession;
                this.winner = this.session.participants.sort((a, b) => a.score = b.score)[0];
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
