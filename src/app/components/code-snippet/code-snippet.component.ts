import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  @Input() code: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
