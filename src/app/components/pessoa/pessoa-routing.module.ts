import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaComponent } from './pessoa.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent,
    data: {
      title: 'Projects'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule {}