import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modelService: ModelService) {}

  public getData():void {
    this.modelService.getData();
  }

  public addData():void {
    const name = document.querySelector('.user_name').value;
    const age = document.querySelector('.user_age').value;
    this.modelService.addData({name, age});
  }

}
