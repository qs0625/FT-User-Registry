import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameOverComponent implements OnInit {


  ngOnInit(): void {
  }
  @Input() visible: boolean = false;
  @Input() score: number = 0;
  @Input() submitDone: boolean = true;

  @Output() replay = new EventEmitter<void>();
  @Output() showAns = new EventEmitter<void>();
  @Output() inputValue = new EventEmitter<string>();

  userInput: string = '';

  playAgain(){
    this.replay.emit();
    }
  displayAnswers(){
    this.showAns.emit()
  }
  handleSubmit() {
    this.inputValue.emit(this.userInput);
  }

}

