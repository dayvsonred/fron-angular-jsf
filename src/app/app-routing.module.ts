import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  {
		path:'', 
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule),
	},
	{
		path:'dashboard', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate:[AuthGuard]
	},
  {
		path:'projects', 
    loadChildren: () => import('./components/projects/projects.module').then((m) => m.ProjectsModule),
		canActivate:[AuthGuard]
	},
  {
		path:'projects/edit/:id', 
    loadChildren: () => import('./components/projects-edit/projects-edit.module').then((m) => m.ProjectsEditModule),
		canActivate:[AuthGuard]
	},
  {
		path:'projects/link/:id',
    loadChildren: () => import('./components/pessoa-list/pessoa-list.module').then((m) => m.PessoaListModule),
		canActivate:[AuthGuard]
	},
  {
		path:'projects/pessoa/:id',
    loadChildren: () => import('./components/pessoa-project/pessoa-project.module').then((m) => m.PessoaProjectModule),
		canActivate:[AuthGuard]
	},
  {
		path:'pessoa', 
    loadChildren: () => import('./components/pessoa/pessoa.module').then((m) => m.PessoaModule),
		canActivate:[AuthGuard]
	},
  {
    path: 'new/user',
    loadChildren: () => import('./components/new-user/new-user.module').then((m) => m.NewUserModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
