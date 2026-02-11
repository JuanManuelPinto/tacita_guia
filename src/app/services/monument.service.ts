import { Injectable } from '@angular/core';
import { Monumento } from '../interfaces/monumento';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MonumentService {

    private _url = `${environment.apiUrl}/monumentos`;

    constructor(private http: HttpClient) { }

    async get_monumentos(query?: string): Promise<Monumento[]> {
        const monumentos = await firstValueFrom(this.http.get<Monumento[]>(this._url));
        
        if (!query || query.trim() === '') {
            return monumentos;
        }

        const searchTerm = query.toLowerCase();
        return monumentos.filter(m => 
            m.nombre.toLowerCase().includes(searchTerm) || 
            m.descripcion.toLowerCase().includes(searchTerm)
        );
    }

    public nuevo_monumento: Monumento = {
        id: 0,
        nombre: '',
        descripcion: '',
        imagen: '',
        ubicacion: '',
        fecha_construccion: new Date(),
    };
    
    async agregar_monumento(nuevo_monumento: Monumento) {
        
        var insertado = false;

        if (
            nuevo_monumento.nombre.trim() === '' ||
            nuevo_monumento.descripcion.trim() === '' ||
            nuevo_monumento.imagen.trim() === '' ||
            nuevo_monumento.ubicacion.trim() === ''
        ) {
            insertado = false;
        } else {

            const { id, ...dataToSend } = nuevo_monumento;
            
            await firstValueFrom(this.http.post(this._url, dataToSend));

            this.nuevo_monumento = {
                id: 0,
                nombre: '',
                descripcion: '',
                imagen: '',
                ubicacion: '',
                fecha_construccion: new Date(),
            };
            insertado = true;
        }

        return insertado;
    }

    async eliminar_monumento(id: number | string) {
        await firstValueFrom(this.http.delete(`${this._url}/${id}`));
    }

    async get_monumento_id(id: number | string): Promise<Monumento | undefined> {
        try {
            return await firstValueFrom(this.http.get<Monumento>(`${this._url}/${id}`));
        } catch (error) {
            return undefined;
        }
    }

    async actualizar_monumento(monumento: Monumento) {
        return firstValueFrom(this.http.put(`${this._url}/${monumento.id}`, monumento));
    }
}
