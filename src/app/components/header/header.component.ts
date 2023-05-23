import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  EnvSelected: String = environment.environmentName;
  now!: string;
  constructor() { 
    setInterval(() => {
      this.now = new Date().toUTCString().substring(4,26) + " UTC"
    }, 1);
  }
  ngOnInit(): void {
  }

}
