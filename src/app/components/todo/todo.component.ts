import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];
  constructor(private service: TodoService) { }

  ngOnInit() {
    this.service.getToDoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
      });

      this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

}
