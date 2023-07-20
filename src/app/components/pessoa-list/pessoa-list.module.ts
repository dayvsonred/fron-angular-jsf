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

import { PessoaListComponent } from './pessoa-list.component';
import { MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PessoaListRoutingModule } from './pessoa-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    CommonModule,
    PessoaListRoutingModule,
    MatCheckboxModule,
    MatToolbarModule,MatCardModule,MatButtonModule,MatTableModule,MatFormFieldModule,MatInputModule,
    MatPaginatorModule
  ],
  declarations: [ PessoaListComponent ]
})
export class PessoaListModule { }