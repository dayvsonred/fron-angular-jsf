import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'task-edit.component.html',
  styleUrls: ['task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, AfterViewInit  {
  selectedTime:any = null; 
  pickerTimer:any = null; 
  format_time =  24;
  form: FormGroup | any;
  private formSubmitAttempt: boolean | undefined;
  todoId:any = null; 
  taskId:any = null; 
  picker:any = new Date(); 


  constructor(
    private router: Router,
    private todoService: TodoService, 
    private fb: FormBuilder,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    console.log("on edit task");
    console.log(this.route.snapshot);
    this.taskId = this.route.snapshot.params['id'];
    this.todoId = this.route.snapshot.params['todo_id'];
    console.log(this.todoId);
    console.log(this.taskId );
    this.form = this.fb.group({
      taskName: ['', Validators.required],
      picker: ['', Validators.required],
      pickerTimer: ['', Validators.required]
    });
  }

  ngAfterViewInit(){
    console.log('after view');
    this.taskId = this.route.snapshot.params['id'];
    console.log(this.taskId );
    this.getTaskData(this.taskId);
  }

  getTaskData(taskId:string){
    this.todoService.getOneTask(taskId).subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.conclusion);
          console.log(res.name);

          let mes = res.conclusion[1] < 10 ? '0'+res.conclusion[1] : res.conclusion[1];
          let dia = res.conclusion[2] < 10 ? '0'+res.conclusion[2] : res.conclusion[2];
          let hora = res.conclusion[3] < 10 ? '0'+res.conclusion[3] : res.conclusion[3];
          let min = res.conclusion[4] < 10 ? '0'+res.conclusion[4] : res.conclusion[4];
          
          let dateConclusion = new Date( `${res.conclusion[0]}-${mes}-${dia}T${hora}:${min}:00Z` );
          console.log(dateConclusion);

          this.form = this.fb.group({
            taskName: [res.name, Validators.required],
            picker: [dateConclusion, Validators.required],
            pickerTimer: [`${hora}:${min}`, Validators.required]
          });

        },
        error: (e) => e,
    })
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(){
    console.log("edit task");
    console.log(this.form.value);

    console.log(this.form.value.picker);
    console.log(this.form.value.pickerTimer);

    let timeArray = this.form.value.pickerTimer.split(":");
    console.log(timeArray);
    let conclusionDate = this.form.value.picker;
    conclusionDate.setHours(timeArray[0]);
    conclusionDate.setMinutes(timeArray[1]);
    console.log(conclusionDate);

    this.todoService.editTaskOfUser({id: this.taskId, name : this.form.value.taskName, conclusion: conclusionDate.toISOString(), todoId: this.todoId }).subscribe({
      next: (res) => { this.goBack(); },
      error: (e) => e,
    })
  }

  goBack(){
    this.router.navigate(['task/list/'+this.todoId])
  }
}
