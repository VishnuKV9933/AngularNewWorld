import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData,LoginJson, SignUpJson, UserSignup } from 'src/app/customTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  UserSignup(data:UserSignup):Observable<SignUpJson>{
   return  this.http.post<SignUpJson>('auth/usersignup',data)
  }

  UserLogin(data:LoginData):Observable<LoginJson>{
    
      return  this.http.post<LoginJson>('auth/userlogin',data)
  }

}
