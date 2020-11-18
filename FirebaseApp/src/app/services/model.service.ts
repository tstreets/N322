import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ModelService implements OnInit {

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {}

  ngOnInit() {
    this.fireauth.onAuthStateChanged(user=> {
      if(!user) {
        this.fireauth.signInAnonymously();
      }
    })
  }
  
}
