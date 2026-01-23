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
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonFooter,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';

import { Monumento } from 'src/app/interfaces/monumento';
import { MonumentService } from 'src/app/services/monument.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { 
  locationSharp, 
  calendarOutline, 
  alertCircleOutline,
  arrowBack,
  trashOutline
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
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonFooter,
    IonAlert
  ],
})
export class MonumentDetailPage implements OnInit {
  monumento!: Monumento;
  isAlertOpen = false;
  
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      handler: () => {
        this.deleteMonument();
      },
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({
      locationSharp,
      calendarOutline,
      alertCircleOutline,
      arrowBack,
      trashOutline
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando monumento...',
    });
    await loading.present();

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      const foundMonument = await this.monumentService.get_monumento_id(id);
      if (foundMonument) {
        this.monumento = foundMonument;
      } else {
        await this.handleError();
      }
    } else {
      await this.handleError();
    }
    await loading.dismiss();
  }

  async handleError() {
    const toast = await this.toastController.create({
      message: 'Elemento no encontrado',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
    this.router.navigate(['/home']);
  }

  setOpenAlert(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  async deleteMonument() {
    if (this.monumento) {
      const loading = await this.loadingController.create({
        message: 'Eliminando...',
      });
      await loading.present();

      try {
        await this.monumentService.eliminar_monumento(this.monumento.id);
        
        const toast = await this.toastController.create({
          message: 'Monumento eliminado correctamente',
          duration: 2000,
          color: 'success',
          position: 'bottom'
        });
        await toast.present();
        
        this.router.navigate(['/home']);
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error al eliminar el monumento',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
        await toast.present();
      } finally {
        await loading.dismiss();
      }
    }
  }
}
