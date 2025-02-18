import { Component, Input, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

//TEST COMMENT FOR GIT

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() { }

  index: number = 0;
  genre: string = "pop";
  correctHome: number=0;
  numberOfQuestions: number = 2;
  correct: boolean[] = [false, false];
  
  gameOverVisible: boolean = false;
  gameCondition: boolean = false; // Example condition
  QuizData: any = [{
    img_url: "https://placehold.co/200x200",
    answer: "1",
    options: ["1", "2", "3", "4"]
  }, {
    img_url: "https://placehold.co/200x200",
    answer: "1",
    options: ["2", "4", "6", "9"]
  }]

  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  userSelection: string = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  results: { index: number, isCorrect: boolean }[] = [];

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
        //this.loadSongs(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadGenres(newToken.value);
      //this.loadSongs(newToken.value);
    });
  }


  loadSongs = async (t: any) => {
    this.configLoading = true;

    const response = await fetchFromSpotify({
      token: t,
      endpoint: "search",
      options: {
        q: "genre: " + this.genre,
        limit: 15,
        type: ["track"],
        include_external: "audio"
      }
    })
    console.log("RESPONSE : " + response)
    this.configLoading = false;
  }



  loadGenres = async (t: any) => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################

    this.genres = [
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
    ]
    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
  }

  setSelected(value: string) {
    this.userSelection = value;
    console.log(this.index)
    console.log(this.QuizData.length)
    if (this.userSelection == this.QuizData[this.index].answer) {
      this.correct[this.index] = true;
    }
    console.log(this.correct[this.index])
    this.index++;
  }
  checkGameOver() {
    if (this.gameCondition) {
      this.gameOverVisible = true;
    }
  }

}
