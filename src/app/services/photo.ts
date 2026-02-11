import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public foto: string | undefined;

  constructor(private settingsService: SettingsService) {
    this.loadSaved();
  }

  async loadSaved() {
    this.foto = await this.settingsService.get('foto_perfil') || undefined;
  }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    const base64Data = `data:image/jpeg;base64,${capturedPhoto.base64String}`;
    this.foto = base64Data;
    
    // Guardar en Storage de forma persistente
    await this.settingsService.set('foto_perfil', base64Data);
  }
}
