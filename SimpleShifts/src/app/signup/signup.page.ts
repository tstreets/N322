import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleServicesService } from '../services/schedule-services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public scheduleService: ScheduleServicesService) {}

  ngOnInit() {}

}
