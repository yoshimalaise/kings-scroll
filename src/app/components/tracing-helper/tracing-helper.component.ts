import { Component, Input, OnInit } from '@angular/core';
import { Level } from 'src/app/model/level.interface';

@Component({
  selector: 'app-tracing-helper',
  templateUrl: './tracing-helper.component.html',
  styleUrls: ['./tracing-helper.component.scss']
})
export class TracingHelperComponent implements OnInit {
  @Input() level?: Level;

  constructor() { }

  ngOnInit(): void {
  }

}
