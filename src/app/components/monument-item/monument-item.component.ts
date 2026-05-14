import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonText, IonButton, GestureController, ToastController, IonIcon } from '@ionic/angular/standalone';
import { Monumento } from '../../interfaces/monumento';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { MonumentService } from '../../services/monument.service';

import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { shareOutline } from 'ionicons/icons';

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
          RouterLink,
          IonIcon
     ],
})

export class MonumentItemComponent implements AfterViewInit {
     @Input() monumento!: Monumento;
     @Output() eliminado = new EventEmitter<number>();

     @ViewChild('card', { read: ElementRef }) card!: ElementRef;

     constructor (private monumentService: MonumentService, private gestureCtrl: GestureController, private toastController: ToastController, private router: Router) {
          addIcons({ shareOutline });
     }

     async compartir() {
          await Haptics.impact({ style: ImpactStyle.Light });
          await Share.share({
               title: this.monumento.nombre,
               text: this.monumento.descripcion,
               url: 'http://localhost:8100/monument-detail/' + this.monumento.id,
               dialogTitle: 'Compartir Monumento',
          });
     }

     async eliminado_correcto() {
          const toast = await this.toastController.create({
               message: 'Monumento Eliminado Correctamente',
               duration: 2000,
               position: 'bottom',
               color: 'success',
               buttons: ['OK'],
          });
          await toast.present();
     }

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
                         this.card.nativeElement.style.transition = '0.3s ease-out';
                         this.card.nativeElement.style.transform = `translateX(-100%)`;

                         this.eliminar_monumento(this.monumento.id);
                    } else {
                         this.card.nativeElement.style.transition = '.2s ease-out';
                         this.card.nativeElement.style.transform = `translateX(0px)`;
                    }
               }
          });

          gesture.enable(true);
     }

     async eliminar_monumento(id: number) {
          await this.monumentService.eliminar_monumento(id);
          this.eliminado.emit(id);
          this.eliminado_correcto();
     }

     ver_detalles(id: number) {
          this.router.navigate(['/monument-detail', id]);
     }
}