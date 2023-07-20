import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaListComponent } from './pessoa-list.component';


const routes: Routes = [
  {
    path: '',
    component: PessoaListComponent,
    data: {
      title: 'pessoa-list'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaListRoutingModule {}