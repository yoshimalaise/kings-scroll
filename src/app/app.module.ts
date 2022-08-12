import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MenuComponent } from './pages/menu/menu.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GameComponent } from './pages/game/game.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SettingsComponent,
    GameComponent,
    CodeSnippetComponent,
    CharacterGridComponent,
    CharacterCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatRippleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
