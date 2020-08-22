import { EnvServiceProvider } from './services/env/env.service.provider';
import { TaskComponent } from './components/main/list/list-item/task/task.component';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
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
import { AddListDialogComponent } from './components/main/list/add-list/add-list-dialog/add-list-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    AddListDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
