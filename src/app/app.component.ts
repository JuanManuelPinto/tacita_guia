import { Component, LOCALE_ID } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SettingsService } from './services/settings.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class AppComponent {

  constructor(private settingsService: SettingsService) { }

  // Angular ejecutará este método automáticamente al iniciar, 
  // aunque no implementemos la interfaz OnInit explícitamente.
  // ¡IMPORTANTE! Añadimos 'async' para esperar a la base de datos.
  async ngOnInit() {
    await this.cargarPreferencias();
  }

  async cargarPreferencias() {
    // Leemos el ajuste guardado
    const modoOscuro = await this.settingsService.get('modo_oscuro');

    // Si era true, activamos el modo oscuro inmediatamente
    if (modoOscuro) {
      document.body.classList.add('dark');
    }
  }
}
