import { Component, Input } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent]
})
export class DetalleModalComponent {

  @Input() mensaje: string = '';

  constructor(private modalController: ModalController) { }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
