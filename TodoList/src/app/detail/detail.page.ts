import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { TodoList } from '../interfaces/todo-lists';
import { TodoListDataService } from '../services/todo-list-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @ViewChild(IonList, {static: false}) slidingList: IonList;

  private slug: string;
  public todolist: TodoList;

  constructor(private alertCtrl:AlertController, private route:ActivatedRoute, private dataService:TodoListDataService) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    this.loadTodoList();
  }

  loadTodoList() {
    if(this.dataService.loaded)
    {
      this.todolist = this.dataService.getTodoList(this.slug);
    } else
    {
      this.dataService.load().then(()=>{
        this.todolist = this.dataService.getTodoList(this.slug);
      })
    }
  }

  addItem(): void {
    this.alertCtrl.create({
      header: "Add Item",
      message: 'Enter the name of your new task item for this todo list',

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
          text: 'Save Item',
          handler: data=> {
            this.dataService.addItem(this.todolist.id, data);
          }
        }
      ]
    }).then(prompt=> {
      prompt.present();
    });
  }
  
  removeItem(item): void {
    this.slidingList.closeSlidingItems().then(()=>{
      this.dataService.removeItem(this.todolist, item);
    })
  }

  renameItem(item): void {
    this.alertCtrl.create({
      header: "Rename Item",
      message: 'Enter the new name of the task item below',

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
          text: 'Save Item',
          handler: data=> {
            this.dataService.renameItem(item, data);
          }
        }
      ]
    }).then(prompt=> {
      prompt.present();
    });
  }

  toggleItem(item): void {
    this.dataService.toggleItem(item);
  }

}
