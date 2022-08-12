import { Component, Input, OnInit } from '@angular/core';
import { CoopSession } from 'src/app/model/game-session.interface';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit {
  @Input() session?: CoopSession;

  constructor() { }

  ngOnInit(): void {
  }

  numSequence(n: number): any[] {
    return Array(n).fill(0);
  }

}
