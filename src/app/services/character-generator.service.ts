import { Injectable } from '@angular/core';
import { Character, VisualProp } from '../model/character.interface';
import { shuffleArray } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CharacterGeneratorService {
  private maleNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas',
  'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan'];
  private femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica',
  'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna',
  'Michelle', 'Carol', 'Amanda', 'Dorothy', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura'];

  private glasses: VisualProp[] = [{ path: 'assets/glasses/glasses-1.webp', x: 20, y: 30, width: 60, height: 40},
                                  { path: 'assets/glasses/glasses-2.png', x: 30, y: 23, width: 50, height: 70}
                                  ];

  private headWear: VisualProp[] = [{ path: 'assets/headwear/headwear-1.png', x: 25, y: 0, width: 60, height: 40}];
  
  private ties: VisualProp[] = [{ path: 'assets/ties/tie-1.png', x: 45, y: 85, width: 30, height: 60}];

  constructor() { }

  generateCharacterSet(): Character[] {
    this.maleNames = shuffleArray(this.maleNames);
    this.femaleNames = shuffleArray(this.femaleNames);
    let maleIdx = 0;
    let femaleIdx = 0;

    const booleanOptions = [true, false];
    let results: Character[] = [];
    booleanOptions.forEach(headWear => {
      booleanOptions.forEach(tie => {
        booleanOptions.forEach(glasses => {
          booleanOptions.forEach(blue => {
            results.push({
              name: blue ? this.maleNames[maleIdx++] : this.femaleNames[femaleIdx++],
              properties: {
                headWear,
                glasses,
                blue,
                tie
              },
              visualProps: []
            });
          })
        })
      });
    });
    results = this.addCosmetics(results);
    return shuffleArray(results);
  }

  private addCosmetics(chars: Character[]): Character[] {
    chars.forEach(c => {
      if (c.properties.glasses) {
        c.visualProps.push(this.glasses[Math.floor(Math.random() * this.glasses.length)]);
      }

      if (c.properties.headWear) {
        c.visualProps.push(this.headWear[Math.floor(Math.random() * this.headWear.length)]);
      }

      if (c.properties.tie){
        c.visualProps.push(this.ties[Math.floor(Math.random() * this.ties.length)]);
      }

    });
    return chars;
  }
}
