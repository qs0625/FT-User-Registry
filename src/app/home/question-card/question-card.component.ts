import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();
  @Input() index: number = 0;
  @Input() data: any = [{
    img_url: "https://placehold.co/200x200",
    answer: "1",
    options: ["1", "2", "3", "4"]
  }, {
    img_url: "https://placehold.co/200x200",
    answer: "1",
    options: ["2", "4", "6", "9"]
  }]
  currentSelected: string = "";


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.selected.emit(this.currentSelected);
  }
  handleSelection(value: string): void {
    this.currentSelected = value
  }

}