import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  get windowRef(){
    return window;
  }
}
