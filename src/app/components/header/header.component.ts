import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonToolbar, IonHeader, IonButtons, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, RouterLink]
})
export class HeaderComponent implements OnInit {

  constructor() {
    addIcons({
      'settings-outline': settingsOutline,
    });
  }

  ngOnInit() {}

}
