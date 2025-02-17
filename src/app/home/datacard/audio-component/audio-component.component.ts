import { Component, OnInit } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-audio-component',
  templateUrl: './audio-component.component.html',
  styleUrls: ['./audio-component.component.css']
})
export class AudioComponentComponent implements OnInit {
  sound: Howl;
  isPlaying: boolean = false;

  constructor() {
    this.sound = new Howl({
      src: ['/assets/audio/test.mp3'],
      onload: () => console.log("LOADED SOUND"),
      onplayerror: () => console.log("FAILED TO PLAY SOUND"),
      html5: true,
      autoplay: false,
    });
  }

  ngOnInit(): void { }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.sound.pause();
    } else {
      Howler.volume(0.1);
      this.sound.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
