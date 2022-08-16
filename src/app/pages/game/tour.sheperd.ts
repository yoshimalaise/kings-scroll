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

export const steps = [
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
              text: 'Finish',
              type: 'next'
            }
        ]
    },
];