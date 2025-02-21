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


  showLeaderBoard: boolean= false;
  buttonVisible: boolean = true;

  toggleLeaderboard() {
    if(!this.showLeaderBoard){
      this.showLeaderBoard=true;
      this.settingsSubmitted=false;
    }
    else{
      this.showLeaderBoard=false;
      this.settingsSubmitted=true;
    }

  }

  constructor() { }

  index: number = 0;
  genre: string = "pop";
  numberOfQuestions: number = 2;
  correct: boolean[] = [false, false];
  QuizData: any = [];
  selectedGenre: String = "";
  userSelection: string = "";
  userSelections: string[] = [];
  correctAnswers: string[] = [];
  arrayOfIndexes: number[] = [];
  gameScore: number = 0;
  username = '';
  settingsSubmitted: boolean = true;
  config: any = {
    genre: "pop",
    year: "2010-2019",
    artist: "",
    questions: 2
  }
  answerKey: any = {
    questions: this.arrayOfIndexes,
    choices: this.userSelections,
    answers: this.correctAnswers
  }

  leaderboardList: any =[];/*.sort( (a,b) => {
    return b.score - a.score;
  })
*/
  authLoading: boolean = false;
  configLoading: boolean = false;
  showAnswers: boolean = false;
  showQuestions: boolean = false;
  endGame: boolean = false;

  token: String = "";

  

  /*         Init         */

  ngOnInit(): void {
    console.log("leaderboard",this.leaderboardList);
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
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
    });
  }



  /*         Load Songs         */

  loadSongs = async (t: any) => {
    this.configLoading = true;

    const response = await fetchFromSpotify({
      token: t,
      endpoint: "search",
      params: {
        q: "." + "genre:" + this.config.genre + "year:" + this.config.year,
        limit: 50,
        offset: 0,
        type: ["track"],
        market: "US",
      }
    })
    this.processSongs(response)
    this.configLoading = false;
  }
  processSongs = (res: any) => {
    let tracks = res.tracks.items
    // console.log(tracks)
    let artist: any[] = [];
    let album: any[] = [];
    let images: any[] = [];
    let trackName: any[] = [];
    let index = 0;
    for (let item of tracks) {
      artist[index] = item.artists[0].name
      album[index] = item.album.name
      images[index] = item.album.images[1].url
      trackName[index] = item.name
      index++;
    }
    for (let i = 0; i < this.numberOfQuestions; i++) {
      let correctIndex = this.randIndex(album)
      let temp = {
        img_url: images.at(correctIndex),
        answer: album.at(correctIndex),
        options: this.getRandomOptions([album.at(correctIndex)],album,album.at(correctIndex))
      }
      this.correctAnswers[i] = temp.answer
      this.QuizData = [...this.QuizData, temp]
    }
  }
  randIndex = (arr: any[]) => Math.floor(Math.random() * arr.length)
  getRandomOptions(arr: string[], possibilities: string[], answer: string): string[] {
    const uniqueOptions = new Set(arr);
    while (uniqueOptions.size < 4) {
      const temp = possibilities[this.randIndex(possibilities)] ?? 'NULL';
      if (!uniqueOptions.has(temp) && temp !== answer) {
        uniqueOptions.add(temp);
      }
    }
    return this.shuffleArray(Array.from(uniqueOptions))
    }
  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  

  /*         Load Genres         */

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

    let genres = [
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



  /*         Set Genres         */

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
  }

  //On User input
  setSelected(value: string) {
    this.userSelection = value;
    this.userSelections[this.index] = value;
    this.arrayOfIndexes[this.index] = this.index + 1;
  
    if (value === this.QuizData[this.index].answer) {
      this.correct[this.index] = true;
      this.gameScore += 100;
    }
  
    if (this.index < this.QuizData.length - 1) {
      this.index++;
    } else {
      this.endGame = true;
    }
  
    console.log(this.answerKey);
  }
  
  loadConfig(state: any): void { // load game configuration settings
    this.config = state
    console.log(this.config)
    this.genre = this.config.genre
    this.numberOfQuestions = this.config.questions
    this.loadSongs(this.token);
    this.settingsSubmitted = false;
    this.showQuestions = true;
  }

  // updateAnswerKey(newData: any) {
  //   this.answerKey = {...this.answerKey,newData};
  // }

  replayGame(){

    console.log('Play Again event received');


    this.leaderboardList = [...this.leaderboardList, { name: this.username, score: this.gameScore }];

    this.leaderboardList.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score);

    this.endGame = false;
    this.settingsSubmitted=true;
    this.showQuestions=false;
    this.buttonVisible=true;

    this.index=0;
    this.answerKey= {
      questions: this.arrayOfIndexes=[],
      choices: this.userSelections=[],
      answers: this.correctAnswers=[]
    }
    this.QuizData=[];
    this.gameScore=0;

    this.showAnswers = false;
  }
  answersKey(){
    this.endGame = false;
    this.showQuestions=false;
    this.showAnswers=true;
    this.buttonVisible=false;
  }
  handleInputValue(username: string) {
    this.username = username;
    }
}