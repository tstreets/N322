import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data:Object = {
    Names:[
      {
        firstname: "Ty", 
        lastname: "Streets",
        pets: [
          {name: "French"},
          {name: "English"}
        ]
      },
      {
        firstname: "Azzy", 
        lastname: "Streets"
      }
    ]
  };

  constructor() {}

  personClicked(person): void {
    console.log(`${person.firstname} clicked: Person`);
  }

}
