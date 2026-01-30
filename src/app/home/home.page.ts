import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monumento } from '../interfaces/monumento';
import { MonumentItemComponent } from '../components/monument-item/monument-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { MonumentService } from '../services/monument.service';
import { SettingsService } from '../services/settings.service';
import {
     ToastController,
     ModalController,
     IonCard,
     IonCardHeader,
     IonCardContent,
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';

import {
     IonSkeletonText,
     IonRow,
     IonGrid,
     IonCol,
     IonList,
     IonItem,
     IonInput,
     IonButton,
     IonContent,
     IonDatetime,
     IonLabel,
     IonDatetimeButton,
     IonModal,
     IonFab,
     IonFabButton,
     IonIcon,
     AnimationController,
     Animation,
     IonAlert,
     LoadingController,
     IonSearchbar
} from '@ionic/angular/standalone';

import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';
import { addIcons } from 'ionicons';
import { informationCircleOutline, settingsOutline } from 'ionicons/icons';

@Component({
     selector: 'app-home',
     templateUrl: 'home.page.html',
     styleUrls: ['home.page.scss'],
     imports: [
          IonCardContent,
          IonCardHeader,
          IonCard,
          IonIcon,
          IonFabButton,
          IonFab,
          IonModal,
          IonDatetimeButton,
          IonLabel,
          IonContent,
          IonCol,
          IonRow,
          MonumentItemComponent,
          CommonModule,
          IonGrid,
          HeaderComponent,
          FormsModule,
          IonList,
          IonItem,
          IonInput,
          IonButton,
          IonDatetime,
          IonSkeletonText,
          IonAlert,
          IonSearchbar
     ],
})
export class HomePage implements AfterViewInit {
     @ViewChild('profileCard', { read: ElementRef }) profileCard!: ElementRef;

     private animacion!: Animation;

     public cargando: boolean = true;
     public monumentos: Monumento[] = [];
     public nombreUsuario: string = '';
     public searchTerm: string = '';

     public skeletonCards: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

     
     
     public nuevo_monumento: Monumento = {
          id: 0,
          nombre: '',
          descripcion: '',
          imagen: '',
          ubicacion: '',
          fecha_construccion: new Date(),
     };

     public isAlertOpen: boolean = false;
     
     alertButtons = [
          {
               text: 'Cancelar',
               role: 'cancel'
          },
          {
               text: 'Confirmar',
               role: 'confirm',
               handler: () => {
                    this.agregar_monumento(this.nuevo_monumento);
               }
          }
     ];
     
     constructor(
          private modalController: ModalController,
          private animationCtrl: AnimationController,
          private monumentService: MonumentService,
          private settingsService: SettingsService,
          private toastController: ToastController,
          private loadingController: LoadingController
     ) {
          addIcons({
               'information-circle-outline': informationCircleOutline,
               'settings-outline': settingsOutline,
          });
     }

     async inserccion_correcta() {
          const toast = await this.toastController.create({
               message: 'Monumento Añadido Correctamente',
               duration: 2000,
               position: 'bottom',
               color: 'success',
               buttons: ['OK'],
          });
          await toast.present();
     }

     async error_insertar() {
          const toast = await this.toastController.create({
               message: 'Por favor, complete todos los campos',
               duration: 2000,
               position: 'bottom',
               color: 'danger',
               buttons: ['OK'],
          });
          await toast.present();
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

     // async ionViewWillEnter() {
     //      this.nombreUsuario = await this.settingsService.get('nombre_usuario') || '';
     //      // Recargamos los monumentos por si se ha borrado alguno en la vista de detalle
     //      this.cargar_monumentos();
     // }    

     // ngOnInit() {
     //      this.cargando = true;

     //      setTimeout(() => {
     //           this.monumentos = this.monumentService.get_monumentos();
     //           this.cargando = false;
     //      }, 2000);
     // }

     async ionViewWillEnter() {
          this.cargando = true;
          this.nombreUsuario = await this.settingsService.get('nombre_usuario') || '';
          this.monumentos = await this.monumentService.get_monumentos();
          this.cargando = false;
     }

     ngAfterViewInit() {
          if (this.profileCard) {
               this.animacion = this.animationCtrl
                    .create()
                    .addElement(this.profileCard.nativeElement)
                    .duration(800)
                    .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
                    .fromTo('opacity', '0', '1');

               this.animacion.play();
          }
     }

     async abrirModal() {
          const modal = await this.modalController.create({
               component: DetalleModalComponent,
               backdropDismiss: true,
               componentProps: {
                    mensaje: 'Este mensaje viene de la Home',
               },
          });

          await modal.present();

          // Esperamos a que se cierre para leer la respuesta
          const { data, role } = await modal.onDidDismiss();

          if (role === 'confirm') {
               console.log('Modal cerrado. Datos recibidos:', data);
          }
     }

     async cargar_monumentos() {
          this.cargando = true;
          this.monumentos = await this.monumentService.get_monumentos(this.searchTerm);
          this.cargando = false;
     }

     async search(event: any) {
          this.searchTerm = event.detail.value;
          console.log('Buscando:', this.searchTerm); // DEBUG
          await this.cargar_monumentos();
     }

     async onAddClick() {
          const { nombre, descripcion, imagen, ubicacion } = this.nuevo_monumento;
          if (!nombre?.trim() || !descripcion?.trim() || !imagen?.trim() || !ubicacion?.trim()) {
               this.error_insertar();
               return;
          }
          this.isAlertOpen = true;
     }

     async agregar_monumento(nuevo_monumento: Monumento) {
          const loading = await this.loadingController.create({
               message: 'Guardando monumento...',
          });
          await loading.present();
          
          try {
               var insertado = await this.monumentService.agregar_monumento(nuevo_monumento);
               
               if (!insertado) {
                    this.error_insertar();
               } else {
                    this.monumentos = await this.monumentService.get_monumentos();
          
                    this.nuevo_monumento = {
                         id: 0,
                         nombre: '',
                         descripcion: '',
                         imagen: '',
                         ubicacion: '',
                         fecha_construccion: new Date(),
                    };
          
                    await this.cargar_monumentos();
                    this.inserccion_correcta();
               }
          } catch (error) {
               console.error('Error adding monument', error);
               this.error_insertar();
          } finally {
               await loading.dismiss();
          }
     }
}
