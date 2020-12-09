import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.html',
  styleUrls: ['../scss/style.scss'],
})
export class AddCompanyPage implements OnInit {
  public company: any = {
    name: ''
  }
  public owner: any = {
    name: '',
    phone: {
      area: '',
      prefix: '',
      ending: ''
    }
  }
  public errors: any = {
    companyName: false,
    ownerName: false,
    phone: false,
  }
  public check : any = false;

  constructor(public scheduleService: ScheduleService, public router: Router) { }

  ngOnInit() {
  }

  addCompany() {
    this.check = true;
    if(Object.values(this.errors).every(e=> !e)) {
      this.scheduleService.addCompany({
        name: this.company.name,
        owner: {
          name: this.owner.name,
          phone: `${this.owner.phone.area}-${this.owner.phone.prefix}-${this.owner.phone.ending}`
        }
      }, this)
    }
  }

  confirmAddCompany(res: any) {
    if(res.status) {
      this.router.navigate([`/schedule/${res.company}`]);
    }
  }
}
