import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../scss/style.scss'],
})
export class SignupPage implements OnInit {

  public email: any = {
    value: '',
    feedback: ''
  };
  public password: any = {
    value: '',
    feedback: ''
  };
  public errors: any = {
    email: false,
    password: false,
    check: false
  };
  public check: any = false;

  constructor(public scheduleService: ScheduleService, public router: Router) { }

  ngOnInit() {
  }

  signupUser() {
    this.check = true;
    this.errors.email = (!this.email.value.trim() || !this.email.value.split('@')[1] || !this.email.value.split('@')[1].split('.')[1]) 
    ? true : false;
    this.email.feedback = (!this.errors.email) ? '' : 'Please enter your email';
    this.errors.password = (!this.password.value.trim()) ? true : false;
    this.password.feedback = (!this.errors.password) ? '' : 'Please enter your password';
    if(Object.values(this.errors).every(e=> !e)) {
      this.scheduleService.signupUser({
        email: this.email.value,
        password: this.password.value
      }, this)
    }
  }

  confirmSignup(res) {
    if(res.status) {
      this.router.navigate(['/company-list']);
    }
    else {
      this.errors.email = true;
      this.email.feedback = `That email is already connected to an account.`;
    }
  }

}
