import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Unsplash from 'unsplash-js';

declare var Electron:any;

@Injectable()
export class UnsplashService {
  static SCOPES: Array<string> = ["public", "read_user", "read_photos" ]
  static MAX_PAGE_ITEMS: any = 15
  static PAGE_NUMBER: any = 1
  constructor() { }
  /**
   * Get Unstash instance
   *
   * @static
   * @returns {*}
   *
   * @memberOf UnsplashService
   */
  public getInstance(url?:string): any {
    return new Unsplash({
      applicationId: environment.unsplash.applicationId,
      secret: environment.unsplash.secret,
      callbackUrl: environment.unsplash.callbackUrl || url
    });
  }
  /**
   * Download image file
   *
   * @param {string} filename
   * @param {string} url
   * @param {Function} [callback]
   *
   * @memberof UnsplashService
   */
  public downloadFile(filename: string, url: string, callback?: Function) {
    const downloadFile = Electron.remote.require('./downloads').downloadFile;
    downloadFile(filename, url, callback || function () {});
  }


}
