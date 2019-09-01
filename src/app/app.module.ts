import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list-component/list.component';

import { MultiFilterPipe } from './multi-filter.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot([]), ReactiveFormsModule ],
  declarations: [ AppComponent, ListComponent, MultiFilterPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
