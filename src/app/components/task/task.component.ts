import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.scss'],
})
export class TaskComponent implements OnInit  {
  selectedTime:any = null; 
  pickerTimer:any = null; 
  format_time =  24;
  form: FormGroup | any;
  private formSubmitAttempt: boolean | undefined;
  todoId:any = null; 


  constructor(
    private router: Router,
    private todoService: TodoService, 
    private fb: FormBuilder,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    console.log("on create taks");
    console.log(this.route.snapshot);
    this.todoId = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      taskName: ['', Validators.required],
      picker: ['', Validators.required],
      pickerTimer: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(){
    console.log("creat new task");
    console.log(this.form.value);

    console.log(this.form.value.picker);
    console.log(this.form.value.pickerTimer);

    let timeArray = this.form.value.pickerTimer.split(":");
    console.log(timeArray);
    let conclusionDate = this.form.value.picker;
    conclusionDate.setHours(timeArray[0]);
    conclusionDate.setMinutes(timeArray[1]);
    console.log(conclusionDate);

    this.todoService.createTaskOfUser({name : this.form.value.taskName, conclusion: conclusionDate.toISOString(), todoId: this.todoId }).subscribe({
      next: (res) => res,
      error: (e) => e,
    })
  }

  goBack(){
    this.router.navigate(['task/list/'+this.todoId])
  }
}
