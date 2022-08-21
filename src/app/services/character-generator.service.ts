import { Injectable } from '@angular/core';
import { Character, Layer, VisualProp } from '../model/character.interface';
import { getRandomElementFromArr, shuffleArray } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CharacterGeneratorService {
  private names = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas',
  'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan'];

  constructor() { }

  generateCharacterSet(): Character[] {
    this.names = shuffleArray(this.names);
    let nameIdx = 0;

    const booleanOptions = [true, false];
    let results: Character[] = [];
    booleanOptions.forEach(helmet => {
      booleanOptions.forEach(shield => {
        booleanOptions.forEach(sword => {
          booleanOptions.forEach(cape => {
            results.push({
              name: this.names[nameIdx++],
              properties: {
                helmet: helmet,
                sword: sword,
                cape: cape,
                shield: shield
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
      // always show armour
      const armorColor = getRandomElementFromArr(['bronze', 'iron', 'steel', 'gold', 'mythril', 'adamant', 'runite']);
      c.visualProps.push({ 
        path: `assets/knights/armor/${armorColor}_armor.png`,
        x: 10,
        y: 40,
        width: 100,
        height: 140,
        layer: Layer.ARMOR
      });

      if (c.properties.helmet) {
        // a helmet consists of a helmet and a feather
        c.visualProps.push({
          path: `assets/knights/helmet/${armorColor}_helmet.png`,
          x: 39,
          y: 16,
          width: 40,
          height: 40,
          layer: Layer.FACE
        });
        const featherColor = getRandomElementFromArr(['blue', 'brown', 'gray','green', 'purple', 'wheat']);
        c.visualProps.push({
          path: `assets/knights/feather/${featherColor}_feather.png`,
          x: 30,
          y: 7,
          width: 38,
          height: 38,
          layer: Layer.FACE_OVERLAY
        });
      } else {
        // if there is no hemlet show face
        // a face consists of the face and hair
        const skinTone = getRandomElementFromArr([1, 2, 3, 4, 5]);
        const hairColor = getRandomElementFromArr(['brown', 'cyan', 'pink', 'purple', 'red']);
        c.visualProps.push({
          path: `assets/knights/face/${skinTone}_face.png`,
          x: 35,
          y: 17,
          width: 42,
          height: 42,
          layer: Layer.FACE
        });
        c.visualProps.push({
          path: `assets/knights/hair/${hairColor}_hair.png`,
          x: 34,
          y: 15,
          width: 42,
          height: 42,
          layer: Layer.FACE_OVERLAY
        });
      }

      if(c.properties.cape) {
        // if a cape is selected it consists of 2 parts of the same color
        const capeColor = getRandomElementFromArr(['blue', 'brown', 'gray', 'green', 'purple', 'wheat']);
        c.visualProps.push({ 
          path: `assets/knights/capes/background/${capeColor}_cape_background.png`,
          x: 12,
          y: 45,
          width: 40,
          height: 90,
          layer: Layer.CAPE_BACKGROUND
        });
        c.visualProps.push({ 
          path: `assets/knights/capes/front/${capeColor}_cape_front.png`,
          x: 23,
          y: 36,
          width: 62,
          height: 40,
          layer: Layer.CAPE_FOREGROUND
        });

      }

      if (c.properties.sword) {
        const swordColor = getRandomElementFromArr(['bronze', 'iron', 'steel', 'gold', 'mythril', 'adamant', 'runite']);
        c.visualProps.push({ 
          path: `assets/knights/sword/${swordColor}_sword.png`,
          x: 13,
          y: 102,
          width: 45,
          height: 70,
          layer: Layer.WEARABLE
        });
      }

      if (c.properties.shield){
        const shieldColor = getRandomElementFromArr([1, 2, 3, 4, 5, 6]);
        c.visualProps.push({ 
          path: `assets/knights/shield/${shieldColor}_shield.png`,
          x: 65,
          y: 55,
          width: 50,
          height: 75,
          layer: Layer.WEARABLE
        });
      }

      // sort them so they are drawn in the right order
      c.visualProps = c.visualProps.sort((a, b) => a.layer - b.layer);
    });
    return chars;
  }
}
