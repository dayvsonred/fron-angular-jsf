import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsEditComponent } from './projects-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsEditComponent,
    data: {
      title: 'Projects'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsEditRoutingModule {}