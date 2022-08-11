import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameMode } from 'src/app/model/game-modes.enum';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private settings: SettingsService) { }

  ngOnInit(): void {
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  startSinglePlayer() {
    this.settings.reset();
    this.navigateTo('game');
  }

  startMultiplayer() {
    this.settings.reset();
    this.settings.gameMode = GameMode.COOP;
    this.navigateTo('game');
  }

  startTutorial() {
    this.settings.reset();
    this.settings.showTutorial = true;
    this.navigateTo('game');
  }

  openSettings() {
    this.settings.reset();
    this.navigateTo('settings');
  }

}
