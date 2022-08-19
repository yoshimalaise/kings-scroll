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
  tutorialHasBeenCompleted = false;

  constructor(private router: Router, public settings: SettingsService) {
    this.tutorialHasBeenCompleted = JSON.parse(localStorage.getItem('tutorialCompleted') ?? 'false') as boolean;
  }

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
    localStorage.setItem('tutorialCompleted', JSON.stringify('true'));
    this.tutorialHasBeenCompleted = true;
    this.navigateTo('game');
  }

  openSettings() {
    this.settings.reset();
    this.navigateTo('settings');
  }

}
