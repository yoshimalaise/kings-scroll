import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodegenerationService {

  constructor() { }

  /** TODO actually implement smart generator */
  generateSnippet(): string {
    return (
`
let headWear = ${Math.random() > 0.5};
let tie = ${Math.random() > 0.5};
let glasses = ${Math.random() > 0.5};
let blue = ${Math.random() > 0.5};
`);
  }
}
