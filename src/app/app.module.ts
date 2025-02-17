import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { DatacardComponent } from './home/datacard/datacard.component';
import { AnswerkeyComponent } from './home/answerkey/answerkey.component';
import { AudioComponentComponent } from './home/datacard/audio-component/audio-component.component';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, HomeComponent, DatacardComponent, AnswerkeyComponent, AudioComponentComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
