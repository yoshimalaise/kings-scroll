import { PropertyCombination } from "src/app/model/property-combination.interface";
import { generalWorldIntroduction, makeWizardDialogBody } from "./tour.sheperd";

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
  
  return [
  ...generalWorldIntroduction,
  {
    ...template,
    id: 'codeSnippet',
    beforeShowPromise: () => navigate(snippetIdx),
    attachTo: {
      element: '.mobile-codesnippet-container',
      on: 'bottom'
    },
    title: 'Code snippet!',
    text: [makeWizardDialogBody('This is the scroll that contains the description of the chosen one. Do you know what these symbols mean?')],
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
    text: [makeWizardDialogBody('The ancient mages also left some tools behind that are supposed to help you keep track of the state as you are deciphering the scroll, I am sure these tools can be of great help!')],
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
    id: 'charGrid',
    beforeShowPromise: () => navigate(characterIdx),
    attachTo: {
      element: '.mobile-gamefield-container',
      on: 'top'
    },
    title: 'Character grid!',
    text: [makeWizardDialogBody('Here you can see all the champions that are currently in the kingdom, if you have found the one that the scroll is talking about feel free to select them!<br><br>No time to waste!')],
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ]
  },
  ];
}