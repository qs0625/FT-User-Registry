import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-answerkey',
  templateUrl: './answerkey.component.html',
  styleUrls: ['./answerkey.component.css']
})
export class AnswerkeyComponent implements OnInit {
  answerKey: { question: string, answer: string, userSelected: String, index: number }[] = [{question: 'question' ,answer: 'answer', userSelected: 'userSelected', index: 0 }];
  @Output() valueEmitted = new EventEmitter<{ index: number, isCorrect: boolean }>();
  constructor() { }

  ngOnInit(): void {
    // Initialize the answer key list
    this.answerKey = [
      { question: 'What is the capital of France?', answer: 'Paris', userSelected: 'Berlin', index: 0 },
      { question: 'What is 2 + 2?', answer: '4',  userSelected: '6', index: 1  },
      { question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee',  userSelected: 'Harper Lee', index: 2 },
      // Add more questions and answers here
    ];
  }
  checkAnswers() {
    this.answerKey.forEach((item, index) => {
      const isCorrect = item.answer === item.userSelected;
      this.valueEmitted.emit({ index, isCorrect });
    });
  }
}
