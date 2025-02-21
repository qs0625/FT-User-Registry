import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-component',
  templateUrl: './config-component.component.html',
  styleUrls: ['./config-component.component.css']
})
export class ConfigComponentComponent implements OnInit {
  selectedGenre: String = "";
  selectedYear: String = "";
  currentQuestions: number = 2;
  genres: String[] = [
    "rock",
    "rap",
    "pop",
    "country",
    "hip-hop",
    "jazz",
    "alternative",
    "j-pop",
    "k-pop",
    "emo"
  ];


  constructor() { }

  ngOnInit(): void {
  }
  @Input() show: boolean = true;
  @Output() config = new EventEmitter<any>();

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
  }
  setYear(selectedYear: any) {
    this.selectedYear = selectedYear;
  }
  setQuestions(numberQuestions:any){
    this.currentQuestions = numberQuestions;
  }

  onSubmit(): void {
    this.config.emit({
      genre: this.selectedGenre,
      year: this.selectedYear,
      questions: this.currentQuestions
    })
  }

}
