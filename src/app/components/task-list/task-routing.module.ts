import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './task-list.component';


const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    data: {
      title: 'Task-list'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListRoutingModule {}