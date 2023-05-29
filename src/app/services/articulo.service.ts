import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { blog } from '../interfaces/blog.interfaces';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(
    private http: HttpClient,
  ) {

  }

  getBlogPublicaciones(): Observable<blog[]> {
    const url = `${base_url}/node/publicaciones?include=field_categoria`;
    return this.http.get(url).pipe(
      map((publicaciones: any) => {
        // Mapea la respuesta para convertir cada objeto en una instancia de 'solicitud'
        let blogPublicaciones = publicaciones.data.map((publicacion: any) => ({
          id: publicacion.id,
          titulo: publicacion.attributes.title,
          contenido: publicacion.attributes.body.value,
          fecha: new Date(publicacion.attributes.field_fecha_publicacion),
        }));

        publicaciones.included.forEach((categoria: any, index: any) => {
          blogPublicaciones[index].categoria = categoria.attributes.title
        });

        return blogPublicaciones;
      })
    );
  }

}
