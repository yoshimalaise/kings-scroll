import { PropertyCombination } from "src/app/model/property-combination.interface";
import { makeWizardDialogBody } from "./tour.sheperd";

export const sheperdMobileRequiredElements = [];

const template = {
  cancelIcon: {
    enabled: false
  },
  highlightClass: 'highlight',
  scrollTo: false,
}

const snippetIdx = 0;
const predictionHelperIdx = 0;
const characterIdx = 1;

export function generateMobileSteps(solution: PropertyCombination, chosenName: string, navigationCallback: (x: number) => void) {
  const navigate = (idx: number) => {
    navigationCallback(idx);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(idx), 300);
    });
  }
  
  return [{
    ...template,
    id: 'codeSnippet',
    beforeShowPromise: () => navigate(snippetIdx),
    attachTo: {
      element: '.mobile-codesnippet-container',
      on: 'bottom'
    },
    title: 'Code snippet!',
    text: [makeWizardDialogBody('This is the code snippet that you should understand. Try to trace the execution of the script and predict the end-state of the boolean values.')],
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    ...template,
    id: 'traceHelper',
    beforeShowPromise: () => navigate(predictionHelperIdx),
    attachTo: {
      element: '.mobile-tracing-helper-container',
      on: 'top'
    },
    title: 'Code tracer!',
    text: [makeWizardDialogBody('This is your scribble zone that you can use to help yourself when tracing the code.')],
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    ...template,
    id: 'charGrid',
    beforeShowPromise: () => navigate(characterIdx),
    attachTo: {
      element: '.mobile-gamefield-container',
      on: 'top'
    },
    title: 'Character grid!',
    text: [makeWizardDialogBody('Try to click on the character that matches the result after running the code! For example if the variable helmet is false after running the code you should find a character that is not wearing any hat!')],
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    ...template,
    id: 'solution',
    beforeShowPromise: () => navigate(snippetIdx),
    attachTo: {
      element: '.mobile-codesnippet-container',
      on: 'bottom'
    },
    title: 'Trace the code!',
    text: [makeWizardDialogBody(
      `In this case executing the code will result in the following table:<br><br>
      
      <style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
<table class="tg">
<tbody>
<tr>
  <td class="tg-0lax">headWear</td>
  <td class="tg-0lax">${solution.helmet}</td>
</tr>
<tr>
  <td class="tg-0lax">tie</td>
  <td class="tg-0lax">${solution.shield}</td>
</tr>
<tr>
  <td class="tg-0lax">glasses</td>
  <td class="tg-0lax">${solution.sword}</td>
</tr>
<tr>
  <td class="tg-0lax">blue</td>
  <td class="tg-0lax">${solution.cape}</td>
</tr>
</tbody>
</table>

<br>
Feel free to verify!`
    )],
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    ...template,
    id: 'chosen one',
    beforeShowPromise: () => navigate(characterIdx),
    attachTo: {
      element: '.chosen-one',
      on: 'top'
    },
    scrollTo: true,
    title: 'The chosen one!',
    text: [makeWizardDialogBody(
      `It looks like ${chosenName} is the one we are looking for!
    They are ${solution.cape ? 'blue' : 'pink'}, are${solution.sword ? ' ' : ' not'} wearing glasses,
    are${solution.shield ? ' ' : ' not'} wearing a tie and are${solution.helmet ? ' ' : ' not'} wearing ${solution.helmet ? 'some' : 'any'} kind of headWear.
    `
    )],
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Finish tutorial',
        type: 'next'
      }
    ]
  },
  ];
}