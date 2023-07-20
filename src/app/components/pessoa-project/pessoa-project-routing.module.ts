import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaProjectComponent } from './pessoa-project.component';


const routes: Routes = [
  {
    path: '',
    component: PessoaProjectComponent,
    data: {
      title: 'pessoa-list'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaProjectRoutingModule {}