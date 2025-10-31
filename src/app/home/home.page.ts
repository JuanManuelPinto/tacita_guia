import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { Monumento } from '../interfaces/monumento';
import { MonumentItemComponent } from "../components/monument-item/monument-item.component";
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCol, IonRow, IonContent, MonumentItemComponent, CommonModule, IonGrid, HeaderComponent],
})
export class HomePage {
  constructor() { }

  monumentos: Monumento[] = [
    {
      id: 1,
      nombre: "Catedral de Cádiz",
      descripcion:
        "Imponente templo barroco y neoclásico construido entre los siglos XVIII y XIX. Destaca por su cúpula dorada visible desde el mar y su torre mirador.",
      imagen:
        "https://catedraldecadiz.com/wp-content/uploads/2015/03/catedral_cadiz_dsc1239.jpg",
      ubicacion: "Plaza de la Catedral, Cádiz",
      fecha_construccion: new Date("1722-01-01"),
    },
    {
      id: 2,
      nombre: "Torre Tavira",
      descripcion:
        "Antigua torre vigía del siglo XVIII, la más alta de la ciudad, que alberga una cámara oscura con vistas panorámicas de Cádiz.",
      imagen:
        "https://images.mnstatic.com/e7/6c/e76cd0de5069126fe8c4e0b430d51fa0.jpg",
      ubicacion: "Calle Marqués del Real Tesoro, 10, Cádiz",
      fecha_construccion: new Date("1778-01-01"),
    },
    {
      id: 3,
      nombre: "Teatro Romano de Cádiz",
      descripcion:
        "Restos del teatro romano más antiguo y grande de la península ibérica, descubierto en 1980 bajo el barrio del Pópulo.",
      imagen:
        "https://www.barcelo.com/guia-turismo/wp-content/uploads/ok-teatro-romano-de-cadiz.jpg",
      ubicacion: "Calle Mesón, s/n, Cádiz",
      fecha_construccion: new Date("-0100-01-01"), // siglo I a.C.
    },
    {
      id: 4,
      nombre: "Puertas de Tierra",
      descripcion:
        "Antigua muralla que separaba la ciudad del continente. Hoy es símbolo de Cádiz y entrada principal al casco histórico.",
      imagen:
        "https://fotografias.lasexta.com/clipping/cmsimages01/2020/11/12/A0FD7321-01DF-4645-9584-124C36936A06/98.jpg?crop=1920,1080,x0,y36&width=1900&height=1069&optimize=high&format=webply",
      ubicacion: "Avenida Cuesta de las Calesas, Cádiz",
      fecha_construccion: new Date("1756-01-01"),
    },
    {
      id: 5,
      nombre: "Castillo de San Sebastián",
      descripcion:
        "Fortaleza situada sobre un islote que protege la entrada norte de la bahía. Del siglo XVIII, con un faro icónico.",
      imagen:
        "https://www.cadizturismo.com/storage/app/uploads/public/66d/82f/6ed/66d82f6ed79ed122227910.jpg",
      ubicacion: "Camino de San Sebastián, Cádiz",
      fecha_construccion: new Date("1706-01-01"),
    },
    {
      id: 6,
      nombre: "Castillo de Santa Catalina",
      descripcion:
        "Fortificación del siglo XVII con forma estrellada, construida para defender la ciudad tras el ataque anglo-holandés de 1596.",
      imagen:
        "https://turismo.cadiz.es/sites/default/files/styles/ancho-800/public/rutas-y-visitas/Castillo%20de%20Santa%20Catalina%20%284%29_0.jpg?itok=5I0BUf6s",
      ubicacion: "Playa de la Caleta, Cádiz",
      fecha_construccion: new Date("1621-01-01"),
    },
    {
      id: 7,
      nombre: "Gran Teatro Falla",
      descripcion:
        "Teatro de estilo neomudéjar inaugurado en 1910. Escenario principal del famoso Carnaval de Cádiz.",
      imagen:
        "https://cdn.applievent.com/entertainment/media/news/2023-08-03_115109_8107.jpeg",
      ubicacion: "Plaza Fragela, Cádiz",
      fecha_construccion: new Date("1905-01-01"),
    },
    {
      id: 8,
      nombre: "Plaza de San Juan de Dios",
      descripcion:
        "Plaza principal de Cádiz desde el siglo XVI, donde se ubican el Ayuntamiento y varios edificios históricos.",
      imagen:
        "https://exploraplaya.es/wp-content/uploads/2021/06/plaza-San-juan-de-Dios-Cadiz.jpg",
      ubicacion: "Plaza de San Juan de Dios, Cádiz",
      fecha_construccion: new Date("1500-01-01"),
    },

  ];
}
