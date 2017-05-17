import { UnsplashService } from './common/unsplash.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component';
@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UnsplashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
