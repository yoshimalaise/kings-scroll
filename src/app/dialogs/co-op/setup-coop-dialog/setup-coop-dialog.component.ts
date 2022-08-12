import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoopSession, GameSession } from 'src/app/model/game-session.interface';

@Component({
  selector: 'app-setup-coop-dialog',
  templateUrl: './setup-coop-dialog.component.html',
  styleUrls: ['./setup-coop-dialog.component.scss']
})
export class SetupCoopDialogComponent implements OnInit {
  currName = '';
  session: CoopSession;

  constructor(public dialogRef: MatDialogRef<SetupCoopDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GameSession,) {
                this.session = data as CoopSession;
               }

  ngOnInit(): void {
  }

  confirm() {
    console.log('the session', this.session);
    this.dialogRef.close(this.session);
  }

  addPlayer() {
    this.session.participants.push({ score: 0, name: this.currName});
    this.currName = '';
  }

}
