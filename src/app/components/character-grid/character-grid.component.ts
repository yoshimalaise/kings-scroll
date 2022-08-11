import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/model/character.interface';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent implements OnInit {
  @Input() characters: Character[] = [];
  @Output() selected = new EventEmitter<Character>();

  constructor() { }

  ngOnInit(): void {
  }

  selectCard(character: Character) {
    this.selected.emit(character);
  }

}
