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

export interface TodoElement {
  nome: string;
  position: number;
  item: any;
  cpf: String;
  datanascimento: String;
}

const ELEMENT_DATA: TodoElement[] = [
];

@Component({
  templateUrl: 'pessoa-project.component.html',
  styleUrls: ['pessoa-project.component.scss'],
})
export class PessoaProjectComponent implements OnInit  {

  displayedColumns: string[] = [ 'position', 'nome', 'datanascimento', 'cpf'];
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<TodoElement>(true, []);
  todoId:any = null;
  pgnation_page: number = 0; 
  pgnation_pageSize: number = 0;  
  pgnation_length: number = 12;  
  pgnation_totalPages: number = 0;
  IdPg:number = 0 ;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.IdPg = this.route.snapshot.params['id'];

    let paginator = `?linesPerPage=${this.pgnation_length}&page=${this.pgnation_pageSize}`;
    this.todoService.getPesoainProject(this.IdPg ,paginator).subscribe({
      next: (res) => {

        this.pgnation_page = res.number; 
        this.pgnation_pageSize = res.number;  
        this.pgnation_length = res.size;  
        this.pgnation_totalPages = res.totalElements;  

        let todoList = []; 
        for (const element of res.content) {
          let mes = element.datanascimento[1] < 10 ? '0'+element.datanascimento[1] : element.datanascimento[1];
          let dia = element.datanascimento[2] < 10 ? '0'+element.datanascimento[2] : element.datanascimento[2];
          
           let datanascimento = new Date( `${element.datanascimento[0]}-${mes}-${dia}T00:00:00Z` );


          todoList.push({ 
            position: todoList.length, 
            item: element,
            nome: element.nome,
            datanascimento: this.formatDate(datanascimento),
            cpf: element.cpf
          });
        }

        this.dataSource = todoList;

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

  


  goLinkPesoa(element: any){
    this.todoService.addPesoaForLinkProject(element.item.id, {id : this.IdPg} ).subscribe({
      next: (res) => { this.ngOnInit() },
      error: (e) => e,
    })
    
  }


  goEditTask(element: any){
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
 
    for (const element of this.dataSource) {
      if(element.item.status == !this.isAllSelected()){
        this.setConclusionTaskLoop(element.item.id, this.todoId);  
      }
    }

    return this.router.navigate(['task/list/'+this.todoId]);	

  }

  checkClicEvent(event:any){
    this.setConclusionTask(event.item.id, this.todoId);
  }

  setConclusionTask(id: string, todoId:string){
  }

  setConclusionTaskLoop(id: string, todoId:string){
  }

  goBack(){
    this.router.navigate(['dashboard']);
  }

  nextpageData(element:any){
    this.pgnation_pageSize = element.pageIndex;  
    this.pgnation_length = element.pageSize;  

    this.ngOnInit();
  }


}
