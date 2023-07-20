import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, throwError, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { createTodo } from 'src/app/model/createTodo';
import { TodoList } from 'src/app/model/todoList';

@Injectable()
export class TodoService {

	private urlBase: String = `http://localhost:8765`;
	private link_create_project: String = `/core/projeto`;
	private link_get_projeto: String = `/core/projeto/page`;
	private link_get_projeto_link: String = `/core/pessoa/link/page/`;
	private link_get_projeto_one: String = `/core/projeto/find/`;
	private link_create_pessoa: String = `/core/pessoa`;
	private link_projeto_link_pessoa: String = `/core/projeto/add/membro/`;
	private link_get_projeto_pessoa: String = `/core/pessoa/project/page/`;
	private link_delete_project: String = `/core/projeto/delete/`;

	constructor(private http: HttpClient, private router: Router) {
	}

	public getAccessToken(): string {
		const token = localStorage.getItem('access_token');

		if (!token) return "";

		return token;
	}
	
	public creatProjeto(payload : 
		{
			nome : string, 
			data_inicio: string, 
			data_previsao_fim: string,
			data_fim: string,
			descricao: string,
			status: string,
			orcamento: number,
			risco: string,
			idgerente: string,

		}): Observable<any> {
		const body = payload;
		let token = this.getAccessToken();
		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.post<any>(`${this.urlBase}${this.link_create_project}`, body, { headers }).pipe(
			map((res) => {

				return this.router.navigate(['dashboard']);	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public getAllProjects(paginator: string): Observable<any> {
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.get<TodoList>(`${this.urlBase}${this.link_get_projeto}${paginator}`,{ headers }).pipe(
			map((res) => {
				return res;	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public getOneProjects(projectId: string): Observable<any> {
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.get<TodoList>(`${this.urlBase}${this.link_get_projeto_one}${projectId}`,{ headers }).pipe(
			map((res) => {
				return res;	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}
	
	public updateProjeto(payload : 
		{
			id: number,
			nome : string, 
			data_inicio: string, 
			data_previsao_fim: string,
			data_fim: string,
			descricao: string,
			status: string,
			orcamento: number,
			risco: string,
			idgerente: string,

		}): Observable<any> {
		const body = payload;
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.put<any>(`${this.urlBase}${this.link_create_project}`, body, { headers }).pipe(
			map((res) => {
				return this.router.navigate([`dashboard`]);
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public creatPessoa(payload : 
		{
			cpf : string, 
			datanascimento: string, 
			funcionario: boolean,
			nome: string,

		}): Observable<any> {
		const body = payload;
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.post<any>(`${this.urlBase}${this.link_create_pessoa}`, body, { headers }).pipe(
			map((res) => {
				return this.router.navigate(['dashboard']);	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public getPesoaForLinkProject(idProjeto:any, paginator: string): Observable<any> {
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.get<TodoList>(`${this.urlBase}${this.link_get_projeto_link}${idProjeto}${paginator}`,{ headers }).pipe(
			map((res) => {
				return res;	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public addPesoaForLinkProject(idPessoa: string, 
		payload : {
			id : number,

		}): Observable<any> {
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};
		const body = payload;

		return this.http.post<TodoList>(`${this.urlBase}${this.link_projeto_link_pessoa}${idPessoa}`, body, { headers }).pipe(
			map((res) => {
				return this.router.navigate([`projects/link/${body.id}`]);
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public getPesoainProject(idProjeto:any, paginator: string): Observable<any> {
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.get<TodoList>(`${this.urlBase}${this.link_get_projeto_pessoa}${idProjeto}${paginator}`,{ headers }).pipe(
			map((res) => {
				return res;	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}
	
	public onDeleteProject(idProjeto : number ): Observable<any> {
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		}; 

		return this.http.delete<any>(`${this.urlBase}${this.link_delete_project}${idProjeto}`, { headers }).pipe(
			map((res) => {
				return this.router.navigate(['dashboard']);	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}
}
