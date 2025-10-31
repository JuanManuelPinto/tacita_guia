import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonText, IonButton } from '@ionic/angular/standalone';
import { Monumento } from '../../interfaces/monumento';

@Component({
  selector: 'app-monument-item',
  templateUrl: './monument-item.component.html',
  styleUrls: ['./monument-item.component.scss'],
  standalone: true,
  imports: [ 
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonText,
    IonButton,
  ],
})
export class MonumentItemComponent {
  @Input() monumento!: Monumento;
}
