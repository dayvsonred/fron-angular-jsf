import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    FormsModule,
    NewUserRoutingModule,
    ReactiveFormsModule, 
    // BrowserModule,
    CommonModule,
    //HttpClientModule, 
    MatToolbarModule,MatCardModule,MatButtonModule,MatTableModule,MatFormFieldModule,MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    
  ],
  declarations: [NewUserComponent]
})
export class NewUserModule { }
