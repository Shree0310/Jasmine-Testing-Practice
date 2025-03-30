// todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService, Todo } from '../data.service';

@Component({
  selector: 'app-todo-list',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error loading todos: {{error}}</div>
    
    <ul *ngIf="todos.length">
      <li *ngFor="let todo of todos" [class.completed]="todo.completed">
        {{todo.title}}
      </li>
    </ul>
    
    <button (click)="loadTodos()">Refresh</button>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
      color: gray;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error: string | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = null;
    
    this.dataService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Unknown error';
        this.loading = false;
      }
    });
  }
}