import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { ThemePalette } from '@angular/material/core';


const picker2:any = null;

@Component({
  templateUrl: 'projects.component.html'
})
export class ProjectsComponent implements OnInit {

  form: FormGroup | any;
  private formSubmitAttempt: boolean | undefined;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nome = null;
  data_inicio= null;
  data_previsao_fim= null;
  data_fim= null;
  descricao= null;
  status:any= null;
  risco= null;
  idgerente= null;
  budget=null;

  foods: any[] = [
    {value: 'ANALISE', viewValue: 'em análise'},
    {value: 'ANALISE_REALIZADA', viewValue: 'análise realizada'},
    {value: 'ANALISE_APROVADA', viewValue: 'análise aprovada'},
    {value: 'INICIADO', viewValue: 'iniciado'},
    {value: 'PLANEJADO', viewValue: 'planejado'},
    {value: 'ANDAMENTO', viewValue: 'em andamento'},
    {value: 'ENCERRADO', viewValue: 'encerrado'},
    {value: 'CANCELADO', viewValue: 'cancelado'},
  ];

  risks: any[] = [
    {value: 'baixo', viewValue: 'baixo risco'},
    {value: 'médio', viewValue: 'médio risco'},
    {value: 'alto', viewValue: 'alto risco'}
  ];


  constructor(private router: Router,private todoService: TodoService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_previsao_fim: ['', Validators.required],
      data_fim: ['', Validators.required],
      descricao: ['', Validators.required],
      status: ['', Validators.required],
      risco: ['', Validators.required],
      idgerente: ['', Validators.required],
      budget: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSelectStatus(i:any){
    console.log(i);
  }


  onSubmit(){
    console.log(this.form.value);



    this.todoService.creatProjeto({
			nome : this.form.value.nome, 
			data_inicio: this.form.value.data_inicio.toISOString(), 
			data_previsao_fim: this.form.value.data_previsao_fim.toISOString(), 
			data_fim: this.form.value.data_fim.toISOString(), 
			descricao: this.form.value.descricao,
			status: this.form.value.status,
			orcamento: this.form.value.orcamento,
			risco: this.form.value.risco,
			idgerente: this.form.value.idgerente,

		}).subscribe({
      next: (res) => res,
      error: (e) => e,
    })
  }

  goBack(){
    this.router.navigate(['dashboard']);
  }
}