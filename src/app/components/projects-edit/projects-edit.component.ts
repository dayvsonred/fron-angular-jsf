import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { ThemePalette } from '@angular/material/core';


const picker2:any = null;

@Component({
  templateUrl: 'projects-edit.component.html',
  styleUrls: ['projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit, AfterViewInit  {

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
  setStatus:any= null;
  idgerente= null;
  budget=null;
  projectId=null;
  projectIdOk:any= null;


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
    {value: 'baixo', viewValue: 'baixo risco' , index: 0},
    {value: 'medio', viewValue: 'médio risco', index: 1},
    {value: 'alto', viewValue: 'alto risco', index: 2}
  ];  

  constructor(private router: Router,
    private todoService: TodoService, 
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) { 
      this.projectId = this.route.snapshot.params['id'];
      this.getData(this.projectId);
    }
  

  ngOnInit() {
    
    this.form = this.fb.group({
      nome: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_previsao_fim: ['', Validators.required],
      data_fim: ['', Validators.required],
      descricao: ['', Validators.required],
      status: ['CANCELADO', Validators.required],
      risco: ['baixo', Validators.required],
      idgerente: ['', Validators.required],
      budget: ['', Validators.required],
    });
  }

  ngAfterViewInit(){
    // this.projectId = this.route.snapshot.params['id'];
    // this.getData(this.projectId);
  }


  getData(projectId:any){
    this.projectIdOk = projectId;
    this.todoService.getOneProjects(projectId).subscribe({
      next: (res) => {
        console.log(res);

        // let mes = res.conclusion[1] < 10 ? '0'+res.conclusion[1] : res.conclusion[1];
        // let dia = res.conclusion[2] < 10 ? '0'+res.conclusion[2] : res.conclusion[2];
        // let hora = res.conclusion[3] < 10 ? '0'+res.conclusion[3] : res.conclusion[3];
        // let min = res.conclusion[4] < 10 ? '0'+res.conclusion[4] : res.conclusion[4];
        
        // let dateConclusion = new Date( `${res.conclusion[0]}-${mes}-${dia}T${hora}:${min}:00Z` );
        // console.log(dateConclusion);

        // this.form = this.fb.group({
        //   taskName: [res.name, Validators.required],
        //   picker: [dateConclusion, Validators.required],
        //   pickerTimer: [`${hora}:${min}`, Validators.required]
        // });

        //this.form.value.risco = {value: 'alto', viewValue: 'alto risco'};

        

        this.form = this.fb.group({
          nome:               [res.nome                               , Validators.required],
          data_inicio:        [this.formatDate(res.data_inicio)       , Validators.required],
          data_previsao_fim:  [this.formatDate(res.data_previsao_fim) , Validators.required],
          data_fim:           [this.formatDate(res.data_fim)          , Validators.required],
          descricao:          [res.descricao                          , Validators.required],
          status:             [res.status                             , Validators.required],
          risco:              [res.risco                               , Validators.required],
          idgerente:          [res.idgerente                          , Validators.required],
          budget:             [res.orcamento                          , Validators.required],
        });


      },
      error: (e) => e,
  })
    
  }


  formatDate(date:any){
    let mes =   date[1] < 10 ? '0'+date[1] : date[1];
    let dia =   date[2] < 10 ? '0'+date[2] : date[2];
    
    let dateConclusion = new Date(`${date[0]}-${mes}-${dia}T00:00:00Z`);

    return dateConclusion;
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

    this.todoService.updateProjeto({
      id:  this.projectIdOk, 
			nome : this.form.value.nome, 
			data_inicio: this.form.value.data_inicio.toISOString(), 
			data_previsao_fim: this.form.value.data_previsao_fim.toISOString(), 
			data_fim: this.form.value.data_fim.toISOString(), 
			descricao: this.form.value.descricao,
			status: this.form.value.status,
			orcamento: this.form.value.budget,
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

  sortByProducts(value:any) {
    console.log(value)
  }

  sortByProducts2(value:any) {
    console.log(value)
    
  }
  onSelectEvent(value:any, sssss:any) {
    console.log("onSelectEvent")
    console.log(value)
    console.log(value.source.value)
    //this.form.value.risco = value.source.value;

  }
}