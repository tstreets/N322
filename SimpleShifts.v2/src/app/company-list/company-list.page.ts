import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.page.html',
  styleUrls: ['../scss/style.scss'],
})
export class CompanyListPage implements OnInit {
  public companyList: any = [];
  public code: any = {
    value: '',
    feedback: ``
  };
  public error: any = false;
  public check: any = false;

  constructor(public scheduleService: ScheduleService, public router: Router) {}

  ngOnInit() {
    this.scheduleService.getCompanyList(this);
  }

  joinCode()  {
    this.check = true;
    if(this.code.value.trim().length == 4 && !isNaN(parseInt(this.code.value))) {
      this.scheduleService.joinCode(this.code.value, this);
    }
    else {
      this.code.feedback = `Please enter the 4-digit code given by the company.`;
      this.error = true;
    }
  }

  confirmCode(res) {
    if(res.status) {
      // this.router.navigate(['/schedule:res.company.id']); 
      console.log(res.company);
    }
    else {
      if(res.fail == 'user') {
        this.router.navigate(['/login']);
      }
      if(res.fail == 'code') {
        this.error = true;
        this.code.feedback = `Sorry, we couldn't find that code in our system.`;
      }
    }
  }

  confirmCompanyList(res) {
    if(res.status) {
      this.companyList = res.companyList;
    }
  }

}
