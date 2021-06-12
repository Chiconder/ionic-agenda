import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private taskService:TaskService) {}
  getAllTasks(){
    this.taskService.getAllTasks().subscribe(todos=>{console.log(todos);})
  }
  getTask(){
    this.taskService.getTask('2').subscribe(todos=>{console.log(todos);})
  }
  createTask(){
    const task={
      id:'12',userId:'1',title:'change title',completed:true
    };
    this.taskService.createTask(task).subscribe((newTask)=>{
      console.log(newTask);
    })

  }
  updateTask(){
    const task={
    id:'201',
    userId:'1',
    title:'change title',
    completed: true
    };
    this.taskService.createTask(task).subscribe(todo=>{
      console.log(todo);
   });
}
deleteTask(){
  this.taskService.deleteTask('1').subscribe((data)=> {console.log(data)})
}
}