import { Injectable } from '@angular/core';
import { TodoList } from '../interfaces/todo-lists';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoListDataService {
  public todolists: TodoList[] = [];
  public loaded: boolean = false;

  constructor(private storage:Storage) { }

  load(): Promise<boolean> {
    return new Promise(resolve=> {
      this.storage.get('todolists').then(todolists=> {
        if(todolists != null)
        {
          this.todolists = todolists;
        }

        this.loaded = true;
        resolve(true);
      })
    });
  }

  createTodoList(data): void {
    this.todolists.push({
      id: this.generateSlug(data.title),
      title: data.title,
      items: []
    });

    this.save();
  }

  renameTodoList(todolist, data): void {
    let index = this.todolists.indexOf(todolist);

    if(index > -1) {
      this.todolists[index].title = data.title;
      this.save();
    }
  }

  removeTodoList(todolist): void {
    let index = this.todolists.indexOf(todolist);

    if(index > -1) {
      this.todolists.splice(index, 1);
      this.save();
    }
  }

  getTodoList(id): TodoList {
    return this.todolists.find(todolist => todolist.id === id);
  }

  addItem(todolistId, data): void {
    this.getTodoList(todolistId).items.push({
      title: data.title,
      checked: false
    });

    this.save();
  }

  removeItem(todolist, item): void {
    let index = todolist.items.indexOf(item);

    if(index > -1) {
      todolist.items.splice(index, 1);
      this.save();
    }
  }

  renameItem(item, data): void {
    item.title = data.title;
    this.save();
  }

  toggleItem(item): void {
    item.checked = !item.checked;
    this.save();
  }

  save(): void {
    this.storage.set('todolists', this.todolists);
  }

  generateSlug(title): string {
    let slug = title.toLowerCase().replace(/\s/g, '-');

    let exists = this.todolists.filter(todolist=> {
      return todolist.id.substring(0, slug.length) == slug;
    });

    if(exists.length > 0) {
      slug = slug + exists.length.toString();
    }
    return slug;
  }
}
