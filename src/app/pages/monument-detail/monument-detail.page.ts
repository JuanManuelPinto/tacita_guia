import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonText,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

import { Monumento } from 'src/app/interfaces/monumento';
import { MonumentService } from 'src/app/services/monument.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';
import { 
  locationSharp, 
  calendarOutline, 
  alertCircleOutline,
  arrowBack
} from 'ionicons/icons';

@Component({
  selector: 'app-monument-detail',
  templateUrl: './monument-detail.page.html',
  styleUrls: ['./monument-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    IonButtons,
    IonButton,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonText,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class MonumentDetailPage implements OnInit {
  monumento!: Monumento;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService
  ) {
    addIcons({
      locationSharp,
      calendarOutline,
      alertCircleOutline,
      arrowBack
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id !== undefined) {
      this.monumento = this.monumentService.get_monumento_id(id)!;
    }
  }
}
