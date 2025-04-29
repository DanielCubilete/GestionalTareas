import { Injectable } from '@angular/core';
import { interfaz, ModeloPago } from '../common/interfaz';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DataService {

    //Creamos variable para no repetir la ruta en todos los metodos
    private url = 'data/data.json';

    constructor(private http: HttpClient) { }



    getModeloPago(): Observable<interfaz>{
      return this.http.get<interfaz>(this.url)
    }

    getModeloPagoId(id : string): Observable<ModeloPago>{

      return this.getModeloPago()
      //pipe => tuberia
      //funcion map => desglosa todos los datos
      .pipe(map(modeloPagoPipe=>{
        //constante que busca, el elemento que tenga "titulo" y cual es el que coincide con el id
        const modeloPaguito = modeloPagoPipe.ModeloPago
        .find(modeloPagoFind => modeloPagoFind.Nombre === id);
        //Este IF hace una funcion de try cath
        if (!modeloPaguito) {
          throw new Error ('Pelicula con id ${id} not found');
        }
        return modeloPaguito;
      }));
    }
  }
