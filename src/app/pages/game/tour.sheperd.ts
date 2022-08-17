import { PropertyCombination } from "src/app/model/property-combination.interface";

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
} 

const steps = [
    {
        ...template,
        id: 'codeSnippet',
        attachTo: { 
          element: '.codesnippet-container', 
          on: 'right'
        },
        title: 'Code snippet!',
        text: ['This is the code snippet that you should understand. Try to trace the execution of the script and predict the end-state of the boolean values.'],
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
        attachTo: { 
          element: '.tracing-helper-container', 
          on: 'right'
        },
        title: 'Code tracer!',
        text: ['This is your scribble zone that you can use to help yourself when tracing the code.'],
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
        attachTo: { 
          element: '.gamefield-container', 
          on: 'left'
        },
        title: 'Character grid!',
        text: ['Try to click on the character that matches the result after running the code! For example if the variable headWear is false after running the code you should find a character that is not wearing any hat!'],
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
];


export function generateSteps(solution: PropertyCombination, chosenName: string) {
  return [
    ...steps,
    {
      ...template,
      id: 'solution',
      attachTo: { 
        element: '.codesnippet-container', 
        on: 'right'
      },
      title: 'Trace the code!',
      text: [
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
    <td class="tg-0lax">${solution.headWear}</td>
  </tr>
  <tr>
    <td class="tg-0lax">tie</td>
    <td class="tg-0lax">${solution.tie}</td>
  </tr>
  <tr>
    <td class="tg-0lax">glasses</td>
    <td class="tg-0lax">${solution.glasses}</td>
  </tr>
  <tr>
    <td class="tg-0lax">blue</td>
    <td class="tg-0lax">${solution.blue}</td>
  </tr>
</tbody>
</table>

<br>
Feel free to verify!`
      ],
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
    attachTo: { 
      element: '.chosen-one', 
      on: 'left'
    },
    title: 'The chosen one!',
    text: [
      `It looks like ${chosenName} is the one we are looking for!
      They are ${solution.blue ? 'blue' : 'pink'}, are${solution.glasses ? ' ' : ' not'} wearing glasses,
      are${solution.tie ? ' ' : ' not'} wearing a tie and are${solution.headWear ? ' ' : ' not'} wearing ${solution.headWear ? 'some' : 'any'} kind of headWear.
      `
    ],
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