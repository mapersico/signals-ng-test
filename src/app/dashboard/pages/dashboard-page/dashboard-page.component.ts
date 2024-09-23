import { Component, OnInit, signal } from '@angular/core';
import { CoreFacadeService } from '../../../facades/core-facade.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  constructor(public _coreFacade: CoreFacadeService) {
  }

  ngOnInit(): void {
    this._coreFacade.getAllPosts();
    this._coreFacade.getAllTodos();
  }
}
