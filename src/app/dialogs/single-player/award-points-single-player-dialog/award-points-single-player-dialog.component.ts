import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SinglePlayerSession } from 'src/app/model/game-session.interface';
import { AwardPointViewModel } from 'src/app/model/view-models/award-point-vm.interface';

@Component({
  selector: 'app-award-points-single-player-dialog',
  templateUrl: './award-points-single-player-dialog.component.html',
  styleUrls: ['./award-points-single-player-dialog.component.scss']
})
export class AwardPointsSinglePlayerDialogComponent implements OnInit {

  session: SinglePlayerSession;
  correctChoice: boolean;
  stars: any[] = [];

  constructor(public dialogRef: MatDialogRef<AwardPointsSinglePlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AwardPointViewModel,) {
                this.session = data.session as SinglePlayerSession;
                this.correctChoice = data.correctChoice;
                this.stars = Array(this.session.score).fill(0);
                if (this.correctChoice) {
                  this.session.score++;
                  if (this.session.score === this.session.targetGoal)
                    this.session.isFinished = true;
                } else {
                  this.session.score--;
                  if (this.session.score < 0) 
                    this.session.score = 0;
                }
               }

  ngOnInit(): void {
    if (this.correctChoice) {
      this.addAnimation();
    } else {
      if (this.stars.length !== 0) {
        this.decrAnimation();
      }
    }
  }

  confirm() {
    this.dialogRef.close(this.session);
  }

  async addAnimation() {
    for (let i = 0; i < 2; i++) {
      await this.wait(500);
      this.stars.push(0);
      await this.wait(500);
      this.stars.shift();
    }
    await this.wait(500);
    this.stars.push(0);
  }

  async decrAnimation() {
    for (let i = 0; i < 2; i++) {
      await this.wait(500);
      this.stars.shift();
      await this.wait(500);
      this.stars.push(0);
    }
    await this.wait(500);
    this.stars.shift();
  }
  private wait(duration: number) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(true), duration));
  }
}
