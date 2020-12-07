import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public users: any = [];
  public user: any;

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {
    this.fireauth.onAuthStateChanged(user=> {
      if(!user) {
        // this.fireauth.signInAnonymously();
      } else {
        this.user = user;
      }
    })
  }

  getData() {
      this.firestore.collection('Users').get()
      .subscribe(res=> {
        this.users = [];
        res.forEach(userDoc=> {
          const userData = userDoc.data();
          this.users.push(userData);
        })
      });
  }

  addData(userData) {
    if(this.user) {
      this.firestore.collection('Users')
      .add(userData)
      .then(res=> {
        console.log(`New user: ${res.id}`);
      })
    }
    else {
      console.log('Not signed in');
    }
  }
  
}
