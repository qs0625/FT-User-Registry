import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-answerkey',
  templateUrl: './answerkey.component.html',
  styleUrls: ['./answerkey.component.css']
})
export class AnswerkeyComponent implements OnInit {
  @Input() answerKey: any;
  @Input() visible: boolean = false;
  @Output() answerKeyUpdated = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    // Initialize the answer key list

  }

  onHome(){
    //console.log(this.answerKey)
    this.answerKeyUpdated.emit(true)
  }
}
