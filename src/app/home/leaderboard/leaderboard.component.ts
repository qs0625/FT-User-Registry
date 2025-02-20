import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Input() data = [{
    name: "NAME 1",
    score: 100
  },{
    name: "NAME 2",
    score: 200
  },{
    name: "NAME 3",
    score: 300
  }].sort( (a,b) => {
    return b.score - a.score;
  })

  constructor() { }

  ngOnInit(): void {
  }

}
