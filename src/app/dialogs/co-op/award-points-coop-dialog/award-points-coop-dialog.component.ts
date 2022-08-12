import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoopSession } from 'src/app/model/game-session.interface';
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

  constructor(public dialogRef: MatDialogRef<AwardPointsSinglePlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AwardPointViewModel,) {
                this.session = data.session as CoopSession;
                this.correctChoice = data.correctChoice
               }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(this.session);
  }

}
