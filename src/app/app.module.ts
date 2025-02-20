import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { DatacardComponent } from './home/question-card/datacard/datacard.component';
import { AnswerkeyComponent } from './home/answerkey/answerkey.component';
import { AudioComponentComponent } from './home/question-card/datacard/audio-component/audio-component.component';
import { QuestionCardComponent } from './home/question-card/question-card.component';
import { GameOverComponent } from './gameover/gameover.component';
import { ConfigComponentComponent } from "./home/config-component/config-component.component";
import { LeaderboardComponent } from './home/leaderboard/leaderboard.component';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, HomeComponent, DatacardComponent, AnswerkeyComponent, AudioComponentComponent, QuestionCardComponent, GameOverComponent,ConfigComponentComponent, LeaderboardComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
