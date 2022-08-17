import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/model/character.interface';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character?: Character = undefined;
  @ViewChild('characterCanvas') canvas?: any;
  width = 120;
  height = 180;


  constructor(public settings: SettingsService) { 
    setTimeout(() => this.drawCharacter(), 300);
  }

  ngOnInit(): void {
  }

  async drawCharacter() {
    if (!this.character) return;

    const canvasEl = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,this.width, this.height); 
    const catImg = await this.loadImg(`assets/characters/${ this.character?.properties.blue ? 'blue_octocat.png' : 'pink_octocat.png'}`);
    ctx.drawImage(catImg, 0, 0, this.width, this.height);
    for (const cosmetic of this.character?.visualProps) {
      const cosmImg = await this.loadImg(cosmetic.path);
      ctx.drawImage(cosmImg, cosmetic.x, cosmetic.y, cosmetic.width, cosmetic.height);
    }
  }

  private loadImg(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    });
  }

}
