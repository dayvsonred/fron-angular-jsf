import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { ThemePalette } from '@angular/material/core';




const picker2:any = null;

@Component({
  templateUrl: 'pessoa.component.html',
  styleUrls: ['pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  form: FormGroup | any;
  private formSubmitAttempt: boolean | undefined;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  nome = null;
  datanascimento= null;
  data_previsao_fim= null;
  data_fim= null;
  descricao= null;
  status:any= null;
  risco= null;
  idgerente= null;
  budget=null;
  nameFuncionario = "Manager";

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


  constructor(private router: Router,private todoService: TodoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      datanascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      funcionario: ['', Validators.required],
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
    this.todoService.creatPessoa({
      cpf : this.form.value.cpf, 
			datanascimento: this.form.value.datanascimento.toISOString(), 
			funcionario: this.form.value.funcionario == "" ? false : this.form.value.funcionario,
			nome: this.form.value.nome,
		}).subscribe({
      next: (res) => res,
      error: (e) => e,
    })
  }

  goBack(){
    this.router.navigate(['dashboard']);
  }

  changeNameFuncionario(){
    if(this.nameFuncionario == "Manager"){
      this.nameFuncionario = "Employee";
    }else{
      this.nameFuncionario = "Manager";
    }
  }
}