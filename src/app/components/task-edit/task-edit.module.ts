import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

 
 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http'; 

import { TaskEditComponent } from './task-edit.component';
import { MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEditRoutingModule } from './task-edit-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';



import {MatSliderModule} from '@angular/material/slider';

import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';  

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    TaskEditRoutingModule,
    MatCheckboxModule,
    MatToolbarModule,MatCardModule,MatButtonModule,MatTableModule,MatFormFieldModule,MatInputModule,
    MatDatepickerModule,MatNativeDateModule,
    MatSliderModule,
    NgxMatTimepickerModule
  ],
  declarations: [ TaskEditComponent ]
})
export class TaskEditModule { }