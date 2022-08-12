import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSession, SinglePlayerSession } from 'src/app/model/game-session.interface';

@Component({
  selector: 'app-setup-single-player-dialog',
  templateUrl: './setup-single-player-dialog.component.html',
  styleUrls: ['./setup-single-player-dialog.component.scss']
})
export class SetupSinglePlayerDialogComponent implements OnInit {
  session: SinglePlayerSession;

  constructor(public dialogRef: MatDialogRef<SetupSinglePlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GameSession,) {
                this.session = data as SinglePlayerSession;
               }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(this.session);
  }

}
