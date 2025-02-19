import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameOverComponent implements OnInit {


  ngOnInit(): void {
  }
  @Input() visible: boolean = false;
  handlePlayAgain() {
    throw new Error('Method not implemented.');
    }

}

