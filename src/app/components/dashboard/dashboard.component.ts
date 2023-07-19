import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { TodoList } from 'src/app/model/todoList';
import { Subject } from 'rxjs';


export interface TodoElement {
  name: string;
  position: number;
  item: any;
}

const ELEMENT_DATA: TodoElement[] = [];


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private todoService: TodoService,private router: Router) { }

  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;
  changes = new Subject<void>();

  pgnation_page: number = 0; 
  pgnation_pageSize: number = 0;  
  pgnation_length: number = 12;  
  pgnation_totalPages: number = 0;

  ngOnInit() {
    let paginator = `?linesPerPage=${this.pgnation_length}&page=${this.pgnation_pageSize}`;
    this.todoService.getTodoOfUser(paginator).subscribe({
      next: (res) => {
        console.log("get todo ***********");
        console.log(res);

        this.pgnation_page = res.number; 
        this.pgnation_pageSize = res.number;  
        this.pgnation_length = res.size;  
        this.pgnation_totalPages = res.totalElements;  

        let todoList = []; 
        for (const element of res.content) {
          console.log(element); 
          todoList.push({ position: todoList.length, name: element.title, item: element });
        }

        this.dataSource = todoList;
      },
      error: (e) => e,
    })
  }


  onSubmit(){
    console.log(" onSubmit ------------------- ");

    return this.router.navigate(['projects']);

    // this.todoService.getTodoOfUser().subscribe({
    //   next: (res) => res,
    //   error: (e) => e,
    // })
  }

  goTodo(element: any){
    console.log(element)
    console.log(element.item.id)
    this.router.navigate(['task/list/'+element.item.id]);
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


}