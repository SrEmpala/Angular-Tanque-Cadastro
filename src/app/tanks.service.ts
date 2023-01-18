import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tank } from './Tank';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TanksService {

  url = 'https://localhost:7292/api/Tank'
  constructor(private http: HttpClient) {   }

    BuscarTodos(): Observable<Tank[]>{
      return this.http.get<Tank[]>(this.url)
    }

    BuscarPorId(tankId: number): Observable<Tank>{
      const apiUrl = `${this.url}/${tankId}`;
      return this.http.get<Tank>(apiUrl);
    }

    SalvarTank(tank: Tank) : Observable<any>{
      return this.http.post<Tank>(this.url, tank, httpOptions); 
    }

    AtualizarTank(tank: any) : Observable<any>{
      return this.http.put<Tank>(`${this.url}/${tank.tankId}`, tank, httpOptions);
    } 

    ExcluirTank(tankId: number) : Observable<any>{
      const apiUrl = `${this.url}/${tankId}`;
      return this.http.delete<number>(apiUrl, httpOptions);
    }
}
