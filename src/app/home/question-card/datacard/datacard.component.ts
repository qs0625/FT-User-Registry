import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datacard',
  templateUrl: './datacard.component.html',
  styleUrls: ['./datacard.component.css']
})
export class DatacardComponent implements OnInit {
  @Input() data: any = {
    img_url: "https://placehold.co/200x200",
    answer: "1",
    options: ["1","2","3","4"]
  }

  currentSelected: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxChange(value: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.currentSelected = isChecked ? value : "";
  }
}
