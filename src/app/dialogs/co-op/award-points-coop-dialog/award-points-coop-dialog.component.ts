import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoopSession, Participant } from 'src/app/model/game-session.interface';
import { AwardPointViewModel } from 'src/app/model/view-models/award-point-vm.interface';
import { AwardPointsSinglePlayerDialogComponent } from '../../single-player/award-points-single-player-dialog/award-points-single-player-dialog.component';

@Component({
  selector: 'app-award-points-coop-dialog',
  templateUrl: './award-points-coop-dialog.component.html',
  styleUrls: ['./award-points-coop-dialog.component.scss']
})
export class AwardPointsCoopDialogComponent implements OnInit {

  session: CoopSession;
  correctChoice: boolean;
  selectedParticipant?: Participant;
  participantName: string = '';

  constructor(public dialogRef: MatDialogRef<AwardPointsCoopDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AwardPointViewModel,) {
                this.session = data.session as CoopSession;
                this.correctChoice = data.correctChoice;
               }

  ngOnInit(): void {
  }

  selectParticipant() {
    const p: Participant | undefined= this.session.participants.find(p => p.name === this.participantName);
    if (p !== undefined) {
      this.selectedParticipant = p;
      this.selectedParticipant.score += this.correctChoice ? 1: -1;
      if (this.selectedParticipant.score < 0) this.selectedParticipant.score = 0;
      if (this.selectedParticipant.score === this.session.targetGoal) {
        this.session.isFinished = true;
      }
    }
  }

  confirm() {
    this.dialogRef.close(this.session);
  }

  

}
