import { UnsplashService } from './common/unsplash.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: String = environment.title;
  photos: Array<Array<any>> = [];
  progress: any = { percent: "0" };
  inProgress: Number = null;
  viewMoreTimeoutHandler: any;

  constructor(
    private _zone: NgZone,
    private _unsplash: UnsplashService){}

  getAccessUrl(): void {
    // let url = this._unsplash.getInstance().auth.getAuthenticationUrl(UnsplashService.SCOPES);
    // console.log(url);
  }

  viewMore() {
    UnsplashService.PAGE_NUMBER++;
    this.viewPhotos(true);
  }

  viewPhotos(append?: boolean) {
    this._unsplash.getInstance()
      .photos
      .listPhotos(UnsplashService.PAGE_NUMBER, UnsplashService.MAX_PAGE_ITEMS, "latest")
      .then(res => res.json())
      .then( photos => {
        let group: Array<any> = [];
        const maxCols = 3;
        let maxColItems: any = ~~(photos.length / maxCols);
        let col = -1;
        photos.forEach((photo, idx) => {
          if ( ( (idx - (maxColItems * this.photos.length - 1)) % maxColItems ) === 0 && idx > 0 ) {
            if ( append ) {
              if ( col++ >= maxCols ) {
                col = -1;
              }
              this.photos[col] = this.photos[col].concat(group);
            } else {
              this.photos.push(group);
            }
            group = [];
          }
          group.push(photo);
        });

        if( group.length > 0 && group.length < maxColItems ) {
          let col = -1;
          group.forEach( (item, idx) => {
            if ( col++ >= maxCols ) {
              col = -1;
            }
            this.photos[col].push(item);
          });
          group = [];
        }

        if (this.viewMoreTimeoutHandler) {
          clearTimeout(this.viewMoreTimeoutHandler);
          this.viewMoreTimeoutHandler = null;
        }

        console.log(this.photos);
      })
  }

  downLoadProgress( progress: any ) {
    this._zone.run( ()=> {
       this.progress.percent = progress.percent;
       if ( progress. state ) {
         this.inProgress = null;
       }
    });
  }

  downloadFile(item: any, index: Number) {
    this.inProgress = item.id;
    this._unsplash.downloadFile(
      `photo-${new Date().getTime()}.jpg`,
      item.urls.full,
      this.downLoadProgress.bind(this)
    );
  }
  onScroll($event) {

    let { target: { scrollHeight, scrollTop, clientHeight } } = $event;
    let positionY = scrollHeight - clientHeight - scrollTop;
    console.log('On Scroll', positionY, scrollHeight, clientHeight);
    if ( positionY <= 400 && !this.viewMoreTimeoutHandler ) {
      this.viewMoreTimeoutHandler = setTimeout( ()=> {
        this.viewMore();
      }, 800);
    }
  }
  ngOnInit() {
    this.viewPhotos();
  }
}
