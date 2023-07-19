import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule, 
    // BrowserModule,
    CommonModule,
    //HttpClientModule, 
    MatToolbarModule,MatCardModule,MatButtonModule,MatTableModule,MatFormFieldModule,MatInputModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
