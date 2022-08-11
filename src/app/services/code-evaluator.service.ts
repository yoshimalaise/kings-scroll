import { Injectable } from '@angular/core';
import { PropertyCombination } from '../model/property-combination.interface';

@Injectable({
  providedIn: 'root'
})
export class CodeEvaluatorService {

  constructor() { }

  evaluateCode(snippet: string): PropertyCombination {
    // eval feels super scary, but should technically be fine 
    // since the only code evaluated comes directly from our ast generator without user input..
    // famous last words...
    const result = eval(`${snippet}\n const extract = () => { return ( {headWear, tie, blue, glasses} );} \n extract();`);
    // ^ add extra function since eval gives back the last result
    return result
  }
}
