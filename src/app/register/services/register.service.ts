import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any>{
    return this.http.post<any>('http://localhost:9000/users/register',user);
  }

  getUser(email: string): Observable<any>{
    return this.http.get<any>('http://localhost:9000/users/getUserByEmail?email='+email);
  }

  getUserByEmailAndPassword(email: string, password:string): Observable<any>{
    return this.http.get<any>('http://localhost:9000/users/getUserByEmailPassword?email='+email+"&&password="+password);
  }
  
  getAllContacts() : Observable<any>{
    return this.http.get<any>('http://localhost:9000/users/getAllContacts');
  }

  editContact(user:User): Observable<any>{
    return this.http.post<any>('http://localhost:9000/users/editUser',user);
  }

  deleteContact(user:User): Observable<any>{
    return this.http.post<any>('http://localhost:9000/users/delete',user);
  }

}
