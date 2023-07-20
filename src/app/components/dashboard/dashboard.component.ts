import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { TodoList } from 'src/app/model/todoList';
import { Subject } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface TodoElement {
  name: string;
  position: number;
  status: any;
  item: any;
  disabled: boolean;
}

const ELEMENT_DATA: TodoElement[] = [];


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private todoService: TodoService,private router: Router,
    public dialog: MatDialog) { }

  selection = new SelectionModel<TodoElement>(true, []);

  displayedColumns: string[] = ['select','position', 'name', 'status'];
  dataSource = ELEMENT_DATA;
  changes = new Subject<void>();

  pgnation_page: number = 0; 
  pgnation_pageSize: number = 0;  
  pgnation_length: number = 12;  
  pgnation_totalPages: number = 0;
  disabled: boolean | undefined;
  disabledSelectAll: boolean = false;
  projectSelectIs: any = null; 

  ngOnInit() {
    this.projectSelectIs = null;
    this.disabledSelectAll = false;
    let paginator = `?linesPerPage=${this.pgnation_length}&page=${this.pgnation_pageSize}`;
    this.todoService.getAllProjects(paginator).subscribe({
      next: (res) => {
        this.pgnation_page = res.number; 
        this.pgnation_pageSize = res.number;  
        this.pgnation_length = res.size;  
        this.pgnation_totalPages = res.totalElements;  

        let todoList = []; 
        for (let element of res.content) {
          console.log(element); 
          todoList.push({ position: todoList.length, name: element.nome, status: element.status, item: element, disabled: false});
        }

        this.dataSource = todoList;
        console.log(this.dataSource);
      },
      error: (e) => e,
    })
  }


  onSubmit(){
    return this.router.navigate(['projects']);
  }

  onAddPesoa(){
    return this.router.navigate(['pessoa']);
  }

  goTodo(element: any){
    console.log(element)
    console.log(element.item.id)
    this.router.navigate(['projects/edit/'+element.item.id]);
  }

  goBack(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }


  firstPageLabel = `First page`;
  itemsPerPageLabel = `Items per page:`;
  lastPageLabel = `Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    console.log("getRangeLabel")
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }

  nextpageData(element:any){
    console.log("nextpageData");
    console.log(element);
    this.pgnation_pageSize = element.pageIndex;  
    this.pgnation_length = element.pageSize;  

    this.ngOnInit();
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

  checkClicEvent(event:any){
    console.log("checkClicEvent");
    console.log(event);
    console.log("---------------------------------");
    console.log(event.item);
    

    if(  this.disabledSelectAll == false ){
      this.projectSelectIs = event.item.id;
          for (let i = 0; i < this.dataSource.length; i++) {
            let element = this.dataSource[i];
            if(event.item.id != element.item.id){
              this.dataSource[i].disabled = true;
            }
          }
    }else{
      this.projectSelectIs = null;
      for (let i = 0; i < this.dataSource.length; i++) {
          this.dataSource[i].disabled = false;
      }
    }

    this.disabledSelectAll =!this.disabledSelectAll


    console.log( this.dataSource);
    // this.setConclusionTask(event.item.id, this.todoId);
  }

  getDisableRow(id:any){

    let element = this.dataSource[id];
    return element.disabled;
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


  onLinkPesoaOfProject(){
    if(  this.disabledSelectAll == false ){
      this.openDialog('200ms', '200ms');
    }else{
      this.router.navigate([`projects/link/${this.projectSelectIs}`]);
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogContentExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  showPesoaOfProject(){
    if(  this.disabledSelectAll == false ){
      this.openDialog('200ms', '200ms');
    }else{
      this.router.navigate([`projects/pessoa/${this.projectSelectIs}`]);
    }
  }
}


@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {}