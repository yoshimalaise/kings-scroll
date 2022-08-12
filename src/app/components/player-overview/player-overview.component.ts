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

}
