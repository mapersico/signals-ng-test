import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { PostComponent } from './components/post/post.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { TodosComponent } from './components/todos/todos.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    DashboardPageComponent,
    PostComponent,
    TodosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    MatDivider,
    MatCheckboxModule,
  ]
})
export class DashboardModule { }
