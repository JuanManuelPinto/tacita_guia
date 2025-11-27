import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonText, IonButton, GestureController } from '@ionic/angular/standalone';
import { Monumento } from '../../interfaces/monumento';

import { addIcons } from 'ionicons';
import { 
  locationOutline, 
  calendarOutline, 
  arrowForwardOutline, 
  alertCircleOutline 
} from 'ionicons/icons';

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
          IonButton
     ],
})

export class MonumentItemComponent implements AfterViewInit {
     @Input() monumento!: Monumento;

     @ViewChild('card', { read: ElementRef }) card!: ElementRef;

     constructor (private gestureCtrl: GestureController) {}

     ngAfterViewInit() {
          const gesture = this.gestureCtrl.create({
               el: this.card.nativeElement,
               gestureName: 'swipe-delete',
               threshold: 15,
               
               onMove: ev => {
                    if (ev.deltaX < 0) {
                         this.card.nativeElement.style.transform = `translateX(${ev.deltaX}px)`;
                    }
               },

               onEnd: ev => {
                    const swipeThreshold = this.card.nativeElement.offsetWidth * 0.4;

                    if (Math.abs(ev.deltaX) > swipeThreshold) {
                         this.card.nativeElement.style.transform = `translateX(-100%)`;
                         console.log(`¡Eliminar monumento ${this.monumento.id}!`);
                    } else {
                         this.card.nativeElement.style.transition = '.2s ease-out';
                         this.card.nativeElement.style.transform = `translateX(0px)`;
                    }
               }
          });

          gesture.enable(true);
     }
}