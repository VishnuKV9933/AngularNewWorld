import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { user } from '../customTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateSevice {

  constructor(private http:HttpClient) { }

  userId:string|null =localStorage.getItem('user')

  defaultProfileImageUrl:string="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"


  private GlobalUser =new BehaviorSubject<user|null>(null)

  currentUser$=this.GlobalUser.asObservable()
  updatCurrentUser=(newUser:user|null)=>{
    this.GlobalUser.next(newUser)
  }

  // getUser(userId:string|null):Observable<user>{
    
  //   return this.http.post<user>(`users/getuser`,{userId:userId})
  //   .pipe(
  //     catchError(error => {
  //       console.log(error);
  //       throw error;
  //     })
  //   );
  // }
}
