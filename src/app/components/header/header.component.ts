import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
