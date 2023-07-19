import { NgModule } from '@angular/core';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    TodoRoutingModule,
    MatToolbarModule,MatCardModule,MatButtonModule,MatTableModule,MatFormFieldModule,MatInputModule
  ],
  declarations: [ TodoComponent ]
})
export class TodoModule {}