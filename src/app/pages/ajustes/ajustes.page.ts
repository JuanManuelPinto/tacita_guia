import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { PhotoService } from 'src/app/services/photo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, 
  IonListHeader, IonItem, IonLabel, IonToggle, IonButtons, 
  IonBackButton, IonInput, IonButton, IonIcon, ToastController,
  IonAvatar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  saveOutline, personOutline, moonOutline, chevronForwardOutline, 
  cameraOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton,
    IonList, IonListHeader, IonItem, IonLabel, IonToggle, IonInput,
    FormsModule,
    IonButton, IonIcon, IonAvatar
  ]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false; // Valor por defecto
  nombreUsuario: string = ''; // Nombre del usuario

  constructor(
    private settingsService: SettingsService,
    private toastController: ToastController,
    public photoService: PhotoService
  ) { 
    addIcons({ 
      saveOutline, personOutline, moonOutline, chevronForwardOutline,
      cameraOutline 
    });
  }

  // ¡IMPORTANTE! Añadimos 'async' para poder usar 'await' dentro
  async ngOnInit() {
    // Al entrar, cargamos el valor guardado
    // Si no existe (es la primera vez), settingsService.get devuelve null, 
    // así que usamos '|| false' para que sea false por defecto.
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.nombreUsuario = await this.settingsService.get('nombre_usuario') || '';

    // Aplicamos el tema inmediatamente al entrar por si acaso
    this.aplicarTema(this.modoOscuro);
  }

  async addPhoto() {
    await this.photoService.addNewToGallery();
  }

  // Guardar el nombre cuando cambie
  async guardarNombre() {
    await this.settingsService.set('nombre_usuario', this.nombreUsuario);
    
    const toast = await this.toastController.create({
      message: 'Nombre guardado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  // También debe ser async porque settingsService.set devuelve una promesa
  async cambiarModoOscuro() {
    // 1. Guardamos el nuevo valor en la base de datos
    await this.settingsService.set('modo_oscuro', this.modoOscuro);

    // 2. Aplicamos el cambio visualmente
    this.aplicarTema(this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    // Añadimos o quitamos la clase 'dark' al body del documento
    // Esto activa los estilos que definiremos en variables.scss
    document.body.classList.toggle('dark', esOscuro);
  }
}
