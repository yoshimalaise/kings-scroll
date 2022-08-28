import { Injectable } from '@angular/core';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { PropertyCombination } from '../model/property-combination.interface';

@Injectable({
  providedIn: 'root'
})
export class CodeEvaluatorService {
  pyodide: PyodideInterface | undefined = undefined;

  constructor() {
    this.initializePython();
  }

  async initializePython() {
    this.pyodide = await loadPyodide();
  }

  evaluateCode(snippet: string): PropertyCombination {
    // eval feels super scary, but should technically be fine 
    // since the only code evaluated comes directly from our ast generator without user input..
    // famous last words...
    const result = eval(`${snippet}\n const extract = () => { return ( {helmet, shield, sword, cape} );} \n extract();`);
    // ^ add extra function since eval gives back the last result
    return result
  }

  async evaluatePythonCode(snippet: string) {
    if (!this.pyodide) {
      throw Error("Pyodide was not properly initialized!");
    }
    const result = this.pyodide.runPython(`${snippet}\n{"helmet": helmet, "shield": shield, "sword": sword, "cape": cape}`);
    console.log('The result of the python code: ', result);
    return result;
  }
}
