import { Component, Input } from '@angular/core';
import {
     ModalController,
     IonHeader,
     IonToolbar,
     IonTitle,
     IonButton,
     IonContent,
     IonIcon,
     IonButtons
} from '@ionic/angular/standalone';

import { map, imagesOutline, addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
     selector: 'app-detalle-modal',
     templateUrl: './detalle-modal.component.html',
     styleUrls: ['./detalle-modal.component.scss'],
     standalone: true,
     imports: [IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonIcon, IonButtons],
})

export class DetalleModalComponent {
     @Input() mensaje: string = '';

     constructor(private modalController: ModalController) {
          addIcons({
               map: map,
               'images-outline': imagesOutline,
               'add-circle-outline': addCircleOutline,
          });
     }

     cerrarModal() {
          this.modalController.dismiss();
     }
}
