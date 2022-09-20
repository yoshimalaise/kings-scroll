import { PropertyCombination } from "src/app/model/property-combination.interface";
import { archMageName, dragonName, dragonTitle, kingdomName } from "./names-and-locations";

export const sheperdRequiredElements = [
    {
        selector: '.codesnippet-container',
        message: 'code snippet not found',
        title: 'No code snippet'
    },
    {
        selector: '.tracing-helper-container',
        message: 'tracing helper not found',
        title: 'No tracing helper found'
    },
    {
        selector: '.gamefield-container',
        message: 'character grid not found',
        title: 'No character grid found'
    }
];

const template = {
    cancelIcon: {
      enabled: false
    },
    highlightClass: 'highlight',
    scrollTo: false,
    title: `${archMageName} - The Archmage`,
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
  ]
} 

export const generalWorldIntroduction = [
  {
    ...template,
    id: 'welcome',
    text: [makeWizardDialogBody(`Greetings adventurer, welcome to the kingdom of ${kingdomName}!<br/><br/>My name is ${archMageName}, archmage and the king's most trusted advisor.`)],
  },
  {
    ...template,
    id: 'welcome',
    text: [makeWizardDialogBody(
      `Normally our kingdom is a beautiful place to visit, but I am afraid you caught us at a bad time.
      <br/><br/>
      Our kingdom is currently under attack by the evil dragon ${dragonName}, ${dragonTitle}.`
      )],
  },
  {
    ...template,
    id: 'welcome',
    text: [makeWizardDialogBody(
      `According to ancient legends the magic scroll should tell us who to appoint as our chosen champion, the only one that can defeat ${dragonName}!
      <br/><br/>
      Unfortunately however I do not understand what the scroll is trying to tell me!
      Can you help me decipher the scroll?`
      )],
  },
];

const steps = [
    ...generalWorldIntroduction,
    {
        ...template,
        id: 'codeSnippet',
        attachTo: { 
          element: '.codesnippet-container', 
          on: 'right'
        },
        text: [makeWizardDialogBody('This is the scroll that contains the description of the chosen one. Do you know what these symbols mean?')],
    },
    {
        ...template,
        id: 'traceHelper',
        attachTo: { 
          element: '.tracing-helper-container', 
          on: 'right'
        },
        text: [makeWizardDialogBody('The ancient mages also left some tools behind that are supposed to help you keep track of the state as you are deciphering the scroll, I am sure these tools can be of great help!')],
    },
    {
        ...template,
        id: 'charGrid',
        attachTo: { 
          element: '.gamefield-container', 
          on: 'left'
        },
        text: [makeWizardDialogBody(`Here you can see all the champions that are currently in the kingdom, if you have found the one that the scroll is talking about feel free to select them!
        <br><br>No time to waste!`)],
    },
    {
      ...template,
      id: 'go-to-settings',
      text: [makeWizardDialogBody(
        `Before embarking on the adventure make sure to swing by the settings so you can make sure the scrolls are understandable to you!`
        )],
        buttons: [
          {
            classes: 'shepherd-button-primary',
            text: 'Go to settings!',
            type: 'next'
          }
      ]
    },
];


export function generateSteps(solution: PropertyCombination, chosenName: string, navigationCallback: (x: number) => void) {
  return [
    ...steps,
  ];
}


export const successMessageTour = [
  {
    ...template,
    id: 'success',
    title: 'Enemy defeated!',
    text: [makeWizardDialogBody('Good job! You managed to select the right hero! The city is saved!')],
    buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
    ]
  },
];

export const failureMessageTour = [
  {
    ...template,
    id: 'failure',
    title: 'Battle lost!',
    text: [makeWizardDialogBody(`Oh no! The hero you selected lost the battle against ${dragonName}! It looks like you picked the wrong hero! Try again!`)],
    buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
    ]
  },
];

export function makeWizardDialogBody(content: string) {
  return (
`
<div class="dialog-container">
    <img height = "128" class="archmage-image" src="assets/archmage.png"/>
    <div class="dialog-content">${content}</div>
</div>
`
  );
}