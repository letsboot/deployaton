import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  service = '';
  name: Observable<string>;

  constructor(private backendService: BackendService) {

  }

  ngOnInit() {
    this.name = this.backendService.getName();
  }

  loadService() {
    this.name = this.backendService.getNameForService(this.service);
  }

}
