import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MenuComponent } from './pages/menu/menu.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GameComponent } from './pages/game/game.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { SetupSinglePlayerDialogComponent } from './dialogs/single-player/setup-single-player-dialog/setup-single-player-dialog.component';
import { SetupCoopDialogComponent } from './dialogs/co-op/setup-coop-dialog/setup-coop-dialog.component';
import { AwardPointsSinglePlayerDialogComponent } from './dialogs/single-player/award-points-single-player-dialog/award-points-single-player-dialog.component';
import { AwardPointsCoopDialogComponent } from './dialogs/co-op/award-points-coop-dialog/award-points-coop-dialog.component';
import { GameOverCoopDialogComponent } from './dialogs/co-op/game-over-coop-dialog/game-over-coop-dialog.component';
import { GameOverSinglePlayerDialogComponent } from './dialogs/single-player/game-over-single-player-dialog/game-over-single-player-dialog.component';
import { FormsModule } from '@angular/forms';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SettingsComponent,
    GameComponent,
    CodeSnippetComponent,
    CharacterGridComponent,
    CharacterCardComponent,
    SetupSinglePlayerDialogComponent,
    SetupCoopDialogComponent,
    AwardPointsSinglePlayerDialogComponent,
    AwardPointsCoopDialogComponent,
    GameOverCoopDialogComponent,
    GameOverSinglePlayerDialogComponent,
    PlayerOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatListModule,
    MatRippleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
