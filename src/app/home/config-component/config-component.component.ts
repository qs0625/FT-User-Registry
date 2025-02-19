import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-component',
  templateUrl: './config-component.component.html',
  styleUrls: ['./config-component.component.css']
})
export class ConfigComponentComponent implements OnInit {
  selectedGenre: String = "";
  selectedYear: String = "";
  currentArtist: String = "";
  currentQuestions: number = 2;
  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];


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
  setArtist(selectedArtist: any) {
    this.currentArtist = selectedArtist;
  }
  setQuestions(numberQuestions:any){
    this.currentQuestions = numberQuestions;
  }

  onSubmit(): void {
    this.config.emit({
      genre: this.selectedGenre,
      year: this.selectedYear,
      artist: this.currentArtist,
      questions: this.currentQuestions
    })
  }

}
