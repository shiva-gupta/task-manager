import { TaskComponent } from './components/main/list/list-item/task/task.component';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/main/list/list.component';
import { AddListComponent } from './components/main/list/add-list/add-list.component';
import { ListItemComponent } from './components/main/list/list-item/list-item.component';
import { TaskItemComponent } from './components/main/list/list-item/task/task-item/task-item.component';
import { AddTaskComponent } from './components/main/list/list-item/task/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ListComponent,
    AddListComponent,
    ListItemComponent,
    TaskComponent,
    TaskItemComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
