import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameOverComponent implements OnChanges {
gameOverVisible: boolean = true;
checkGameOver() {
throw new Error('Method not implemented.');
}
  ngOnInit(): void {
  }
  @Input() visible: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      const element = document.querySelector('.game-over');
      if(element)
        if (this.visible) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      }
  }
}
