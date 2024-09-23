import { Component, input } from '@angular/core';
import { Todo } from '../../../api/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  public todos = input.required<Todo[]>();
}
