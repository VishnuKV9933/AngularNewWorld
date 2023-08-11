import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post } from '../customTypes';
import { catchError ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getNotifications(userId:string|null):Observable<any>{
    console.log("hai");
    
    return this.http.get<any>(`notification/getnotification/${userId}`)
    
  }


  addCommentNotification(Obj:post):Observable<void>{
    return  this.http.post<void>(`notification/commentpost`,Obj)
     .pipe(
       catchError(error => {
         console.log(error);
         throw error;
       })
     );

  }

  addReplyNotification(Obj:post):Observable<void>{
   return this.http.post<void>(`notification/replycomment`,Obj).pipe(
    (catchError((error)=>{
      console.log(error);
      throw error
    }))
   )
  }

  
    addLikeNotification(Obj:post):Observable<void>{
      return this.http.post<void>(`notification/likepost`,Obj)
      .pipe(
        catchError(error => {
          console.log(error);
          throw error;
        })
      );
    }

    addPostNotification(data:post):Observable<void>{
      return this.http.post<void>(`notification/post`,data)
      .pipe(catchError((error)=>{
        console.log(error);
        throw error
      }))
    }
  
    readNotification(Id:string):Observable<void>{
      return   this.http.patch<void>(`notification/read/${Id}`,{})
    }

    clearNotification(id:string|null):Observable<void>{
      return this.http.put<void>(`notification/clearnotification/${id}`,{})
      .pipe(
        catchError((error)=>{
          console.log(error);
          throw error
        })
      )
    }

}
