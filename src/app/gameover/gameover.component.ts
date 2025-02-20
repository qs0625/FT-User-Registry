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
 
  @Output() replay = new EventEmitter<void>();
  @Output() showAns = new EventEmitter<void>();

  playAgain(){
    this.replay.emit();
    }
  displayAnswers(){
    this.showAns.emit()
  }

}

