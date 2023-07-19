import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { PeriodicElement } from 'src/app/model/periodicElement';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { TodoService } from '../services/todo.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { Task } from 'src/app/model/task';

export interface TodoElement {
  name: string;
  position: number;
  item: any;
  select: boolean;
  conclusion: String;
  dueInfo: String;
}

const ELEMENT_DATA: TodoElement[] = [
  { name: "asdasd", item: "", position:  1, select: false,  conclusion: new Date().toISOString(),  dueInfo: 'vencido'},
  { name: "asdasd", item: "", position:  1, select: false,  conclusion: new Date().toISOString(),  dueInfo: 'vencido'}
];

@Component({
  templateUrl: 'task-list.component.html',
})
export class TaskListComponent implements OnInit  {
  //dataSource: Element[] | undefined;
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator; 

  displayedColumns: string[] = ['select', 'position', 'name', 'conclusion', 'dueInfo'];
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<TodoElement>(true, []);
  todoId:any = null;
  pgnation_page: number = 0; 
  pgnation_pageSize: number = 0;  
  pgnation_length: number = 12;  
  pgnation_totalPages: number = 0;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log("opa task");
    // this.dataSource.paginator = this.paginator;
    //this.dataSource = ELEMENT_DATA;

    this.todoId = this.route.snapshot.params['id'];
    console.log(this.todoId);

    let paginator = `?linesPerPage=${this.pgnation_length}&page=${this.pgnation_pageSize}`;
    this.todoService.getTaskOfUser(this.todoId, paginator).subscribe({
      next: (res) => {
        console.log("get task of todo");


        this.pgnation_page = res.number; 
        this.pgnation_pageSize = res.number;  
        this.pgnation_length = res.size;  
        this.pgnation_totalPages = res.totalElements;  

        let todoList = []; 
        for (const element of res.content) {
          let mes = element.conclusion[1] < 10 ? '0'+element.conclusion[1] : element.conclusion[1];
          let dia = element.conclusion[2] < 10 ? '0'+element.conclusion[2] : element.conclusion[2];
          let hora = element.conclusion[3] < 10 ? '0'+element.conclusion[3] : element.conclusion[3];
          let min = element.conclusion[4] < 10 ? '0'+element.conclusion[4] : element.conclusion[4];
          
           let dateConclusion = new Date( `${element.conclusion[0]}-${mes}-${dia}T${hora}:${min}:00Z` );



          todoList.push({ 
            select: element.status, 
            position: todoList.length, 
            name: element.name, 
            item: element,
            conclusion: this.formatDate(dateConclusion),
            dueInfo: this.checkDue(dateConclusion)
          });
        }

        this.dataSource = todoList;

        console.log(this.dataSource);

      },
      error: (e) => e,
    })

  }

  formatDate(today:Date){ 
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = this.checkZero(day);
    month = this.checkZero(month);
    year = this.checkZero(year);
    hour = this.checkZero(hour);
    minutes = this.checkZero(minutes);
    seconds = this.checkZero(seconds);

    console.log(day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds);
    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
  }
  
  checkZero(data:string){
    if(data.length == 1){
      data = "0" + data;
    }
    return data;
  }

  checkDue(date:Date){
    let dateToDay = new Date();
    return date < dateToDay ? 'due' : 'to do'
  }

  
  addNewTask(){
    console.log(" addNewTask ------------------- ");
    console.log("opa task");
    // this.dataSource.paginator = this.paginator;
    //this.dataSource = ELEMENT_DATA;
    console.log(this.todoId);
    return this.router.navigate(['task/creat/'+this.todoId]);
  }


  goEditTask(element: any){
    console.log("goEditTask");
    console.log(element);
    console.log(element.item.id);
    this.router.navigate(['task/edit/'+element.item.id+'/'+this.todoId]);

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TodoElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkClicEventAll(){
    console.log("checkClicEventAll");
    console.log(this.isAllSelected());
    console.log("--------------------------------");
 
    for (const element of this.dataSource) {
      console.log(element.item); 
      console.log(element.item.status); 
      if(element.item.status == !this.isAllSelected()){
        this.setConclusionTaskLoop(element.item.id, this.todoId);  
      }
    }

    return this.router.navigate(['task/list/'+this.todoId]);	

  }

  checkClicEvent(event:any){
    console.log("checkClicEvent");
    console.log(event);
    console.log("---------------------------------");
    console.log(event.item);

    this.setConclusionTask(event.item.id, this.todoId);

  }

  setConclusionTask(id: string, todoId:string){
    let name = "name";
    this.todoService.setConclusionTask({ id, todoId, name }).subscribe({
      next: (res) => res,
      error: (e) => e,
    })
  }

  setConclusionTaskLoop(id: string, todoId:string){
    let name = "name";
    this.todoService.setConclusionTaskLoop({ id, todoId, name }).subscribe({
      next: (res) => res,
      error: (e) => e,
    })
  }

  goBack(){
    this.router.navigate(['dashboard']);
  }

  nextpageData(element:any){
    console.log("nextpageData");
    console.log(element);
    this.pgnation_pageSize = element.pageIndex;  
    this.pgnation_length = element.pageSize;  

    this.ngOnInit();
  }


}
