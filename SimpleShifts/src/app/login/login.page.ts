import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleServicesService } from '../services/schedule-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public scheduleService: ScheduleServicesService) {
  }

  ngOnInit() {
  }

}
