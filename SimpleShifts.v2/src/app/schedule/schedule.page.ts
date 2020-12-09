import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['../scss/style.scss'],
})
export class SchedulePage implements OnInit {
  public companyName: any = 'Company Name';

  constructor(public scheduleService: ScheduleService, public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    const company = this.route.snapshot.params.id;
    this.scheduleService.getCompanyInfo(company, this);
  }

  getCompanyData(res: any) {
    if(res.status) {
      this.companyName = res.name;
    }
    else {
      if(res.fail == 'user') {
        this.router.navigate(['/']);
      }
    }
  }

}
