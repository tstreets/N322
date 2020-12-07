import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServicesService {
  public user: any;
  public db: any;

  public friends: any = ['nouser', 'realuser', 'ty'];

  public currentComments: any;

  constructor(public fireauth: AngularFireAuth, public firestore: AngularFirestore, public router: Router) {
    this.fireauth.onAuthStateChanged(function(user) {
      if(!!user) {
        this.user = user;
      }
      else {
        this.db = '';
      }
    })
  }

  signupUser() {
    const signup: any = document.querySelector('#signup-form');
    const userInfo: any = this.getFormData(signup);
    if(this.validateForm({
      info: userInfo,
      fields: [
        {name: 'email', text: 'Please enter your email. Eg: john@email.com'}, 
        {name: 'password', text: 'Please enter a password'}
      ],
      ref: 'signup'
    })) {
      this.firestore.collection('User', ref=> ref.where('email', '==', userInfo.email))
      .get().subscribe(snap=> {
        if(!!snap.empty) {
          this.firestore.collection('User').add({
            email: userInfo.email,
            role: '0'
          })
          .then(userDoc=> {
            this.fireauth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(res=> {
              this.router.navigate(['/week-schedule']);
            })
          })
          .catch(err=> console.warn(err));
        }
        else {
          const fieldRef = document.querySelector(`#signup-email`);
          const feedbackRef = document.querySelector(`#signup-email-feedback`);
          fieldRef.classList.remove('input--valid');
          fieldRef.classList.remove('input--invalid');
          feedbackRef.classList.remove('d--block');

          feedbackRef.classList.add('d-block');
          feedbackRef.innerHTML = 'Email already in use.';
          fieldRef.classList.add('input--invalid');
        }
      })
    }
  }

  loginUser() {
    const login: any = document.querySelector('#login-form');
    const userInfo: any = this.getFormData(login);
    if(this.validateForm({
      info: userInfo,
      fields: [
        {name: 'email', text: 'Please enter your email. Like this john@email.com'}, 
        {name: 'password', text: 'Please enter your password'}
      ],
      ref: 'login'
    })) {
      console.log('go on');
    }
  }

  getFormData(form: any) {
    return Object.fromEntries(new FormData(form));
  }

  validateForm(form: any) {
    const errors: any = [];

    for(let field of form.fields) {
      const name = field.name;
      if(!form.info[name].trim()) {
        errors.push(name);
      }
      if(name == 'email') {
        if(!form.info[name].split('@')[1] || !form.info[name].split('@')[1].split('.')[1]) errors.push(name)
      }
      const fieldRef = document.querySelector(`#${form.ref}-${name}`);
      const feedbackRef = document.querySelector(`#${form.ref}-${name}-feedback`);
      fieldRef.classList.remove('input--valid');
      fieldRef.classList.remove('input--invalid');
      feedbackRef.classList.remove('d--block');
      if(errors.includes(name)) {
        feedbackRef.classList.add('d--block');
        console.log(field.text);
        feedbackRef.innerHTML = field.text;
        fieldRef.classList.add('input--invalid');
      }
      else {
        fieldRef.classList.add('input--valid');
      }
    }

    return !errors.length;
  }

  rndFunction(myValue) {

    this.firestore
    .collection('ionGeoUsers', ref=> ref.where('uid', '==', myValue))
    .get().subscribe(snap=> {
      (snap.docs.length == snap.size);
      snap.forEach(geoUserDoc=> {
        
        this.firestore
        .collection('ionGeoUsers').doc(geoUserDoc.id)
        .collection('blogs').add({
          blogName: '',
          author: ''
        })

      })
    })
  }

}
