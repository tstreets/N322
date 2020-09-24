import { Component, ViewChild, OnInit } from '@angular/core';
import { IonList, AlertController, NavController } from '@ionic/angular';
import { TodoListDataService } from '../services/todo-list-data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonList, {static: false}) slidingList: IonList;
  constructor(
	  public dataService: TodoListDataService, 
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  addTodoList(): void {
    this.alertCtrl.create({
      header: "New Todo List",
      message: 'Enter the name of your new todo list below',

      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save List',
          handler: data=> {
            this.dataService.createTodoList(data);
          }
        }
      ]
    }).then(prompt=> {
      prompt.present();
    });
  }

  renameTodoList(todolist): void {
    this.slidingList.closeSlidingItems().then(()=> {
      this.alertCtrl.create({
        header: "Rename Todo List",
        message: 'Enter the new name of your todo list below',
  
        inputs: [
          {
            type: 'text',
            name: 'title',
            placeholder: 'Title'
          }
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save List',
            handler: data=> {
              this.dataService.renameTodoList(todolist, data);
            }
          }
        ]
      }).then(prompt=> {
        prompt.present();
      });
    });
  }

  removeTodoList(todolist): void {
    this.slidingList.closeSlidingItems().then(()=> {
      this.dataService.removeTodoList(todolist);
    });
  }

}
