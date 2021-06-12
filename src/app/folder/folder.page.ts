import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  
tasks:Task[]=[];
  constructor(private activatedRoute: ActivatedRoute,private taskService:TaskService, private alertCtrl:AlertController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
this.taskService.getAllTasks().subscribe(tasks=>{
  this.tasks=tasks;
});
  }
async openAlert(){
  const alert =await this.alertCtrl.create({
header:'Nueva tarea',
inputs:[
  {
    name:'title',
    type:'text',
    placeholder:'Aqui la tarea',
  },
],
buttons:[
  {
    text:'Cancelar',
    role:'cancel',
    cssClass:'secondary',
    handler:()=>
    {
      console.log('confirm Cancel');

    }
  },
  {
    text:'Crear',
    handler:(data)=>
    {
   this.createTask(data.title)

    }
  }
]


  });
  await alert.present();
} 
createTask(title: string) {
    const task = {
      userId: '1',
      title,
      completed: true
    };
  this.taskService.createTask(<any>task).subscribe((newTask)=>{this.tasks.unshift(<any>newTask);
  });
   
  }
  deleteTask(id: string, index: number) {
    this.taskService.deleteTask(id)
    .subscribe(() => {
      this.tasks.splice(index, 1);
    });
  }
}
